import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
 
export async function middleware(request: NextRequest) {
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
  	matcher: ["/auth/:path", "/auth", "/dashboard/:path", "/dashboard"],
};
