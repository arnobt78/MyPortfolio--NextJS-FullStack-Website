# Risk Register (append-only)

| RISK-ID | Cycle | Category | Description | L | I | Severity | Mitigation | Owner | Status |
|---------|-------|----------|-------------|---|---|----------|------------|-------|--------|
| RISK-C1-001 | C1 | Technical | Next.js 16 deferred; security patches via 15.x only | Med | Med | Medium | Monitor Next releases; CR for C2 | Human | closed (C2 shipped Next 16.3) |
| RISK-C1-002 | C1 | Technical | Turbopack dev OTel version mismatch | Low | Low | Low | Accept; prod webpack build OK | Agent | accepted |
| RISK-C1-003 | C1 | Process | No automated smoke tests | Med | Med | Medium | REQ-0013 C2 | Human | open |
| RISK-C1-004 | C1 | Compliance | Gate 2 conditional without Red Team | Low | Med | Medium | Manual smoke documented in TEST_SPEC | Human | mitigated |
| RISK-C1-005 | C1 | Security | SMTP injection (nodemailer) | Low | Med | Low | Upgraded to nodemailer 8.0.7 | Agent | closed |
| RISK-C1-006 | C1.1 | Technical | `proxy.ts` likely not loaded by Next 15.5.18; layout canonical/lang headers may never set | High | High | Critical | Restore `middleware.ts` (REQ-0014) or prove production HTML sets headers | Human | closed (C2 Next 16 loads `proxy.ts`) |
| RISK-C1-007 | C1.1 | Process | CLAUDE.md gitignored; AGENTS.md untracked; docs/ gitignored | Med | Low | Low | REQ-0016; keep protocol in git via `.agile-v/` | Agent | mitigated (C2 docs aligned; CLAUDE still gitignored) |
| RISK-C1-008 | C1.1 | Security | No `.env.example`; agents may probe real `.env` | Med | Med | Medium | REQ-0015 placeholders only; do not commit secrets | Human | closed (.env.example shipped) |
