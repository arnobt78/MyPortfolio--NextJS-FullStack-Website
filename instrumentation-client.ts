/**
 * Next.js client instrumentation – Sentry init (runs in the browser).
 * Replaces sentry.client.config.ts for Turbopack compatibility.
 */

import * as Sentry from "@sentry/nextjs";

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

  ignoreErrors: [
    "top.GLOBALS",
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
    // Browser extension (e.g. wallet) trying to overwrite window.solana; not from our code (app:///extensionPageScript.js)
    "Cannot assign to read only property 'solana' of object '#<Window>'",
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
