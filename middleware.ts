import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const response = NextResponse.next();

  // Set Content Security Policy headers
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://analytics.tomasps.com",
      "style-src 'self' 'unsafe-inline'",
      "frame-src 'self' https://dexscreener.com https://*.dexscreener.com https://www.youtube-nocookie.com https://www.youtube.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.dexscreener.com https://analytics.tomasps.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};