import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";
import { DEFAULT_EMAIL_SETTINGS, emailSettingsSchema, type EmailSettings, type EmailSettingsView } from "../../shared/email-settings";

export type StoredEmailSettings = EmailSettings & { encryptedPassword: string };

function encryptionKey() {
  const secret = process.env.EMAIL_SETTINGS_ENCRYPTION_KEY || process.env.JWT_SECRET;
  if (!secret) throw new Error("Email settings encryption is unavailable.");
  return Buffer.from(hkdfSync("sha256", secret, "konnect-email-settings", "smtp-password-v1", 32));
}

export function encryptPassword(password: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), ciphertext.toString("base64")].join(":");
}

export function decryptPassword(value: string) {
  const [version, iv, tag, ciphertext] = value.split(":");
  if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Saved email password is unavailable. Enter it again in Email Settings.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64")), decipher.final()]).toString("utf8");
}

export function publicEmailSettings(stored: StoredEmailSettings | null): EmailSettingsView {
  return { ...emailSettingsSchema.parse(stored || DEFAULT_EMAIL_SETTINGS), passwordConfigured: Boolean(stored?.encryptedPassword) };
}

export function mergeEmailSettings(settings: EmailSettings, password: string | undefined, previous: StoredEmailSettings | null): StoredEmailSettings {
  return { ...emailSettingsSchema.parse(settings), encryptedPassword: password ? encryptPassword(password) : previous?.encryptedPassword || "" };
}
