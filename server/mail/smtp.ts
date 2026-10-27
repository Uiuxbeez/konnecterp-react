import nodemailer from "nodemailer";
import type { EmailSettings } from "../../shared/email-settings";
import { decryptPassword, type StoredEmailSettings } from "./email-config";

export function createEmailTransport(settings: StoredEmailSettings) {
  return nodemailer.createTransport({
    host: settings.host, port: settings.port,
    secure: settings.security === "tls",
    requireTLS: settings.security === "starttls",
    auth: { user: settings.username, pass: decryptPassword(settings.encryptedPassword) },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
}

export function notificationEnvelope(settings: EmailSettings) {
  return {
    from: { name: settings.fromName, address: settings.fromEmail },
    to: settings.to.map((address) => ({ address, name: "" })),
    cc: settings.cc.map((address) => ({ address, name: "" })),
  };
}

export function emailDeliveryError(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code === "EAUTH") return "SMTP authentication failed. Check the mailbox username, password/app password and whether SMTP is enabled by your provider.";
  if (["ECONNECTION", "ETIMEDOUT", "EDNS", "ESOCKET"].includes(code || "")) return "Could not connect securely to the SMTP server. Check host, port, security and hosting network access.";
  if (code === "EENVELOPE") return "The provider rejected the sender or recipients. Check the addresses and mailbox sending permissions.";
  return "Email delivery failed. Check your saved settings and provider permissions. If the server encryption key changed, enter the mailbox password again.";
}
