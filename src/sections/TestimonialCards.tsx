import { motion } from "framer-motion";
import { Quote, UserRound } from "lucide-react";
import type { SectionCtx } from "./shared";

export interface TestimonialCard {
  photo: string;
  name: string;
  company: string;
  designation: string;
  testimonial: string;
}

export interface TestimonialCardsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cards: TestimonialCard[];
}

export function TestimonialCards({ content, ctx }: { content: TestimonialCardsContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section id="testimonial-cards" className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
          <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            {content.title} <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{content.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(content.cards ?? []).map((card, index) => (
            <motion.article
              key={`${card.name}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
              className={`flex min-h-[300px] flex-col rounded-lg border p-6 ${isDarkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"}`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {card.photo ? (
                    <img src={card.photo} alt={card.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <UserRound className="h-6 w-6" />
                    </span>
                  )}
                  <div>
                    <p className={`font-bold ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{card.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#F97316]">{card.company}</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 shrink-0 text-orange-500/35" />
              </div>

              {card.designation && <p className={`mb-4 text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-500"}`}>{card.designation}</p>}
              <p className={`text-sm leading-7 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>"{card.testimonial}"</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
