import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { authRouter } from "./routes/auth";
import { adminSectionsRouter, publicSectionsRouter } from "./routes/sections";
import { uploadRouter } from "./routes/upload";

const app = express();
const PORT = Number(process.env.API_PORT ?? 5001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5000";

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), "public", "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminSectionsRouter);
app.use("/api/admin", uploadRouter);
app.use("/api/public", publicSectionsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err?.status ?? 500).json({ error: err?.message ?? "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
