import { useEffect, useState } from "react";
import { adminApi } from "../lib/admin-api";
import type { EmailSettingsView } from "@shared/email-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const splitAddresses = (value: string) => value.split(/[,;\n]/).map((part) => part.trim()).filter(Boolean);

export function EmailSettings() {
  const [settings, setSettings] = useState<EmailSettingsView | null>(null);
  const [password, setPassword] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [careerTo, setCareerTo] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    adminApi.getEmailSettings().then(({ settings }) => {
      setSettings(settings); setTo(settings.to.join(", ")); setCc(settings.cc.join(", "));
      setCareerTo((settings.careerTo ?? []).join(", "));
    }).catch((error) => setError(error.message));
  }, []);
  const changed = () => { setDirty(true); setMessage(""); setError(""); };
  const patch = (value: Partial<EmailSettingsView>) => { setSettings((current) => current ? { ...current, ...value } : current); changed(); };
  const save = async () => {
    if (!settings) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const { passwordConfigured: _configured, ...data } = settings;
      const result = await adminApi.saveEmailSettings({ ...data, to: splitAddresses(to), cc: splitAddresses(cc), careerTo: splitAddresses(careerTo), password });
      setSettings(result.settings); setPassword(""); setDirty(false);
      setMessage("Email settings saved. Use Send Test Email to check delivery.");
    } catch (error) { setError(error instanceof Error ? error.message : "Could not save email settings"); }
    finally { setBusy(false); }
  };
  const test = async () => {
    setBusy(true); setError(""); setMessage("");
    try { setMessage((await adminApi.testEmailSettings()).message); }
    catch (error) { setError(error instanceof Error ? error.message : "Could not send test email"); }
    finally { setBusy(false); }
  };
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Email Settings</h2>
        <p className="text-sm text-slate-500">Email notifications for every form, including demo requests, contact enquiries and career applications. Submissions are also saved in Leads. Uploaded resumes are included as download links.</p>
      </div>
      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      {!settings && !error && <p className="text-sm text-slate-500">Loading email settings...</p>}
      {settings && <fieldset disabled={busy} className="space-y-4 disabled:opacity-70">
        <div className="flex items-center gap-3">
          <Switch id="email-enabled" checked={settings.enabled} onCheckedChange={(enabled) => patch({ enabled })} />
          <Label htmlFor="email-enabled">Enable form email notifications</Label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="email-host">SMTP server</Label><Input id="email-host" value={settings.host} placeholder="Server hostname from your email provider" onChange={(e) => patch({ host: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="email-port">SMTP port</Label><Input id="email-port" type="number" min={1} max={65535} value={settings.port} onChange={(e) => patch({ port: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label htmlFor="email-security">Connection security</Label><select id="email-security" className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" value={settings.security} onChange={(e) => patch({ security: e.target.value as "starttls" | "tls" })}><option value="starttls">STARTTLS (usually port 587)</option><option value="tls">SSL/TLS (usually port 465)</option></select></div>
          <div className="space-y-2"><Label htmlFor="email-username">SMTP username / mailbox address</Label><Input id="email-username" autoComplete="off" value={settings.username} onChange={(e) => patch({ username: e.target.value })} /></div>
          <div className="space-y-2 md:col-span-2"><Label htmlFor="email-password">Mailbox password / app password</Label><Input id="email-password" type="password" autoComplete="new-password" value={password} placeholder={settings.passwordConfigured ? "Password saved — leave blank to keep it" : "Enter your mailbox or app password"} onChange={(e) => { setPassword(e.target.value); changed(); }} /><p className="text-xs text-slate-500">Stored encrypted. The saved password is never displayed. Enter a new value to replace it.</p></div>
          <div className="space-y-2"><Label htmlFor="email-from-name">Sender name</Label><Input id="email-from-name" value={settings.fromName} onChange={(e) => patch({ fromName: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="email-from-address">Sender email</Label><Input id="email-from-address" type="email" value={settings.fromEmail} onChange={(e) => patch({ fromEmail: e.target.value })} /><p className="text-xs text-slate-500">Use the authenticated mailbox or an address it has permission to send from.</p></div>
          <div className="space-y-2"><Label htmlFor="email-to">Send notifications to</Label><Input id="email-to" value={to} placeholder="Separate email addresses with commas" onChange={(e) => { setTo(e.target.value); changed(); }} /></div>
          <div className="space-y-2"><Label htmlFor="email-cc">CC recipients (optional)</Label><Input id="email-cc" value={cc} placeholder="Separate email addresses with commas" onChange={(e) => { setCc(e.target.value); changed(); }} /></div>
          <div className="space-y-2 md:col-span-2"><Label htmlFor="email-career-to">Send career notifications to (optional)</Label><Input id="email-career-to" value={careerTo} placeholder="hr@example.com" onChange={(e) => { setCareerTo(e.target.value); changed(); }} /><p className="text-xs text-slate-500">Career applications use these recipients instead of the main recipients. Separate multiple addresses with commas. Leave blank to use the main recipients. The CC list above still applies. Uses the same SMTP account; no additional password is needed.</p></div>
        </div>
        <p className="text-sm text-slate-500">Main recipients apply to all forms unless career recipients are specified above. Replies go to the submitter's email when supplied. Save here before testing; Send Test Email uses the main To and CC addresses and can be sent while notifications are disabled.</p>
        <div className="rounded-lg bg-slate-50 p-3 space-y-2 text-sm text-slate-600">
          <p className="font-semibold">Google Workspace (G Suite) setup</p>
          <p>SMTP server: smtp.gmail.com · Port: 587 · Security: STARTTLS. Enter the full Workspace email address as the username and sender email.</p>
          <p>Enable 2-Step Verification on the sending Google account, then generate a Google App Password and enter it in the password field. Use the App Password here instead of the normal Google account password. If App Passwords are unavailable, contact the Workspace administrator; this setup requires app-password authentication and does not support Google OAuth sign-in.</p>
          <p>See <a className="text-orange-600 underline" href="https://support.google.com/a/answer/176600" target="_blank" rel="noopener noreferrer">Google's SMTP setup guide</a> and <a className="text-orange-600 underline" href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer">App Password instructions</a>. Save the settings, then send a test email to check your To and CC inboxes.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={save} disabled={busy}>{busy ? "Please wait..." : "Save Email Settings"}</Button>
          <Button type="button" variant="outline" onClick={test} disabled={busy || dirty || !settings.passwordConfigured}>Send Test Email</Button>
          {dirty && <span className="self-center text-xs text-amber-700">Unsaved email changes</span>}
        </div>
      </fieldset>}
    </section>
  );
}
