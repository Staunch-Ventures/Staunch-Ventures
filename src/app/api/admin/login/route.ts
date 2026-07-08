import { NextResponse } from "next/server";
import { adminCookieValue, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request): Promise<NextResponse> {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) {
    return NextResponse.json({ error: "Admin access is not configured" }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    /* fall through to mismatch */
  }

  if (password !== configured) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await adminCookieValue(configured), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
