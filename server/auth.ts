import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Copy .env.example to .env and configure it.");
}
const JWT_SECRET: string = process.env.JWT_SECRET;

export const COOKIE_NAME = "konnect_admin_session";

export function signSessionToken(username: string) {
  return jwt.sign({ sub: username, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): { sub: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as { sub: string; role: string };
  } catch {
    return null;
  }
}

export async function checkAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUsername || !expectedHash) {
    throw new Error("ADMIN_USERNAME / ADMIN_PASSWORD_HASH are not set. Copy .env.example to .env and configure it.");
  }
  if (username !== expectedUsername) return false;
  return bcrypt.compare(password, expectedHash);
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[COOKIE_NAME];
  const session = token ? verifySessionToken(token) : null;
  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  (req as any).admin = session;
  next();
}
