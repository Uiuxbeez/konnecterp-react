import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminForm } from "../lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { DEFAULT_SITE_SETTINGS, type FooterSocialLink, type HeaderCtaAction, type SiteSettings } from "@shared/site-settings";
import type { MenuGroup } from "@/lib/nav";

function emptySocialLink(): FooterSocialLink {
  return { label: "New Link", href: "#", visible: true };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navigation, setNavigation] = useState<MenuGroup[]>([]);
  const [forms, setForms] = useState<AdminForm[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const footer = settings?.footer ?? DEFAULT_SITE_SETTINGS.footer;
  const header = settings?.header ?? DEFAULT_SITE_SETTINGS.header;
  const whatsapp = settings?.whatsapp ?? DEFAULT_SITE_SETTINGS.whatsapp;
  const footerMenuHrefs = useMemo(() => new Set(footer.footerMenuHrefs), [footer.footerMenuHrefs]);

  useEffect(() => {
    Promise.all([adminApi.getSettings(), adminApi.getNavigation(), adminApi.listForms()])
      .then(([settingsRes, navigationRes, formsRes]) => {
        setSettings(settingsRes.settings);
        setNavigation(navigationRes.navigation);
        setForms(formsRes.forms);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load settings"));
  }, []);

  const patchFooter = (patch: Partial<SiteSettings["footer"]>) => {
    setSettings((prev) => ({
      ...(prev ?? DEFAULT_SITE_SETTINGS),
      footer: { ...(prev?.footer ?? DEFAULT_SITE_SETTINGS.footer), ...patch },
    }));
    setSaved(false);
  };

  const patchHeaderCta = (index: number, patch: Partial<SiteSettings["header"]["ctas"][number]>) => {
    setSettings((prev) => ({
      ...(prev ?? DEFAULT_SITE_SETTINGS),
      header: {
        ...(prev?.header ?? DEFAULT_SITE_SETTINGS.header),
        ctas: (prev?.header?.ctas ?? DEFAULT_SITE_SETTINGS.header.ctas).map((cta, i) => i === index ? { ...cta, ...patch } : cta),
      },
    }));
    setSaved(false);
  };

  const patchWhatsapp = (patch: Partial<SiteSettings["whatsapp"]>) => {
    setSettings((prev) => ({
      ...(prev ?? DEFAULT_SITE_SETTINGS),
      whatsapp: { ...(prev?.whatsapp ?? DEFAULT_SITE_SETTINGS.whatsapp), ...patch },
    }));
    setSaved(false);
  };

  const updateSocialLink = (index: number, patch: Partial<FooterSocialLink>) => {
    patchFooter({
      socialLinks: footer.socialLinks.map((link, i) => i === index ? { ...link, ...patch } : link),
    });
  };

  const toggleFooterMenu = (href: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...footer.footerMenuHrefs, href]))
      : footer.footerMenuHrefs.filter((item) => item !== href);
    patchFooter({ footerMenuHrefs: next });
  };

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await adminApi.updateSettings(settings);
      setSettings(res.settings);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Settings</h1>
          <p className="text-xs text-slate-400">Header CTA, footer content, social media links, and footer menu visibility</p>
        </div>
        <Button size="sm" onClick={save} disabled={!settings || saving}>
          <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save Settings"}
        </Button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-6">
        {!settings && !error && <div className="flex justify-center py-16"><Spinner /></div>}
        {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {saved && <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Settings saved</p>}

        {settings && (
          <div className="mx-auto max-w-5xl space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">Header CTA Buttons</h2>
                <p className="mt-1 text-xs text-slate-400">Show, rename, and assign forms or page links for both header buttons.</p>
              </div>

              {forms.length > 0 && (
                <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Created Forms</p>
                  <div className="flex flex-wrap gap-2">
                    {forms.map((form) => (
                      <span key={form.id} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {form.name} /{form.slug}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {header.ctas.map((cta, index) => (
                  <div key={`${cta.style}-${index}`} className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">CTA Button {index + 1}</h3>
                        <p className="mt-1 text-xs text-slate-400">{cta.style === "primary" ? "Orange header button" : "Partner header button"}</p>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Switch checked={cta.enabled} onCheckedChange={(checked) => patchHeaderCta(index, { enabled: checked })} /> Show
                      </label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Button Text">
                        <Input value={cta.text} onChange={(e) => patchHeaderCta(index, { text: e.target.value })} placeholder={index === 0 ? "Request Demo" : "Become a Partner"} />
                      </Field>
                      <Field label="Button Action">
                        <Select
                          value={cta.action}
                          onValueChange={(value) => patchHeaderCta(index, { action: value as HeaderCtaAction, target: value === "demo_modal" ? "" : cta.target })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demo_modal">Open demo popup</SelectItem>
                            <SelectItem value="custom_form_modal">Open selected form popup</SelectItem>
                            <SelectItem value="link">Link to page or URL</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                      {cta.action === "custom_form_modal" && (
                        <Field label="Assign Form">
                          <Select value={cta.target} onValueChange={(value) => patchHeaderCta(index, { target: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={forms.length ? "Select form" : "No forms available"} />
                            </SelectTrigger>
                            <SelectContent>
                              {forms.map((form) => (
                                <SelectItem key={form.id} value={form.slug}>
                                  {form.name} (/{form.slug})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                      {cta.action === "link" && (
                        <Field label="Page Path / URL">
                          <Input value={cta.target} onChange={(e) => patchHeaderCta(index, { target: e.target.value })} placeholder="/contact or https://..." />
                        </Field>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">Footer Content</h2>
                <p className="mt-1 text-xs text-slate-400">Manage the footer tagline and copyright text shown across all pages.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Footer Tagline">
                  <Textarea value={footer.tagline} onChange={(e) => patchFooter({ tagline: e.target.value })} />
                </Field>
                <Field label="Copyright Text">
                  <Input value={footer.copyright} onChange={(e) => patchFooter({ copyright: e.target.value })} />
                </Field>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Social Media Links</h2>
                  <p className="mt-1 text-xs text-slate-400">Add links and choose which social icons appear in the footer.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => patchFooter({ socialLinks: [...footer.socialLinks, emptySocialLink()] })}>
                  <Plus className="h-3.5 w-3.5" /> Add Link
                </Button>
              </div>

              <div className="space-y-3">
                {footer.socialLinks.map((link, index) => (
                  <div key={`${link.label}-${index}`} className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-[1fr_1.6fr_110px_40px]">
                    <Input value={link.label} onChange={(e) => updateSocialLink(index, { label: e.target.value })} placeholder="Facebook" />
                    <Input value={link.href} onChange={(e) => updateSocialLink(index, { href: e.target.value })} placeholder="https://..." />
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Switch checked={link.visible !== false} onCheckedChange={(checked) => updateSocialLink(index, { visible: checked })} /> Show
                    </label>
                    <Button type="button" variant="ghost" size="icon" onClick={() => patchFooter({ socialLinks: footer.socialLinks.filter((_, i) => i !== index) })}>
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">Footer Menus</h2>
                <p className="mt-1 text-xs text-slate-400">Choose which main menu groups should appear as footer columns.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {navigation.map((group) => (
                  <div key={`${group.label}-${group.href}`} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{group.footerLabel ?? group.label}</p>
                      <p className="mt-1 text-xs text-slate-400">{group.items.length} submenu links</p>
                    </div>
                    <Switch checked={footerMenuHrefs.has(group.href)} onCheckedChange={(checked) => toggleFooterMenu(group.href, checked)} />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">WhatsApp Sticky Button</h2>
                  <p className="mt-1 text-xs text-slate-400">Control the bottom-right WhatsApp connect button shown on public pages.</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Switch checked={whatsapp.enabled} onCheckedChange={(checked) => patchWhatsapp({ enabled: checked })} /> Show
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="WhatsApp Phone Number">
                  <Input value={whatsapp.phone} onChange={(e) => patchWhatsapp({ phone: e.target.value })} placeholder="919843111651" />
                </Field>
                <Field label="Default Message Text">
                  <Textarea value={whatsapp.message} onChange={(e) => patchWhatsapp({ message: e.target.value })} />
                </Field>
              </div>
            </section>
          </div>
        )}
      </main>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
