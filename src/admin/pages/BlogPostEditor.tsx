import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { AdminShell } from "../components/AdminShell";
import { ImageField } from "../components/ImageField";
import { adminApi, ApiError, type BlogPostInput } from "../lib/admin-api";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDateInputValue(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

const EMPTY: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  tags: [],
  author: "KonnectERP Team",
  status: "draft",
  publishedAt: toDateInputValue(new Date().toISOString()),
};

export default function BlogPostEditor() {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const [, navigate] = useLocation();

  const [form, setForm] = useState<BlogPostInput>(EMPTY);
  const [slugEdited, setSlugEdited] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    adminApi
      .getBlogPost(Number(id))
      .then((post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage,
          tags: post.tags,
          author: post.author,
          status: post.status,
          publishedAt: toDateInputValue(post.publishedAt),
        });
        setSlugEdited(true);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  const set = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (value: string) => {
    set("title", value);
    if (!slugEdited) set("slug", slugify(value));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => set("tags", form.tags.filter((x) => x !== t));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = { ...form, publishedAt: new Date(form.publishedAt).toISOString() };
      if (isEditing) {
        await adminApi.updateBlogPost(Number(id), payload);
      } else {
        await adminApi.createBlogPost(payload);
      }
      navigate("/admin/blog");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm(`Delete "${form.title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await adminApi.deleteBlogPost(Number(id));
      navigate("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-bold text-slate-900">{isEditing ? "Edit Post" : "New Post"}</h1>
          <p className="text-xs text-slate-400">{isEditing ? form.title : "Write a new blog post"}</p>
        </div>
        {isEditing && (
          <Button variant="ghost" size="icon" title="Delete" disabled={deleting} onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
            <div className="space-y-1.5">
              <Label htmlFor="post-title">Title</Label>
              <Input id="post-title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="5 Ways ERP Streamlines Manufacturing" required autoFocus />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="post-slug">URL Slug</Label>
              <Input
                id="post-slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  set("slug", slugify(e.target.value));
                }}
                placeholder="5-ways-erp-streamlines-manufacturing"
                required
              />
              <p className="text-xs text-slate-400">Published at /blog/{form.slug || "your-post-slug"}</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="post-excerpt">Excerpt</Label>
              <Textarea id="post-excerpt" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="A short 1-2 sentence summary shown on the blog list card." rows={2} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder="Write the full post here. Separate paragraphs with a blank line."
                rows={14}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Featured Image</Label>
              <ImageField value={form.featuredImage} onChange={(v) => set("featuredImage", v)} />
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
            <div className="space-y-1.5">
              <Label htmlFor="post-tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    {t}
                    <button type="button" onClick={() => removeTag(t)} aria-label={`Remove ${t}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                id="post-tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                onBlur={addTag}
                placeholder="Type a tag and press Enter"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="post-author">Author</Label>
                <Input id="post-author" value={form.author} onChange={(e) => set("author", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-date">Published Date</Label>
                <Input id="post-date" type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v as "draft" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving…" : "Save Post"}
            </Button>
          </div>
        </form>
      </main>
    </AdminShell>
  );
}
