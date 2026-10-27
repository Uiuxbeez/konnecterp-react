import { z } from "zod";

const address = z.string().trim().max(254).email();
export const emailSettingsSchema = z.object({
  enabled: z.boolean(),
  host: z.string().trim().max(253).refine((v) => !v || /^[a-zA-Z0-9.-]+$/.test(v), "Enter a server hostname without a protocol or port"),
  port: z.number().int().min(1).max(65535),
  security: z.enum(["starttls", "tls"]),
  username: z.string().trim().max(254),
  fromName: z.string().trim().max(100).refine((v) => !/[\r\n]/.test(v), "Sender name must be one line"),
  fromEmail: z.union([address, z.literal("")]),
  to: z.array(address).max(20),
  cc: z.array(address).max(20),
  careerTo: z.array(address).max(20).default([]),
});
export type EmailSettings = z.infer<typeof emailSettingsSchema>;
export type EmailSettingsView = EmailSettings & { passwordConfigured: boolean };
export const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  enabled: false, host: "", port: 587, security: "starttls", username: "",
  fromName: "", fromEmail: "", to: [], cc: [], careerTo: [],
};
export const emailSettingsInputSchema = emailSettingsSchema.extend({ password: z.string().max(2048).optional() });

export function emailConfigurationError(settings: EmailSettings, hasPassword: boolean): string | null {
  if (!settings.host || !settings.username || !settings.fromEmail || !settings.to.length) {
    return "Enter the SMTP server, username, sender email and at least one recipient.";
  }
  if (!hasPassword) return "Enter the mailbox password or provider app password.";
  return null;
}
