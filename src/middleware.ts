import { NextRequest, NextResponse } from "next/server";
import { adminCookieValue, ADMIN_COOKIE } from "@/lib/admin-auth";

/**
 * Password gate for the internal dashboard. Everything under /admin
 * (pages and their server actions alike) requires the session cookie;
 * /admin/login is the one way in. Admin responses are also marked
 * noindex at the header level so the gate never appears in search.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const noindex = (res: NextResponse) => {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  };

  if (pathname === "/admin/login") {
    return noindex(NextResponse.next());
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Admin access is not configured", { status: 503 });
  }

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  if (cookie !== (await adminCookieValue(password))) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return noindex(NextResponse.redirect(url));
  }

  return noindex(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
