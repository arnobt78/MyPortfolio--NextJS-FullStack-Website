# Human Gate Approvals (append-only)

| GATE-ID | Type | Cycle | Scope | Decision | Conditions | Approver | Role | Timestamp | Signature | Evidence |
|---------|------|-------|-------|----------|------------|----------|------|-----------|-----------|----------|
| GATE-C1-001 | Gate 1 | C1 | Maintenance REQs backfilled | WAIVED | Informal maintenance; REQs retroactive | Arnob Mahmud | Project owner | 2026-05-14T00:00:00Z | Git commit | bootstrap |
| GATE-C1-002 | Gate 2 | C1 | C1 release to production | CONDITIONAL | Manual smoke only; REQ-0013 deferred | Arnob Mahmud | Project owner | 2026-05-14T00:00:00Z | Vercel deploy | 5192e3e |
| GATE-C2-001 | Gate 1 | C2 | Next 16.3 + React 19.2; keep proxy.ts; compat-only deps | Approved | No restore middleware.ts; no drive-by majors; no deploy unless asked | Arnob Mahmud | Project owner | 2026-08-13T15:42:00Z | Cursor plan attach | REQ-0012, REQ-0016 |
