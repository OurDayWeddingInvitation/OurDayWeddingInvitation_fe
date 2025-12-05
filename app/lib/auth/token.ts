import { cookies } from "next/headers";
import { encrypt } from "@/crypto";
import { LoginInfo } from "@/app/lib/fetches/user/type";

export async function refreshTokenIfNeeded(data: LoginInfo | null) {
  try {
    const apiDomain = process.env.API_DOMAIN;

    if (!data) return null;

    if (!data.refreshToken) return null;

    if (!data.issuedTime) return null;

    const issuedMs = new Date(data.issuedTime).getTime();
    if (isNaN(issuedMs)) return null;

    const nowMs = Date.now();
    const diff = nowMs - issuedMs;

    const LIMIT = 55 * 60 * 1000;

    if (diff < LIMIT) return data;

    console.log(`토큰 만료까지 ${diff / 1000}초 남았음`);

    const r = await fetch(`${apiDomain}/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: data.refreshToken }),
      cache: "no-store",
    });

    if (!r.ok) return null;

    let refreshed;
    try {
      refreshed = await r.json();
    } catch {
      return null;
    }

    if (!refreshed || !refreshed.data) return null;

    const updatedData: LoginInfo = {
      ...data,
      accessToken: refreshed.data,
      issuedTime: new Date().toISOString(),
    };

    let newEncrypted;
    try {
      newEncrypted = await encrypt(
        updatedData,
        process.env.ENCRYPT_SECRET_KEY!
      );
    } catch {
      return null;
    }

    try {
      cookies().set({
        name: "token",
        value: newEncrypted,
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60,
      });
    } catch {
      return null;
    }

    return updatedData;
  } catch {
    return null;
  }
}
