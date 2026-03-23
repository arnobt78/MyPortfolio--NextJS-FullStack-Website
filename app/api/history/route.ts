import { NextRequest } from 'next/server';
import { getSession } from '@/lib/redis';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'edge';

// Helper to get CORS headers
function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin || '*';
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'private, max-age=10, stale-while-revalidate=20',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie',
  };
}

export async function GET(req: NextRequest) {
  try {
    const rate = checkRateLimit(req, 'history', 60, 60_000);
    if (!rate.ok) {
      return new Response(JSON.stringify({ messages: [] }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rate.retryAfterSeconds),
        },
      });
    }

    const origin = req.headers.get('origin');
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/chatbot_session=([^;]+)/);
    const sessionId = match?.[1];
    
    if (!sessionId) {
      return new Response(JSON.stringify({ messages: [] }), {
        status: 200,
        headers: getCorsHeaders(origin),
      });
    }

    const session = await getSession(sessionId);
    
    return new Response(
      JSON.stringify({ messages: session?.messages || [] }),
      {
        status: 200,
        headers: getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error('History error:', error);
    const origin = req.headers.get('origin');
    return new Response(JSON.stringify({ messages: [] }), {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new Response(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}
