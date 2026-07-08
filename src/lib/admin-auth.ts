export const ADMIN_COOKIE = "staunch_admin";

/**
 * The admin session cookie is an HMAC of a fixed label keyed by the shared
 * admin password — so it can't be forged without the password, contains no
 * secrets itself, and rotating ADMIN_PASSWORD invalidates every session.
 * Uses WebCrypto so the same code runs in edge middleware and node routes.
 */
export async function adminCookieValue(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("staunch-admin-session-v1"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
