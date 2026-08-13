# Change Log (append-only)

| CR-ID | Cycle | Affected REQ | Change | Rationale | Impact | Requested by | Approved |
|-------|-------|--------------|--------|-----------|--------|--------------|----------|
| — | C1 | — | Initial bootstrap; no formal CRs | Maintenance work predates Agile V trace | ART-0001–0010 | Human | Gate 1 WAIVED |
| CR-0001 | C1.1 | REQ-0001, REQ-0014 | Restore Next 15 `middleware.ts`; stop relying on `proxy.ts` while on 15.5.x | Next 16 proxy convention is unused on installed Next 15; layout canonical/i18n headers at risk | ART-0001, new ART-0014; TC-0012–0014 | Agent (session 2026-08-13) | Superseded by CR-0004 / C2 |
| CR-0002 | C1.1 | REQ-0015, REQ-0016 | Add `.env.example` + align CLAUDE/AGENTS/README with code | Resume/reconcile session; missing agent memory in git | docs/ops artifacts | Agent (session 2026-08-13) | Partial — REQ-0015 approved C1.1a; REQ-0016 completed in C2 |
| CR-0003 | C1.1a | REQ-0017 | Replace Llama / gpt-4o-mini / Gemini Pro with current free-tier IDs | Groq Llama shutdown 2026-08-16; OpenRouter :free rule | ART-0017.1, ART-0005.2 | Human (plan attach) | Approved |
| CR-0004 | C2 | REQ-0012, REQ-0014, REQ-0016 | Next 16.3 + React 19.2; keep `proxy.ts`; ESLint 9; docs | Official upgrade; REQ-0014 superseded | ART-0012.*, ART-0016.1 | Human (plan attach) | Approved |

<!-- Future CRs use format:
CR-0001 | C2 | REQ-0012 | Next.js 16 upgrade | Platform EOL planning | Full regression | Human | Pending
-->
