import { RichText } from "@/components/site/RichText";
import type { SectionCtx } from "./shared";

export interface PlainRichContentData {
  body: string;
}

export function PlainRichContent({ content, ctx }: { content: PlainRichContentData; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section className={`py-14 md:py-20 ${isDarkMode ? "bg-[#080E1D]" : "bg-white"}`}>
      <div className="container mx-auto max-w-4xl px-4">
        <article
          className={`text-base leading-8 md:text-lg ${
            isDarkMode ? "text-slate-300" : "text-slate-700"
          } [&_h2:first-child]:mt-0 [&_h2]:border-b [&_h2]:pb-3 ${
            isDarkMode ? "[&_h2]:border-white/10 [&_h2]:text-white [&_h3]:text-white" : "[&_h2]:border-slate-200 [&_h2]:text-[#061A40] [&_h3]:text-[#061A40]"
          }`}
        >
          <RichText text={content.body} />
        </article>
      </div>
    </section>
  );
}
