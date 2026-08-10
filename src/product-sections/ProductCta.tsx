import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SectionCtx } from '@/sections/shared';

export interface ProductCtaContent {
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductCta({ content, ctx }: { content: ProductCtaContent; ctx: SectionCtx }) {
  const { isDarkMode, openDemo } = ctx;
  return (
    <section className={`py-20 md:py-28 ${isDarkMode ? 'bg-[#0B1220]' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4A]/95 via-[#0B1F4A]/90 to-[#080E1D]/85" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-white">
              {content.title} <span className="text-[#F97316]">{content.highlight}</span>
            </h2>
            <p className="text-lg mb-9 max-w-xl mx-auto text-slate-300">{content.description}</p>
            <button
              onClick={openDemo}
              className="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#EA580C] text-white shadow-orange-900/30"
            >
              {content.buttonText} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
