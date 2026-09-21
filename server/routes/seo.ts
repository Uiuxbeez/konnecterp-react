import { Router } from "express";
import { eq, and, isNotNull } from "drizzle-orm";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { db } from "../db/client";
import { pages, sections, blogPosts, siteSettings } from "../db/schema";
import { requireAuth } from "../auth";
import { pagePath } from "../../shared/templates";
import type { SeoFiles } from "../../shared/seo";
import { siteOrigin, verificationFile, sitemapFiles } from "../lib/seo";

export const adminSeoRouter = Router();
export const publicSeoRouter = Router();
const key = "seo-files";
async function readSeo(): Promise<SeoFiles> {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
  return row?.value as SeoFiles ?? { siteUrl: "", generatedAt: "", urlCount: 0, verificationFilename: "", files: {} };
}

adminSeoRouter.use(requireAuth);
adminSeoRouter.get("/seo", async (_req, res) => { res.json(await readSeo()); });
adminSeoRouter.post("/seo/generate", async (req, res) => {
  let origin: string;
  let verification: ReturnType<typeof verificationFile> | undefined;
  try {
    origin = siteOrigin(req.body?.siteUrl);
    if (req.body?.verification) verification = verificationFile(req.body.verification.filename, req.body.verification.content);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid SEO settings" });
    return;
  }
  const [previous, pageRows, posts] = await Promise.all([
    readSeo(),
    db.selectDistinct({ slug: pages.slug, template: pages.template, title: pages.title }).from(pages)
      .innerJoin(sections, eq(sections.pageId, pages.id))
      .where(and(eq(sections.enabled, true), isNotNull(sections.publishedContent))),
    db.select({ slug: blogPosts.slug, title: blogPosts.title }).from(blogPosts).where(eq(blogPosts.status, "published")),
  ]);
  const publicDir = path.resolve(process.cwd(), "public");
  const robots = await readFile(path.join(publicDir, "robots.txt"), "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
    return "User-agent: *\nAllow: /\n";
  });
  const generated = sitemapFiles(origin, [
    { path: "/", title: "Home" }, { path: "/about-us", title: "About Us" },
    { path: "/contact", title: "Contact" }, { path: "/career", title: "Career" }, { path: "/blog", title: "Blog" },
    ...pageRows.map(page => ({ path: pagePath(page.template, page.slug), title: page.title })),
    ...posts.map(post => ({ path: `/blog/${post.slug}`, title: post.title })),
  ], robots);
  const files: Record<string, string> = { ...previous.files, ...generated.files };
  if (verification) files[verification.filename] = verification.content;
  const result: SeoFiles = { siteUrl: origin, generatedAt: new Date().toISOString(), urlCount: generated.urlCount,
    verificationFilename: verification?.filename ?? previous.verificationFilename, files };
  // Save real Vite public assets; the database also keeps them across API redeploys.
  await mkdir(publicDir, { recursive: true });
  for (const [filename, content] of Object.entries(files)) {
    const temporary = path.join(publicDir, `.${filename}.${randomUUID()}.tmp`);
    await writeFile(temporary, content, "utf8");
    await rename(temporary, path.join(publicDir, filename));
  }
  await db.insert(siteSettings).values({ key, value: result, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: result, updatedAt: new Date() } });
  res.json(result);
});

// Only generated SEO assets are served, never arbitrary paths from the filesystem.
publicSeoRouter.get(["/sitemap.xml", "/sitemap.html", "/robots.txt", /^\/google[a-zA-Z0-9_-]+\.html$/], async (req, res) => {
  const filename = req.path.slice(1);
  const seo = await readSeo();
  const content = seo.files[filename];
  if (content === undefined) { res.status(404).type("text").send("SEO file has not been generated."); return; }
  res.setHeader("Cache-Control", "public, max-age=60");
  res.type(filename.endsWith(".xml") ? "application/xml" : filename.endsWith(".html") ? "text/html" : "text/plain").send(content);
});
