import { cookies } from "next/headers";
import { SessionPayload, UserRole } from "./types";

export const SESSION_COOKIE = "panagro_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 jours

// Secret de signature des sessions. En production, définir la variable
// d'environnement AUTH_SECRET (voir README) plutôt que d'utiliser la valeur
// par défaut ci-dessous.
const AUTH_SECRET = process.env.AUTH_SECRET || "panagro-dev-secret-change-me";

// Signature HMAC via l'API Web Crypto globale (`crypto.subtle`), disponible
// nativement en Node.js 19+ — pas besoin d'importer le module "crypto" de
// Node ici. Next.js 16 exécute désormais `proxy.ts` (ex-middleware) en
// runtime Node.js, mais garder cette implémentation portable ne coûte rien.

function base64urlFromBytes(bytes: Uint8Array): string {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bytesFromBase64url(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    input.length + ((4 - (input.length % 4)) % 4),
    "="
  );
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(AUTH_SECRET);
  return crypto.subtle.importKey(
    "raw",
    enc,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(data: string): Promise<string> {
  const key = await getHmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64urlFromBytes(new Uint8Array(sig));
}

export async function createSessionToken(
  role: UserRole,
  id: string,
  name: string
): Promise<string> {
  const payload: SessionPayload = { role, id, name, exp: Date.now() + SESSION_DURATION_MS };
  const encoded = base64urlFromBytes(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await sign(encoded);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = await sign(encoded);
  if (expected !== signature) return null;
  try {
    const json = new TextDecoder().decode(bytesFromBase64url(encoded));
    const payload = JSON.parse(json) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Lit la session courante côté serveur. `cookies()` est asynchrone depuis Next.js 15/16. */
export async function getServerSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<SessionPayload | null> {
  const session = await getServerSession();
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function requireInvestor(): Promise<SessionPayload | null> {
  const session = await getServerSession();
  if (!session || session.role !== "investor") return null;
  return session;
}
