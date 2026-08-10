import { motion } from 'framer-motion';
import type { SectionCtx } from '@/sections/shared';

export interface ProductIndustriesContent {
  eyebrow: string;
  title: string;
  intro: string;
  backgroundImage: string;
  items: string[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductIndustries({ content }: { content: ProductIndustriesContent; ctx: SectionCtx }) {
  return (
    <section className="relative overflow-hidden py-28">
      <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1e]/96 via-[#0B1F4A]/92 to-[#080f1e]/96" />
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight text-white">{content.title}</h2>
          <p className="text-lg mb-10 text-slate-300">{content.intro}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-3">
          {content.items.map((ind) => (
            <span key={ind} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-slate-200 bg-white/10 backdrop-blur-sm text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" /> {ind}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
