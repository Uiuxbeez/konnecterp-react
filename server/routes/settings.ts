import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { siteSettings } from "../db/schema";
import { requireAuth } from "../auth";
import {
  DEFAULT_SITE_SETTINGS,
  type FooterBottomLink,
  type FooterSocialLink,
  type HeaderCtaAction,
  type HeaderCtaButton,
  type SiteSettings,
} from "../../shared/site-settings";

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

function normalizeBottomLink(value: unknown): FooterBottomLink | null {
  if (!value || typeof value !== "object") return null;
  const link = value as Record<string, unknown>;
  if (typeof link.label !== "string" || typeof link.href !== "string") return null;

  return {
    label: link.label.trim(),
    href: link.href.trim() || "#",
    visible: link.visible !== false,
  };
}

function normalizeHeaderCta(value: unknown, fallback: HeaderCtaButton): HeaderCtaButton {
  if (!value || typeof value !== "object") return fallback;
  const cta = value as Record<string, unknown>;
  const action = typeof cta.action === "string" && ["demo_modal", "custom_form_modal", "link"].includes(cta.action)
    ? cta.action as HeaderCtaAction
    : fallback.action;
  const style = cta.style === "secondary" ? "secondary" : fallback.style;

  return {
    enabled: typeof cta.enabled === "boolean" ? cta.enabled : fallback.enabled,
    text: typeof cta.text === "string" && cta.text.trim() ? cta.text.trim() : fallback.text,
    action,
    target: typeof cta.target === "string" ? cta.target.trim() : fallback.target,
    style,
  };
}

function normalizeSettings(value: unknown): SiteSettings {
  if (!value || typeof value !== "object") return DEFAULT_SITE_SETTINGS;
  const settings = value as Record<string, unknown>;
  const header = settings.header && typeof settings.header === "object" ? settings.header as Record<string, unknown> : {};
  const footer = settings.footer && typeof settings.footer === "object" ? settings.footer as Record<string, unknown> : {};
  const whatsapp = settings.whatsapp && typeof settings.whatsapp === "object" ? settings.whatsapp as Record<string, unknown> : {};
  const formsSettings = settings.forms && typeof settings.forms === "object" ? settings.forms as Record<string, unknown> : {};
  const popupDelay = Number(formsSettings.autoPopupDelaySeconds);
  const rawHeaderCtas = Array.isArray(header.ctas) ? header.ctas : null;
  const headerCtas = rawHeaderCtas
    ? DEFAULT_SITE_SETTINGS.header.ctas.map((fallback, index) => normalizeHeaderCta(rawHeaderCtas[index], fallback))
    : [
        normalizeHeaderCta(header.cta, DEFAULT_SITE_SETTINGS.header.ctas[0]),
        DEFAULT_SITE_SETTINGS.header.ctas[1],
      ];
  const socialLinks = Array.isArray(footer.socialLinks)
    ? footer.socialLinks.map(normalizeSocialLink).filter((link): link is FooterSocialLink => link !== null && link.label.length > 0)
    : DEFAULT_SITE_SETTINGS.footer.socialLinks;
  const footerMenuHrefs = Array.isArray(footer.footerMenuHrefs)
    ? footer.footerMenuHrefs.filter((href): href is string => typeof href === "string").map((href) => href.trim()).filter(Boolean)
    : DEFAULT_SITE_SETTINGS.footer.footerMenuHrefs;
  const bottomLinks = Array.isArray(footer.bottomLinks)
    ? footer.bottomLinks.map(normalizeBottomLink).filter((link): link is FooterBottomLink => link !== null && link.label.length > 0)
    : DEFAULT_SITE_SETTINGS.footer.bottomLinks;

  return {
    header: {
      ctas: headerCtas,
    },
    footer: {
      tagline: typeof footer.tagline === "string" ? footer.tagline : DEFAULT_SITE_SETTINGS.footer.tagline,
      copyright: typeof footer.copyright === "string" ? footer.copyright : DEFAULT_SITE_SETTINGS.footer.copyright,
      socialLinks,
      footerMenuHrefs,
      bottomLinks,
    },
    whatsapp: {
      enabled: typeof whatsapp.enabled === "boolean" ? whatsapp.enabled : DEFAULT_SITE_SETTINGS.whatsapp.enabled,
      phone: typeof whatsapp.phone === "string" ? whatsapp.phone.trim() : DEFAULT_SITE_SETTINGS.whatsapp.phone,
      message: typeof whatsapp.message === "string" ? whatsapp.message : DEFAULT_SITE_SETTINGS.whatsapp.message,
    },
    forms: {
      autoPopupDelaySeconds: Number.isFinite(popupDelay)
        ? Math.max(0, Math.min(300, Math.round(popupDelay)))
        : DEFAULT_SITE_SETTINGS.forms.autoPopupDelaySeconds,
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
