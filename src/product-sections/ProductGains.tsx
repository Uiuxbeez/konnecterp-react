import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { SectionCtx } from '@/sections/shared';

export interface ProductGainsContent {
  eyebrow: string;
  title: string;
  items: { title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductGains({ content, ctx }: { content: ProductGainsContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#06163C]' : 'bg-slate-50'}`}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-600/6 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-14">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{content.title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.items.map((g, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl p-6 border ${isDarkMode ? 'border-white/[0.08] bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`}
            >
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F97316] to-[#EA580C]" />
              <div
                aria-hidden
                className="absolute -top-6 -right-6 w-28 h-28 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(11,31,74,0.12)'} 1px, transparent 1px)`,
                  backgroundSize: '10px 10px',
                }}
              />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border ${isDarkMode ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'}`}>
                  <CheckCircle2 className="w-5 h-5 text-[#F97316]" />
                </div>
                <h3 className={`text-base font-bold mb-1.5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{g.title}</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{g.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
