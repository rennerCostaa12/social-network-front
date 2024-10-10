import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DatasUserProps } from "./context/auth/types";

import { UsersServices } from "./services/users";
import { ServicesGeneral } from "./services/index";
import { EmoticonsDriverService } from "./services/emoticons-driver";
import { api } from "./config/api";
import { cookies } from "next/headers";

const routesPublic = ["login", "cadastro"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("@social_network:token_user")?.value;
  const dataUser = request.cookies.get("@social_network:datas_user");

  const { verifyRegisterEmoticonsByUser } = ServicesGeneral;
  const { getAllEmoticonsDriver } = EmoticonsDriverService;
  const { getFollowsUser } = UsersServices;

  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

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
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/cadastro"
    ) {
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

    if (request.nextUrl.pathname.includes("home")) {
      const user: DatasUserProps | undefined = JSON.parse(
        dataUser?.value as string
      );

      const responseFollowsUser = await getFollowsUser(user?.id as string);

      if (responseFollowsUser?.data.following < 5) {
        return NextResponse.redirect(
          new URL("/sugestoes-de-usuarios", request.url)
        );
      }
    }

    if (request.nextUrl.pathname.includes("sugestoes-de-usuarios")) {
      const user: DatasUserProps | undefined = JSON.parse(
        dataUser?.value as string
      );

      const responseFollowsUser = await getFollowsUser(user?.id as string);

      if (responseFollowsUser?.data.following >= 5) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    if (
      request.nextUrl.pathname.includes("home") &&
      responseVerifyEmoticonsUser?.data.allEmojiRegistered
    ) {
      if (dataUser) {
        const responseDataUser: DatasUserProps | undefined = JSON.parse(
          dataUser?.value
        );
        if (responseDataUser?.emoticons_drivers.length === 0) {
          const responseEmticonsDriver: CategoriesEmoticonsProps[] =
            await getAllEmoticonsDriver(responseDataUser.id);
          const dataUserUpdated = {
            ...JSON.parse(dataUser.value),
            emoticons_drivers: responseEmticonsDriver,
          };
          const response = NextResponse.redirect(new URL("/home", request.url));

          response.cookies.set(
            "@social_network:datas_user",
            JSON.stringify(dataUserUpdated)
          );

          return response;
        }
      }
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
    "/sugestoes-de-usuarios",
    "/home/:path*",
    "/pesquisa/:path*",
    "/user/:path*",
    "/login",
    "/cadastrar-reacoes/",
    "/cadastro",
    "/",
  ],
};
