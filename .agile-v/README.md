# Agile V — portfolio-arnob-new

**Cycle:** C2 (Next.js 16.3 + React 19.2), living C1 production  
**Standard:** Agile V 1.4  
**Site:** https://www.arnobmahmud.com

## Quick start

1. Read `STATE.md` — current stage and gates  
2. Read `REQUIREMENTS.md` — REQ-0001 … REQ-0017  
3. Before deploy → `VALIDATION_SUMMARY.md` + `EVAL_RESULTS.md`  
4. Agent roster → `SKILLS_INDEX.md` (24 skills)

## Living files

| File | Purpose |
|------|---------|
| STATE.md | Current phase, gates, resume |
| REQUIREMENTS.md | REQ-XXXX traceability |
| DECISION_LOG.md | Append-only decisions |
| VALIDATION_SUMMARY.md | Prove/Verify summary |
| BUILD_MANIFEST.md | ART-XXXX → code paths |
| TEST_SPEC.md | TC-XXXX manual/auto |
| EVAL_RESULTS.md | Gate 2 eval gate status |
| APPROVALS.md | Human gate records |
| RISK_REGISTER.md | Risks |
| POLICY.yaml | Policy-as-code |
| config.json | Project metadata |
| SKILLS_INDEX.md | 24 Agile V skills |

## REQ trace map

```
REQ-0001 SEO/canonical ──► next.config, layout, proxy.ts
REQ-0012 Next 16       ──► package.json, eslint.config.mjs, next.config.mjs
REQ-0017 Chat free-tier ──► lib/ai.ts
REQ-0007 Logger          ──► lib/logger.ts + API routes
```

## Open items

- REQ-0011 — GSC `/services` indexing (pending; re-check after C2 deploy)
- REQ-0013 — Automated smoke tests (deferred)
- Production deploy only if human requests it
