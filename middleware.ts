// filepath: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token");

  // Protect buyer routes
  if (path.startsWith("/(buyer)") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect supplier routes
  if (path.startsWith("/(supplier)") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
