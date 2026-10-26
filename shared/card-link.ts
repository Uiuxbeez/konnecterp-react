export interface CardLink {
  type?: "default" | "internal" | "external";
  href?: string;
  target?: "_self" | "_blank";
}

export function cardLinkHref(link?: CardLink): string | undefined {
  const href = link?.href?.trim();
  if (!href || /[\s\\]/.test(href)) return undefined;
  if (link?.type === "internal") return /^\/(?!\/)/.test(href) ? href : undefined;
  if (link?.type === "external") {
    try {
      const url = new URL(href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
    } catch { return undefined; }
  }
  return undefined;
}
