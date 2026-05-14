/**
 * Central logging for the portfolio app.
 *
 * Policy:
 * - `devLog` / `devWarn` / `devError`: console only when not in production (keeps prod logs quiet).
 * - `captureApiError`: use in API routes, server libs, and Edge handlers — production reports to
 *   Sentry; development prints to stderr so local debugging matches production code paths.
 * - Client UI (copy failures, etc.): use `devError` only unless you explicitly add Sentry there.
 *
 * Do not log secrets, tokens, or full PII in `extra` payloads passed to Sentry.
 */
import * as Sentry from "@sentry/nextjs";

export const IS_DEV = process.env.NODE_ENV !== "production";

export function devLog(...args: unknown[]) {
  if (IS_DEV) console.log(...args);
}

export function devWarn(...args: unknown[]) {
  if (IS_DEV) console.warn(...args);
}

/** Dev-only stderr (e.g. clipboard failures, ErrorBoundary mirror after Sentry). */
export function devError(...args: unknown[]) {
  if (IS_DEV) console.error(...args);
}

/**
 * Server / Edge: record failures in Sentry when running in production; always echo in dev.
 */
export function captureApiError(
  message: string,
  error?: unknown,
  extra?: Record<string, unknown>,
) {
  if (IS_DEV) {
    console.error(message, error, extra);
    return;
  }
  try {
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: { message, ...extra } });
    } else {
      Sentry.captureMessage(message, {
        level: "error",
        extra: {
          detail: error !== undefined ? String(error) : undefined,
          ...extra,
        },
      });
    }
  } catch {
    console.error(message, error);
  }
}
