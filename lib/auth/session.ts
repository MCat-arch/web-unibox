import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { encodedJwtKey, SESSION_COOKIE_NAME } from "@/lib/auth/config";

export interface AdminSessionPayload {
  userId: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export async function createSession(payload: AdminSessionPayload): Promise<string> {
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 jam

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(encodedJwtKey);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedJwtKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  return verifySessionToken(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
