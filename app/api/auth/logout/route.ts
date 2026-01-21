import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // token 쿠키 삭제
  cookies().delete("token");

  return NextResponse.json({ success: true, message: "로그아웃 성공" });
}
