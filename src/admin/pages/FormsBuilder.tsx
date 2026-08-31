import { useEffect, useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminForm, type AdminFormField } from "../lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";

const FIELD_TYPES: AdminFormField["type"][] = ["text", "email", "tel", "textarea", "select"];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const emptyField = (): AdminFormField => ({
  id: `field_${Date.now()}`,
  label: "New Field",
  type: "text",
  placeholder: "",
  required: false,
  options: [],
});

export default function FormsBuilder() {
  const [forms, setForms] = useState<AdminForm[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState<AdminForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(() => forms?.find((form) => form.id === selectedId) ?? forms?.[0] ?? null, [forms, selectedId]);

  useEffect(() => {
    adminApi.listForms().then((res) => {
      setForms(res.forms);
      setSelectedId(res.forms[0]?.id ?? null);
    }).catch((err) => setError(err instanceof Error ? err.message : "Failed to load forms"));
  }, []);

  useEffect(() => {
    if (selected) setDraft(structuredClone(selected));
  }, [selected]);

  const setDraftField = <K extends keyof AdminForm>(key: K, value: AdminForm[K]) => {
    setDraft((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const setSetting = (key: keyof AdminForm["settings"], value: string | boolean) => {
    setDraft((prev) => prev ? { ...prev, settings: { ...prev.settings, [key]: value } } : prev);
  };

  const updateField = (index: number, patch: Partial<AdminFormField>) => {
    setDraft((prev) => prev ? { ...prev, fields: prev.fields.map((field, i) => i === index ? { ...field, ...patch } : field) } : prev);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await adminApi.updateForm(draft.id, {
        name: draft.name,
        title: draft.settings.title,
        shortDescription: draft.settings.shortDescription,
        submitButtonText: draft.settings.submitButtonText,
        successTitle: draft.settings.successTitle,
        successMessage: draft.settings.successMessage,
        antiSpamEnabled: draft.settings.antiSpamEnabled,
        fields: draft.fields,
      });
      setForms((prev) => prev?.map((form) => form.id === updated.id ? updated : form) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  const createForm = async () => {
    const name = "New Form";
    const created = await adminApi.createForm({
      slug: `new-form-${Date.now()}`,
      name,
      title: name,
      shortDescription: "",
      submitButtonText: "Submit",
      successTitle: "Thank you",
      successMessage: "We have received your submission.",
      antiSpamEnabled: true,
      fields: [emptyField()],
    });
    setForms((prev) => [created, ...(prev ?? [])]);
    setSelectedId(created.id);
  };

  const deleteForm = async (id: number) => {
    if (!confirm("Delete this form? Existing leads will stay in Leads.")) return;
    await adminApi.deleteForm(id);
    setForms((prev) => prev?.filter((form) => form.id !== id) ?? null);
    setSelectedId(null);
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Form Builder</h1>
          <p className="text-xs text-slate-400">Create popup forms, fields, and spam protection</p>
        </div>
        <Button size="sm" onClick={createForm}><Plus className="h-3.5 w-3.5" /> New Form</Button>
      </header>

      <main className="flex min-h-0 flex-1 bg-slate-50">
        <aside className="w-80 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-3">
          {!forms && <div className="flex justify-center py-10"><Spinner /></div>}
          {forms?.map((form) => (
            <button
              key={form.id}
              type="button"
              onClick={() => setSelectedId(form.id)}
              className={`mb-2 w-full rounded-lg border p-3 text-left ${selectedId === form.id ? "border-primary bg-primary/5" : "border-slate-200 hover:bg-slate-50"}`}
            >
              <span className="block text-sm font-bold text-slate-900">{form.name}</span>
              <span className="mt-1 block text-xs text-slate-400">/{form.slug} · {form.fields.length} fields</span>
            </button>
          ))}
        </aside>

        <section className="min-w-0 flex-1 overflow-y-auto p-6">
          {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          {draft && (
            <div className="mx-auto max-w-5xl space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">{draft.name}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => deleteForm(draft.id)}><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
                    <Button size="sm" onClick={save} disabled={saving}><Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save Form"}</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Form Name"><Input value={draft.name} onChange={(e) => setDraftField("name", e.target.value)} /></Field>
                  <Field label="Slug"><Input value={draft.slug} disabled /></Field>
                  <Field label="Popup Title"><Input value={draft.settings.title} onChange={(e) => setSetting("title", e.target.value)} /></Field>
                  <Field label="Submit Button"><Input value={draft.settings.submitButtonText} onChange={(e) => setSetting("submitButtonText", e.target.value)} /></Field>
                  <Field label="Popup Top Header Text"><Textarea value={draft.settings.shortDescription} onChange={(e) => setSetting("shortDescription", e.target.value)} /></Field>
                  <Field label="Success Message"><Textarea value={draft.settings.successMessage} onChange={(e) => setSetting("successMessage", e.target.value)} /></Field>
                  <Field label="Success Title"><Input value={draft.settings.successTitle} onChange={(e) => setSetting("successTitle", e.target.value)} /></Field>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div><Label>Anti-spam question</Label><p className="text-xs text-slate-400">Adds math check plus hidden honeypot.</p></div>
                    <Switch checked={draft.settings.antiSpamEnabled} onCheckedChange={(checked) => setSetting("antiSpamEnabled", checked)} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Fields</h3>
                  <Button variant="outline" size="sm" onClick={() => setDraft((prev) => prev ? { ...prev, fields: [...prev.fields, emptyField()] } : prev)}><Plus className="h-3.5 w-3.5" /> Add Field</Button>
                </div>
                <div className="space-y-3">
                  {draft.fields.map((field, index) => (
                    <div key={field.id} className="grid gap-3 rounded-lg border border-slate-200 p-4 lg:grid-cols-[1fr_1fr_140px_90px_40px]">
                      <Input value={field.label} onChange={(e) => updateField(index, { label: e.target.value, id: slugify(e.target.value) || field.id })} placeholder="Field label" />
                      <Input value={field.placeholder ?? ""} onChange={(e) => updateField(index, { placeholder: e.target.value })} placeholder="Placeholder" />
                      <select value={field.type} onChange={(e) => updateField(index, { type: e.target.value as AdminFormField["type"] })} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm">
                        {FIELD_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Switch checked={field.required === true} onCheckedChange={(checked) => updateField(index, { required: checked })} /> Required
                      </label>
                      <Button variant="ghost" size="icon" onClick={() => setDraft((prev) => prev ? { ...prev, fields: prev.fields.filter((_, i) => i !== index) } : prev)}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                      {field.type === "select" && (
                        <Textarea
                          value={(field.options ?? []).join("\n")}
                          onChange={(e) => updateField(index, { options: e.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })}
                          placeholder="One option per line"
                          className="lg:col-span-5"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
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
