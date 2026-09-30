# Redirects and performance deployment

The live domain returned `Server: nginx/1.24.0 (Ubuntu)` and
`Content-Encoding: gzip` for HTML on 2026-09-30. Nginx does not read `.htaccess`.
The Apache file alone therefore cannot activate these changes on this VPS.

## Workbook mappings

`redirects.json` records all 24 rows marked Redirect in the supplied workbook.
20 have explicit destinations; the last three supplied destinations were in the
Remarks column. Both configuration files preserve the supplied www/non-www hosts,
accept an optional trailing slash, and preserve query strings.

These four redirects still need destinations and have no active rule:

- `/erp-software-for-small-business`
- `/erp-solution-provider-in-chennai-2`
- `/erp-for-process-manufacturing.php`
- `/erp-for-manufacturing.php`

Rows marked Remove or Create New have not been interpreted as redirect requests.
Existing routes are unchanged until their intended handling is confirmed.

## GoDaddy VPS / Nginx

1. Build and deploy `dist/` as usual. Route screens now load on demand, keeping
   admin editor code out of the initial public page bundle.
2. Back up the active Nginx site configuration. Copy `nginx-redirects.conf` to
   `/etc/nginx/snippets/konnecterp-redirects.conf` and include it inside the
   applicable existing server blocks:
   `include /etc/nginx/snippets/konnecterp-redirects.conf;`
3. Merge `nginx-performance.conf` into the existing HTTPS server block. Replace
   matching locations/directives; do not duplicate them. Preserve the existing
   document root, certificates, `/api` and `/uploads` proxy configuration.
   Keep any existing security headers when merging location blocks.
4. Run `sudo nginx -t`. Only if that succeeds, run `sudo systemctl reload nginx`.
   PM2 restart alone cannot activate Nginx configuration changes.
5. Verify `curl -I https://konnecterp.com/brochures` returns 301 with the workbook
   destination. Check every configured redirect, trailing slashes and queries.
   Check final destinations render real pages (SPA HTTP 200 alone is insufficient).
6. Check a newly built `/assets/*.js` response with `Accept-Encoding: gzip` for
   `Content-Encoding: gzip` and the one-year immutable cache header. HTML should
   revalidate. Confirm login, public pages, uploads and sitemap URLs still work.

No server configuration was installed remotely by this change. Run the same speed
test before/after deployment. A specific score cannot be promised: images, third
party scripts, network conditions and rendering also affect the grade.

## Apache hosting

Vite copies `public/.htaccess` into `dist/.htaccess`. Deploy hidden files too.
Apache must allow these overrides and enable mod_rewrite, mod_deflate and
mod_headers. Existing API/upload reverse proxies must remain configured in the
virtual host; the frontend fallback deliberately excludes those paths.
