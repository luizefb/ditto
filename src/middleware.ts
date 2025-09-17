import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/board'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get all cookies and check for Supabase auth cookies
  const cookies = req.cookies;
  
  // Supabase typically stores session info in these cookies
  const authCookies = [
    'sb-access-token',
    'sb-refresh-token', 
    'supabase-auth-token',
    'supabase.auth.token'
  ];
  
  const hasAuthCookie = authCookies.some(cookieName => 
    cookies.get(cookieName)?.value
  );

  // Also check for any cookie that contains 'supabase' and 'auth'
  const allCookieNames = Array.from(cookies.getAll()).map(cookie => cookie.name);
  const hasSupabaseAuthCookie = allCookieNames.some(name => 
    name.includes('supabase') && name.includes('auth')
  );

  const isAuthenticated = hasAuthCookie || hasSupabaseAuthCookie;

  // Route protection logic
  if (!isAuthenticated && isProtectedRoute) {
    console.log(`Redirecting unauthenticated user from ${pathname} to /login`);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthenticated && isPublicRoute) {
    console.log(`Redirecting authenticated user from ${pathname} to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isAuthenticated && pathname === '/') {
    console.log(`Redirecting authenticated user from root to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isAuthenticated && pathname === '/') {
    console.log(`Redirecting unauthenticated user from root to /login`);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
