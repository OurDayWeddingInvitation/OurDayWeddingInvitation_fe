import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) return NextResponse.json({ error: "address is required" }, { status: 400 });

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!kakaoKey) return NextResponse.json({ error: "KAKAO_REST_KEY is undefined" }, { status: 500 });

  const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
    headers: { Authorization: `KakaoAK ${kakaoKey}` }
  });

  const data = await response.json();
  return NextResponse.json(data);
}
