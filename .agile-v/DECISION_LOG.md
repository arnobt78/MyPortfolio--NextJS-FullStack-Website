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
