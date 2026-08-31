import React from "react";

type RichTextProps = {
  text?: string;
  className?: string;
  linkClassName?: string;
};

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/gi;
const TOKEN_PATTERN = /<\/?[a-z][^>]*>/gi;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHref(href: string) {
  const trimmed = href.trim();
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  return "#";
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function withMarkdownLinks(value: string) {
  return value.replace(LINK_PATTERN, (_match, label: string, href: string) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
}

function sanitizeHtml(value: string, linkClassName: string) {
  const source = withMarkdownLinks(value);
  let html = "";
  let cursor = 0;

  Array.from(source.matchAll(TOKEN_PATTERN)).forEach((match) => {
    if (match.index === undefined) return;
    html += escapeHtml(source.slice(cursor, match.index));

    const tag = match[0];
    const close = /^<\//.test(tag);
    const name = tag.match(/^<\/?\s*([a-z0-9]+)/i)?.[1]?.toLowerCase();
    if (name === "br") {
      html += "<br>";
    } else if (["strong", "b", "em", "i", "ul", "ol", "li", "p", "h2", "h3"].includes(name ?? "")) {
      html += close ? `</${name}>` : `<${name}>`;
    } else if (name === "a" && !close) {
      const rawHref = tag.match(/\shref=["']([^"']+)["']/i)?.[1] ?? "";
      const href = safeHref(rawHref);
      html += `<a href="${escapeHtml(href)}" class="${escapeHtml(linkClassName)}"${isExternalHref(href) ? ' target="_blank" rel="noreferrer"' : ""}>`;
    } else if (name === "a" && close) {
      html += "</a>";
    }
    cursor = match.index + match[0].length;
  });

  html += escapeHtml(source.slice(cursor));
  return html;
}

export function RichText({
  text = "",
  className,
  linkClassName = "font-semibold text-[#F97316] underline underline-offset-4 hover:text-[#EA580C]",
}: RichTextProps) {
  const html = sanitizeHtml(text, linkClassName);

  return (
    <span
      className={`${className ?? ""} [&_a]:font-semibold [&_a]:text-[#F97316] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#EA580C] [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-current [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-current [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
