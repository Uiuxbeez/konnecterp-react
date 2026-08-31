import { pgTable, serial, text, integer, jsonb, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  // Paragraphs separated by blank lines — rendered as <p> tags, same simplicity
  // level as the rest of the page-builder's textarea fields (no rich-text editor).
  content: text("content").notNull(),
  featuredImage: text("featured_image").notNull().default(""),
  tags: jsonb("tags").notNull().default(sql`'[]'::jsonb`),
  author: text("author").notNull().default("KonnectERP Team"),
  status: text("status").notNull().default("draft"), // "draft" | "published"
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex("blog_posts_slug_idx").on(table.slug),
}));

export const siteNavigation = pgTable("site_navigation", {
  id: serial("id").primaryKey(),
  key: text("key").notNull(),
  menu: jsonb("menu").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  keyIdx: uniqueIndex("site_navigation_key_idx").on(table.key),
}));

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  keyIdx: uniqueIndex("site_settings_key_idx").on(table.key),
}));

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull().default(""),
  submitButtonText: text("submit_button_text").notNull().default("Submit"),
  successTitle: text("success_title").notNull().default("Thank you"),
  successMessage: text("success_message").notNull().default("We have received your submission."),
  antiSpamEnabled: boolean("anti_spam_enabled").notNull().default(true),
  fields: jsonb("fields").notNull().default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("active"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex("forms_slug_idx").on(table.slug),
}));

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  formId: integer("form_id").references(() => forms.id, { onDelete: "set null" }),
  formSlug: text("form_slug").notNull(),
  formName: text("form_name").notNull(),
  name: text("name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),
  data: jsonb("data").notNull(),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
