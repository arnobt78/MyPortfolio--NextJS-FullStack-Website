/**
 * Client-side Sentry filters for browser-extension noise (not app bugs).
 *
 * Cases documented in SENTRY_ERRORS.md:
 * - Case 1 (46d40d89): SyntaxError "Unexpected token '('" — bot/extension, 0 users
 * - Case 2: ReferenceError "Cannot access 'w' before initialization" — content-injected/*.iife.js
 * - Solana wallet: Cannot assign to read only property 'solana' — extensionPageScript.js
 *
 * Hydration mismatches are intentionally NOT filtered here.
 */

import type { ErrorEvent } from "@sentry/nextjs";

/** Stack frame filenames that indicate extension-origin scripts. */
export const EXTENSION_STACK_PATTERNS: readonly RegExp[] = [
  /content-injected/i,
  /extensionPageScript/i,
  /chrome-extension:\/\//i,
  /moz-extension:\/\//i,
  /safari-extension:\/\//i,
  /safari-web-extension:\/\//i,
];

/** denyUrls patterns — drop events whose script URL matches extension origins. */
export const EXTENSION_DENY_URL_PATTERNS: readonly RegExp[] = [
  /extensions\//i,
  /^chrome:\/\//i,
  /^chrome-extension:\/\//i,
  /^moz-extension:\/\//i,
  /^safari-extension:\/\//i,
  /^safari-web-extension:\/\//i,
  /content-injected/i,
  /extensionPageScript/i,
];

/**
 * Message-only ignores for verified extension/bot noise (backup when stack is missing).
 * Solana string stays in instrumentation-client.ts for visibility at init site.
 */
export const EXTENSION_IGNORE_MESSAGES: readonly (string | RegExp)[] = [
  // SENTRY_ERRORS.md Case 1 — issue 46d40d89, 0 users, Chrome 116 bot traffic
  "Unexpected token '('",
  // SENTRY_ERRORS.md Case 2 — content-injected/index.iife.js TDZ
  "Cannot access 'w' before initialization",
];

type StackFrame = {
  filename?: string | null;
};

type ExceptionValue = {
  stacktrace?: {
    frames?: StackFrame[] | null;
  } | null;
};

/**
 * Returns true when any exception stack frame filename matches extension patterns.
 */
export function isExtensionStackNoise(event: ErrorEvent): boolean {
  const exceptions = event.exception?.values;
  if (!exceptions?.length) {
    return false;
  }

  for (const exception of exceptions as ExceptionValue[]) {
    const frames = exception.stacktrace?.frames;
    if (!frames?.length) {
      continue;
    }

    for (const frame of frames) {
      const filename = frame.filename;
      if (!filename) {
        continue;
      }

      if (EXTENSION_STACK_PATTERNS.some((pattern) => pattern.test(filename))) {
        return true;
      }
    }
  }

  return false;
}

/**
 * beforeSend hook — drops extension-origin errors before Sentry ingest.
 * Returns null to discard; otherwise passes the event through unchanged.
 */
export function beforeSendExtensionFilter(
  event: ErrorEvent
): ErrorEvent | null {
  if (isExtensionStackNoise(event)) {
    return null;
  }

  return event;
}
