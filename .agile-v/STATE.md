# Agile V — Living State

<!-- Revision: C2 | Last updated: 2026-08-13 -->

| Field | Value |
|-------|-------|
| **Cycle** | **C2** (Next.js 16.3 + React 19.2) |
| **Project** | portfolio-arnob-new (www.arnobmahmud.com) |
| **Current stage** | Stage 3–4 — Synthesis / Prove (C2 docs/SEO) |
| **SCOPE-V phase** | Prove |
| **Status** | `C2_VALIDATED` |
| **HEAD (pre-docs)** | `a561d80` (license) · C2 code `a1cf097` |
| **Gate 1 (C2)** | APPROVED — plan attach (Next 16.3, keep `proxy.ts`, compat-only deps) |
| **Gate 2** | NOT REQUESTED — no production deploy |

## Active workstream

C2 validated. This pass: README compact, `SECURITY.md`, route metadata/comments. No Vite/Python/auth/SHA/Zod APIs.

## Completed this session

- Next 16.3 / React 19.2 / ESLint 9 / `proxy.ts` kept
- `allowScripts` (`@sentry/cli`, `unrs-resolver`, `fsevents`)
- README rewrite (badges 16.3 / 19.2.8); `SECURITY.md`
- SEO: authors url, category, icons, home OG/Twitter image, Person JSON-LD email
- File-header comments on routes/API/Header/HomePage/redis
- LICENSE SPDX (`a561d80`)
- Audit 2026-08-13: lint/tsc/audit/build PASS; unused `resend` left in package.json (out of C2 scope)

## Remaining

- REQ-0011 GSC `/services` (after production deploy)
- REQ-0013 automated smoke tests
- Production deploy only if human requests it
- Optional later: drop unused `resend` / unused direct `zod` `@ai-sdk/google` `@huggingface/inference` `@react-email/render`

## Resume instructions

1. Read this file + `CHECKPOINTS.md`.
2. C2 validated locally. Do not restore `middleware.ts`. Do not deploy unless asked.
3. Optional env keys (OpenAI, Bing, SITE_URL, SENTRY_RELEASE, legacy aliases): skip.
