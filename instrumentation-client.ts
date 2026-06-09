/**
 * Next.js client instrumentation – Sentry init (runs in the browser).
 * Replaces sentry.client.config.ts for Turbopack compatibility.
 */

import * as Sentry from "@sentry/nextjs";
import {
  EXTENSION_DENY_URL_PATTERNS,
  EXTENSION_IGNORE_MESSAGES,
  beforeSendExtensionFilter,
} from "@/lib/sentry-extension-noise";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,

  debug: false,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"],
    }),
  ],

  profilesSampleRate: 1.0,

  environment: process.env.NODE_ENV || "development",

  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,

  // Extension script URLs — see lib/sentry-extension-noise.ts
  denyUrls: [...EXTENSION_DENY_URL_PATTERNS],

  ignoreErrors: [
    "top.GLOBALS",
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
    // Browser extension (e.g. wallet) trying to overwrite window.solana; not from our code (app:///extensionPageScript.js)
    "Cannot assign to read only property 'solana' of object '#<Window>'",
    ...EXTENSION_IGNORE_MESSAGES,
  ],

  // Stack-aware drop for content-injected / extensionPageScript frames
  beforeSend: beforeSendExtensionFilter,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
