# Decision Log (append-only)

<!-- Cycle-tagged entries. Never overwrite. -->

| Timestamp | Agent | Decision | Rationale | Linked REQ |
|-----------|-------|----------|-----------|------------|
| 2026-02-17 | Human+Agent | Validate GSC canonical fix | Google email confirmed validation passed | REQ-0001 |
| 2026-02-27 | Agent | Ignore Sentry `window.solana` TypeError | Extension script, not app code | REQ-0002 |
| 2026-03-14 | Agent | suppressHydrationWarning on Privacy lastUpdated | Server/client date string mismatch | REQ-0003 |
| 2026-05-14 | Agent | Photo: shared ring box + circular clip + object-cover | Different image aspect ratios vs `/photo.png` | REQ-0004 |
| 2026-05-14 | Agent | Fix debugLog → console.log (not self-call) | Dev-only stack overflow on /api/chat | REQ-0005 |
| 2026-05-14 | Agent | Stay on Next.js 15 / React 18 | Production stability; Next 16 = separate CR | REQ-0012 |
| 2026-05-14 | Agent | npm audit fix + nodemailer 8 + postcss `$postcss` override | 0 vulnerabilities without Next major downgrade | REQ-0006, REQ-0010 |
| 2026-05-14 | Agent | Add lib/logger.ts; wire captureApiError | Prod errors → Sentry; dev → console | REQ-0007, REQ-0009 |
| 2026-05-14 | Agent | Remove hydration from Sentry ignoreErrors | Want future hydration issues reported | REQ-0009 |
| 2026-05-14 | Agent | Accept Turbopack import-in-the-middle dev warnings | Prod build clean; nested OTel 2.0.6 vs 3.0.1 | REQ-0008 |
| 2026-05-14 | Human | Deploy to Vercel production | lint/build/audit PASS; manual smoke OK | REQ-0001–0010 |
| 2026-05-14 | Agent | Bootstrap .agile-v C1 traceability | User-requested Agile V living state | — |
| 2026-06-01 | Agent | lib/sentry-extension-noise + denyUrls/beforeSend | Filter content-injected & bot SyntaxError noise; keep hydration reported | REQ-0009 |
| 2026-08-13 | Agent | Treat C1 as still living; open C1.1 plan, not C2 | No new product feature in the session prompt; C2 is Next 16 + tests | REQ-0012, REQ-0013 |
| 2026-08-13 | Agent | Propose REQ-0014 restore `middleware.ts` on Next 15.5.18 | Next 16 `proxy.ts` convention is not present in installed Next 15.5 dist; layout depends on those headers | REQ-0001, REQ-0014 |
| 2026-08-13 | Agent | Halt synthesis until Gate 1 token `av-c1.1-20260813-g1` | HITL: Human-Decision on C1.1 scope | REQ-0014–0016 |
| 2026-08-13 | Human | Approve C1.1a LLM models + `.env.example` only | Groq Llama EOL 2026-08-16; defer Next 16 and middleware | REQ-0015, REQ-0017 |
| 2026-08-13 | Agent | OpenRouter slug `qwen/qwen3-coder:free` not `qwen3-coder-480b:free` | Live OpenRouter catalog | REQ-0017 |
| 2026-08-13 | Human | Approve C2 Next 16.3 + React 19.2; keep `proxy.ts` | Official upgrade; REQ-0014 superseded | REQ-0012, REQ-0014, REQ-0016 |
| 2026-08-13 | Agent | Official `upgrade latest` failed on npm 12 `--field`; pin stack + individual transforms | Codemod CLI incompatible with npm 12 | REQ-0012 |
| 2026-08-13 | Agent | Collapse Sentry `withSentryConfig` to 2-arg; Turbopack default build | Next 16 default bundler; Sentry 10 types are 2-arg | REQ-0012 |
| 2026-08-13 | Agent | Nodemailer 9.0.5 for `npm audit` 0 | Remaining vuln required a related major; TLS-default only | REQ-0006, REQ-0012 |
| 2026-08-13 | Agent | Leave `next/font/google`; do not add `/public/fonts` | Next self-hosts at build; no runtime Google Fonts on the site | REQ-0016 |
| 2026-08-13 | Agent | Skip optional env: OPENAI, BING, SITE_URL, SENTRY_RELEASE, legacy aliases | Code already falls back; Vercel names match | REQ-0015 |
| 2026-08-13 | Agent | Do not add Vite/Python/SHA/auth/Zod APIs/densify CRUD | Public portfolio; chat invalidation already in `use-chat.ts` | — |
| 2026-08-13 | Agent | Leave unused `resend` (and unused direct AI/email pkgs) in package.json | Drive-by uninstall not in C2 Gate 1; lockfile risk | REQ-0012 |
