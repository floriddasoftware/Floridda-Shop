import { NextResponse } from "next/server";

export function middleware(request) {
  const protectedRoutes = [
    "/account",
    "/checkout",
    "/admin",
    "/admin/products",
  ];

  const authToken = request.cookies.get("authToken")?.value;
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}