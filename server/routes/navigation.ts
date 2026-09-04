import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { siteNavigation } from "../db/schema";
import { requireAuth } from "../auth";
import { getVisibleNavigation, MENU_GROUPS, type MenuGroup } from "../../src/lib/nav";

const NAVIGATION_KEY = "main";
const PUBLIC_NAVIGATION_CACHE_TTL_MS = Number(process.env.PUBLIC_NAVIGATION_CACHE_TTL_MS ?? 60_000);
let publicNavigationCache: { expiresAt: number; navigation: MenuGroup[] } | null = null;
const LEGACY_HREFS: Record<string, string> = {
  "#about-us": "/about-us",
  "#career": "/career",
  "#contact": "/contact",
};

export const publicNavigationRouter = Router();
export const adminNavigationRouter = Router();

function isMenuGroup(value: unknown): value is MenuGroup {
  if (!value || typeof value !== "object") return false;
  const group = value as Record<string, unknown>;
  return (
    typeof group.label === "string" &&
    typeof group.href === "string" &&
    (group.footerLabel === undefined || typeof group.footerLabel === "string") &&
    (group.description === undefined || typeof group.description === "string") &&
    (group.visible === undefined || typeof group.visible === "boolean") &&
    Array.isArray(group.items) &&
    group.items.every((item) => {
      if (!item || typeof item !== "object") return false;
      const child = item as Record<string, unknown>;
      return (
        typeof child.label === "string" &&
        typeof child.href === "string" &&
        (child.visible === undefined || typeof child.visible === "boolean")
      );
    })
  );
}

function normalizeHref(href: string) {
  const cleanHref = href.trim();
  return (LEGACY_HREFS[cleanHref] ?? cleanHref) || "#";
}

function normalizeNavigation(value: unknown): MenuGroup[] | null {
  if (!Array.isArray(value) || !value.every(isMenuGroup)) return null;
  return value.map((group) => ({
    label: group.label.trim(),
    footerLabel: group.footerLabel?.trim() || undefined,
    href: normalizeHref(group.href),
    description: group.description?.trim() || undefined,
    visible: group.visible !== false,
    items: group.items.map((item) => ({
      label: item.label.trim(),
      href: normalizeHref(item.href),
      visible: item.visible !== false,
    })),
  }));
}

async function readNavigation() {
  const [row] = await db.select().from(siteNavigation).where(eq(siteNavigation.key, NAVIGATION_KEY));
  return normalizeNavigation(row?.menu) ?? MENU_GROUPS;
}

publicNavigationRouter.get("/navigation", async (_req, res) => {
  if (publicNavigationCache && publicNavigationCache.expiresAt > Date.now()) {
    res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
    res.json({ navigation: publicNavigationCache.navigation });
    return;
  }

  const navigation = getVisibleNavigation(await readNavigation());
  publicNavigationCache = { expiresAt: Date.now() + PUBLIC_NAVIGATION_CACHE_TTL_MS, navigation };
  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
  res.json({ navigation });
});

adminNavigationRouter.use(requireAuth);

adminNavigationRouter.get("/navigation", async (_req, res) => {
  res.json({ navigation: await readNavigation() });
});

adminNavigationRouter.patch("/navigation", async (req, res) => {
  const navigation = normalizeNavigation(req.body?.navigation);
  if (!navigation) {
    res.status(400).json({ error: "Invalid navigation payload" });
    return;
  }

  const [row] = await db
    .insert(siteNavigation)
    .values({ key: NAVIGATION_KEY, menu: navigation, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteNavigation.key,
      set: { menu: navigation, updatedAt: new Date() },
    })
    .returning();

  publicNavigationCache = null;
  res.json({ navigation: normalizeNavigation(row.menu) ?? navigation });
});
