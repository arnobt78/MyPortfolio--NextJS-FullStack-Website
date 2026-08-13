# Security Policy

Report vulnerabilities **privately**. Do not open a public GitHub issue for security bugs.

## Contact

Email: [contact@arnobmahmud.com](mailto:contact@arnobmahmud.com)

Please include:

- Affected URL or API route (for example `/api/chat`, `/api/send-email`)
- Steps to reproduce
- Impact (data exposure, injection, denial of service)
- Your preferred contact for follow-up

## Scope

This is a public portfolio (no user accounts). In scope: the production site [https://www.arnobmahmud.com](https://www.arnobmahmud.com), Next.js route handlers, and the chatbot/email APIs.

Out of scope: third-party browser extensions, Vercel platform issues, and keys you find in your own `.env.local` (never commit those).

## Practice

- Do not test against production with high-volume traffic.
- Do not request or share live API keys.
- Use `.env.example` as the template for local setup.

We will acknowledge reports and work on a fix as soon as practical.
