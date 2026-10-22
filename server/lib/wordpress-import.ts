import { XMLParser, XMLValidator } from "fast-xml-parser";

type Node = Record<string, any>;
const list = (value: any): Node[] => value == null ? [] : Array.isArray(value) ? value : [value];
const text = (value: any): string => typeof value === "string" ? value : String(value?.["#text"] ?? "");
const plain = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const meta = (item: Node, key: string) => text(list(item["wp:postmeta"]).find(m => text(m["wp:meta_key"]) === key)?.["wp:meta_value"]);
const httpUrl = (value: string) => {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
};

export function parseWordPress(xml: string, drafts = false) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error("XML document types and custom entities are not supported.");
  if (XMLValidator.validate(xml) !== true) throw new Error("Invalid XML. Upload a WordPress export XML file.");
  const root = new XMLParser({ ignoreAttributes: false, parseTagValue: false, parseAttributeValue: false, trimValues: false }).parse(xml);
  const channel = root?.rss?.channel;
  if (!channel || !text(channel["wp:wxr_version"])) throw new Error("This is not a WordPress WXR export.");
  const items = list(channel.item);
  if (items.length > 20000) throw new Error("Export contains too many items. Split it into smaller WordPress exports.");
  const authors = new Map(list(channel["wp:author"]).map(a => [text(a["wp:author_login"]), text(a["wp:author_display_name"])]));
  const attachments = new Map(items.filter(i => text(i["wp:post_type"]) === "attachment").map(i => [text(i["wp:post_id"]), i]));
  const posts = [];
  const skipped: { title: string; reason: string }[] = [];
  const warnings: string[] = [];
  for (const item of items) {
    if (text(item["wp:post_type"]) !== "post") continue;
    const title = plain(text(item.title));
    const content = text(item["content:encoded"]).trim();
    const sourceStatus = text(item["wp:status"]);
    if (["trash", "auto-draft"].includes(sourceStatus) || !title || !content) {
      skipped.push({ title: title || "(Untitled)", reason: !title || !content ? "Missing title or content" : sourceStatus });
      continue;
    }
    const originalSlug = text(item["wp:post_name"]);
    const slug = (originalSlug || title).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `wordpress-${text(item["wp:post_id"])}`;
    if (originalSlug && slug !== originalSlug) warnings.push(`${title}: slug normalized to ${slug}.`);
    const attachment = attachments.get(meta(item, "_thumbnail_id"));
    const featuredImage = attachment ? httpUrl(text(attachment["wp:attachment_url"])) : "";
    if (meta(item, "_thumbnail_id") && !featuredImage) warnings.push(`${title}: featured image attachment is missing from this export.`);
    const gmt = text(item["wp:post_date_gmt"]);
    const date = new Date(gmt && !gmt.startsWith("0000") ? gmt.replace(" ", "T") + "Z" : text(item.pubDate));
    if (Number.isNaN(date.getTime())) {
      skipped.push({ title, reason: "Missing or invalid publication date" });
      continue;
    }
    if (/\[[a-z][^\]]*\]/i.test(content)) warnings.push(`${title}: check WordPress shortcodes after import.`);
    const protectedPost = !!text(item["wp:post_password"]);
    const status = !drafts && sourceStatus === "publish" && !protectedPost ? "published" : "draft";
    if (protectedPost || !["publish", "draft"].includes(sourceStatus)) warnings.push(`${title}: imported as draft (WordPress status: ${sourceStatus}${protectedPost ? ", password protected" : ""}).`);
    posts.push({
      title, slug, content, excerpt: plain(text(item["excerpt:encoded"])) || plain(content).slice(0, 300) || title,
      featuredImage, featuredImageAlt: attachment ? meta(attachment, "_wp_attachment_image_alt") : "",
      tags: [...new Set(list(item.category).filter(c => ["category", "post_tag"].includes(c["@_domain"])).map(text).filter(Boolean))],
      author: authors.get(text(item["dc:creator"])) || text(item["dc:creator"]) || "KonnectERP Team",
      status, publishedAt: date,
    });
  }
  if (!posts.length && !skipped.length) throw new Error("No blog posts found. Export Posts or All content from WordPress.");
  return { posts, skipped, warnings };
}

export function planWordPressImport(parsed: ReturnType<typeof parseWordPress>, existingSlugs: string[]) {
  const seen = new Set(existingSlugs);
  const skipped = [...parsed.skipped];
  const pending = parsed.posts.filter(post => {
    if (seen.has(post.slug)) {
      skipped.push({ title: post.title, reason: `Duplicate slug: ${post.slug}` });
      return false;
    }
    seen.add(post.slug);
    return true;
  });
  return { pending, skipped };
}
