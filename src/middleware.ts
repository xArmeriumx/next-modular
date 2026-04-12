import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
/**
 * 👮‍♂️ ผู้พิทักษ์ประตูเมือง (Middleware Routing)
 * โค้ดนี้จะตื่นขึ้นมาทำงาน "ก่อน" ที่หน้าเว็บไหนๆ จะเรนเดอร์จบ
 */
export function middleware(request: NextRequest) {
  
  // 1. ขอดูตั๋วเดินทาง (Cookie) พกมาไหม?
  const session = request.cookies.get("auth_session")?.value;
  
  // 2. กำหนดอาณาเขตหวงห้าม (Protected Routes) เด็ดขาด
  // ใครไม่มีตั๋ว ห้ามเข้าพื้นที่สงวนนี้
  const protectedRoutes = ["/add-product", "/orders"];
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // กฎข้อที่ 1: ตั๋วไม่มี แต่หน้าด้านจะเข้าเขตสงวน -> เตะกลับไปหน้า Login!
  if (isProtected && !session) {
      // url ปัจจุบันที่ขะเข้าไป จะถูกจำไว้ผ่าน request.url เพื่อเตรียมเป็นท่าเตะกลับได้
      return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // กฎข้อที่ 2: มีตั๋วอยู่แล้ว แต่เอ๋อจะเข้าหน้า Login อีก -> พาเดินอ้อมไปหน้าแรก!
  if (request.nextUrl.pathname === '/login' && session) {
      return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. ถ้าผ่านทุกด่าน ก็อนุญาตให้เดินผ่านเข้าประตูเมืองไปได้
  return NextResponse.next()
}
 
export const config = {
  // ควบคุมว่า "ยาม" คนนี้จะวิ่งไปขอดูตั๋วทุกๆ URL เลยไหม? (ยกเว้นไอคอนหรือไฟล์ระบบจุกจิก)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
