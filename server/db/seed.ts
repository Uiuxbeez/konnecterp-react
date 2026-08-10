import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { pages, sections } from "./schema";
import { SECTION_DEFS_BY_TYPE } from "../../shared/sections";
import { PAGE_TEMPLATES } from "../../shared/templates";
import { createPageFromTemplate } from "../lib/createPage";

async function seedHome() {
  let [home] = await db.select().from(pages).where(eq(pages.slug, "home"));
  if (!home) {
    [home] = await db.insert(pages).values({ slug: "home", title: "Home Page", template: "home" }).returning();
    console.log(`Created page "home" (id=${home.id})`);
  }

  const existing = await db.select().from(sections).where(eq(sections.pageId, home.id));
  const existingTypes = new Set(existing.map((s) => s.type));
  const homeSectionTypes = PAGE_TEMPLATES.home.sectionTypes;

  const toInsert = homeSectionTypes
    .filter((type) => !existingTypes.has(type))
    .map((type, i) => {
      const meta = SECTION_DEFS_BY_TYPE[type];
      return {
        pageId: home.id,
        type,
        name: meta.name,
        position: existing.length + i,
        enabled: true,
        content: meta.defaultContent,
        publishedContent: meta.defaultContent,
      };
    });

  if (toInsert.length > 0) {
    await db.insert(sections).values(toInsert);
    console.log(`Seeded ${toInsert.length} home section(s): ${toInsert.map((s) => s.type).join(", ")}`);
  } else {
    console.log("Home page sections already present — nothing to seed.");
  }
}

async function seedErpForSmes() {
  const [existing] = await db.select().from(pages).where(eq(pages.slug, "erp-for-smes"));
  if (existing) {
    console.log('Page "erp-for-smes" already exists — skipping.');
    return;
  }
  const page = await createPageFromTemplate({ slug: "erp-for-smes", title: "ERP for SMEs", template: "product" });
  console.log(`Created page "erp-for-smes" (id=${page.id}) from the product template`);
}

async function seed() {
  await seedHome();
  await seedErpForSmes();
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
