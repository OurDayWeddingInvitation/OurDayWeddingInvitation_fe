import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const formData = await req.formData();

  const weddingId = req.nextUrl.searchParams.get("weddingId");
  const mediaId = req.nextUrl.searchParams.get("mediaId");

  if (!weddingId || !mediaId) {
    return NextResponse.json({ error: "Missing Data" }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiDomain}/weddings/${weddingId}/media/${mediaId}/cropped`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
      cache: "no-store"
    });

    const result = await res.json();
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
