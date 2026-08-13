# Phase 02 — Context (C1.1)

## Links

- State: `../../STATE.md`
- Requirements: `../../REQUIREMENTS.md`
- Tasks: `../../TASKS.md`
- Plan: `./PLAN.md`
- Checkpoint: `../../CHECKPOINTS.md` → `INT-C111-001`

## Stack (verified 2026-08-13)

- Next.js 15.5.18, React 18.3.1, TypeScript 5.9.3
- Vercel production: https://www.arnobmahmud.com
- Request interceptor file in repo: `proxy.ts` (suspect unused on Next 15)
- Consumers: `app/layout.tsx` (`x-initial-language`, `x-pathname`)
- Canonical redirects (still valid without middleware): `next.config.mjs` host 308s

## Constraints

- `POLICY.yaml`: `allow_major_next_upgrade: false` until CR + C2
- Do not commit `.env` / `.env.local`
- `docs/` is gitignored; do not rely on git for protocol copies

## Independent verification still required

Production HTML for `/services` canonical tags (Red Team / human). This session did not fetch production.
