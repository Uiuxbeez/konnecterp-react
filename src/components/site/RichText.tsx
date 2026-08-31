import React from "react";

type RichTextProps = {
  text?: string;
  className?: string;
  linkClassName?: string;
};

const LINK_PATTERN = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>|\[([^\]]+)\]\(([^)]+)\)/gi;

function cleanText(value: string) {
  return value.replace(/<[^>]*>/g, "");
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

function renderLine(line: string, lineIndex: number, linkClassName: string) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  Array.from(line.matchAll(LINK_PATTERN)).forEach((match, index) => {
    if (match.index === undefined) return;
    if (match.index > cursor) nodes.push(line.slice(cursor, match.index));

    const href = safeHref(match[1] ?? match[4] ?? "");
    const label = cleanText(match[2] ?? match[3] ?? href);
    nodes.push(
      <a
        key={`link-${lineIndex}-${index}`}
        href={href}
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noreferrer" : undefined}
        className={linkClassName}
      >
        {label}
      </a>
    );
    cursor = match.index + match[0].length;
  });

  if (cursor < line.length) nodes.push(line.slice(cursor));
  return nodes;
}

export function RichText({
  text = "",
  className,
  linkClassName = "font-semibold text-[#F97316] underline underline-offset-4 hover:text-[#EA580C]",
}: RichTextProps) {
  const lines = text.split(/\r?\n/);

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <React.Fragment key={`${line}-${index}`}>
          {renderLine(line, index, linkClassName)}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
}
