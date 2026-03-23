import type { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as unknown as {
  __portfolio_rate_limit__?: Map<string, Bucket>;
};

const store = globalStore.__portfolio_rate_limit__ ?? new Map<string, Bucket>();
if (!globalStore.__portfolio_rate_limit__) globalStore.__portfolio_rate_limit__ = store;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function checkRateLimit(
  request: NextRequest,
  keyPrefix: string,
  max: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { ok: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { ok: true };
}
