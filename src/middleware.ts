import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'learn-data-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie?.value) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/') {
    if (sessionCookie?.value) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
