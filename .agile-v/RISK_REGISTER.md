# Risk Register (append-only)

| RISK-ID | Cycle | Category | Description | L | I | Severity | Mitigation | Owner | Status |
|---------|-------|----------|-------------|---|---|----------|------------|-------|--------|
| RISK-C1-001 | C1 | Technical | Next.js 16 deferred; security patches via 15.x only | Med | Med | Medium | Monitor Next releases; CR for C2 | Human | open |
| RISK-C1-002 | C1 | Technical | Turbopack dev OTel version mismatch | Low | Low | Low | Accept; prod webpack build OK | Agent | accepted |
| RISK-C1-003 | C1 | Process | No automated smoke tests | Med | Med | Medium | REQ-0013 C2 | Human | open |
| RISK-C1-004 | C1 | Compliance | Gate 2 conditional without Red Team | Low | Med | Medium | Manual smoke documented in TEST_SPEC | Human | mitigated |
| RISK-C1-005 | C1 | Security | SMTP injection (nodemailer) | Low | Med | Low | Upgraded to nodemailer 8.0.7 | Agent | closed |
