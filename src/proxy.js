import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // save current url
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path",
    "/dashboard/user/:path",
    "/dashboard/admin/:path",
    "/dashboard/vendor/:path",
    "/all-tickets/:path",
  ],
};
