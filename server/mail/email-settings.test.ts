import assert from "node:assert/strict";
import test from "node:test";
import nodemailer from "nodemailer";
import { DEFAULT_EMAIL_SETTINGS, emailConfigurationError, emailSettingsInputSchema } from "../../shared/email-settings";
import { decryptPassword, encryptPassword, mergeEmailSettings, publicEmailSettings } from "./email-config";
import { emailDeliveryError, notificationEnvelope } from "./smtp";

process.env.EMAIL_SETTINGS_ENCRYPTION_KEY = "test-only-encryption-key-not-a-real-secret";
process.env.DATABASE_URL ||= "postgres://unused:unused@localhost/unused";

const config = {
  ...DEFAULT_EMAIL_SETTINGS, enabled: true, host: "smtp.example.com", username: "website@example.com",
  fromName: "Website", fromEmail: "website@example.com", to: ["client@example.com"], cc: ["team@example.com"],
};

test("encrypts secrets with random authenticated encryption and returns only a presence flag", () => {
  const secret = "test-mailbox-password";
  const encrypted = encryptPassword(secret);
  assert.notEqual(encrypted, encryptPassword(secret));
  assert.ok(!encrypted.includes(secret));
  assert.equal(decryptPassword(encrypted), secret);
  const parts = encrypted.split(":");
  parts[3] = Buffer.from("tampered").toString("base64");
  assert.throws(() => decryptPassword(parts.join(":")));
  const view = publicEmailSettings({ ...config, encryptedPassword: encrypted });
  assert.equal(view.passwordConfigured, true);
  assert.ok(!("encryptedPassword" in view));
  assert.ok(!("password" in view));
});

test("blank password keeps the saved secret, and a replacement changes it", () => {
  const saved = mergeEmailSettings(config, "old-password", null);
  assert.equal(mergeEmailSettings(config, "", saved).encryptedPassword, saved.encryptedPassword);
  assert.equal(decryptPassword(mergeEmailSettings(config, "new-password", saved).encryptedPassword), "new-password");
  assert.equal(publicEmailSettings(null).enabled, false);
});

test("validates recipients, connection settings and required enabled configuration", () => {
  assert.equal(emailSettingsInputSchema.safeParse(config).success, true);
  for (const patch of [{ to: ["invalid"] }, { cc: ["test@example.com\r\nBcc: attacker@example.com"] }, { port: 0 }, { security: "none" }, { host: "https://smtp.example.com" }]) {
    assert.equal(emailSettingsInputSchema.safeParse({ ...config, ...patch }).success, false);
  }
  assert.ok(emailConfigurationError(config, false));
  assert.ok(emailConfigurationError({ ...config, to: [] }, true));
  assert.equal(emailConfigurationError(config, true), null);
  assert.deepEqual(notificationEnvelope(config).cc, [{ name: "", address: "team@example.com" }]);
  assert.ok(!emailDeliveryError({ message: "secret-password" }).includes("secret-password"));
});

test("all form types use central recipients and CC, include fields and resume links, and preserve Reply-To", async () => {
  const { sendConfiguredFormEmail } = await import("./formMailer");
  const stored = mergeEmailSettings(config, "test-password", null);
  for (const formSlug of ["career-application", "demo-request", "contact", "custom-form"]) {
    let mail: Record<string, any> | undefined;
    const transport = nodemailer.createTransport({ jsonTransport: true });
    const send = transport.sendMail.bind(transport);
    transport.sendMail = (async (options: any) => {
      const result = await send(options);
      mail = JSON.parse(result.message.toString());
      return { ...result, rejected: [] };
    }) as typeof transport.sendMail;
    const input = {
      leadId: 12, formName: formSlug, formSlug, fields: [
        { id: "email", label: "Email", type: "email" as const, required: true, placeholder: "" },
        { id: "resume", label: "Resume", type: "file" as const, required: false, placeholder: "" },
        { id: "message", label: "Message", type: "textarea" as const, required: false, placeholder: "" },
      ],
      values: { email: "applicant@example.com", resume: "https://example.com/uploads/resume.pdf", message: "<script>alert(1)</script>" },
      source: "website", pageUrl: "https://example.com", submittedAt: new Date(),
    };
    assert.deepEqual(await sendConfiguredFormEmail(input, stored, () => transport), { sent: true, skipped: false });
    assert.equal(mail?.to[0].address, "client@example.com");
    assert.equal(mail?.cc[0].address, "team@example.com");
    assert.equal(mail?.replyTo[0].address, "applicant@example.com");
    assert.ok(mail?.html.includes("https://example.com/uploads/resume.pdf"));
    assert.ok(!mail?.html.includes("<script>"));
    assert.ok(mail?.text.includes("Lead ID: 12"));
    assert.deepEqual(await sendConfiguredFormEmail(input, { ...stored, enabled: false }, () => { throw new Error("must not connect"); }), { sent: false, skipped: true });
    await assert.rejects(sendConfiguredFormEmail(input, stored, () => { throw new Error("SMTP unavailable"); }), /SMTP unavailable/);
  }
});
