import { test } from "node:test";
import assert from "node:assert/strict";
import { parseWordPress, planWordPressImport } from "./wordpress-import";

const wrap = (items: string) => `<rss xmlns:wp="http://wordpress.org/export/1.2/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><wp:wxr_version>1.2</wp:wxr_version><wp:author><wp:author_login>editor</wp:author_login><wp:author_display_name><![CDATA[Jane Doe]]></wp:author_display_name></wp:author>${items}</channel></rss>`;
const post = (extra = "", status = "publish") => `<item><title><![CDATA[Hello & world]]></title><wp:post_id>12</wp:post_id><wp:post_type>post</wp:post_type><wp:post_name>hello-world</wp:post_name><wp:status>${status}</wp:status><wp:post_date_gmt>2024-05-03 09:30:00</wp:post_date_gmt><dc:creator>editor</dc:creator><content:encoded><![CDATA[<h2>Hello</h2><p>Full <strong>content</strong>.</p>]]></content:encoded>${extra}</item>`;

test("maps WXR fields, CDATA, author, taxonomy, dates and attachment metadata", () => {
  const xml = wrap(post(`<excerpt:encoded><![CDATA[Summary text]]></excerpt:encoded><category domain="category"><![CDATA[ERP]]></category><category domain="post_tag">ERP</category><category domain="post_tag">News</category><wp:postmeta><wp:meta_key>_thumbnail_id</wp:meta_key><wp:meta_value>20</wp:meta_value></wp:postmeta>`) + `<item><wp:post_type>attachment</wp:post_type><wp:post_id>20</wp:post_id><wp:attachment_url>https://example.com/photo.jpg</wp:attachment_url><wp:postmeta><wp:meta_key>_wp_attachment_image_alt</wp:meta_key><wp:meta_value>Team photo</wp:meta_value></wp:postmeta></item>`);
  const result = parseWordPress(xml);
  assert.equal(result.posts.length, 1);
  const p = result.posts[0];
  assert.equal(p.title, "Hello & world");
  assert.equal(p.author, "Jane Doe");
  assert.equal(p.excerpt, "Summary text");
  assert.equal(p.featuredImageAlt, "Team photo");
  assert.equal(p.featuredImage, "https://example.com/photo.jpg");
  assert.deepEqual(p.tags, ["ERP", "News"]);
  assert.equal(p.publishedAt.toISOString(), "2024-05-03T09:30:00.000Z");
  assert.match(p.content, /<strong>content<\/strong>/);
  assert.equal(p.status, "published");
});

test("protected and nonpublic posts never accidentally publish", () => {
  for (const status of ["private", "future", "pending", "draft"]) {
    assert.equal(parseWordPress(wrap(post("", status))).posts[0].status, "draft");
  }
  assert.equal(parseWordPress(wrap(post("<wp:post_password>secret</wp:post_password>"))).posts[0].status, "draft");
  assert.equal(parseWordPress(wrap(post()), true).posts[0].status, "draft");
  assert.equal(parseWordPress(wrap(post("", "trash"))).skipped.length, 1);
});

test("rejects malformed XML, non-WXR and entity declarations", () => {
  for (const xml of ["<rss>", "<rss><channel /></rss>", '<!DOCTYPE rss [<!ENTITY x "boom">]><rss/>']) {
    assert.throws(() => parseWordPress(xml));
  }
});

test("skips duplicates in the export and previously imported slugs", () => {
  const parsed = parseWordPress(wrap(post() + post()));
  const first = planWordPressImport(parsed, []);
  assert.equal(first.pending.length, 1);
  assert.equal(first.skipped.length, 1);
  const repeat = planWordPressImport(parsed, ["hello-world"]);
  assert.equal(repeat.pending.length, 0);
  assert.equal(repeat.skipped.length, 2);
});

test("reports missing images and invalid dates without discarding other posts", () => {
  const result = parseWordPress(wrap(post("<wp:postmeta><wp:meta_key>_thumbnail_id</wp:meta_key><wp:meta_value>404</wp:meta_value></wp:postmeta>") + post().replace("2024-05-03 09:30:00", "invalid")));
  assert.equal(result.posts.length, 1);
  assert.equal(result.skipped.length, 1);
  assert.match(result.warnings[0], /missing/);
  assert.equal(result.posts[0].excerpt, "Hello Full content .");
});
