import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { requireAuth } from "../auth";

const UPLOAD_DIR = path.resolve(process.cwd(), "public", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif", "image/gif", "application/pdf"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      cb(new Error("Unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

export const uploadRouter = Router();
uploadRouter.use(requireAuth);

uploadRouter.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  // Absolute URL: the frontend (Cloudflare Pages) and this API (Railway) are on
  // different domains in production, so a relative /uploads/... path would 404
  // when rendered from the frontend's origin.
  const base = process.env.PUBLIC_API_URL ?? `${req.protocol}://${req.get("host")}`;
  res.json({ url: `${base.replace(/\/$/, "")}/uploads/${req.file.filename}` });
});
