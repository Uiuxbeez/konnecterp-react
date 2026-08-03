import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { pages, sections } from "./schema";
import { SECTION_DEFS } from "../../shared/sections";

async function seed() {
  let [home] = await db.select().from(pages).where(eq(pages.slug, "home"));
  if (!home) {
    [home] = await db.insert(pages).values({ slug: "home", title: "Home Page" }).returning();
    console.log(`Created page "home" (id=${home.id})`);
  }

  const existing = await db.select().from(sections).where(eq(sections.pageId, home.id));
  const existingTypes = new Set(existing.map((s) => s.type));

  const toInsert = SECTION_DEFS.filter((def) => !existingTypes.has(def.type)).map((def, i) => ({
    pageId: home.id,
    type: def.type,
    name: def.name,
    position: existing.length + i,
    enabled: true,
    content: def.defaultContent,
    publishedContent: def.defaultContent,
  }));

  if (toInsert.length > 0) {
    await db.insert(sections).values(toInsert);
    console.log(`Seeded ${toInsert.length} section(s): ${toInsert.map((s) => s.type).join(", ")}`);
  } else {
    console.log("All sections already present — nothing to seed.");
  }

  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
