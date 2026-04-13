import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  // 1. Cookie ?
  const session = request.cookies.get("auth_session")?.value;

  // 2. Protected Route
  const protectedRoutes = ["/add-product", "/orders"];
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // 1. No Cookie -> Login
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. Cookie -> Home
  if (request.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. Next
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
