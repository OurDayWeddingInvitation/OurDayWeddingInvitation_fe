import { LoginInfo } from "@/app/lib/fetches/user/type";
import { decrypt } from "@/crypto";
import { NextRequest } from "next/server";

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

    const LIMIT = 57 * 60 * 1000;

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

    return updatedData;
  } catch {
    return null;
  }
}

export async function getToken(req: NextRequest) {
  const encrypted = req.cookies.get("token")?.value;

  const data: LoginInfo = await decrypt(
    encrypted,
    process.env.ENCRYPT_SECRET_KEY!
  );

  return data.accessToken;
}
