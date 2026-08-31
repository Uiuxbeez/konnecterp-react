import { motion } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";
import type { SectionCtx } from "./shared";

export interface CaseStudyCard {
  logo: string;
  clientName: string;
  title: string;
  description: string;
  pdfUrl: string;
}

export interface CaseStudiesGridContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cards: CaseStudyCard[];
}

export function CaseStudiesGrid({ content, ctx }: { content: CaseStudiesGridContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section id="case-studies-list" className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
          <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            {content.title} <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            {content.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((card, index) => {
            const hasPdf = Boolean(card.pdfUrl?.trim());

            return (
              <motion.article
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                className={`flex min-h-[330px] flex-col rounded-lg border p-6 ${isDarkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"}`}
              >
                <div className="mb-6 flex h-16 items-center">
                  {card.logo ? (
                    <img src={card.logo} alt={card.clientName || card.title} className="max-h-14 max-w-[180px] object-contain" loading="lazy" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                      <FileText className="h-6 w-6" />
                    </div>
                  )}
                </div>

                {card.clientName && <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">{card.clientName}</p>}
                <h3 className={`text-xl font-bold leading-snug ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{card.title}</h3>
                <p className={`mt-3 flex-1 text-sm leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{card.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {hasPdf ? (
                    <>
                      <a
                        href={card.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#F97316] px-4 text-sm font-bold text-white transition-colors hover:bg-[#EA580C]"
                      >
                        <Eye className="h-4 w-4" /> View PDF
                      </a>
                      <a
                        href={card.pdfUrl}
                        download
                        className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition-colors ${isDarkMode ? "border-white/15 text-white hover:bg-white/10" : "border-slate-200 text-[#0B1F4A] hover:bg-slate-50"}`}
                      >
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </>
                  ) : (
                    <span className={`inline-flex h-10 items-center rounded-md border px-4 text-sm font-semibold ${isDarkMode ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-400"}`}>
                      PDF coming soon
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
