import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  //고정
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const { weddingId, sectionId, updated } = await req.json();

  console.log(updated);

  try {
    const data = await fetch(
      `${apiDomain}/weddings/${weddingId}/sections/${sectionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.get("authorization") ?? "",
        },
        body: JSON.stringify(updated),
        cache: "no-store",
      }
    );
    const json = await data.json();

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
