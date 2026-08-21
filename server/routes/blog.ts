import { Router } from "express";
import { eq, and, ne, desc, sql } from "drizzle-orm";
import { db } from "../db/client";
import { blogPosts } from "../db/schema";
import { requireAuth } from "../auth";

export const adminBlogRouter = Router();
export const publicBlogRouter = Router();

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toListItem(p: typeof blogPosts.$inferSelect) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    tags: p.tags as string[],
    author: p.author,
    publishedAt: p.publishedAt,
  };
}

// ── Admin: full CRUD, including drafts ──────────────────────────────────────
adminBlogRouter.use(requireAuth);

adminBlogRouter.get("/blog-posts", async (_req, res) => {
  const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  res.json({ posts: rows });
});

adminBlogRouter.get("/blog-posts/:id", async (req, res) => {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(req.params.id)));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(post);
});

function validateBody(body: any, { partial }: { partial: boolean }) {
  const errors: string[] = [];
  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) errors.push("Title is required");
  }
  if (!partial || body.slug !== undefined) {
    if (typeof body.slug !== "string" || !SLUG_RE.test(body.slug)) errors.push("Slug must be lowercase letters, numbers, and hyphens only");
  }
  if (!partial || body.excerpt !== undefined) {
    if (typeof body.excerpt !== "string" || !body.excerpt.trim()) errors.push("Excerpt is required");
  }
  if (!partial || body.content !== undefined) {
    if (typeof body.content !== "string" || !body.content.trim()) errors.push("Content is required");
  }
  if (body.status !== undefined && !["draft", "published"].includes(body.status)) errors.push("Status must be draft or published");
  if (body.tags !== undefined && !Array.isArray(body.tags)) errors.push("Tags must be an array");
  return errors;
}

adminBlogRouter.post("/blog-posts", async (req, res) => {
  const body = req.body ?? {};
  const errors = validateBody(body, { partial: false });
  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, body.slug));
  if (existing) {
    res.status(409).json({ error: "A post with that slug already exists" });
    return;
  }
  const [post] = await db
    .insert(blogPosts)
    .values({
      title: body.title.trim(),
      slug: body.slug,
      excerpt: body.excerpt.trim(),
      content: body.content,
      featuredImage: body.featuredImage ?? "",
      tags: body.tags ?? [],
      author: body.author?.trim() || "KonnectERP Team",
      status: body.status ?? "draft",
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    })
    .returning();
  res.status(201).json(post);
});

adminBlogRouter.patch("/blog-posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body ?? {};
  const errors = validateBody(body, { partial: true });
  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }
  if (body.slug !== undefined) {
    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, body.slug));
    if (existing && existing.id !== id) {
      res.status(409).json({ error: "A post with that slug already exists" });
      return;
    }
  }

  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.title === "string") patch.title = body.title.trim();
  if (typeof body.slug === "string") patch.slug = body.slug;
  if (typeof body.excerpt === "string") patch.excerpt = body.excerpt.trim();
  if (typeof body.content === "string") patch.content = body.content;
  if (typeof body.featuredImage === "string") patch.featuredImage = body.featuredImage;
  if (Array.isArray(body.tags)) patch.tags = body.tags;
  if (typeof body.author === "string") patch.author = body.author.trim() || "KonnectERP Team";
  if (typeof body.status === "string") patch.status = body.status;
  if (typeof body.publishedAt === "string") patch.publishedAt = new Date(body.publishedAt);

  const [updated] = await db.update(blogPosts).set(patch).where(eq(blogPosts.id, id)).returning();
  if (!updated) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(updated);
});

adminBlogRouter.delete("/blog-posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [deleted] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
  if (!deleted) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.status(204).end();
});

// ── Public: published posts only ────────────────────────────────────────────
const PAGE_SIZE = 8;

publicBlogRouter.get("/blog-posts", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const tag = typeof req.query.tag === "string" ? req.query.tag : undefined;

  const where = tag
    ? and(eq(blogPosts.status, "published"), sql`${blogPosts.tags} ? ${tag}`)
    : eq(blogPosts.status, "published");

  const rows = await db.select().from(blogPosts).where(where).orderBy(desc(blogPosts.publishedAt));
  const total = rows.length;
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  res.json({
    posts: pageRows.map(toListItem),
    total,
    page,
    limit: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
});

publicBlogRouter.get("/blog-posts/meta", async (_req, res) => {
  const rows = await db
    .select({ tags: blogPosts.tags, publishedAt: blogPosts.publishedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  const tagCounts = new Map<string, number>();
  const archiveCounts = new Map<string, { year: number; month: number; count: number }>();

  for (const row of rows) {
    for (const t of (row.tags as string[]) ?? []) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
    const d = new Date(row.publishedAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const existing = archiveCounts.get(key);
    if (existing) existing.count += 1;
    else archiveCounts.set(key, { year: d.getFullYear(), month: d.getMonth(), count: 1 });
  }

  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const archives = [...archiveCounts.values()]
    .sort((a, b) => (b.year - a.year) || (b.month - a.month))
    .map((a) => ({ year: a.year, month: a.month, label: `${MONTH_NAMES[a.month]} ${a.year}`, count: a.count }));

  const tags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  res.json({ tags, archives });
});

publicBlogRouter.get("/blog-posts/:slug", async (req, res) => {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, req.params.slug), eq(blogPosts.status, "published")));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const others = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.status, "published"), ne(blogPosts.id, post.id)))
    .orderBy(desc(blogPosts.publishedAt));

  const postTags = new Set((post.tags as string[]) ?? []);
  const related = [...others]
    .sort((a, b) => {
      const aShared = ((a.tags as string[]) ?? []).some((t) => postTags.has(t)) ? 1 : 0;
      const bShared = ((b.tags as string[]) ?? []).some((t) => postTags.has(t)) ? 1 : 0;
      return bShared - aShared;
    })
    .slice(0, 6)
    .map(toListItem);

  res.json({ post, related });
});
