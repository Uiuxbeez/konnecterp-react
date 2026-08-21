import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Plus, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminBlogPost } from "../lib/admin-api";

export default function BlogPostsList() {
  const [posts, setPosts] = useState<AdminBlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = () => {
    adminApi
      .listBlogPosts()
      .then((res) => setPosts(res.posts))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts"));
  };

  useEffect(load, []);

  const handleDelete = async (post: AdminBlogPost) => {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setDeletingId(post.id);
    try {
      await adminApi.deleteBlogPost(post.id);
      setPosts((prev) => prev?.filter((p) => p.id !== post.id) ?? null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Blog</h1>
          <p className="text-xs text-slate-400">Every blog post on the site</p>
        </div>
        <Link href="/admin/blog/new">
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" /> New Post
          </Button>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          {!posts && !error && (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-sm text-slate-500">No blog posts yet.</p>
              <Link href="/admin/blog/new">
                <Button size="sm" className="mt-4">
                  <Plus className="h-3.5 w-3.5" /> Write your first post
                </Button>
              </Link>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Tags</th>
                    <th className="px-5 py-3">Published</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 last:border-0">
                      <td className="px-5 py-3.5 font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100">
                            {p.featuredImage && <img src={p.featuredImage} alt="" className="h-full w-full object-cover" />}
                          </div>
                          <span className="line-clamp-1">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={p.status === "published" ? "default" : "secondary"} className="capitalize">
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{p.tags.slice(0, 2).join(", ") || "—"}</td>
                      <td className="px-5 py-3.5 text-slate-400">{new Date(p.publishedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {p.status === "published" && (
                            <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">
                              <Button variant="ghost" size="icon" title="View live">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </a>
                          )}
                          <Link href={`/admin/blog/${p.id}/edit`}>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            disabled={deletingId === p.id}
                            onClick={() => handleDelete(p)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </Button>
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
