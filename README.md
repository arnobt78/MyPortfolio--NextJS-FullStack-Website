# Modern Portfolio Website - Next.js, TypeScript, TailwindCSS, Framer Motion, Shadcn UI, i18next, FullStack Project (My Personal Official Portfolio)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-blue)](https://www.framer.com/motion/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-1.2.12-blue)](https://ui.shadcn.com/)
[![i18next](https://img.shields.io/badge/i18next-25.10.10-blue)](https://www.i18next.com/)
[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/launch/arnobt78/Portfolio--NextJS-FullStack)

A production portfolio at **[https://www.arnobmahmud.com](https://www.arnobmahmud.com/)** built with **Next.js 16.3** (App Router), **React 19.2**, TypeScript, TailwindCSS, and Framer Motion. It is a public site (no login): server-rendered pages, a contact form, an AI FAQ chatbot, English/German i18n, and SEO metadata.

- **Live Demo:** [https://www.arnobmahmud.com/](https://www.arnobmahmud.com/)
- **Security:** private reports → [SECURITY.md](./SECURITY.md) · [contact@arnobmahmud.com](mailto:contact@arnobmahmud.com)
- **Author:** [Arnob Mahmud](https://www.arnobmahmud.com) · [GitHub @arnobt78](https://github.com/arnobt78) · [LinkedIn @arnob-mahmud-05839655](https://www.linkedin.com/in/arnob-mahmud-05839655/)

![Screenshot 2025-10-23 at 13 47 13](https://github.com/user-attachments/assets/bf6b85ce-a1bb-437a-9f2e-c338c6ac41c7)
![Screenshot 2025-10-23 at 13 47 33](https://github.com/user-attachments/assets/a755f24a-bb4e-4728-a411-a0bf3056bce8)
![Screenshot 2025-10-23 at 13 48 00](https://github.com/user-attachments/assets/f310f0ec-e9cb-421f-affa-8de39d180a8a)
![Screenshot 2025-10-23 at 13 49 36](https://github.com/user-attachments/assets/ae0fa79a-59b3-4377-afbd-75671d8382f8)
![Screenshot 2025-10-23 at 13 49 49](https://github.com/user-attachments/assets/b59d6039-72ef-4da9-92a3-9de1286446bc)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Keywords](#keywords)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Routes](#routes)
- [API endpoints](#api-endpoints)
- [Components you can reuse](#components-you-can-reuse)
- [Hooks and context](#hooks-and-context)
- [i18n](#i18n)
- [Chatbot](#chatbot)
- [SEO and metadata](#seo-and-metadata)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository is the source for Arnob Mahmud’s personal site. **Next.js App Router** keeps each URL as a small **server** `page.tsx` that only exports `metadata` and renders a **client** page component. That split matters: Google sees titles and canonicals from the server; buttons, forms, and the chatbot stay in the browser.

You can clone it to learn App Router, i18n cookies, Edge SSE, or SMTP mail — or fork it as a starting point for your own portfolio. Optional APIs (chat, email, Redis, Sentry) are off unless you add keys. The UI still runs without them.

---

## Features

- **App Router pages:** Home, About, Resume, Work, Services, FAQ, Contact, Privacy, Terms
- **i18n:** English and German via `i18next` + cookie `selectedLanguage`
- **Request interceptor:** [`proxy.ts`](proxy.ts) sets `x-initial-language` and `x-pathname` (Next.js 16 name; do not restore `middleware.ts`)
- **Contact form:** SMTP through Nodemailer (`/api/send-email`, `/api/send-auto-reply`)
- **AI chatbot:** Edge stream `/api/chat`, Redis sessions, FAQ RAG
- **Analytics:** GA4 + Vercel Analytics
- **Observability:** Sentry (`tunnelRoute: /monitoring`)
- **SEO:** `metadata` on every route, Open Graph image `/img-8-1200.png`, JSON-LD Person + LocalBusiness, `app/sitemap.ts`
- **Motion:** Framer Motion page + stair transitions
- **UI:** Tailwind + Radix/shadcn primitives

---

## Technology stack

| Layer          | What                                           | Why it is here                                |
| -------------- | ---------------------------------------------- | --------------------------------------------- |
| Next.js 16.3   | App Router, `proxy.ts`, Turbopack `next build` | File-based routes, metadata, Route Handlers   |
| React 19.2     | UI                                             | Client islands only where needed              |
| TypeScript 5.9 | Types                                          | `npx tsc --noEmit`                            |
| Tailwind 3.4   | Utility CSS                                    | Fast layout without a second CSS framework    |
| Framer Motion  | Animation                                      | Page enter/exit without full SPA router       |
| Radix / shadcn | Dialog, tabs, sheet                            | Accessible primitives                         |
| Nodemailer 9   | SMTP                                           | Contact + auto-reply (Node runtime, not Edge) |
| Upstash Redis  | Sessions + FAQ vectors                         | Chat history cookie `chatbot_session`         |
| Vercel AI SDK  | `streamText`                                   | Model fallback in `lib/ai.ts`                 |
| ESLint 9       | `eslint .`                                     | Flat config `eslint.config.mjs`               |

**Beginner note:** a **Server Component** (default in `app/`) can `await` data and set `metadata`. A **Client Component** (`"use client"`) can use `useState` and click handlers. This project never turns a whole route into a client file just because one section is interactive.

---

## Keywords

Full-Stack Software Engineer, Software Engineer Germany, Frankfurt, React, Next.js, Angular, Node.js, Python, .NET, REST APIs, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, CI/CD, portfolio, i18n, RAG chatbot.

Used in `app/layout.tsx` and per-page `metadata.keywords` so search engines see both the person and the tech.

---

## Project structure

```text
app/                    # Routes + API (App Router)
  layout.tsx            # Root metadata, lang, providers
  page.tsx              # Home
  about|resume|work|services|faq|contact|privacy|terms/page.tsx
  api/chat|history|send-email|send-auto-reply|feedback|seed/route.ts
  sitemap.ts
components/             # Header, Footer, pages/*, chatbot/*, ui/*
context/                # LanguageContext, widget-settings-context
hooks/                  # use-chat, useTypewriter, use-is-client, use-synced-storage
lib/                    # ai, rag, redis, translations, logger, faqs
proxy.ts                # Next 16 interceptor (language + pathname headers)
eslint.config.mjs       # ESLint 9 + eslint-config-next 16
.env.example            # Placeholder names only — copy to .env.local
SECURITY.md             # Private vulnerability reporting
```

---

## How it works

1. A request hits **`proxy.ts`** (Node). Cookie `selectedLanguage` or `Accept-Language` becomes header `x-initial-language`. Pathname becomes `x-pathname`.
2. **`app/layout.tsx`** `await headers()` and sets `<html lang>` plus the canonical `<link>`.
3. The matching **`app/.../page.tsx`** supplies SEO `metadata` and renders a page component from `components/pages/`.
4. Client trees (nav, forms, chat) hydrate. Language is also stored in `localStorage` / cookie so the toggle survives refresh.

Chat (optional keys): widget → `POST /api/chat` `{ message }` → rate limit → Redis session → `searchFAQ` → `getAIResponse` (Gemini → OpenRouter `:free` → Groq → Hugging Face → optional OpenAI) → SSE `data: { response }` then `data: [DONE]`.

Contact: `ContactPage` → axios `POST /api/send-email` then `/api/send-auto-reply`. Needs `EMAIL_USER` / `EMAIL_PASS`.

---

## Installation

**Need:** Node.js **20.9+** (Next 16 floor). npm is enough.

```bash
git clone https://github.com/arnobt78/Portfolio--NextJS-FullStack.git
cd Portfolio--NextJS-FullStack
npm install
cp .env.example .env.local   # optional — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site **runs without any env vars**. Chat, email, Redis, Sentry, and Search Console tags stay inactive until you fill `.env.local`.

---

## Environment variables

Template: [`.env.example`](.env.example). Copy to **`.env.local`** (gitignored). Never commit real keys. `.env` at the repo root is also gitignored.

| Name                                        | Required to run UI? | How to get it                                                                       |
| ------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| `GOOGLE_GEMINI_API_KEY`                     | No                  | [Google AI Studio](https://aistudio.google.com/)                                    |
| `OPENROUTER_API_KEY`                        | No                  | [OpenRouter](https://openrouter.ai/) — this app uses `:free` model IDs only         |
| `GROQ_API_KEY`                              | No                  | [Groq console](https://console.groq.com/)                                           |
| `HUGGING_FACE_API_KEY`                      | No                  | [Hugging Face](https://huggingface.co/settings/tokens)                              |
| `OPENAI_API_KEY`                            | No                  | Optional paid last resort                                                           |
| `UPSTASH_REDIS_URL` / `UPSTASH_REDIS_TOKEN` | No                  | [Upstash](https://upstash.com/) Redis                                               |
| `SESSION_TTL`                               | No                  | Seconds (default `2592000`)                                                         |
| `EMAIL_USER` / `EMAIL_PASS`                 | No                  | Gmail (or SMTP) + [App Password](https://support.google.com/accounts/answer/185833) |
| `FEEDBACK_EMAIL`                            | No                  | Inbox for chatbot feedback                                                          |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`             | No                  | GA4 `G-...`                                                                         |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`      | No                  | Search Console meta content                                                         |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`        | No                  | Bing Webmaster meta content                                                         |
| `NEXT_PUBLIC_SENTRY_DSN`                    | No                  | Sentry project DSN                                                                  |
| `SENTRY_ORG` / `SENTRY_PROJECT`             | No                  | Source maps on `next build`                                                         |

Legacy aliases still read by `lib/ai.ts`: `OpenRouter_API_KEY`, `Groq_Llama_API_KEY`, `Hugging_Face_Inference_API_KEY`.

On Vercel, add the same names in Project → Settings → Environment Variables (Production + Preview).

---

## Scripts

Already in `package.json`:

```json
{
  "dev": "next dev",
  "dev:clean": "rm -rf .next && next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint ."
}
```

```bash
npm run lint          # ESLint 9 flat config
npx tsc --noEmit      # types
npm run build         # Turbopack production build
npm run start         # serve `.next`
```

---

## Routes

| Path                | File                    | Role                                        |
| ------------------- | ----------------------- | ------------------------------------------- |
| `/`                 | `app/page.tsx`          | Hero, stats, photo                          |
| `/about`            | `app/about/page.tsx`    | Bio                                         |
| `/resume`           | `app/resume/page.tsx`   | Experience / education / skills (hash tabs) |
| `/work`             | `app/work/page.tsx`     | Project grid + Swiper                       |
| `/services`         | `app/services/page.tsx` | Offerings                                   |
| `/faq`              | `app/faq/page.tsx`      | FAQ accordion                               |
| `/contact`          | `app/contact/page.tsx`  | Form                                        |
| `/privacy` `/terms` | matching `page.tsx`     | Legal                                       |

Each `page.tsx` is a **server** file: export `metadata`, return `<SomePage />`. Put interactive UI in `components/pages/`.

Example (home):

```tsx
import type { Metadata } from "next";
import HomePage from "../components/pages/HomePage";

export const metadata: Metadata = {
  title:
    "Arnob Mahmud | Full-Stack Engineer | Web, API, SaaS, & Cloud Solutions",
  alternates: { canonical: "https://www.arnobmahmud.com/" },
};

export default function Home() {
  return <HomePage />;
}
```

---

## API endpoints

| Method | Path                   | Runtime | Body                   | Purpose               |
| ------ | ---------------------- | ------- | ---------------------- | --------------------- |
| POST   | `/api/chat`            | Edge    | `{ "message": "..." }` | SSE chatbot           |
| GET    | `/api/history`         | Edge    | cookie                 | Chat history          |
| POST   | `/api/send-email`      | Node    | contact fields         | Mail to you           |
| POST   | `/api/send-auto-reply` | Node    | contact fields         | Visitor thank-you     |
| POST   | `/api/feedback`        | Node    | rating / comment       | Chatbot feedback      |
| POST   | `/api/seed`            | Node    | —                      | Embed FAQs into Redis |

Chat smoke test (after `npm run build && npm run start` and a Gemini/OpenRouter key):

```bash
curl -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Say hi in one short sentence."}'
```

You should see `text/event-stream` and `data: [DONE]`.

---

## Components you can reuse

Copy the folder, keep the `"use client"` line, and pass props or wrap with the same context.

| Component          | Path                           | Reuse idea                                         |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| `Photo`            | `components/Photo.tsx`         | Circular crop + dashed ring                        |
| `Stats`            | `components/Stats.tsx`         | Count-up after hydration (`useIsClient`)           |
| `LanguageSelector` | `components/LanguageSelector/` | Cookie + `setLanguage`                             |
| `ChatbotWidget`    | `components/chatbot/`          | Needs `Providers` + Redis/AI keys for live answers |
| `SafeImage`        | `components/ui/SafeImage.tsx`  | Next/Image with fallback                           |
| UI kit             | `components/ui/*`              | shadcn Button, Dialog, Tabs, Sheet                 |

**Example:** use the button elsewhere:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline">Hire me</Button>;
```

`@/` maps to the repo root (`tsconfig.json` `paths`). In another Next app, copy `components/ui` + `lib/utils.ts` (`cn` = clsx + tailwind-merge).

---

## Hooks and context

- **`LanguageContext`** — `language`, `setLanguage`, `t(key)`. Server initial lang from `proxy` headers; client may prefer cookie.
- **`use-chat.ts`** — React Query `["chat-history"]`; `sendMessage` streams then **invalidates** history so the widget updates without a full page reload.
- **`useTypewriter`** — hero name animation.
- **`use-is-client` / `use-synced-storage`** — hydration-safe client flag and localStorage enums (theme, font size, widget position).

This is **not** a CRUD admin app. Static pages do not need global cache densify. Chat is the only live mutation path.

---

## i18n

Strings live in `lib/translations.ts` (`en` / `de`). `LanguageSelector` writes cookie `selectedLanguage`. `proxy.ts` reads it on the **next** request so `html lang` is correct on first paint.

Add a key in both language objects, then `t("nav.home")` in a client component.

---

## Chatbot

Widget: `components/chatbot/chatbot-widget.tsx`. FAQ text: `lib/faqs.ts`. After editing FAQs, call `POST /api/seed` so Redis vectors update.

Fallback order (see `lib/ai.ts`): Gemini Flash → OpenRouter free IDs → Groq OSS → Hugging Face gpt-oss → optional OpenAI.

---

## SEO and metadata

Root: `app/layout.tsx` — `metadataBase`, title, description, keywords, **authors** (Arnob Mahmud + <https://www.arnobmahmud.com>), creator, publisher, icons (`/favicon.ico`, `/img-8-1200.png`), Open Graph, Twitter card, JSON-LD (Person email `contact@arnobmahmud.com`).

Each route adds its own `title` / `canonical`. Do not drop per-page canonicals; `/services` indexing depends on them.

---

## Deployment

Vercel project **`my-portfolio`**. `next.config.mjs` 308-redirects `arnobmahmud.com` and `*.vercel.app` → `https://www.arnobmahmud.com`.

```bash
npm run build
# or: vercel --prod  (only with owner approval)
```

---

## Troubleshooting

- **Language stuck on English:** check cookie `selectedLanguage=de` and that `proxy.ts` exists (Next 16). There is no `middleware.ts`.
- **Chat 400 `Message required`:** body must be `{ "message": "..." }`, not an OpenAI-style `messages` array.
- **Email fails:** Node runtime routes need `EMAIL_USER` / `EMAIL_PASS`; Edge cannot run Nodemailer.
- **Lint:** `npm run lint` (ESLint 9). Config: `eslint.config.mjs`.

---

## Contributing

Fork, branch, PR. Keep App Router pages as Server Components. Do not restore `middleware.ts` on Next 16.

Report security issues privately — see [SECURITY.md](./SECURITY.md) (`contact@arnobmahmud.com`).

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).
