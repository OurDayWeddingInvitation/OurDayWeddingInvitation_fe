import { LoginInfo } from "@/app/lib/fetches/user/type";
import { decrypt } from "@/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const encrypted = req.headers.get("x-auth-token");

  console.log(encrypted);

  const data: LoginInfo = await decrypt(
    encrypted,
    process.env.ENCRYPT_SECRET_KEY!
  );

  req.headers.set("Authorization", `Bearer ${data.accessToken}`);

  try {
    const data = await fetch("http://api.ourday.kr/v1/wedding", {
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
