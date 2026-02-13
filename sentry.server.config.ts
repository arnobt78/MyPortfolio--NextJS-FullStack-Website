/**
 * Sentry Server Configuration
 * Runs in Node.js (API routes, server components)
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,

  debug: false,

  environment: process.env.NODE_ENV || "development",

  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,

  integrations: [
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"],
    }),
  ],
});
