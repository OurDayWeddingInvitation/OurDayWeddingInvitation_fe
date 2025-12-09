import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const body = await req.json();
  const { weddingId, mediaId } = body;

  try {
    if (!weddingId || !mediaId) {
      console.error("Missing Data");
      return;
    }

    const res = await fetch(
      `${apiDomain}/weddings/${weddingId}/media/${mediaId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const result = await res.json();

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
