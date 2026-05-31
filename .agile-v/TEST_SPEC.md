# Test Specification — Cycle C1

<!-- Test Designer delta for C1. Formal automation deferred REQ-0013. -->

| TC-ID | Cycle | REQ | Type | Description | Status |
|-------|-------|-----|------|-------------|--------|
| TC-0001 | C1 | REQ-0005 | manual | POST `/api/chat` returns 200, streams response | PASS |
| TC-0002 | C1 | REQ-0005 | manual | Dev: no stack overflow from `lib/ai.ts` | PASS |
| TC-0003 | C1 | REQ-0006 | cli | `npm audit` reports 0 vulnerabilities | PASS |
| TC-0004 | C1 | REQ-0010 | cli | `npm run lint` exit 0 | PASS |
| TC-0005 | C1 | REQ-0010 | cli | `npm run build` exit 0, 18 routes | PASS |
| TC-0006 | C1 | REQ-0007 | manual | Contact POST `/api/send-email` 200 | PASS |
| TC-0007 | C1 | REQ-0007 | manual | Contact POST `/api/send-auto-reply` 200 | PASS |
| TC-0008 | C1 | REQ-0001 | manual | Nav all main routes 200 | PASS |
| TC-0009 | C1 | REQ-0004 | manual | Hero photo clipped inside ring (visual) | PASS |
| TC-0010 | C1 | REQ-0011 | external | GSC `/services` indexed | PENDING |
| TC-0011 | C1 | REQ-0013 | auto | Playwright/API smoke suite | NOT_IMPLEMENTED |

## Regression baseline (C2+)

Re-run TC-0001–TC-0009 on every production deploy until TC-0011 exists.
