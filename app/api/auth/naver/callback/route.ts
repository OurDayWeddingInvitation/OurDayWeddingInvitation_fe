import { LoginInfo } from "@/app/lib/fetches/user/type";
import { encrypt } from "@/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }

  const apiDomain = process.env.API_DOMAIN;

  try {
    const backendRes = await fetch(`${apiDomain}/auth/social/naver`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        state: state,
      }),
      cache: "no-store",
    });

    const result = await backendRes.json();

    const res = NextResponse.redirect(new URL("/dashboard", req.url));
    const encrypted = await encrypt(
      { ...result.data, issuedTime: new Date().toISOString() } as LoginInfo,
      process.env.ENCRYPT_SECRET_KEY!
    );

    res.cookies.set("token", encrypted, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("API POST Error:", error);

    return NextResponse.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}
