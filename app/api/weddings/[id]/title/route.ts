import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { weddingId: string } }
) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "청첩장 제목 수정 완료", title },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
