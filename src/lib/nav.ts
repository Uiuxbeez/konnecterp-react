export type MenuGroup = {
  label: string;
  footerLabel?: string;
  href: string;
  description?: string;
  items: { label: string; href: string }[];
};

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
    href: "#about-us",
    description: "Learn more about the company, opportunities, and how to get in touch.",
    items: [
      { label: "About Us", href: "#about-us" },
      { label: "Career", href: "#career" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];
