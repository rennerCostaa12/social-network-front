import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@social_network:token_user")?.value;

  if (token) {
    const decodedToken = jwt.decode(token) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      request.cookies.delete("@social_network:token_user");
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    const urlLogin = new URL("/login", request.url);

    return NextResponse.redirect(urlLogin);
  }

  if (request.nextUrl.pathname.includes("login") && token) {
    console.log("AQUII")
    const urlLogin = new URL("/home", request.url);
    return NextResponse.redirect(urlLogin);
  }
}

export const config = {
  matcher: ["/", "/home/:path*", "/pesquisa/:path*", "/user/:path*", "/login"],
};
