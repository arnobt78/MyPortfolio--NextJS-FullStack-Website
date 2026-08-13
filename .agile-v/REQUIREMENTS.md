# Requirements — Cycle C1

<!-- Revision: C2 | Date: 2026-08-13 | Human Gate 1 C2: approved (plan attach) -->

| REQ-ID | Status | Title | Parent | Verification |
|--------|--------|-------|--------|--------------|
| REQ-0001 | approved [C1] | Canonical URL & Google Search Console duplicate fixes | — | GSC validation passed; 0 affected canonical issues |
| REQ-0002 | approved [C1] | Sentry: ignore browser-extension `window.solana` noise | REQ-0009 | instrumentation-client ignoreErrors |
| REQ-0003 | approved [C1] | Privacy/Terms hydration mismatch mitigation | REQ-0009 | suppressHydrationWarning on lastUpdated |
| REQ-0004 | approved [C1] | Hero photo aligns & clips to dashed SVG ring | — | Photo.tsx shared ring box + circular clip |
| REQ-0005 | approved [C1] | Chat API works in development (no stack overflow) | REQ-0007 | POST /api/chat 200 local; debugLog → console |
| REQ-0006 | approved [C1] | npm audit 0 vulnerabilities on maintained deps | — | npm audit clean; postcss override |
| REQ-0007 | approved [C1] | Centralized logging: dev-only console, prod Sentry | — | lib/logger.ts wired API/lib paths |
| REQ-0008 | approved [C1] | Turbopack import-in-the-middle version alignment (dev) | REQ-0006 | direct dep 3.0.1; dev warnings FLAG only |
| REQ-0009 | approved [C1] | Production observability without console spam | REQ-0007 | Sentry captureApiError; devLog gated |
| REQ-0010 | approved [C1] | Dependency bumps within Next 15 / React 18 | REQ-0006 | lint + build PASS; nodemailer 8 |
| REQ-0011 | pending [C1] | `/services` page indexed in Google Search Console | REQ-0001 | URL Inspection / wait validation |
| REQ-0012 | approved [C2] | Next.js 16.3 + React 19.2 upgrade with regression | — | lint, tsc, audit 0, build, chat, `/services`, language cookie |
| REQ-0013 | deferred [C2+] | Automated smoke tests (chat, email, nav) | REQ-0005 | TEST_SPEC TC-0001+ |
| REQ-0014 | superseded [C2] | Do not restore `middleware.ts`; Next 16 uses `proxy.ts` | REQ-0001 | TC-0012–0014 retargeted to proxy |
| REQ-0015 | approved [C1.1a] | `.env.example` with placeholders, no secrets | — | TC-0015 |
| REQ-0016 | approved [C2] | Agent/README memory matches source of truth | — | CLAUDE.md, AGENTS.md, README `proxy.ts` |
| REQ-0017 | approved [C1.1a] | Free-tier chat fallback models (no Llama / no paid OpenRouter) | REQ-0005 | TC-0016; POST /api/chat |

---

## REQ-0001 — Canonical URL & GSC

**As** site owner **I want** a single canonical host (`https://www.arnobmahmud.com`) **so that** Google does not split indexing across vercel.app / bare domain.

**Acceptance:** 308 redirects; `<link rel="canonical">`; GSC “Duplicate, Google chose different canonical” validation passed (0 pages).

**Artifacts (C1 record):** `next.config.mjs`, `app/layout.tsx`, `DUPLICATE-CANONICAL-FIX.md` (gitignored).  
**C2:** Interceptor is `proxy.ts` (Next 16). REQ-0014 superseded.

---

## REQ-0005 — Chat API (development)

**As** developer **I want** `/api/chat` to succeed locally **so that** I can test the assistant before deploy.

**Acceptance:** No `Maximum call stack size exceeded` from `lib/ai.ts`; POST returns 200.

**Root cause (C1):** `debugLog` self-recursion when `AI_DEBUG=true`.

---

## REQ-0007 — Centralized logging

**As** operator **I want** dev-only debug logs and production errors in Sentry **so that** logs are not noisy in production.

**Acceptance:** `devLog`/`devWarn`/`devError` no-op in production; `captureApiError` → Sentry in production.

**Artifacts:** `lib/logger.ts`, API routes, `lib/ai.ts`, `lib/rag.ts`, `lib/redis.ts`, `lib/embeddings.ts`

---

## REQ-0011 — /services indexing (open)

**As** site owner **I want** `/services` indexed **so that** it appears in search results.

**Acceptance:** GSC “Discovered - currently not indexed” → 0 for `/services`.

**Status:** External to code; optional Request Indexing; validation PENDING at last check.

**Inferred risk:** Layout canonical depends on `proxy.ts` `x-pathname`. Re-check production HTML after C2 deploy. Do not close REQ-0011 until GSC is re-checked.

---

## REQ-0012 — Next.js 16.3 + React 19.2 (C2)

**As** operator **I want** the site on current Next/React **so that** `proxy.ts` is loaded and the platform stays supported.

**Requirement:** Next 16.3.x, React 19.2.x, ESLint 9 + `eslint-config-next` 16, keep `proxy.ts`, Turbopack default build, `npm audit` 0.

**Status:** `approved [C2]` — validated locally 2026-08-13.

---

## REQ-0014 — Next 15 middleware file (superseded)

**As** site owner **I wanted** the request interceptor to use the Next.js **15.5** file convention.

**Status:** `superseded [C2]` — upgraded to Next 16; `proxy.ts` is the correct interceptor. Do not restore `middleware.ts`.

---

## REQ-0015 — Env example without secrets (C1.1a)

**As** a future agent or clone **I want** `.env.example` **so that** required keys are known without reading `.env`.

**Requirement:** Placeholder file listing env var **names** used by the app. Values must be empty or obvious fakes. Never copy real keys.

**Verification:** File exists; no secret-shaped values; names cover chat/email/Sentry/Redis as used in code.

**Status:** `approved [C1.1a]`.

---

## REQ-0016 — Project memory matches code (C2)

**As** a future agent **I want** `CLAUDE.md`, `AGENTS.md`, and README architecture notes **so that** resume uses `proxy.ts` on Next 16.

**Verification:** CLAUDE.md filled; AGENTS.md interceptor + Next 16 agent-rules block; README tree and troubleshooting name `proxy.ts`.

**Status:** `approved [C2]`.

---

## REQ-0017 — Free-tier chat models (C1.1a)

**As** site visitor **I want** the portfolio chatbot to use current no-card free-tier models **so that** chat still works after Groq Llama shutdown (2026-08-16) without billing OpenRouter paid IDs.

**Requirement:** Chain Gemini `2.5-flash` → `2.5-flash-lite` → OpenRouter `:free` IDs → Groq `gpt-oss-20b` / `qwen/qwen3.6-27b` / `gpt-oss-120b` → HF router gpt-oss → optional OpenAI. Skip remaining models of a provider on 429. No `gemini-2.5-pro`, no OpenRouter without `:free`, no Groq Llama.

**Verification:** TC-0016; lint/build; POST `/api/chat` streams.

**Artifacts:** `lib/ai.ts`, `.env.example`

**Status:** `approved [C1.1a]` — validated locally 2026-08-13 (`POST /api/chat` 200).
