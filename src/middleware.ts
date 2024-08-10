import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DatasUserProps } from "./context/auth/types";

import { ServicesGeneral } from "./services/index";

const routesPublic = ["login", "cadastro"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("@social_network:token_user")?.value;
  const dataUser = request.cookies.get("@social_network:datas_user");

  const { verifyRegisterEmoticonsByUser } = ServicesGeneral;

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
    if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/cadastro") {
      return NextResponse.next();
    }
    const urlLogin = new URL("/login", request.url);

    return NextResponse.redirect(urlLogin);
  }

  if (
    (request.nextUrl.pathname.includes("login") && token) ||
    (request.nextUrl.pathname.includes("cadastro") && token)
  ) {
    const url = new URL("/home", request.url);
    return NextResponse.redirect(url);
  }

  if (!routesPublic.includes(request.nextUrl.pathname)) {
    const user: DatasUserProps | undefined = JSON.parse(
      dataUser?.value as string
    );

    const responseVerifyEmoticonsUser = await verifyRegisterEmoticonsByUser(
      user?.id as string
    );

    if (
      !responseVerifyEmoticonsUser?.data.allEmojiRegistered &&
      !request.nextUrl.pathname.includes("cadastrar-reacoes")
    ) {
      const response = NextResponse.redirect(
        new URL("/cadastrar-reacoes", request.url)
      );
      response.cookies.set(
        "@social_network:missing_emoticons_user",
        JSON.stringify(responseVerifyEmoticonsUser?.data.missingCategories)
      );

      return response;
    }

    if (
      responseVerifyEmoticonsUser?.data.allEmojiRegistered &&
      request.nextUrl.pathname.includes("cadastrar-reacoes")
    ) {
      const response = NextResponse.redirect(new URL("/home", request.url));

      return response;
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/pesquisa/:path*",
    "/user/:path*",
    "/login",
    "/cadastrar-reacoes/",
    "/cadastro",
  ],
};
