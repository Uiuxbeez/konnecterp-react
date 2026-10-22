import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api-base";

type Result = {
  imported: number;
  ready: number;
  posts: { title: string; slug: string; status: string; author: string; publishedAt: string; featuredImage: string }[];
  skipped: { title: string; reason: string }[];
  warnings: string[];
};

export function BlogImport({ onImported }: { onImported: () => void }) {
  const [file, setFile] = useState<File>();
  const [mode, setMode] = useState("preserve");
  const [result, setResult] = useState<Result>();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const run = async (action: "preview" | "import") => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error("XML must be 20 MB or smaller.");
      const body = new FormData();
      body.append("file", file); body.append("mode", mode); body.append("action", action);
      const response = await fetch(apiUrl("/api/admin/blog-posts/import"), { method: "POST", credentials: "include", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Import failed.");
      setResult(data);
      if (action === "import") { setDone(true); onImported(); }
    } catch (e) { setError(e instanceof Error ? e.message : "Import failed. Preview again before retrying."); }
    finally { setBusy(false); }
  };
  return <details className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
    <summary className="cursor-pointer font-semibold text-slate-900">Bulk upload — WordPress XML</summary>
    <div className="mt-4 space-y-4 text-sm text-slate-600">
      <p>Upload a WordPress Tools → Export XML file (maximum 20 MB). Preview first, then import all eligible posts together. Existing slugs are skipped, never overwritten.</p>
      <p>Includes titles, slugs, formatted content, excerpts, authors, dates and featured-image URLs/alt text. Categories and tags become blog tags. Images remain hosted at their original URLs; include attachments in your export for featured images. Comments, SEO plugin fields, custom fields and shortcode functionality are not imported.</p>
      <div className="flex flex-wrap items-end gap-4">
        <label className="space-y-2">WordPress XML
          <input aria-label="WordPress XML" className="block max-w-full" type="file" accept=".xml,text/xml,application/xml" disabled={busy} onChange={e => { setFile(e.target.files?.[0]); setResult(undefined); setDone(false); setError(""); }} />
        </label>
        <label className="space-y-2">Publication status
          <select className="block rounded border p-2" value={mode} disabled={busy} onChange={e => { setMode(e.target.value); setResult(undefined); setDone(false); }}>
            <option value="preserve">Preserve published posts</option>
            <option value="draft">Import everything as drafts</option>
          </select>
        </label>
        <Button variant="outline" disabled={!file || busy} onClick={() => { setDone(false); void run("preview"); }}>{busy ? "Processing…" : "Preview import"}</Button>
      </div>
      <p>Private, scheduled, pending and password-protected posts become drafts. Deleted posts are skipped.</p>
      {error && <p role="alert" className="text-red-600">{error}</p>}
      {result && <div aria-live="polite" className="space-y-3">
        <p className="font-semibold">{done ? `${result.imported} posts imported.` : `${result.ready} posts ready (${result.posts.filter(p => p.status === "published").length} will be published).`} {result.skipped.length} skipped.</p>
        {!done && result.ready > 0 && <>
          <div className="max-h-72 overflow-auto rounded border">
            <table className="w-full text-left text-xs"><thead><tr><th className="p-2">Post / slug</th><th className="p-2">Status</th><th className="p-2">Author / date</th><th className="p-2">Featured image</th></tr></thead>
              <tbody>{result.posts.map(p => <tr key={p.slug} className="border-t"><td className="p-2">{p.title}<br />{p.slug}</td><td className="p-2">{p.status}</td><td className="p-2">{p.author}<br />{new Date(p.publishedAt).toLocaleDateString()}</td><td className="p-2">{p.featuredImage ? "Included" : "None"}</td></tr>)}</tbody>
            </table>
          </div>
          <Button disabled={busy} onClick={() => void run("import")}>{busy ? "Importing…" : `Import ${result.ready} posts`}</Button>
        </>}
        {result.skipped.length > 0 && <details><summary className="cursor-pointer">Skipped posts</summary><ul className="max-h-48 overflow-auto">{result.skipped.map((p, i) => <li key={i}>{p.title}: {p.reason}</li>)}</ul></details>}
        {result.warnings.length > 0 && <details open><summary className="cursor-pointer">Review notes</summary><ul className="max-h-48 overflow-auto">{result.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul></details>}
      </div>}
    </div>
  </details>;
}
