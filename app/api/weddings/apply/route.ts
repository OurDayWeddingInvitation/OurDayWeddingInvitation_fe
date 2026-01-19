import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const { weddingId } = await req.json();

  try {
    const data = await fetch(`${apiDomain}/weddings/${weddingId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") ?? "",
      },
      cache: "no-store",
    });

    const json = await data.json();

    return NextResponse.json(json, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
