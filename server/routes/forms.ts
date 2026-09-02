import { Router } from "express";
import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "../db/client";
import { forms, leads } from "../db/schema";
import { requireAuth } from "../auth";
import { DEFAULT_DEMO_FORM, type FormFieldDef } from "../../shared/forms";
import { sendFormSubmissionEmail } from "../mail/formMailer";

export const adminFormsRouter = Router();
export const publicFormsRouter = Router();

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FORM_RECIPIENT = process.env.FORM_DEFAULT_RECIPIENT || "sales@konnectbi.com";
const CAREER_FORM_RECIPIENT = process.env.FORM_CAREER_RECIPIENT || "hr@konnectbi.com";

function inferDefaultRecipient(...values: unknown[]) {
  const searchable = values.map((value) => String(value ?? "").toLowerCase()).join(" ");
  return /\b(career|job|hr|apply|resume)\b/.test(searchable) ? CAREER_FORM_RECIPIENT : DEFAULT_FORM_RECIPIENT;
}

function cleanEmailRecipient(value: unknown, fallback: string) {
  const email = typeof value === "string" ? value.trim() : "";
  return EMAIL_RE.test(email) ? email : fallback;
}

function cleanFields(value: unknown): FormFieldDef[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((field) => {
      if (!field || typeof field !== "object") return null;
      const f = field as Record<string, unknown>;
      const id = typeof f.id === "string" ? f.id.trim() : "";
      const label = typeof f.label === "string" ? f.label.trim() : "";
      const type = typeof f.type === "string" ? f.type : "text";
      if (!id || !label || !["text", "email", "tel", "textarea", "select", "file"].includes(type)) return null;
      return {
        id,
        label,
        type: type as FormFieldDef["type"],
        placeholder: typeof f.placeholder === "string" ? f.placeholder : "",
        required: f.required === true,
        options: Array.isArray(f.options) ? f.options.map(String).filter(Boolean) : [],
      };
    })
    .filter(Boolean) as FormFieldDef[];
}

async function ensureDefaultDemoForm() {
  const [existing] = await db.select().from(forms).where(eq(forms.slug, "demo-request"));
  if (existing) {
    if (existing.shortDescription === "See how KonnectERP fits your operations.") {
      const [updated] = await db
        .update(forms)
        .set({ shortDescription: DEFAULT_DEMO_FORM.settings.shortDescription, updatedAt: new Date() })
        .where(eq(forms.id, existing.id))
        .returning();
      return updated;
    }
    return existing;
  }
  const [created] = await db
    .insert(forms)
    .values({
      slug: "demo-request",
      name: "Demo Request",
      title: DEFAULT_DEMO_FORM.settings.title,
      shortDescription: DEFAULT_DEMO_FORM.settings.shortDescription,
      submitButtonText: DEFAULT_DEMO_FORM.settings.submitButtonText,
      successTitle: DEFAULT_DEMO_FORM.settings.successTitle,
      successMessage: DEFAULT_DEMO_FORM.settings.successMessage,
      antiSpamEnabled: DEFAULT_DEMO_FORM.settings.antiSpamEnabled,
      emailRecipient: DEFAULT_FORM_RECIPIENT,
      fields: DEFAULT_DEMO_FORM.fields,
      status: "active",
    })
    .returning();
  return created;
}

function toForm(row: typeof forms.$inferSelect, { includeRecipient = false } = {}) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    fields: row.fields,
    settings: {
      title: row.title,
      shortDescription: row.shortDescription,
      submitButtonText: row.submitButtonText,
      successTitle: row.successTitle,
      successMessage: row.successMessage,
      antiSpamEnabled: row.antiSpamEnabled,
      ...(includeRecipient ? { emailRecipient: row.emailRecipient } : {}),
    },
  };
}

function validateSubmission(fields: FormFieldDef[], values: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const rawValue = values[field.id];
    const value = typeof rawValue === "string" ? rawValue.trim() : "";
    if (field.required && !value) errors[field.id] = `${field.label} is required`;
    if (value && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field.id] = "Enter a valid email";
    if (value && field.type === "tel" && !/^\+?[\d\s\-()]{7,}$/.test(value)) errors[field.id] = "Enter a valid phone number";
    if (value && field.type === "select" && field.options?.length && !field.options.includes(value)) errors[field.id] = "Choose a valid option";
    if (value && field.type === "file" && !/^https?:\/\/.+\/uploads\/forms\/.+/i.test(value)) errors[field.id] = "Upload a valid file";
  }
  return errors;
}

adminFormsRouter.use(requireAuth);

adminFormsRouter.get("/forms", async (_req, res) => {
  await ensureDefaultDemoForm();
  const rows = await db.select().from(forms).orderBy(desc(forms.updatedAt));
  res.json({ forms: rows.map((row) => toForm(row, { includeRecipient: true })) });
});

