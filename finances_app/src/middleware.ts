import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "fr",
});

export async function middleware(request: NextRequest) {
  const i18nResponse = I18nMiddleware(request);
  if (i18nResponse) return i18nResponse;

  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (sessionCookie && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/auth/:path*",
    "/dashboard/:path*",
  ],
};
