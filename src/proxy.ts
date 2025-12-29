import { NextRequest, NextResponse } from 'next/server'

const protectedAdminRoutes = ['/admin']

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const admin_cookie = req.cookies.get('session')?.value

  // Admin login
  if (path === '/admin/login') {
    if (admin_cookie) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
    }
    return NextResponse.next()
  }

  // Admin protected routes
  if (path.startsWith('/admin') && !admin_cookie) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
