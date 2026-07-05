import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  const unProtectedRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/faq',
    '/terms'
  ];

  const isPathUnprotected = unProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (!isPathUnprotected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/reset-password')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}