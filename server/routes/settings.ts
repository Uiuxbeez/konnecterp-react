import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { siteSettings } from "../db/schema";
import { requireAuth } from "../auth";
import { DEFAULT_SITE_SETTINGS, type FooterSocialLink, type SiteSettings } from "../../shared/site-settings";

const SETTINGS_KEY = "site";

export const publicSettingsRouter = Router();
export const adminSettingsRouter = Router();

function normalizeSocialLink(value: unknown): FooterSocialLink | null {
  if (!value || typeof value !== "object") return null;
  const link = value as Record<string, unknown>;
  if (typeof link.label !== "string" || typeof link.href !== "string") return null;

  return {
    label: link.label.trim(),
    href: link.href.trim() || "#",
    visible: link.visible !== false,
  };
}

function normalizeSettings(value: unknown): SiteSettings {
  if (!value || typeof value !== "object") return DEFAULT_SITE_SETTINGS;
  const settings = value as Record<string, unknown>;
  const footer = settings.footer && typeof settings.footer === "object" ? settings.footer as Record<string, unknown> : {};
  const whatsapp = settings.whatsapp && typeof settings.whatsapp === "object" ? settings.whatsapp as Record<string, unknown> : {};
  const socialLinks = Array.isArray(footer.socialLinks)
    ? footer.socialLinks.map(normalizeSocialLink).filter((link): link is FooterSocialLink => link !== null && link.label.length > 0)
    : DEFAULT_SITE_SETTINGS.footer.socialLinks;
  const footerMenuHrefs = Array.isArray(footer.footerMenuHrefs)
    ? footer.footerMenuHrefs.filter((href): href is string => typeof href === "string").map((href) => href.trim()).filter(Boolean)
    : DEFAULT_SITE_SETTINGS.footer.footerMenuHrefs;

  return {
    footer: {
      tagline: typeof footer.tagline === "string" ? footer.tagline : DEFAULT_SITE_SETTINGS.footer.tagline,
      copyright: typeof footer.copyright === "string" ? footer.copyright : DEFAULT_SITE_SETTINGS.footer.copyright,
      socialLinks,
      footerMenuHrefs,
    },
    whatsapp: {
      enabled: typeof whatsapp.enabled === "boolean" ? whatsapp.enabled : DEFAULT_SITE_SETTINGS.whatsapp.enabled,
      phone: typeof whatsapp.phone === "string" ? whatsapp.phone.trim() : DEFAULT_SITE_SETTINGS.whatsapp.phone,
      message: typeof whatsapp.message === "string" ? whatsapp.message : DEFAULT_SITE_SETTINGS.whatsapp.message,
    },
  };
}

async function readSettings() {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, SETTINGS_KEY));
  return normalizeSettings(row?.value);
}

publicSettingsRouter.get("/settings", async (_req, res) => {
  res.json({ settings: await readSettings() });
});

adminSettingsRouter.use(requireAuth);

adminSettingsRouter.get("/settings", async (_req, res) => {
  res.json({ settings: await readSettings() });
});

adminSettingsRouter.patch("/settings", async (req, res) => {
  const settings = normalizeSettings(req.body?.settings);
  const [row] = await db
    .insert(siteSettings)
    .values({ key: SETTINGS_KEY, value: settings, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: settings, updatedAt: new Date() },
    })
    .returning();

  res.json({ settings: normalizeSettings(row.value) });
});
