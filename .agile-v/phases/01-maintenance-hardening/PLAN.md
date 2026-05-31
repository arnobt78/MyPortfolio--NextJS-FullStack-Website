# Phase 01 — Maintenance & Hardening (C1)

## PLAN

**Objective:** Stabilize production portfolio without major framework migration.

**In scope REQs:** REQ-0001 through REQ-0010  
**Out of scope:** REQ-0012 (Next 16), REQ-0013 (automation)

**Waves:**

| Wave | Tasks | REQs |
|------|-------|------|
| W1 | SEO/canonical (already done pre-C1) | REQ-0001 |
| W2 | Sentry + hydration + chat dev fix | REQ-0002,0003,0005 |
| W3 | Deps audit + logger centralization | REQ-0006,0007,0009,0010 |
| W4 | Photo UX + deploy | REQ-0004 |
| W5 | Agile V bootstrap | — |

## SUMMARY

- All W2–W4 code merged; Vercel production Ready (5192e3e).
- Gate 2: CONDITIONAL_PASS (manual evidence).
- Open: REQ-0011 GSC `/services`; FLAGS in VALIDATION_SUMMARY.

## CONTEXT

- **Stack:** Next.js 15.5.x, React 18, Vercel, Upstash Redis, Sentry, nodemailer 8.
- **Constraints:** No Next 16; no breaking email/chat; 0 npm audit vulnerabilities.
- **Key paths:** `lib/ai.ts`, `lib/logger.ts`, `instrumentation-client.ts`, `components/Photo.tsx`.
