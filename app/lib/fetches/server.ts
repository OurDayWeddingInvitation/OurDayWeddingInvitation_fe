import { decrypt } from "@/crypto";
import { LoginInfo } from "./user/type";
import { cookies } from "next/headers";

//서버 컴포넌트에서만 사용
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

    // console.log(data.accessToken); swagger로 토큰 확인 하고싶을때 주석풀고 터미널에 나오는 토큰 사용

    const response = await fetch(`${apiDomain}${endPoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
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
