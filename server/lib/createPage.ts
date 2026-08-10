import { db } from "../db/client";
import { pages, sections } from "../db/schema";
import { PAGE_TEMPLATES } from "../../shared/templates";
import { SECTION_DEFS_BY_TYPE, type SectionType } from "../../shared/sections";

export class UnknownTemplateError extends Error {}

export async function createPageFromTemplate(opts: { slug: string; title: string; template: string }) {
  const def = PAGE_TEMPLATES[opts.template];
  if (!def) throw new UnknownTemplateError(`Unknown template "${opts.template}"`);

  const [page] = await db.insert(pages).values({ slug: opts.slug, title: opts.title, template: opts.template }).returning();

  const rows = def.sectionTypes.map((type: SectionType, i: number) => {
    const meta = SECTION_DEFS_BY_TYPE[type];
    return {
      pageId: page.id,
      type,
      name: meta.name,
      position: i,
      enabled: true,
      content: meta.defaultContent,
      publishedContent: meta.defaultContent,
    };
  });
  if (rows.length > 0) await db.insert(sections).values(rows);

  return page;
}