adminFormsRouter.post("/forms", async (req, res) => {
  const body = req.body ?? {};
  if (typeof body.slug !== "string" || !SLUG_RE.test(body.slug)) {
    res.status(400).json({ error: "Slug must be lowercase letters, numbers, and hyphens only" });
    return;
  }
  const fields = cleanFields(body.fields);
  if (!fields.length) {
    res.status(400).json({ error: "Add at least one form field" });
    return;
  }
  const [created] = await db
    .insert(forms)
    .values({
      slug: body.slug,
      name: String(body.name || body.title || "Untitled Form").trim(),
      title: String(body.title || "Untitled Form").trim(),
      shortDescription: String(body.shortDescription || ""),
      submitButtonText: String(body.submitButtonText || "Submit"),
      successTitle: String(body.successTitle || "Thank you"),
      successMessage: String(body.successMessage || "We have received your submission."),
      antiSpamEnabled: body.antiSpamEnabled !== false,
      emailRecipient: cleanEmailRecipient(body.emailRecipient, inferDefaultRecipient(body.slug, body.name, body.title)),
      fields,
      status: body.status === "inactive" ? "inactive" : "active",
    })
    .returning();
  res.status(201).json(toForm(created, { includeRecipient: true }));
});

adminFormsRouter.patch("/forms/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body ?? {};
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.slug === "string") {
    const slug = body.slug.trim();
    if (!SLUG_RE.test(slug)) {
      res.status(400).json({ error: "Slug must be lowercase letters, numbers, and hyphens only" });
      return;
    }
    const [duplicate] = await db.select().from(forms).where(and(eq(forms.slug, slug), ne(forms.id, id)));
    if (duplicate) {
      res.status(409).json({ error: "Another form already uses this slug" });
      return;
    }
    patch.slug = slug;
  }
  if (typeof body.name === "string") patch.name = body.name.trim();
  if (typeof body.title === "string") patch.title = body.title.trim();
  if (typeof body.shortDescription === "string") patch.shortDescription = body.shortDescription;
  if (typeof body.submitButtonText === "string") patch.submitButtonText = body.submitButtonText;
  if (typeof body.successTitle === "string") patch.successTitle = body.successTitle;
  if (typeof body.successMessage === "string") patch.successMessage = body.successMessage;
  if (typeof body.antiSpamEnabled === "boolean") patch.antiSpamEnabled = body.antiSpamEnabled;
  if (typeof body.emailRecipient === "string") {
    const email = body.emailRecipient.trim();
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: "Enter a valid recipient email address" });
      return;
    }
    patch.emailRecipient = email;
  }
  if (body.status === "active" || body.status === "inactive") patch.status = body.status;
  if (body.fields !== undefined) patch.fields = cleanFields(body.fields);

  const [updated] = await db.update(forms).set(patch).where(eq(forms.id, id)).returning();
  if (!updated) {
    res.status(404).json({ error: "Form not found" });
    return;
  }
  res.json(toForm(updated, { includeRecipient: true }));
});

adminFormsRouter.delete("/forms/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [deleted] = await db.delete(forms).where(eq(forms.id, id)).returning();
  if (!deleted) {
    res.status(404).json({ error: "Form not found" });
    return;
  }
  res.status(204).end();
});

adminFormsRouter.get("/leads", async (_req, res) => {
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
  res.json({ leads: rows });
});

publicFormsRouter.get("/forms/:slug", async (req, res) => {
  if (req.params.slug === "demo-request") await ensureDefaultDemoForm();
  const [form] = await db.select().from(forms).where(eq(forms.slug, req.params.slug));
  if (!form || form.status !== "active") {
    res.status(404).json({ error: "Form not found" });
    return;
  }
  res.json({ form: toForm(form) });
});

publicFormsRouter.post("/forms/:slug/submit", async (req, res) => {
  if (req.params.slug === "demo-request") await ensureDefaultDemoForm();
  const [form] = await db.select().from(forms).where(eq(forms.slug, req.params.slug));
  if (!form || form.status !== "active") {
    res.status(404).json({ error: "Form not found" });
    return;
  }
  const body = req.body ?? {};
  if (typeof body.website === "string" && body.website.trim()) {
    res.status(400).json({ error: "Submission rejected" });
    return;
  }
  if (form.antiSpamEnabled && Number(body.captchaAnswer) !== Number(body.captchaA) + Number(body.captchaB)) {
    res.status(400).json({ error: "Please answer the anti-spam question correctly" });
    return;
  }

  const values = body.values && typeof body.values === "object" ? body.values as Record<string, unknown> : {};
  const fields = cleanFields(form.fields);
  const errors = validateSubmission(fields, values);
  if (Object.keys(errors).length) {
    res.status(400).json({ error: "Please check the form fields", errors });
    return;
  }
  const textValue = (key: string) => (typeof values[key] === "string" ? values[key].trim() : "");
  const [lead] = await db
    .insert(leads)
    .values({
      formId: form.id,
      formSlug: form.slug,
      formName: form.name,
      name: textValue("name"),
      email: textValue("email"),
      phone: textValue("phone"),
      company: textValue("company"),
      data: values,
      source: String(body.source || "website"),
    })
    .returning();

  try {
    await sendFormSubmissionEmail({
      leadId: lead.id,
      formName: form.name,
      formSlug: form.slug,
      recipient: form.emailRecipient || inferDefaultRecipient(form.slug, form.name, form.title),
      fields,
      values,
      source: String(body.source || "website"),
      pageUrl: typeof body.pageUrl === "string" ? body.pageUrl : "",
      submittedAt: lead.createdAt,
    });
  } catch (error) {
    console.error("Failed to send form submission email", error);
  }

  res.status(201).json({ ok: true, leadId: lead.id });
});
