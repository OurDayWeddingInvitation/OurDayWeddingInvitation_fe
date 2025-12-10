//클라 컴포넌트에서만 사용
export async function clientFetchApi({
  endPoint,
  method,
  body,
}: {
  endPoint: string;
  method: string;
  body?: object;
}) {
  try {
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

    const response = await fetch(`${apiDomain}${endPoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
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
