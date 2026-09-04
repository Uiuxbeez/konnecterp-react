import { Router } from "express";
import { eq, asc, and } from "drizzle-orm";
import { db } from "../db/client";
import { pages, sections } from "../db/schema";
import { requireAuth } from "../auth";
import { pagePath } from "../../shared/templates";
import { ensureCoreBuilderPages } from "../lib/createPage";

export const adminSectionsRouter = Router();
export const publicSectionsRouter = Router();

const CORE_PAGE_SLUGS = new Set(["about-us", "contact", "career", "case-studies", "testimonials", "faq"]);
const PUBLIC_PAGE_CACHE_TTL_MS = Number(process.env.PUBLIC_PAGE_CACHE_TTL_MS ?? 60_000);
const publicPageCache = new Map<string, { expiresAt: number; payload: unknown }>();
let coreBuilderPagesReady = false;
let coreBuilderPagesPromise: Promise<void> | null = null;

async function ensureCoreBuilderPagesOnce() {
  if (coreBuilderPagesReady) return;
  coreBuilderPagesPromise ??= ensureCoreBuilderPages()
    .then(() => {
      coreBuilderPagesReady = true;
    })
    .finally(() => {
      coreBuilderPagesPromise = null;
    });
  await coreBuilderPagesPromise;
}

function clearPublicPageCache(slug?: string) {
  if (slug) {
    publicPageCache.delete(slug);
    return;
  }
  publicPageCache.clear();
}

async function getPageBySlug(slug: string) {
  if (CORE_PAGE_SLUGS.has(slug)) {
    await ensureCoreBuilderPagesOnce();
  }
  const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
  return page ?? null;
}

// ── Admin: full draft content, including disabled sections ─────────────────
adminSectionsRouter.use(requireAuth);

adminSectionsRouter.get("/pages/:slug/sections", async (req, res) => {
  const page = await getPageBySlug(req.params.slug);
  if (!page) {
    res.status(404).json({ error: "Page not found" });
    return;
  }
  const rows = await db
    .select()
    .from(sections)
    .where(eq(sections.pageId, page.id))
    .orderBy(asc(sections.position));
  res.json({ page: { ...page, path: pagePath(page.template, page.slug) }, sections: rows });
});

adminSectionsRouter.patch("/sections/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { content, name, enabled } = req.body ?? {};
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (content !== undefined) {
    if (typeof content !== "object" || content === null || Array.isArray(content)) {
      res.status(400).json({ error: "content must be an object" });
      return;
    }
    patch.content = content;
  }
  if (typeof name === "string") patch.name = name;
  if (typeof enabled === "boolean") patch.enabled = enabled;

  const [updated] = await db.update(sections).set(patch).where(eq(sections.id, id)).returning();
  if (!updated) {
    res.status(404).json({ error: "Section not found" });
    return;
  }
  res.json(updated);
});

adminSectionsRouter.post("/pages/:slug/reorder", async (req, res) => {
  const page = await getPageBySlug(req.params.slug);
  if (!page) {
    res.status(404).json({ error: "Page not found" });
    return;
  }
  const order = req.body?.order;
  if (!Array.isArray(order)) {
    res.status(400).json({ error: "order must be an array of {id, position}" });
    return;
  }

  await Promise.all(
    order.map((item: { id: number; position: number }) =>
      db
        .update(sections)
        .set({ position: item.position, updatedAt: new Date() })
        .where(and(eq(sections.id, item.id), eq(sections.pageId, page.id)))
    )
  );
  const rows = await db.select().from(sections).where(eq(sections.pageId, page.id)).orderBy(asc(sections.position));
  res.json({ sections: rows });
});

adminSectionsRouter.post("/pages/:slug/publish", async (req, res) => {
  const page = await getPageBySlug(req.params.slug);
  if (!page) {
    res.status(404).json({ error: "Page not found" });
    return;
  }
  const rows = await db.select().from(sections).where(eq(sections.pageId, page.id));
  await Promise.all(
    rows.map((s) =>
      db.update(sections).set({ publishedContent: s.content, updatedAt: new Date() }).where(eq(sections.id, s.id))
    )
  );
  await db.update(pages).set({ updatedAt: new Date() }).where(eq(pages.id, page.id));
  clearPublicPageCache(req.params.slug);
  res.json({ published: true, publishedAt: new Date().toISOString() });
});

// ── Public: published content only, enabled sections only ──────────────────
publicSectionsRouter.get("/pages/:slug", async (req, res) => {
  const cached = publicPageCache.get(req.params.slug);
  if (cached && cached.expiresAt > Date.now()) {
    res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
    res.json(cached.payload);
    return;
  }

  const page = await getPageBySlug(req.params.slug);
  if (!page) {
    res.status(404).json({ error: "Page not found" });
    return;
  }
  const rows = await db
    .select()
    .from(sections)
    .where(and(eq(sections.pageId, page.id), eq(sections.enabled, true)))
    .orderBy(asc(sections.position));
  const payload = {
    page: {
      slug: page.slug,
      title: page.title,
      template: page.template,
      path: pagePath(page.template, page.slug),
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
    },
    sections: rows
      .filter((s) => s.publishedContent !== null)
      .map((s) => ({ id: s.id, type: s.type, name: s.name, content: s.publishedContent })),
  };

  publicPageCache.set(req.params.slug, { expiresAt: Date.now() + PUBLIC_PAGE_CACHE_TTL_MS, payload });
  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
  res.json(payload);
});
