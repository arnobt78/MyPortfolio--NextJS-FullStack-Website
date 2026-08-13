import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { captureApiError, devWarn } from '@/lib/logger';

/**
 * Free-tier chat fallback (REQ-0017 / C1.1a).
 *
 * Order: Gemini → OpenRouter `:free` → Groq → Hugging Face router → OpenAI (paid, last resort).
 * Source: docs/LLM_MODEL_SELECTION.md + Groq deprecations (llama-3.3-70b-versatile shutdown 2026-08-16).
 * On HTTP 429 / quota for a provider, skip remaining models of that provider (account-wide cap).
 */
const GEMINI_FREE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite', // Pro is paid-only since Apr 2026; do not use gemini-2.5-pro on free keys
] as const;

/** OpenRouter no-card IDs must end in `:free` (never gpt-4o-mini). First success wins. */
const OPENROUTER_FREE_MODELS = [
  'openai/gpt-oss-20b:free',
  'qwen/qwen3-coder:free', // live slug for Qwen3 Coder 480B A35B (doc listed qwen3-coder-480b:free)
  'deepseek/deepseek-chat-v3-0324:free',
] as const;

/** Groq replacements for Llama 3.3 70B / Llama 3.1 8B (shutdown 2026-08-16). */
const GROQ_FREE_MODELS = [
  'openai/gpt-oss-20b',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-120b',
] as const;

/** Hugging Face Inference Providers router — short chain; long lists 404 and stall Edge. */
const HUGGINGFACE_FREE_MODELS = [
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
] as const;

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MessageContent {
  text?: string;
  content?: string;
  message?: string;
}

type ChatRoleMessage = { role: 'system' | 'user' | 'assistant'; content: string };

const AI_DEBUG = process.env.NODE_ENV !== 'production';

/**
 * Dev-only logging: must delegate to `console.log`, not self-call (self-call caused infinite
 * recursion and POST /api/chat 500 in development while production stayed no-op).
 */
const debugLog = (...args: unknown[]) => {
  if (AI_DEBUG) console.log(...args);
};

/**
 * Same pattern as `debugLog` — forward to `console.warn` so Turbopack/dev never stack-overflows.
 */
const debugWarn = (...args: unknown[]) => {
  if (AI_DEBUG) console.warn(...args);
};

/**
 * streamText() returns before the HTTP call finishes. Await the first token so a 404/429
 * can advance the fallback chain instead of handing a dead stream to /api/chat.
 */
async function withFirstStreamChunk(textStream: AsyncIterable<string>): Promise<{
  textStream: AsyncIterable<string>;
}> {
  const iterator = textStream[Symbol.asyncIterator]();
  const first = await iterator.next();
  if (first.done && (first.value === undefined || first.value === '')) {
    throw new Error('Empty model stream');
  }
  return {
    textStream: (async function* () {
      if (first.value) yield first.value;
      while (true) {
        const next = await iterator.next();
        if (next.done) break;
        if (next.value) yield next.value;
      }
    })(),
  };
}

/** True when the provider is throttled — skip remaining models of that provider. */
function isRateLimitedError(error: unknown): boolean {
  const msg = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('too many requests') ||
    msg.includes('rate limit') ||
    msg.includes('rate_limit')
  );
}

