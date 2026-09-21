import { useEffect, useState } from "react";
import { adminApi } from "../lib/admin-api";
import type { SeoFiles } from "@shared/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SeoSettings() {
  const [result, setResult] = useState<SeoFiles | null>(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    adminApi.getSeo().then(data => { setResult(data); setSiteUrl(data.siteUrl); })
      .catch(err => setError(err instanceof Error ? err.message : "Could not load SEO settings"))
      .finally(() => setLoading(false));
  }, []);

  async function generate() {
    setBusy(true); setError(""); setSaved(false);
    try {
      if (file && file.size > 4096) throw new Error("Select Google's small HTML verification file (maximum 4 KB).");
      const verification = file ? { filename: file.name, content: await file.text() } : undefined;
      const data = await adminApi.generateSeo(siteUrl, verification);
      setResult(data); setSiteUrl(data.siteUrl); setSaved(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Could not generate SEO files"); }
    finally { setBusy(false); }
  }
  function download(filename: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: "application/octet-stream" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = filename; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
    <div><h2 className="text-lg font-bold text-slate-900">Sitemaps &amp; Google Search Console</h2>
      <p className="mt-1 text-sm text-slate-500">Generate XML and HTML sitemaps for public pages and published blog posts. Regenerate after publishing, deleting, or changing page URLs.</p></div>
    <div className="space-y-2"><Label htmlFor="seo-site-url">Public website URL</Label>
      <Input id="seo-site-url" type="url" placeholder="https://www.example.com" value={siteUrl} disabled={loading || busy} onChange={e => { setSiteUrl(e.target.value); setSaved(false); }} />
      <p className="text-xs text-slate-500">Enter the exact live domain used in Search Console, including https:// and www if applicable.</p></div>
    <div className="space-y-2"><Label htmlFor="seo-verification">Google HTML verification file (optional)</Label>
      <Input id="seo-verification" type="file" accept=".html" disabled={loading || busy} onChange={e => { setFile(e.target.files?.[0] ?? null); setSaved(false); }} />
      <p className="text-xs text-slate-500">In GSC, add a URL-prefix property, choose HTML file verification, and select the downloaded google…html file. Existing verification files are kept when regenerating.</p></div>
    <Button onClick={generate} disabled={loading || busy || !siteUrl.trim()}>{busy ? "Generating..." : "Save & Generate SEO Files"}</Button>
    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    {saved && <p role="status" className="text-sm text-emerald-700">SEO files saved to the server project's public folder.</p>}
    {result?.generatedAt && <div className="space-y-3 text-sm">
      <p>{result.urlCount} URLs · Generated {new Date(result.generatedAt).toLocaleString()}</p>
      <ul className="space-y-2">{Object.entries(result.files).map(([filename, content]) => <li key={filename} className="flex flex-wrap items-center gap-3">
        <a className="text-blue-700 underline" href={`${result.siteUrl}/${filename}`} target="_blank" rel="noreferrer">{filename}</a>
        <Button size="sm" variant="outline" onClick={() => download(filename, content)}>Download</Button>
      </li>)}</ul>
      <p className="text-slate-500">If your frontend is hosted separately, download these files into its public folder, then rebuild and deploy. Generating on the API server does not update a separate frontend deployment.</p>
      <p>Once the links above are live, verify your property in GSC and submit <strong>{result.siteUrl}/sitemap.xml</strong> under Sitemaps. Google decides whether and when to index each URL.</p>
      <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-700 underline">Open Google Search Console</a>
    </div>}
  </section>;
}
