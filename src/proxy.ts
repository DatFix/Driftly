import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
 
const protectedUserRoutes = ['/profile']
const protectedAdminRoutes = ['/admin']
const publicRoutes = ['/', '/login', '/signup']
 
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
 
  const cookie = (await cookies()).get('user_session')?.value
  const admin_cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  // 1. XỬ LÝ TRANG LOGIN TRƯỚC (quan trọng!)
  // Redirect to /admin/dashboard if authenticated admin tries to access admin login
  if (path === '/admin/login') {
    if (admin_cookie) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
    }
    return NextResponse.next() // Cho phép truy cập nếu chưa login
  }

  // Redirect to home if authenticated user tries to access login/signup
  if ((path === '/login' || path === '/signup') && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // 2. SAU ĐÓ MỚI KIỂM TRA PROTECTED ROUTES
  const isProtectedUserRoute = protectedUserRoutes.some(route => 
    path.startsWith(route)
  )

  const isProtectedAdminRoute = protectedAdminRoutes.some(route => 
    path.startsWith(route)
  )

  // Redirect to / if accessing protected user route without session
  if (isProtectedUserRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect to /admin/login if accessing protected admin route without session
  if (isProtectedAdminRoute && !admin_cookie) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}