import { Router } from "express";
import { checkAdminCredentials, signSessionToken, verifySessionToken, requireAuth, COOKIE_NAME } from "../auth";

export const authRouter = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }
  const ok = await checkAdminCredentials(username, password);
  if (!ok) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const token = signSessionToken(username);
  res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
  res.json({ username });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.status(204).end();
});

authRouter.get("/me", (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  const session = token ? verifySessionToken(token) : null;
  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ username: session.sub });
});
