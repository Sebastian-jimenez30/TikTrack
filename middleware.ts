import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import jwtUtil from "@/shared/utils/jwt.util";
const intlMiddleware = createIntlMiddleware(routing);


export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  const locale = pathname.split("/")[1] || "en";
  const notFoundPath = routing.pathnames["/not-found"]?.[locale as "en" | "es"];
  if (pathname.includes("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}${notFoundPath}`, request.url));
    }
    try {
      const user = await jwtUtil.verifyToken(token); 
      console.log(user)

      if (user.role !== "admin") {
        return NextResponse.redirect(new URL(`/${locale}${notFoundPath}`, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(`/${locale}${notFoundPath}`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(en|es)",
    "/(en|es)/:path*",
    "/admin/:path*",
  ],
};


