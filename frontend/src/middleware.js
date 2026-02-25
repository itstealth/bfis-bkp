import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and API routes
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // For admin routes, check authentication via cookie
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin_session");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

