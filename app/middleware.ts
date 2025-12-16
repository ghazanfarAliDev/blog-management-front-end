import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/home", "/posts", "/profile"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // 3️⃣ Allow access
  return NextResponse.next();
}

// Apply middleware only to these paths
export const config = {
  matcher: [
    "/home/:path*", 
    "/posts/:path*", 
    "/profile/:path*", 
    "/login", 
    "/register"
  ],
};
