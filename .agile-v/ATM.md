# Architecture Trace Matrix (ATM) — C1

| REQ | Component | Interface | Data store |
|-----|-----------|-----------|------------|
| REQ-0001 | next.config redirects, layout canonical | HTTP 308, `<link rel="canonical">` | — |
| REQ-0001 / 0012 | `proxy.ts` | `x-initial-language`, `x-pathname` | Next 16 Node proxy |
| REQ-0017 | `lib/ai.ts` getAIResponse | Gemini / OpenRouter :free / Groq OSS / HF router / optional OpenAI | — |
| REQ-0006 | package.json | npm overrides | — |
| REQ-0007 | lib/logger, Sentry | captureApiError | Sentry project portfolio-arnob |
| REQ-0007 | send-email, feedback routes | SMTP nodemailer | — |
| REQ-0009 | instrumentation-client | ignoreErrors, replay | Sentry |
| REQ-0004 | Photo, SafeImage | Next/Image fill | public/ assets |
| REQ-0016 | README, SECURITY.md, layout metadata | public docs + canonicals | — |
| REQ-0005 | hooks/use-chat.ts | React Query `["chat-history"]` | Upstash Redis sessions |
