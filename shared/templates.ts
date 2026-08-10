import type { SectionType } from "./sections";

export interface PageTemplateDef {
  key: string;
  name: string;
  description: string;
  /** Section types seeded, in order, when a page is created from this template. */
  sectionTypes: SectionType[];
  /** URL prefix pages of this template live under. null = site root (home only). */
  pathPrefix: string | null;
}

export const PAGE_TEMPLATES: Record<string, PageTemplateDef> = {
  home: {
    key: "home",
    name: "Home Page",
    description: "The site's single home page — not selectable when creating a new page.",
    sectionTypes: [
      "hero", "statistics", "trusted_companies", "industry_solutions", "gst_compliance",
      "why_choose_us", "customer_stories", "contact", "footer",
    ],
    pathPrefix: null,
  },
  product: {
    key: "product",
    name: "Product Page",
    description:
      "Hero, dashboard preview, feature grid, image + feature rows, flexible-deployment card, industries band, gains grid, and a photo CTA — the layout used for ERP for SMEs. New pages are created under /products/.",
    sectionTypes: [
      "product_hero", "product_intro", "product_operations", "product_outcomes",
      "product_adapt", "product_industries", "product_gains", "product_cta",
    ],
    pathPrefix: "/products",
  },
};

export function pagePath(template: string, slug: string): string {
  if (slug === "home") return "/";
  const def = PAGE_TEMPLATES[template];
  if (!def || !def.pathPrefix) return `/${slug}`;
  return `${def.pathPrefix}/${slug}`;
}
