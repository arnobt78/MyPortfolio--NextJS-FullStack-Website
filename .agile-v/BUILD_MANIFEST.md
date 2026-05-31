# Build Manifest — Cycle C1

<!-- ART-XXXX maps to REQ-XXXX -->

| ART-ID | REQ | Path / artifact | Status |
|--------|-----|-----------------|--------|
| ART-0001.1 | REQ-0001 | `next.config.mjs`, `middleware.ts`, `app/layout.tsx` | deployed |
| ART-0002.1 | REQ-0002 | `instrumentation-client.ts` | deployed |
| ART-0003.1 | REQ-0003 | `components/pages/PrivacyPage.tsx`, `TermsPage.tsx` | deployed |
| ART-0004.1 | REQ-0004 | `components/Photo.tsx` | deployed |
| ART-0005.1 | REQ-0005 | `lib/ai.ts` (debugLog fix) | deployed |
| ART-0006.1 | REQ-0006 | `package.json`, `package-lock.json`, postcss override | deployed |
| ART-0007.1 | REQ-0007 | `lib/logger.ts` | deployed |
| ART-0007.2 | REQ-0007 | API routes + libs using `captureApiError` | deployed |
| ART-0008.1 | REQ-0008 | `import-in-the-middle@3.0.1` direct dep | deployed |
| ART-0009.1 | REQ-0009 | Sentry + logger integration | deployed |
| ART-0010.1 | REQ-0010 | `next.config.mjs` postcss comment | deployed |
| ART-DOC-001 | REQ-0001 | `DUPLICATE-CANONICAL-FIX.md` | living doc |

## Dependency snapshot (C1)

- next: ^15.5.18
- react: ^18.3.1
- nodemailer: ^8.0.7
- @sentry/nextjs: ^10.53.1
- import-in-the-middle: 3.0.1
