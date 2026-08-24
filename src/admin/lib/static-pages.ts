import type { AdminPage } from "./admin-api";

export const STATIC_SITE_PAGES: AdminPage[] = [
  {
    id: -1,
    slug: "about-us",
    title: "About Us",
    template: "static",
    path: "/about-us",
    updatedAt: "",
  },
  {
    id: -2,
    slug: "contact",
    title: "Contact Us",
    template: "static",
    path: "/contact",
    updatedAt: "",
  },
  {
    id: -3,
    slug: "career",
    title: "Career",
    template: "static",
    path: "/career",
    updatedAt: "",
  },
];

export function withStaticPages(pages: AdminPage[]) {
  const existingPaths = new Set(pages.map((page) => page.path));
  return [...STATIC_SITE_PAGES.filter((page) => !existingPaths.has(page.path)), ...pages];
}