export async function getAIResponse(
  messages: Array<{ role: string; content: string | unknown[] | MessageContent }>,
  context?: string,
  stream: boolean = true
) {
  const systemPrompt = `You are a helpful assistant for Arnob Mahmud's portfolio website. Be friendly, professional, and concise. Use the FAQ context to give accurate answers. If you don't know something, say so.`;

  const normalizeContentToString = (content: unknown): string => {
    if (typeof content === 'string') {
      return content;
    }

    if (Array.isArray(content)) {
      return (content as unknown[])
        .map((item: unknown) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object') {
            const itemObj = item as {
              text?: string;
              content?: string;
              message?: string;
              type?: string;
            };
            return itemObj.text || itemObj.content || itemObj.message || '';
          }
          return String(item || '');
        })
        .filter((text: string) => text.length > 0)
        .join(' ');
    }

    if (content && typeof content === 'object') {
      const contentObj = content as { text?: string; content?: string; message?: string };
      return contentObj.text || contentObj.content || contentObj.message || '';
    }

    return String(content || '');
  };

  const normalizedMessages: Message[] = messages
    .slice(-6)
    .map((msg) => {
      const content = normalizeContentToString(msg.content);

      if (!content || content.trim().length === 0) {
        return null;
      }

      const role = msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user';
      return {
        role: role as 'system' | 'user' | 'assistant',
        content: content.trim(),
      };
    })
    .filter((msg): msg is Message => msg !== null);

  const fullMessages: Message[] = [
    { role: 'system', content: systemPrompt + (context ? `\n\nFAQ Context:\n${context}` : '') },
    ...normalizedMessages,
  ];

  for (let i = 0; i < fullMessages.length; i++) {
    const msg = fullMessages[i];
    if (typeof msg.content !== 'string') {
      debugWarn(`Message ${i} has non-string content, normalizing:`, typeof msg.content, Array.isArray(msg.content), JSON.stringify(msg.content).substring(0, 100));
      fullMessages[i] = {
        ...msg,
        content: normalizeContentToString(msg.content),
      };
    }
  }

  const invalidMessages = fullMessages.filter(msg => typeof msg.content !== 'string');
  if (invalidMessages.length > 0) {
    captureApiError(
      'Some messages in fullMessages still have non-string content',
      new Error('Message content normalization'),
      { count: invalidMessages.length },
    );
    for (let i = 0; i < fullMessages.length; i++) {
      if (typeof fullMessages[i].content !== 'string') {
        fullMessages[i] = {
          ...fullMessages[i],
          content: normalizeContentToString(fullMessages[i].content),
        };
      }
    }
  }

  debugLog('fullMessages count:', fullMessages.length);
  debugLog('fullMessages content types:', fullMessages.map((msg, i) => ({ index: i, role: msg.role, contentType: typeof msg.content, isArray: Array.isArray(msg.content) })));

  const prepareAIMessages = (): ChatRoleMessage[] => {
    const aiMessages: ChatRoleMessage[] = [];

    for (const msg of fullMessages) {
      const contentStr = normalizeContentToString(msg.content);

      if (contentStr && contentStr.trim().length > 0) {
        const role = msg.role === 'system' ? 'system' :
                     msg.role === 'assistant' ? 'assistant' :
                     'user';

        aiMessages.push({
          role: role as 'system' | 'user' | 'assistant',
          content: contentStr.trim(),
        });
      }
    }

    return aiMessages;
  };

  /** String-only copies for OpenAI-compatible SDKs (chat history may still be arrays). */
  const getValidatedMessages = (): ChatRoleMessage[] => {
    const aiMessages = prepareAIMessages();
    const validatedMessages = aiMessages.map((msg, index) => {
      const clonedMsg = JSON.parse(JSON.stringify(msg)) as ChatRoleMessage;

      if (typeof clonedMsg.content !== 'string') {
        captureApiError(
          `Message ${index} has non-string content`,
          new Error('prepareAIMessages validation'),
          { index, contentType: typeof clonedMsg.content, isArray: Array.isArray(clonedMsg.content) },
        );
        clonedMsg.content = normalizeContentToString(clonedMsg.content);
      }

      if (typeof clonedMsg.content !== 'string') {
        captureApiError(
          `Message ${index} still non-string after normalization`,
          new Error('prepareAIMessages critical'),
          { index },
        );
        clonedMsg.content = String(clonedMsg.content || '');
      }

      return {
        role: clonedMsg.role as 'system' | 'user' | 'assistant',
        content: String(clonedMsg.content),
      };
    });

    const hasArrayContent = validatedMessages.some(msg => Array.isArray(msg.content) || typeof msg.content !== 'string');
    if (hasArrayContent) {
      const bad = validatedMessages.filter(
        (msg) => Array.isArray(msg.content) || typeof msg.content !== 'string',
      );
      captureApiError(
        'Messages still have non-string content after validation',
        new Error('Message normalization failed'),
        { badCount: bad.length },
      );
      throw new Error('Message normalization failed: some messages still have array content');
    }

    return validatedMessages;
  };

  // Primary: Gemini Flash / Flash-Lite (free AI Studio keys; skip remaining Gemini on 429)
  let geminiRateLimited = false;

  for (const modelName of GEMINI_FREE_MODELS) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: modelName });

      let prompt = systemPrompt + (context ? `\n\nFAQ Context:\n${context}` : '') + '\n\n';
      prompt += normalizedMessages
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n');

      const result = await model.generateContentStream(prompt);

      if (stream) {
        return {
          textStream: (async function* () {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) yield text;
            }
          })(),
        };
      } else {
        const response = await result.response;
        return { text: response.text() };
      }
    } catch (error: unknown) {
      if (isRateLimitedError(error)) {
        debugLog(`Gemini model ${modelName} rate limited, skipping remaining Gemini models...`);
        geminiRateLimited = true;
        break;
      }
      debugLog(`Gemini model ${modelName} failed, trying next...`, error);
    }
  }

  if (geminiRateLimited) {
    debugLog('Gemini rate limited, trying OpenRouter...');
  } else {
    debugLog('All Gemini models failed, trying OpenRouter...');
  }

  // Fallback 1: OpenRouter `:free` chain (account-wide free cap — skip rest of provider on 429)
  const openRouterApiKey = process.env.OPENROUTER_API_KEY || process.env.OpenRouter_API_KEY;
  if (openRouterApiKey) {
    try {
      const openaiClient = createOpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: openRouterApiKey,
        headers: {
          'HTTP-Referer': process.env.NEXT_PUBLIC_CHATBOT_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arnobmahmud.com',
          'X-Title': 'Portfolio Chatbot',
        },
      });

      const validatedMessages = getValidatedMessages();

      for (const modelId of OPENROUTER_FREE_MODELS) {
        try {
          debugLog(`Trying OpenRouter ${modelId}...`);
          const model = openaiClient.chat(modelId);

          if (stream) {
            const result = streamText({
              model: model,
              messages: validatedMessages,
              temperature: 0.7,
            });
            const primed = await withFirstStreamChunk(result.textStream);
            debugLog(`OpenRouter ${modelId} responding successfully`);
            return primed;
          } else {
            const result = await generateText({
              model: model,
              messages: validatedMessages,
              temperature: 0.7,
            });
            debugLog(`OpenRouter ${modelId} responding successfully`);
            return result;
          }
        } catch (error) {
          if (isRateLimitedError(error)) {
            debugLog(`OpenRouter ${modelId} rate limited, skipping remaining OpenRouter models...`);
            break;
          }
          debugLog(`OpenRouter ${modelId} failed, trying next...`, error);
        }
      }
    } catch (error) {
      devWarn('OpenRouter failed, trying Groq...', error);
    }
  }

  // Fallback 2: Groq (no Llama — gpt-oss / qwen3.6 only)
  const groqApiKey = process.env.GROQ_API_KEY || process.env.Groq_Llama_API_KEY;
  if (groqApiKey) {
    const groq = createGroq({
      apiKey: groqApiKey,
    });
    const aiMessages = prepareAIMessages();

    for (const modelId of GROQ_FREE_MODELS) {
      try {
        debugLog(`Trying Groq ${modelId}...`);

        if (stream) {
          const result = streamText({
            model: groq(modelId),
            messages: aiMessages,
            temperature: 0.7,
          });
          const primed = await withFirstStreamChunk(result.textStream);
          debugLog(`Groq ${modelId} responding successfully`);
          return primed;
        } else {
          const result = await generateText({
            model: groq(modelId),
            messages: aiMessages,
            temperature: 0.7,
          });
          debugLog(`Groq ${modelId} responding successfully`);
          return result;
        }
      } catch (error) {
        if (isRateLimitedError(error)) {
          debugLog(`Groq ${modelId} rate limited, skipping remaining Groq models...`);
          break;
        }
        debugLog(`Groq ${modelId} failed, trying next...`, error);
      }
    }
    devWarn('Groq failed, trying Hugging Face...');
  }

  // Fallback 3: Hugging Face Inference Providers router (OpenAI-compatible)
  const huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY || process.env.Hugging_Face_Inference_API_KEY;
  if (huggingFaceApiKey) {
    const failedModels: string[] = [];
    const aiMessages = prepareAIMessages();

    for (const model of HUGGINGFACE_FREE_MODELS) {
      try {
        debugLog(`Trying Hugging Face model: ${model}...`);

        const response = await fetch(
          'https://router.huggingface.co/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${huggingFaceApiKey}`,
            },
            body: JSON.stringify({
              model: model,
              messages: aiMessages,
              max_tokens: 512,
              temperature: 0.7,
            }),
          }
        );

        if (response.status === 429) {
          debugLog(`Hugging Face ${model} rate limited, skipping remaining HF models...`);
          break;
        }

        if (response.ok) {
          const data = await response.json();

          let generatedText = '';
          if (data?.choices?.[0]?.message?.content) {
            generatedText = data.choices[0].message.content.trim();
          } else if (data?.choices?.[0]?.text) {
            generatedText = data.choices[0].text.trim();
          } else if (data?.output?.[0]?.content?.[0]?.text) {
            generatedText = data.output[0].content[0].text.trim();
          }

          if (generatedText) {
            debugLog(`Success with Hugging Face model: ${model}`);

            if (stream) {
              return {
                textStream: (async function* () {
                  const words = generatedText.split(' ');
                  for (const word of words) {
                    yield word + ' ';
                  }
                })(),
              };
            } else {
              return { text: generatedText };
            }
          }
        }

        failedModels.push(`${model} (${response.status})`);
        debugWarn(`${model} failed (${response.status}), trying next model...`);
      } catch (error: unknown) {
        failedModels.push(model);
        debugWarn(`${model} error:`, error);
        continue;
      }
    }

    devWarn(`All Hugging Face models failed: ${failedModels.join(', ')}`);
  }

  // Fallback 4: OpenAI Direct (paid; only if OPENAI_API_KEY is set)
  if (process.env.OPENAI_API_KEY) {
    try {
      debugLog('Trying OpenAI direct...');
      const openaiClient = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

      const aiMessages = prepareAIMessages();

      if (stream) {
        return streamText({
          model: openaiClient('gpt-4o-mini'),
          messages: aiMessages,
          temperature: 0.7,
        });
      } else {
        return await generateText({
          model: openaiClient('gpt-4o-mini'),
          messages: aiMessages,
          temperature: 0.7,
        });
      }
    } catch (error) {
      captureApiError('OpenAI direct failed', error);
    }
  }

  throw new Error('All AI models failed');
}
