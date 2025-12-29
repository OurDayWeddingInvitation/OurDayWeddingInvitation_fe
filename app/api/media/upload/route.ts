import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  try {
    const formData = await req.formData();
    const singleFile = formData.get("file") as File;
    const multipleFiles = formData.getAll("files") as File[];
    const weddingId = formData.get("weddingId") as string;

    if (!singleFile && multipleFiles.length === 0) {
      return NextResponse.json(
        { error: "File not found or invalid" },
        { status: 400 }
      );
    }

    if (!weddingId) {
      return NextResponse.json({ error: "Missing weddingId" }, { status: 400 });
    }

    const res = await fetch(`${apiDomain}/weddings/${weddingId}/media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
