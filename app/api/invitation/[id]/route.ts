import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const apiDomain = process.env.API_DOMAIN;

  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${apiDomain}/weddings/${params.id}/edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") ?? "",
      },
      cache: "no-store",
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
