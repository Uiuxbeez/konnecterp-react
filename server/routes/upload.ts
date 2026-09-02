import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { requireAuth } from "../auth";

const UPLOAD_DIR = path.resolve(process.cwd(), "public", "uploads");
const FORM_UPLOAD_DIR = path.resolve(UPLOAD_DIR, "forms");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(FORM_UPLOAD_DIR, { recursive: true });

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif", "image/gif", "application/pdf"]);
const FORM_ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const FORM_ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".doc", ".docx"]);

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

const formStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, FORM_UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`);
  },
});

const formUpload = multer({
  storage: formStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedMime = FORM_ALLOWED_TYPES.has(file.mimetype) || file.mimetype === "application/octet-stream";
    if (!allowedMime || !FORM_ALLOWED_EXTENSIONS.has(ext)) {
      cb(new Error("Upload PNG, JPG, WEBP, GIF, PDF, DOC, or DOCX files only"));
      return;
    }
    cb(null, true);
  },
});

function publicUploadUrl(req: import("express").Request, filename: string) {
  const base = process.env.PUBLIC_API_URL ?? `${req.protocol}://${req.get("host")}`;
  return `${base.replace(/\/$/, "")}/uploads/forms/${filename}`;
}

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

export const publicUploadRouter = Router();

publicUploadRouter.post("/form-upload", (req, res) => {
  formUpload.single("file")(req, res, (error) => {
    if (error) {
      const message = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
        ? "File must be 10 MB or smaller"
        : error instanceof Error
          ? error.message
          : "Upload failed";
      res.status(400).json({ error: message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    res.json({
      url: publicUploadUrl(req, req.file.filename),
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });
  });
});
