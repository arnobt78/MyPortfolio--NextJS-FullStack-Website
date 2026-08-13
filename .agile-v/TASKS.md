# Tasks — C2

<!-- Revision: C2 | 2026-08-13 | Gate 1 approved via plan -->

| TASK-ID | REQ | Priority | Title | Status |
|---------|-----|----------|-------|--------|
| TASK-0001 | REQ-0014 | P0 | Restore Next 15 `middleware.ts` | cancelled (superseded by C2) |
| TASK-0002 | REQ-0014 | P0 | Verify `/services` canonical URLs | done via C2 proxy smoke |
| TASK-0003 | REQ-0015 | P1 | Add `.env.example` with placeholder keys only | done (C1.1a) |
| TASK-0004 | REQ-0016 | P1 | Fill `CLAUDE.md`; AGENTS.md; README `proxy.ts` | done (C2 + README rewrite) |
| TASK-0005 | REQ-0016 | P2 | Commit LICENSE SPDX line if Gate 1 includes it | done (`a561d80`) |
| TASK-0006 | REQ-0002 / 0009 | P2 | Add `lib/sentry-extension-noise.ts` to BUILD_MANIFEST | done (ART-0002.2) |
| TASK-0007 | REQ-0011 | P2 | After C2 deploy, re-check GSC `/services` indexing | proposed |
| TASK-0008 | REQ-0013 | C2+ | Automated smoke (chat, email, nav) | deferred |
| TASK-0009 | REQ-0012 | C2 | Next.js 16.3 + React 19.2; keep `proxy.ts` | done |

## Out of scope (C2)

- Restoring `middleware.ts`
- LLM model chain (C1.1a shipped)
- Auth / encryption / new Zod APIs
- Playwright/API automation (`REQ-0013`)
- Unrelated Framer/Radix/AI SDK majors
