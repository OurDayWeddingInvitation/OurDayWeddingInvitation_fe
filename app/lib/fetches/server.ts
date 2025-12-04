import { decrypt } from "@/crypto";
import { cookies } from "next/headers";
import { LoginInfo } from "./user/type";
import { refreshTokenIfNeeded } from "../auth/token";

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

    const data: LoginInfo = await decrypt(
      token,
      process.env.ENCRYPT_SECRET_KEY!
    );

    const updatedData = await refreshTokenIfNeeded(data);
    console.log(updatedData);

    if (!updatedData) {
      return null;
    }

    const response = await fetch(`${apiDomain}${endPoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${updatedData.accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error: ${text}`);
    }

    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
