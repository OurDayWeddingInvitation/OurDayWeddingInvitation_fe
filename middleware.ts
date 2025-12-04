import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./crypto";
import { LoginInfo } from "./app/lib/fetches/user/type";
import { refreshTokenIfNeeded } from "./app/lib/auth/token";

const withoutMiddleware = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/_next/static",
  "/_next/image",
  "/_next/font",
  "/_next/data",
  "/images",
  "/assets",
  "/fonts",
  "/videos",
  "/login",
  "/api/auth",
  "/api/health",
];

export async function middleware(req: NextRequest) {
  const encrypted = req.cookies.get("token")?.value;

  if (
    withoutMiddleware.some((prefix) => req.nextUrl.pathname.startsWith(prefix))
  ) {
    return NextResponse.next();
  }

  if (!encrypted) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const data: LoginInfo = await decrypt(
      encrypted,
      process.env.ENCRYPT_SECRET_KEY!
    );

    const updatedData = await refreshTokenIfNeeded(data);

    if (!updatedData) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("decrypt or refresh error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
