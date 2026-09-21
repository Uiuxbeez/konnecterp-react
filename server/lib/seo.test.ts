import { test } from "node:test";
import assert from "node:assert/strict";
import { sitemapFiles, siteOrigin, verificationFile } from "./seo";

test("only website origins are accepted", () => {
  assert.equal(siteOrigin(" https://example.com/ "), "https://example.com");
  for (const input of ["javascript:alert(1)", "https://user:pass@example.com", "https://example.com/path", "https://example.com/?q=1"]) {
    assert.throws(() => siteOrigin(input));
  }
});
test("verification disallows paths and arbitrary HTML", () => {
  assert.equal(verificationFile("google123.html", "google-site-verification: google123.html\n").filename, "google123.html");
  assert.throws(() => verificationFile("../google123.html", "google-site-verification: ../google123.html"));
  assert.throws(() => verificationFile("google123.html", "<script>alert(1)</script>"));
  assert.throws(() => verificationFile("google123.html", "google-site-verification: google456.html"));
});
test("sitemaps deduplicate, escape titles, exclude private paths, and preserve robots rules", () => {
  const result = sitemapFiles("https://example.com", [
    { path: "/", title: "Home" }, { path: "/", title: "Home" },
    { path: "/blog/test", title: '<script> & "news"' },
    ...["//evil.test", "/admin", "/api/settings", "/forms/private", "/?q=test"].map(path => ({ path, title: "Excluded" })),
  ], "User-agent: *\nDisallow: /admin\nSitemap: https://old.test/sitemap.xml\n");
  assert.equal(result.urlCount, 2);
  assert.match(result.files["sitemap.xml"], /<loc>https:\/\/example.com\/blog\/test<\/loc>/);
  assert.ok(!result.files["sitemap.html"].includes("<script>"));
  assert.match(result.files["sitemap.html"], /&lt;script&gt; &amp; &quot;news&quot;/);
  assert.match(result.files["robots.txt"], /Disallow: \/admin/);
  assert.ok(!result.files["robots.txt"].includes("old.test"));
  assert.equal((result.files["robots.txt"].match(/Sitemap:/g) ?? []).length, 1);
});
