---
eval_run_id: ER-C1-20260514-001
eval_timestamp: "2026-05-14T12:00:00Z"
policy_version_ref: "1.0.0"
eval_gate_status: CONDITIONAL_PASS
eval_gate_rationale: "Manual + CLI evidence PASS; automated suite REQ-0013 deferred"
thresholds:
  npm_audit_max: 0
  lint_exit: 0
  build_exit: 0
---

# Eval Results — Cycle C1

| Suite | REQ | Result | Evidence |
|-------|-----|--------|----------|
| npm_audit | REQ-0006 | PASS | 0 vulnerabilities |
| eslint | REQ-0010 | PASS | exit 0 |
| next_build | REQ-0010 | PASS | 18 routes |
| chat_api_manual | REQ-0005 | PASS | POST 200 |
| email_api_manual | REQ-0007 | PASS | POST 200 |
| gsc_services | REQ-0011 | SKIP | external pending |
| playwright_smoke | REQ-0013 | NOT_RUN | deferred |
| c2_lint | REQ-0012 | PASS | 2026-08-13 eslint 9 exit 0 |
| c2_tsc | REQ-0012 | PASS | npx tsc --noEmit exit 0 |
| c2_audit | REQ-0006 | PASS | npm audit 0 |
| c2_build | REQ-0012 | PASS | Next 16.3.0 Turbopack; Proxy listed |
| c2_chat | REQ-0005 | PASS | POST /api/chat 200 SSE [DONE] |
| c2_services | REQ-0012 | PASS | GET /services 200 + canonical /services |
| c2_lang_cookie | REQ-0012 | PASS | selectedLanguage=de → html lang=de |
| c2_docs_lint | REQ-0016 | PASS | 2026-08-13 SEO/README lint exit 0 |
| c2_docs_tsc | REQ-0016 | PASS | 2026-08-13 tsc --noEmit exit 0 |
| c2_docs_audit | REQ-0006 | PASS | 2026-08-13 npm audit 0 |
| c2_docs_build | REQ-0016 | PASS | 2026-08-13 Next 16.3.0 Turbopack; Proxy listed |

## Gate 2 recommendation

**CONDITIONAL_PASS** — Local C2 upgrade validated. Do not deploy until human requests it. REQ-0013 still deferred.

## C2 note

`eval_run_id` ER-C2-20260813-001 — lint/tsc/audit/build/chat/services/lang PASS. Not a Gate 2 promotion.
