import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { pages } from "../db/schema";
import { requireAuth } from "../auth";
import { createPageFromTemplate, UnknownTemplateError } from "../lib/createPage";
import { PAGE_TEMPLATES, pagePath } from "../../shared/templates";

export const pagesRouter = Router();
pagesRouter.use(requireAuth);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

pagesRouter.get("/pages", async (_req, res) => {
  const rows = await db.select().from(pages).orderBy(pages.id);
  res.json({
    pages: rows.map((p) => ({ ...p, path: pagePath(p.template, p.slug) })),
    templates: Object.values(PAGE_TEMPLATES).filter((t) => t.key !== "home"),
  });
});

pagesRouter.post("/pages", async (req, res) => {
  const { title, slug, template } = req.body ?? {};
  if (typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
    res.status(400).json({ error: "Slug must be lowercase letters, numbers, and hyphens only" });
    return;
  }
  if (typeof template !== "string" || !PAGE_TEMPLATES[template] || template === "home") {
    res.status(400).json({ error: "Invalid template" });
    return;
  }
  const [existing] = await db.select().from(pages).where(eq(pages.slug, slug));
  if (existing) {
    res.status(409).json({ error: "A page with that slug already exists" });
    return;
  }

  try {
    const page = await createPageFromTemplate({ slug, title: title.trim(), template });
    res.status(201).json({ ...page, path: pagePath(page.template, page.slug) });
  } catch (err) {
    if (err instanceof UnknownTemplateError) {
      res.status(400).json({ error: err.message });
      return;
    }
    throw err;
  }
});

pagesRouter.delete("/pages/:slug", async (req, res) => {
  const [page] = await db.select().from(pages).where(eq(pages.slug, req.params.slug));
  if (!page) {
    res.status(404).json({ error: "Page not found" });
    return;
  }
  if (page.template === "home") {
    res.status(400).json({ error: "The home page cannot be deleted" });
    return;
  }
  await db.delete(pages).where(eq(pages.id, page.id)); // sections cascade-delete via FK
  res.status(204).end();
});
