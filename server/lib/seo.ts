export function siteOrigin(value: unknown): string {
  if (typeof value !== "string") throw new Error("Enter the public website URL.");
  const url = new URL(value.trim());
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Use a website origin such as https://www.example.com without a path.");
  }
  return url.origin;
}

export function verificationFile(filename: unknown, content: unknown) {
  if (typeof filename !== "string" || !/^google[a-zA-Z0-9_-]+\.html$/.test(filename) ||
      typeof content !== "string" || content.trim() !== `google-site-verification: ${filename}`) {
    throw new Error("Choose the original Google Search Console HTML verification file.");
  }
  return { filename, content };
}

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!);

export function sitemapFiles(origin: string, entries: { path: string; title: string }[], robots: string) {
  const unique = new Map<string, string>();
  for (const entry of entries) {
    if (!/^\/(?!\/)/.test(entry.path) || /[?#\\]/.test(entry.path) || /^\/(admin|api|forms)(\/|$)/.test(entry.path)) continue;
    const url = new URL(entry.path, origin);
    if (url.origin === origin) unique.set(url.href, entry.title);
  }
  if (unique.size > 50000) throw new Error("A sitemap index is required for more than 50,000 URLs.");
  const links = [...unique];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${links.map(([url]) => `  <url><loc>${escape(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
  if (Buffer.byteLength(xml) > 50 * 1024 * 1024) throw new Error("The sitemap exceeds the 50 MB limit.");
  const html = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Website Sitemap</title><style>body{font:16px/1.7 system-ui,sans-serif;max-width:960px;margin:48px auto;padding:0 24px;color:#172033}a{color:#1756a9}li{margin:8px 0}</style></head><body><main><h1>Website Sitemap</h1><p>${links.length} pages</p><ul>${links.map(([url, title]) => `<li><a href="${escape(url)}">${escape(title)}</a></li>`).join("\n")}</ul></main></body></html>\n`;
  const keptRobots = robots.split(/\r?\n/).filter(line => !/^\s*Sitemap:\s*\S*\/sitemap\.xml\s*$/i.test(line)).join("\n").trim();
  return { urlCount: links.length, files: { "sitemap.xml": xml, "sitemap.html": html, "robots.txt": `${keptRobots}\n\nSitemap: ${origin}/sitemap.xml\n` } };
}
