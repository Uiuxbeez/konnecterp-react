import { pgTable, serial, text, integer, jsonb, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  // Key into shared/templates.ts PAGE_TEMPLATES — determines which section
  // types a page has and which URL prefix it's served under.
  template: text("template").notNull().default("home"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex("pages_slug_idx").on(table.slug),
}));

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  name: text("name").notNull(),
  position: integer("position").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  // Draft content — edited live in the Page Builder, autosaved.
  content: jsonb("content").notNull(),
  // Snapshot copied from `content` whenever the page is published; the public site renders this.
  publishedContent: jsonb("published_content"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
