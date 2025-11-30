import { decrypt } from "@/crypto";
import { cookies } from "next/headers";

export async function fetchApi({
  endPoint,
  method,
  body,
}: {
  endPoint: string;
  method: string;
  body?: object;
}) {
  try {
    const apiDomain = process.env.API_DOMAIN;

    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Missing token");

    const data = await decrypt(token, process.env.ENCRYPT_SECRET_KEY!);

    const res = await fetch(`${apiDomain}${endPoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Backend error: ${text}`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
