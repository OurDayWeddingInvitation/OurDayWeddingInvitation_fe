import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./crypto";
import { LoginInfo } from "./app/lib/fetches/user/type";

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
  const isLogin = req.nextUrl.pathname === "/login";

  if (withoutMiddleware.some((e) => e.startsWith(req.nextUrl.pathname))) {
    return NextResponse.next();
  }

  if (isLogin) return NextResponse.next();

  if (!encrypted) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const data: LoginInfo = await decrypt(
      encrypted,
      process.env.ENCRYPT_SECRET_KEY!
    );

    let updatedData = data;
    let needRefresh = false;

    if (data.expiresIn < 300) {
      needRefresh = true;
    }

    if (needRefresh) {
      const r = await fetch("http://api.ourday.kr/v1/auth/token/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: data.refreshToken }),
        cache: "no-store",
      });

      if (r.ok) {
        const refreshed = await r.json();
        console.log(refreshed.data);

        updatedData = {
          ...data,
          accessToken: refreshed.data,
        };
      }
    }

    const newEncrypted = await encrypt(
      updatedData,
      process.env.ENCRYPT_SECRET_KEY!
    );

    const res = NextResponse.next();
    res.cookies.set("token", newEncrypted, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("decrypt or refresh error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
