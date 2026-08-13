# Build Manifest — Cycle C1

<!-- ART-XXXX maps to REQ-XXXX -->

| ART-ID | REQ | Path / artifact | Status |
|--------|-----|-----------------|--------|
| ART-0001.1 | REQ-0001 | `next.config.mjs`, `app/layout.tsx` | deployed |
| ART-0001.2 | REQ-0001 / 0012 | `proxy.ts` | **C2** — Next 16 loads this file (`export function proxy`) |
| ART-0002.1 | REQ-0002 | `instrumentation-client.ts` | deployed |
| ART-0002.2 | REQ-0002 / 0009 | `lib/sentry-extension-noise.ts` | deployed (`8218d7e`, not in original C1 manifest) |
| ART-0003.1 | REQ-0003 | `components/pages/PrivacyPage.tsx`, `TermsPage.tsx` | deployed |
| ART-0004.1 | REQ-0004 | `components/Photo.tsx` | deployed |
| ART-0005.1 | REQ-0005 | `lib/ai.ts` (debugLog fix) | deployed |
| ART-0005.2 | REQ-0017 | `lib/ai.ts` free-tier IDs + 429 skip-provider | implemented |
| ART-0006.1 | REQ-0006 | `package.json`, `package-lock.json`, postcss override | deployed |
| ART-0007.1 | REQ-0007 | `lib/logger.ts` | deployed |
| ART-0007.2 | REQ-0007 | API routes + libs using `captureApiError` | deployed |
| ART-0008.1 | REQ-0008 | `import-in-the-middle@3.0.1` direct dep | deployed |
| ART-0009.1 | REQ-0009 | Sentry + logger integration | deployed |
| ART-0010.1 | REQ-0010 | `next.config.mjs` postcss comment | deployed |
| ART-DOC-001 | REQ-0001 | `DUPLICATE-CANONICAL-FIX.md` | living doc |

## Dependency snapshot (C2)

- next: ^16.3.0
- react / react-dom: ^19.2.8
- eslint: ^9.39.5
- eslint-config-next: ^16.3.0
- nodemailer: ^9.0.5
- @sentry/nextjs: ^10.70.0
- import-in-the-middle: 3.0.1

## C2 artifacts

| ART-ID | REQ | Path | Status |
|--------|-----|------|--------|
| ART-0012.1 | REQ-0012 | `package.json`, `package-lock.json` | implemented |
| ART-0012.2 | REQ-0012 | `eslint.config.mjs` (ESLint 9; `.eslintrc.json` removed) | implemented |
| ART-0012.3 | REQ-0012 | `next.config.mjs` 2-arg Sentry + Turbopack default | implemented |
| ART-0014.1 | REQ-0014 | `middleware.ts` restore | **superseded** — keep `proxy.ts` |
| ART-0015.1 | REQ-0015 | `.env.example` | implemented |
| ART-0016.1 | REQ-0016 | `CLAUDE.md` / `AGENTS.md` / README interceptor note | implemented |
| ART-0016.2 | REQ-0016 | Compact README + `SECURITY.md` + SEO metadata | implemented |
| ART-0017.1 | REQ-0017 | `lib/ai.ts` free-tier model chains | implemented |
