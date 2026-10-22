# WordPress blog import

In Admin → Blog, expand **Bulk upload — WordPress XML**, select the export,
choose publication status, then **Preview import** and **Import posts**.
The preview does not write to the database. The import writes in one transaction;
database failures roll back the batch. Re-uploading skips matching slugs.

Use a standard [WordPress WXR export](https://developer.wordpress.org/reference/functions/export_wp/),
up to 20 MB and 20,000 total XML items. Include attachment records for featured
images. Only `post` items become blog posts; pages and custom post types are ignored.

Supported: title, normalized slug, HTML content, excerpt (generated when absent),
author display name, UTC publication date, featured-image URL and alt text.
Categories and tags share the site's existing tags field. Published posts remain
published unless "Import everything as drafts" is selected. Private, protected,
pending and scheduled posts become drafts. Trash, automatic drafts, and posts
missing title, content or valid dates are reported as skipped.

Images continue to load from the old host; this does not download media.
Comments, SEO plugin metadata, custom fields, redirects, scheduling, password
protection and WordPress shortcode execution are not migrated. Check preview
warnings and review imported content, especially shortcodes and changed slugs.
The public renderer sanitizes HTML and excludes scripts, event handlers, styles,
iframes and forms. Existing plain-text posts retain paragraph rendering.

No schema migration or environment variable is required. Deploy the updated
client and API together and install the updated dependencies.
