import { cookies } from "next/headers";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + (process.env.JWT_SECRET || "medpulse_salt_2026"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function createSessionToken(user: SessionUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function verifySessionToken(token: string): SessionUser | null {
  try {
    const jsonStr = Buffer.from(token, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr);
    if (!payload || !payload.id || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("medpulse_session")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
