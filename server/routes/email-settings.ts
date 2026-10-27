import { Router } from "express";
import { requireAuth } from "../auth";
import { emailSettingsInputSchema, emailConfigurationError } from "../../shared/email-settings";
import { mergeEmailSettings, publicEmailSettings } from "../mail/email-config";
import { loadEmailSettings, saveEmailSettings } from "../mail/email-settings-store";
import { createEmailTransport, emailDeliveryError, notificationEnvelope } from "../mail/smtp";

export const adminEmailSettingsRouter = Router();
adminEmailSettingsRouter.use(requireAuth);
adminEmailSettingsRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
adminEmailSettingsRouter.get("/email-settings", async (_req, res) => {
  res.json({ settings: publicEmailSettings(await loadEmailSettings()) });
});
adminEmailSettingsRouter.put("/email-settings", async (req, res) => {
  const parsed = emailSettingsInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ") });
    return;
  }
  const { password, ...settings } = parsed.data;
  const previous = await loadEmailSettings();
  const validationError = emailConfigurationError(settings, Boolean(password || previous?.encryptedPassword));
  if (settings.enabled && validationError) {
    res.status(400).json({ error: validationError });
    return;
  }
  const stored = mergeEmailSettings(settings, password, previous);
  await saveEmailSettings(stored);
  res.json({ settings: publicEmailSettings(stored) });
});

let nextTestAt = 0;
adminEmailSettingsRouter.post("/email-settings/test", async (_req, res) => {
  if (Date.now() < nextTestAt) {
    res.status(429).json({ error: "Wait 30 seconds before sending another test email." });
    return;
  }
  const settings = await loadEmailSettings();
  const validationError = settings ? emailConfigurationError(settings, Boolean(settings.encryptedPassword)) : "Save your email settings first.";
  if (!settings || validationError) {
    res.status(400).json({ error: validationError });
    return;
  }
  nextTestAt = Date.now() + 30_000;
  try {
    const result = await createEmailTransport(settings).sendMail({
      ...notificationEnvelope(settings),
      subject: "Website email settings test",
      text: "This is a test from your website Email Settings. Form submission notifications will be sent to these recipients and CC addresses when enabled.",
    });
    if (result.rejected.length) {
      res.status(502).json({ error: "The SMTP server rejected one or more recipients. Check all To and CC addresses." });
      return;
    }
    res.json({ message: "Test email accepted by the SMTP server for all recipients and CC addresses. Check their inboxes and spam folders." });
  } catch (error) {
    res.status(502).json({ error: emailDeliveryError(error) });
  }
});
