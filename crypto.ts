// AES-GCM (Edge Runtime compatible)

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export async function encrypt(data: object, secretKey: string) {
  const keyData = textEncoder.encode(secretKey);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV (recommended)

  const json = JSON.stringify(data);
  const encoded = textEncoder.encode(json);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  const encryptedBase64 = btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  );
  const ivBase64 = btoa(String.fromCharCode(...iv));

  return `${ivBase64}:${encryptedBase64}`;
}

export async function decrypt(encryptedString: string, secretKey: string) {
  const [ivBase64, encryptedBase64] = encryptedString.split(":");

  const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
  const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) =>
    c.charCodeAt(0)
  );

  const keyData = textEncoder.encode(secretKey);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedBytes
  );

  const decoded = textDecoder.decode(decrypted);
  return JSON.parse(decoded);
}
