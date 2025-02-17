import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // Disable dashboard if the custom flag is set to 'true'
  if (process.env.NEXT_PUBLIC_DISABLE_DASHBOARD === 'true' && pathname.startsWith('/dashboard')) {
    return new NextResponse('Dashboard is under construction', { status: 503 });
  }
  
  return NextResponse.next();
}

// Apply middleware only for /dashboard routes
export const config = {
  matcher: '/dashboard/:path*',
};