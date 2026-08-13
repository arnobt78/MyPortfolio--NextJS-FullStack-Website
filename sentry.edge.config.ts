/**
 * Sentry Edge Configuration
 * Runs in Edge Runtime (edge API routes; Next 16 proxy is Node-only)
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,

  debug: false,

  environment: process.env.NODE_ENV || "development",
});
