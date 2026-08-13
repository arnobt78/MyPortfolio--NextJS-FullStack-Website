# Phase 02 — C1.1 Reconcile & Middleware Fix (PLAN)

**Status:** DRAFT — Human Gate 1 required  
**Cycle:** C1.1  
**Checkpoint:** `INT-C111-001` / `resume_token=av-c1.1-20260813-g1`  
**Re-entry:** Stage 1 (new REQs) then Stage 3 for the bug fix only

## Objective

Close documentation drift from C1 and restore the Next.js 15 request interceptor so `app/layout.tsx` receives `x-pathname` and `x-initial-language`.

## Why this is the next increment

1. C1 is `ACCEPTED_CONDITIONAL` with open `REQ-0011` / `REQ-0012` / `REQ-0013`.
2. HEAD moved past evidence commit `5192e3e` without a new eval run.
3. **Suspected defect (not yet proven in production HTML):** `proxy.ts` is a Next.js **16** file convention. Installed Next is **15.5.18**; its build graph looks for `middleware.ts`. `layout.tsx` falls back to `pathname = "/"` when `x-pathname` is missing, so the explicit `<link rel="canonical">` in the root layout may always point at the homepage. That would conflict with per-page `metadata.alternates.canonical` and can block indexing (`REQ-0011`).

## In scope (proposed)

| REQ | Work |
|-----|------|
| REQ-0014 | Rename/restore `proxy.ts` → `middleware.ts` with `export function middleware`. Same matcher and header logic. Do **not** upgrade Next. |
| REQ-0015 | Add `.env.example` with placeholder names matching real keys (no secret values). |
| REQ-0016 | Align agent/README memory with code; track `AGENTS.md`; keep `CLAUDE.md` local if gitignore stays. |

Optional in same Gate 1: commit LICENSE SPDX (`TASK-0005`).

## Out of scope

- Next.js 16 (`REQ-0012`) — after 16, `proxy.ts` would be correct; doing that now mixes a major upgrade with a hotfix
- Automated smoke suite (`REQ-0013`)
- Changing Gemini/Groq/OpenRouter model IDs
- Rewriting README beyond interceptor filename facts
- Any `.env` / `.env.local` contents in git or docs

## Implementation steps (after approval only)

1. Copy `proxy.ts` logic to `middleware.ts`; `export function middleware`; delete `proxy.ts` (or leave a one-line re-export only if Next 15 ignores it — prefer single file).
2. Confirm `app/layout.tsx` still reads the same header names.
3. Validate: lint, build, fetch `/`, `/services`, `/work` and inspect canonical + `html lang`.
4. Add `.env.example`.
5. Patch README tree (line ~241) `middleware.ts` description to match the restored file.
6. Update BUILD_MANIFEST / ATM / REQUIREMENTS artifacts for REQ-0001 and REQ-0014.
7. Record validation; do not deploy until Gate 2 for C1.1.

## Verification (proposed TCs)

| TC | Check |
|----|--------|
| TC-0012 | `middleware.ts` exists; `proxy.ts` absent; Next build mentions middleware |
| TC-0013 | GET `/services` canonical is `https://www.arnobmahmud.com/services` (not homepage only) |
| TC-0014 | Language cookie `selectedLanguage=de` yields `html lang="de"` on first paint |
| TC-0015 | `.env.example` present; `git grep` finds no real secrets in that file |
| TC-0001–0009 | Regression smoke (manual) after W1 |

## Risks

| ID | If unaddressed |
|----|----------------|
| RISK-C1-006 | Layout canonical stuck on `/` → GSC duplicate/canonical confusion |
| RISK-C1-001 vs 0014 | Naming the file `proxy.ts` now would only be correct after Next 16 |

## Halt / ask

If you intended a **different** request than C1.1 reconcile (e.g. start C2 Next 16, or only LICENSE), reject this plan and name the scope. No synthesis until then.
