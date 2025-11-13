import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  console.log(`code --> ${code} + state --> ${state}`);

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }
  //api call해서 code state 넘김 후 access token get
  //받은 access token cookie에 저장

  const response = NextResponse.redirect(new URL("/dashboard", req.url));

  return response;
}
