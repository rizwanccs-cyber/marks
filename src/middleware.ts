import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/admin') || 
        request.nextUrl.pathname.startsWith('/teacher') || 
        request.nextUrl.pathname.startsWith('/student')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  const payload = await verifyToken(token);
  
  if (!payload) {
    // Invalid token
    if (request.nextUrl.pathname.startsWith('/admin') || 
        request.nextUrl.pathname.startsWith('/teacher') || 
        request.nextUrl.pathname.startsWith('/student')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Role based protection
  const { role } = payload as { role: string };
  
  if (request.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (request.nextUrl.pathname.startsWith('/teacher') && role !== 'TEACHER') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/student') && role !== 'STUDENT') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
};
