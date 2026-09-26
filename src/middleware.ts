import { NextRequest, NextResponse } from "next/server";
import { adminCookieValue, ADMIN_COOKIE } from "@/lib/admin-auth";

/** Staunch Capital's own host. Its root serves /capital; nothing else lives there. */
const CAPITAL_HOST = "capital.staunchventures.com";
const MAIN_ORIGIN = "https://staunchventures.com";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host")?.split(":")[0];

  if (host === CAPITAL_HOST) return capitalHost(request);
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return adminGate(request);
  return NextResponse.next();
}

/**
 * capital.staunchventures.com/ renders /capital. /capital on that host folds
 * back to the root so the fund has one URL, and every other path (/pitch,
 * /about, ...) goes to the main site where it actually lives.
 */
function capitalHost(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/capital";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/capital") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.redirect(`${MAIN_ORIGIN}${pathname}${search}`);
}

/**
 * Password gate for the internal dashboard. Everything under /admin
 * (pages and their server actions alike) requires the session cookie;
 * /admin/login is the one way in. Admin responses are also marked
 * noindex at the header level so the gate never appears in search.
 */
async function adminGate(request: NextRequest) {
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
  // Everything except Next internals and files with an extension (fonts,
  // images, the capital icon), which both hosts serve as-is.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
