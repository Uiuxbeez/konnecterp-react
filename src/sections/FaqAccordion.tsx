import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SectionCtx } from "./shared";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  items: FaqItem[];
}

export function FaqAccordion({ content, ctx }: { content: FaqAccordionContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const items = content.items ?? [];

  return (
    <section id="faq-accordion" className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
          <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            {content.title} <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            {content.description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`rounded-lg border ${isDarkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"}`}
        >
          <Accordion type="single" collapsible defaultValue={items[0] ? "faq-0" : undefined}>
            {items.map((item, index) => (
              <AccordionItem
                key={`${item.question}-${index}`}
                value={`faq-${index}`}
                className={`px-5 ${index === items.length - 1 ? "border-b-0" : ""} ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
              >
                <AccordionTrigger
                  className={`gap-4 py-5 text-base font-bold hover:no-underline md:text-lg ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}
                >
                  <span className="flex min-w-0 items-center gap-3 text-left">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isDarkMode ? "bg-orange-500/15 text-orange-300" : "bg-orange-50 text-orange-500"}`}>
                      <HelpCircle className="h-4 w-4" />
                    </span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className={`pl-12 text-sm leading-7 md:pl-14 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
