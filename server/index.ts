import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { authRouter } from "./routes/auth";
import { adminSectionsRouter, publicSectionsRouter } from "./routes/sections";
import { uploadRouter } from "./routes/upload";
import { pagesRouter } from "./routes/pages";
import { adminBlogRouter, publicBlogRouter } from "./routes/blog";
import { adminNavigationRouter, publicNavigationRouter } from "./routes/navigation";
import { adminFormsRouter, publicFormsRouter } from "./routes/forms";
import { adminSettingsRouter, publicSettingsRouter } from "./routes/settings";

const app = express();
// Railway (and most PaaS hosts) inject PORT and expect the app to bind to it.
const PORT = Number(process.env.PORT ?? process.env.API_PORT ?? 5001);
// Comma-separated list so both a *.pages.dev preview URL and a custom domain can be allowed at once.
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? "http://localhost:5000").split(",").map((s) => s.trim());

app.set("trust proxy", 1);
app.use(cors({ origin: CLIENT_ORIGINS, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), "public", "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminSectionsRouter);
app.use("/api/admin", uploadRouter);
app.use("/api/admin", pagesRouter);
app.use("/api/admin", adminBlogRouter);
app.use("/api/admin", adminNavigationRouter);
app.use("/api/admin", adminFormsRouter);
app.use("/api/admin", adminSettingsRouter);
app.use("/api/public", publicSectionsRouter);
app.use("/api/public", publicBlogRouter);
app.use("/api/public", publicNavigationRouter);
app.use("/api/public", publicFormsRouter);
app.use("/api/public", publicSettingsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err?.status ?? 500).json({ error: err?.message ?? "Internal server error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server listening on port ${PORT}`);
});
