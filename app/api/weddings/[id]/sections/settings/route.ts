import { getToken } from "@/app/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const apiDomain = process.env.API_DOMAIN;
  const token = await getToken(req);

  req.headers.set("Authorization", `Bearer ${token}`);

  const { sectionSettings } = await req.json();

  try {
    const data = await fetch(
      `${apiDomain}/weddings/${params.id}/sections/settings`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.get("authorization") ?? "",
        },
        body: JSON.stringify({ sectionSettings }),
        cache: "no-store",
      }
    );

    const json = await data.json();

    return NextResponse.json(json, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
