# Architecture Trace Matrix (ATM) — C1

| REQ | Component | Interface | Data store |
|-----|-----------|-----------|------------|
| REQ-0001 | middleware, layout | HTTP 308, canonical link | — |
| REQ-0005 | `/api/chat`, `lib/ai`, `lib/rag` | SSE stream, Edge runtime | Upstash Redis sessions |
| REQ-0006 | package.json | npm overrides | — |
| REQ-0007 | lib/logger, Sentry | captureApiError | Sentry project portfolio-arnob |
| REQ-0007 | send-email, feedback routes | SMTP nodemailer | — |
| REQ-0009 | instrumentation-client | ignoreErrors, replay | Sentry |
| REQ-0004 | Photo, SafeImage | Next/Image fill | public/ assets |
