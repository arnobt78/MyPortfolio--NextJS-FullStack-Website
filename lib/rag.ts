import { generateEmbedding } from './embeddings';
import { searchVectors } from './redis';

const FAQ_CACHE_TTL_MS = 60_000;
const faqCache = globalThis as unknown as { __faq_cache__?: Map<string, { value: string; expiresAt: number }> };
if (!faqCache.__faq_cache__) faqCache.__faq_cache__ = new Map();

export async function searchFAQ(query: string, topK: number = 3): Promise<string> {
  try {
    const normalized = query.trim().toLowerCase();
    const now = Date.now();
    const cached = faqCache.__faq_cache__?.get(normalized);
    if (cached && now < cached.expiresAt) return cached.value;

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar FAQs
    const results = await searchVectors(queryEmbedding, topK);

    if (results.length === 0) {
      faqCache.__faq_cache__?.set(normalized, { value: '', expiresAt: now + FAQ_CACHE_TTL_MS });
      return '';
    }

    // Format results as context
    const value = results
      .map((result) => {
        const { question, answer } = result.metadata;
        return `Q: ${question}\nA: ${answer}`;
      })
      .join('\n\n');

    faqCache.__faq_cache__?.set(normalized, { value, expiresAt: now + FAQ_CACHE_TTL_MS });
    return value;
  } catch (error) {
    console.error('RAG search failed:', error);
    return '';
  }
}
