import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import cookieParser from "cookie-parser";
import fs from "node:fs/promises";
import path from "node:path";

test("authenticated admin PDF uploads accept files larger than the old 8 MB cap", async () => {
  process.env.JWT_SECRET = "pdf-upload-test-only";
  const { uploadRouter } = await import("./upload");
  const { signSessionToken, COOKIE_NAME } = await import("../auth");
  const app = express();
  app.use(cookieParser());
  app.use("/api/admin", uploadRouter);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const port = (server.address() as { port: number }).port;
  let uploadedPath: string | undefined;
  try {
    const endpoint = `http://127.0.0.1:${port}/api/admin/upload/pdf`;
    assert.equal((await fetch(endpoint, { method: "POST" })).status, 401);
    const data = new Uint8Array(12 * 1024 * 1024);
    data.set(new TextEncoder().encode("%PDF-1.7\n"));
    const form = new FormData();
    form.append("file", new Blob([data], { type: "application/pdf" }), "large-test.pdf");
    const response = await fetch(endpoint, { method: "POST", headers: { cookie: `${COOKIE_NAME}=${signSessionToken("test")}` }, body: form });
    assert.equal(response.status, 200);
    const result = await response.json() as { url: string };
    const filename = path.basename(new URL(result.url).pathname);
    uploadedPath = path.resolve("public/uploads", filename);
    assert.equal((await fs.stat(uploadedPath)).size, data.length);
  } finally {
    if (uploadedPath) await fs.unlink(uploadedPath);
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
