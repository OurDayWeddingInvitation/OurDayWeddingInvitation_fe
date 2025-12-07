import { LoginInfo } from "@/app/lib/fetches/user/type";
import { decrypt } from "@/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const encrypted = req.cookies.get("token")?.value;

  const data: LoginInfo = await decrypt(
    encrypted,
    process.env.ENCRYPT_SECRET_KEY!
  );

  try {
    const formData = await req.formData();
    const files = formData.get("file") as File;
    const weddingId = formData.get("weddingId") as string;

    if (!files) {
      console.error("File not found or invalid");
      return;
    }

    const res = await fetch(`${apiDomain}/weddings/${weddingId}/media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
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
