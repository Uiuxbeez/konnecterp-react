import { loadEmailSettings } from "./email-settings-store";
import { createEmailTransport, notificationEnvelope } from "./smtp";
import { emailConfigurationError } from "../../shared/email-settings";
import type { StoredEmailSettings } from "./email-config";
import type { FormFieldDef } from "../../shared/forms";

type FormEmailInput = {
  leadId: number;
  formName: string;
  formSlug: string;
  fields: FormFieldDef[];
  values: Record<string, unknown>;
  source: string;
  pageUrl: string;
  submittedAt: Date;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPrimaryValue(fields: FormFieldDef[], values: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const direct = values[key];
    if (typeof direct === "string" && direct.trim()) return direct.trim();
  }

  for (const field of fields) {
    const label = field.label.toLowerCase();
    if (!keys.some((key) => label.includes(key))) continue;
    const value = values[field.id];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

function buildFieldRows(fields: FormFieldDef[], values: Record<string, unknown>) {
  return fields.map((field) => {
    const value = values[field.id];
    const displayValue = Array.isArray(value) ? value.join(", ") : String(value ?? "").trim();
    return { label: field.label, value: displayValue || "-", type: field.type };
  });
}

function renderHtml(input: FormEmailInput) {
  const rows = buildFieldRows(input.fields, input.values);
  const summaryItems = [
    ["Name", getPrimaryValue(input.fields, input.values, ["name"])],
    ["Email", getPrimaryValue(input.fields, input.values, ["email"])],
    ["Phone", getPrimaryValue(input.fields, input.values, ["phone", "mobile"])],
    ["Company", getPrimaryValue(input.fields, input.values, ["company", "organization"])],
  ].filter(([, value]) => value);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#0b1f4a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dbe3ef;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#f97316 0%,#0b1f4a 100%);padding:24px 28px;color:#ffffff;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">New Website Form Submission</p>
                <h1 style="margin:0;font-size:24px;line-height:1.25;">${escapeHtml(input.formName)}</h1>
                <p style="margin:10px 0 0;font-size:13px;line-height:1.6;color:#dbeafe;">Lead #${input.leadId} from ${escapeHtml(input.formSlug)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                ${summaryItems.length ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;"><tr>${summaryItems.map(([label, value]) => `<td style="width:25%;padding:10px;background:#f8fafc;border:1px solid #e2e8f0;"><p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">${escapeHtml(label)}</p><p style="margin:0;font-size:13px;font-weight:700;color:#0b1f4a;word-break:break-word;">${escapeHtml(value)}</p></td>`).join("")}</tr></table>` : ""}
                <h2 style="margin:0 0 12px;font-size:16px;color:#0b1f4a;">Submitted Details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${rows.map((row) => `<tr><td style="width:34%;padding:12px;border:1px solid #e2e8f0;background:#f8fafc;font-size:13px;font-weight:700;color:#334155;">${escapeHtml(row.label)}</td><td style="padding:12px;border:1px solid #e2e8f0;font-size:13px;line-height:1.6;color:#0f172a;white-space:pre-wrap;word-break:break-word;">${row.type === "file" && row.value !== "-" ? `<a href="${escapeHtml(row.value)}" style="color:#f97316;font-weight:700;text-decoration:underline;">Download uploaded file</a>` : escapeHtml(row.value)}</td></tr>`).join("")}
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">
                  <tr><td style="padding:10px 0;font-size:12px;color:#64748b;"><strong>Source:</strong> ${escapeHtml(input.source)}</td></tr>
                  <tr><td style="padding:10px 0;font-size:12px;color:#64748b;"><strong>Page URL:</strong> ${escapeHtml(input.pageUrl || "-")}</td></tr>
                  <tr><td style="padding:10px 0;font-size:12px;color:#64748b;"><strong>Submitted:</strong> ${escapeHtml(input.submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(input: FormEmailInput) {
  const rows = buildFieldRows(input.fields, input.values);
  return [
    `New Website Form Submission: ${input.formName}`,
    `Lead ID: ${input.leadId}`,
    `Form: ${input.formSlug}`,
    `Source: ${input.source}`,
    `Page URL: ${input.pageUrl || "-"}`,
    `Submitted: ${input.submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    "",
    "Submitted Details:",
    ...rows.map((row) => `${row.label}: ${row.value}`),
  ].join("\n");
}

export async function sendFormSubmissionEmail(input: FormEmailInput) {
  return sendConfiguredFormEmail(input, await loadEmailSettings());
}

export async function sendConfiguredFormEmail(input: FormEmailInput, settings: StoredEmailSettings | null, createTransport = createEmailTransport) {
  if (!settings?.enabled) {
    return { sent: false, skipped: true };
  }
  const validationError = emailConfigurationError(settings, Boolean(settings.encryptedPassword));
  if (validationError) throw new Error(validationError);
  const transporter = createTransport(settings);
  const replyTo = getPrimaryValue(input.fields, input.values, ["email"]);
  const result = await transporter.sendMail({
    ...notificationEnvelope(settings, input),
    replyTo: /^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(replyTo) ? { address: replyTo, name: "" } : undefined,
    subject: `New ${input.formName} submission`,
    html: renderHtml(input),
    text: renderText(input),
  });
  if (result.rejected.length) throw new Error("One or more notification recipients were rejected by the SMTP server.");

  return { sent: true, skipped: false };
}
