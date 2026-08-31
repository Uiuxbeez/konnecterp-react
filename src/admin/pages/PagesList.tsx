import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Plus, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminPage } from "../lib/admin-api";

export default function PagesList() {
  const [pages, setPages] = useState<AdminPage[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const load = () => {
    adminApi
      .listPages()
      .then((res) => setPages(res.pages))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load pages"));
  };

  useEffect(load, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete this page? This can't be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await adminApi.deletePage(slug);
      setPages((prev) => prev?.filter((p) => p.slug !== slug) ?? null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete page");
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Pages</h1>
          <p className="text-xs text-slate-400">Every page on the site</p>
        </div>
        <Link href="/admin/pages/new">
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" /> New Page
          </Button>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          {!pages && !error && (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          )}

          {pages && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Path</th>
                    <th className="px-5 py-3">Template</th>
                    <th className="px-5 py-3">Updated</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {pages.map((p) => (
                    <tr key={p.slug} className="border-b border-slate-50 last:border-0">
                      <td className="px-5 py-3.5 font-medium text-slate-800">{p.title}</td>
                      <td className="px-5 py-3.5">
                        <a href={p.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-primary">
                          {p.path} <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 capitalize">{p.template}</td>
                      <td className="px-5 py-3.5 text-slate-400">{new Date(p.updatedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/page-builder?slug=${p.slug}`}>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          {p.template !== "home" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Delete"
                              disabled={deletingSlug === p.slug}
                              onClick={() => handleDelete(p.slug)}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </AdminShell>
  );
}
