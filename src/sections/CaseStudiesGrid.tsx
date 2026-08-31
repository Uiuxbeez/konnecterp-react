import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Download, X } from "lucide-react";
import { PublicForm } from "@/components/site/PublicForm";
import { RichText } from "@/components/site/RichText";
import type { SectionCtx } from "./shared";

export interface CaseStudyCard {
  logo: string;
  clientName: string;
  title: string;
  description: string;
  pdfUrl: string;
  restrictDownload?: boolean;
  downloadFormSlug?: string;
}

export interface CaseStudiesGridContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cards: CaseStudyCard[];
}

function downloadPdf(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.target = "_blank";
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function CaseStudiesGrid({ content, ctx }: { content: CaseStudiesGridContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const [activeDownload, setActiveDownload] = useState<CaseStudyCard | null>(null);

  const closeDownloadForm = () => setActiveDownload(null);

  const handleDownload = (card: CaseStudyCard) => {
    if (!card.pdfUrl?.trim()) return;
    if (card.restrictDownload && card.downloadFormSlug?.trim()) {
      setActiveDownload(card);
      return;
    }
    downloadPdf(card.pdfUrl);
  };

  return (
    <>
      <section id="case-studies-list" className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
            <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
              {content.title} <span className="text-[#F97316]">{content.highlight}</span>
            </h2>
            <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <RichText text={content.description} />
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
                  className={`flex min-h-[290px] flex-col rounded-lg border p-6 ${isDarkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"}`}
                >
                  <h3 className={`text-xl font-bold leading-snug ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{card.title}</h3>
                  <p className={`mt-4 flex-1 text-sm leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={card.description} /></p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {hasPdf ? (
                      <button
                        type="button"
                        onClick={() => handleDownload(card)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#F97316] px-4 text-sm font-bold text-white transition-colors hover:bg-[#EA580C] focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                      >
                        <Download className="h-4 w-4" /> Download PDF
                      </button>
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

      <AnimatePresence>
        {activeDownload?.downloadFormSlug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeDownloadForm}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-8 pb-6 pt-8" style={{ background: "linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)" }}>
                <button
                  type="button"
                  onClick={closeDownloadForm}
                  aria-label="Close download form"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mt-1 pr-10 text-sm text-blue-100">
                  Submit your details to download {activeDownload.title}.
                </p>
              </div>

              <PublicForm
                slug={activeDownload.downloadFormSlug}
                source={`case-study-download-${activeDownload.title}`}
                onSuccess={() => {
                  downloadPdf(activeDownload.pdfUrl);
                  closeDownloadForm();
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
