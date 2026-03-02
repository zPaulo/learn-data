import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'learn-data-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie?.value) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users from login page
  if (pathname === '/') {
    if (sessionCookie?.value) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
