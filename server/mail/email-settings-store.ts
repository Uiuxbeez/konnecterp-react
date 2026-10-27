import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { siteSettings } from "../db/schema";
import type { StoredEmailSettings } from "./email-config";

// This key is deliberately separate from the public site settings record.
const EMAIL_SETTINGS_KEY = "email_private";
export async function loadEmailSettings(): Promise<StoredEmailSettings | null> {
  const [row] = await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, EMAIL_SETTINGS_KEY));
  return row ? row.value as StoredEmailSettings : null;
}
export async function saveEmailSettings(settings: StoredEmailSettings) {
  await db.insert(siteSettings).values({ key: EMAIL_SETTINGS_KEY, value: settings })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: settings, updatedAt: new Date() } });
}
