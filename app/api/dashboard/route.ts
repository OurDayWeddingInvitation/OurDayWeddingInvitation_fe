import { LoginInfo } from "@/app/lib/fetches/user/type";
import { decrypt } from "@/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiDomain = process.env.API_DOMAIN;
  const encrypted = req.cookies.get("token")?.value;

  const data: LoginInfo = await decrypt(
    encrypted,
    process.env.ENCRYPT_SECRET_KEY!
  );

  req.headers.set("Authorization", `Bearer ${data.accessToken}`);

  try {
    console.log(apiDomain);

    const data = await fetch(`${apiDomain}/wedding`, {
      method: "GET",
      headers: {
        ...req.headers,
      },
      cache: "no-store",
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log("????");
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
