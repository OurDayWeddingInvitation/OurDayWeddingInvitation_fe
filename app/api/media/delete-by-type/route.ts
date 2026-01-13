import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const weddingId = req.nextUrl.searchParams.get("weddingId");
  const { imageType } = await req.json();

  try {
    if (!weddingId || !imageType) {
      return NextResponse.json({ error: "Missing Data" }, { status: 400 });
    }

    const res = await fetch(`${apiDomain}/weddings/${weddingId}/media`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageType }),
      cache: "no-store",
    });

    const result = await res.json();

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
