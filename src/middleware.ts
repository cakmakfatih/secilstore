import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token || token?.error) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const protectedPaths = ['/collections', '/edit'];

    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

    if (isProtectedPath && !token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (_) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/collections'],
};
