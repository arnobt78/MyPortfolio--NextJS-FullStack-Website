# Requirements — Cycle C1

<!-- Revision: C1 | Project: portfolio-arnob-new -->

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
| REQ-0012 | deferred [C2] | Next.js 16 upgrade with full regression | — | CR required before synthesis |
| REQ-0013 | deferred [C2] | Automated smoke tests (chat, email, nav) | REQ-0005 | TEST_SPEC TC-0001+ |

---

## REQ-0001 — Canonical URL & GSC

**As** site owner **I want** a single canonical host (`https://www.arnobmahmud.com`) **so that** Google does not split indexing across vercel.app / bare domain.

**Acceptance:** 308 redirects; `<link rel="canonical">`; GSC “Duplicate, Google chose different canonical” validation passed (0 pages).

**Artifacts:** `next.config.mjs`, `middleware.ts`, `app/layout.tsx`, `DUPLICATE-CANONICAL-FIX.md`

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
