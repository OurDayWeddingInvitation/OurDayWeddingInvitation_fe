import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;

  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${apiDomain}/weddings`, {
      method: "GET",
      headers: {
        ...req.headers,
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
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  try {
    const data = await fetch(`${apiDomain}/weddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") ?? "",
      },
      cache: "no-store",
    });

    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
