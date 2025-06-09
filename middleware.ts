import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import jwtUtil from "@/shared/utils/jwt.util";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    if (request.method === "OPTIONS") {
      return response;
    }

    if (pathname.startsWith("/api/backend/admin")) {
      const token = request.cookies.get("authToken")?.value;

      if (!token) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401, headers: response.headers }
        );
      }

      try {
        const user = await jwtUtil.verifyToken(token);
        if (user.role !== "admin") {
          return NextResponse.json(
            { error: "Forbidden" },
            { status: 403, headers: response.headers }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid token" },
          { status: 401, headers: response.headers }
        );
      }
    }

    return response;
  }

  const response = intlMiddleware(request);
  const token = request.cookies.get("authToken")?.value;
  const locale = pathname.split("/")[1] || "en";
  const notFoundPath = routing.pathnames["/not-found"]?.[locale as "en" | "es"];
  const signInPath = routing.pathnames["/sign-in"]?.[locale as "en" | "es"];

  if (pathname.includes("/messages")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/${locale}${signInPath}`, request.url)
      );
    }
    try {
      const isExpired = await jwtUtil.isTokenExpired(token);
      if (isExpired) {
        return NextResponse.redirect(
          new URL(`/${locale}${signInPath}`, request.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL(`/${locale}${signInPath}`, request.url)
      );
    }
  }

  if (pathname.includes("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/${locale}${notFoundPath}`, request.url)
      );
    }
    try {
      const user = await jwtUtil.verifyToken(token);
      if (user.role !== "admin") {
        return NextResponse.redirect(
          new URL(`/${locale}${notFoundPath}`, request.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL(`/${locale}${notFoundPath}`, request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|es)", "/(en|es)/:path*", "/admin/:path*", "/api/:path*"],
};
