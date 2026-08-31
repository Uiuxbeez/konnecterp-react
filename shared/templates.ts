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
  about: {
    key: "about",
    name: "About Page",
    description:
      "Editable root About page using the current company overview, platform strengths, leadership, and product sections.",
    sectionTypes: ["product_hero", "about_company", "about_strengths", "about_leadership", "about_products", "footer"],
    pathPrefix: "",
  },
  contact: {
    key: "contact",
    name: "Contact Page",
    description:
      "Editable root Contact page using the current contact details, branch list, map, and support CTA sections.",
    sectionTypes: ["product_hero", "contact_details", "contact_support_cta", "footer"],
    pathPrefix: "",
  },
  career: {
    key: "career",
    name: "Career Page",
    description:
      "Editable root Career page using the current open roles layout and career side panel.",
    sectionTypes: ["product_hero", "career_roles", "footer"],
    pathPrefix: "",
  },
  case_studies: {
    key: "case_studies",
    name: "Case Studies Page",
    description:
      "Editable root Case Studies page with hero, client logos, and a grid of case study PDF cards.",
    sectionTypes: ["product_hero", "trusted_companies", "case_studies_grid", "footer"],
    pathPrefix: "",
  },
  testimonials: {
    key: "testimonials",
    name: "Testimonials Page",
    description:
      "Editable root Testimonials page with a standard inner hero, body photo collage, and dynamic testimonial card grid.",
    sectionTypes: ["product_hero", "testimonial_collage", "testimonial_cards", "footer"],
    pathPrefix: "",
  },
  faq: {
    key: "faq",
    name: "FAQ Page",
    description:
      "Editable root FAQ page with a standard inner hero and an accordion section for common questions.",
    sectionTypes: ["product_hero", "faq_accordion", "footer"],
    pathPrefix: "",
  },
  standard: {
    key: "standard",
    name: "Standard Page",
    description:
      "A general builder-managed page under the site root. Use this for About, Contact, Careers, and future content pages that need editable sections and light/dark mode support.",
    sectionTypes: ["product_hero", "product_intro", "product_operations", "product_outcomes", "product_cta"],
    pathPrefix: "",
  },
  industry: {
    key: "industry",
    name: "Industry Page",
    description:
      "Hero with a dashboard-over-photo visual, a 4-step process flow, and a split challenges/benefits band, closing with a photo CTA — the layout used for industry-specific pages like Manufacturing ERP. New pages are created under /industries/.",
    sectionTypes: ["industry_hero", "industry_flow", "industry_challenges_benefits", "product_cta"],
    pathPrefix: "/industries",
  },
  methodology: {
    key: "methodology",
    name: "Methodology Page",
    description:
      "Hero, a circular 4-phase Agile cycle infographic, a 6-stage implementation board, and a packages CTA — the layout used for Implementation Methodology. New pages are created under /resources/.",
    sectionTypes: ["product_hero", "methodology_cycle", "methodology_stages", "methodology_packages"],
    pathPrefix: "/resources",
  },
  brochure: {
    key: "brochure",
    name: "Brochure Page",
    description: "Hero, a feature grid explaining what's inside, and a premium download CTA card — the layout used for Product Brochure. New pages are created under /resources/.",
    sectionTypes: ["product_hero", "brochure_features", "brochure_cta"],
    pathPrefix: "/resources",
  },
};

export function pagePath(template: string, slug: string): string {
  if (slug === "home") return "/";
  const def = PAGE_TEMPLATES[template];
  if (!def || !def.pathPrefix) return `/${slug}`;
  return `${def.pathPrefix}/${slug}`;
}
