import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, LayoutTemplate, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminShell } from "../components/AdminShell";
import { adminApi, ApiError, type PageTemplateInfo } from "../lib/admin-api";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewPage() {
  const [, navigate] = useLocation();
  const [templates, setTemplates] = useState<PageTemplateInfo[] | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    adminApi.listPages().then((res) => setTemplates(res.templates));
  }, []);

  const template = templates?.find((t) => t.key === selectedTemplate) ?? null;
  const pathPreview = selectedTemplate === "product" ? `/products/${slug || "your-page-slug"}` : `/${slug || "your-page-slug"}`;

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    setError(null);
    setCreating(true);
    try {
      const page = await adminApi.createPage({ title, slug, template: selectedTemplate });
      navigate(`/admin/page-builder?slug=${page.slug}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create page");
    } finally {
      setCreating(false);
    }
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-sm font-bold text-slate-900">New Page</h1>
          <p className="text-xs text-slate-400">{selectedTemplate ? "Name your page" : "Choose a template"}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-2xl">
          {!selectedTemplate ? (
            <div className="space-y-3">
              {!templates && <p className="text-sm text-slate-400">Loading templates…</p>}
              {templates?.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedTemplate(t.key)}
                  className="flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <LayoutTemplate className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{t.description}</p>
                  </div>
                </button>
              ))}
              {templates && templates.length === 0 && (
                <p className="text-sm text-slate-400">No templates available yet.</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                <Check className="h-3.5 w-3.5" />
                Using template: <strong>{template?.name}</strong>
                <button type="button" onClick={() => setSelectedTemplate(null)} className="ml-auto text-xs underline">
                  Change
                </button>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="page-title">Page Title</Label>
                <Input id="page-title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="ERP for Enterprise" required autoFocus />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="page-slug">URL Slug</Label>
                <Input
                  id="page-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="erp-for-enterprise"
                  required
                />
                <p className="text-xs text-slate-400">Page will be published at {pathPreview}</p>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" disabled={creating || !title || !slug} className="w-full">
                {creating ? "Creating…" : "Create Page"} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>
          )}
        </div>
      </main>
    </AdminShell>
  );
}
