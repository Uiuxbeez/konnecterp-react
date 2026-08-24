export type MenuGroup = {
  label: string;
  footerLabel?: string;
  href: string;
  description?: string;
  items: MenuItem[];
};

export type MenuItem = {
  label: string;
  href: string;
};

export const MEGA_MENU_THRESHOLD = 6;
export const MENU_COLUMN_SIZE = 6;
export const MAX_MENU_COLUMNS = 4;

export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "Products",
    href: "#products",
    description: "ERP solutions for growing SMEs, large enterprises, and trading businesses.",
    items: [
      { label: "ERP for SMEs", href: "/products/erp-for-smes" },
      { label: "ERP for Enterprise", href: "#products" },
      { label: "Trading & Distribution", href: "#products" },
    ],
  },
  {
    label: "Industries",
    href: "#industries",
    description: "Tailored workflows for manufacturing, trading, distribution, and job work operations.",
    items: [
      { label: "Discrete Manufacturing", href: "/industries/manufacturing-erp" },
      { label: "Process Manufacturing", href: "#industries" },
      { label: "Trading/Distribution", href: "#industries" },
      { label: "Job Work", href: "#industries" },
    ],
  },
  {
    label: "Customers",
    href: "#customers",
    description: "Proof points from real customer success and client experiences.",
    items: [
      { label: "Case Studies", href: "#customers" },
      { label: "Testimonials", href: "#customers" },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    description: "Brochures, implementation guidance, blog content, and answers to common questions.",
    items: [
      { label: "Product Brochure", href: "/resources/product-brochure" },
      { label: "Implementation Methodology", href: "/resources/implementation-methodology" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "#resources" },
    ],
  },
  {
    label: "About Us",
    footerLabel: "Company",
    href: "/about-us",
    description: "Learn more about the company, opportunities, and how to get in touch.",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Career", href: "/career" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function getMenuColumns(items: MenuItem[]): MenuItem[][] {
  const columns: MenuItem[][] = [];
  for (let i = 0; i < items.length; i += MENU_COLUMN_SIZE) {
    columns.push(items.slice(i, i + MENU_COLUMN_SIZE));
  }
  return columns;
}

export function getMenuColumnClass(columnCount: number): string {
  if (columnCount >= 4) return "grid-cols-4";
  if (columnCount === 3) return "grid-cols-3";
  if (columnCount === 2) return "grid-cols-2";
  return "grid-cols-1";
}
