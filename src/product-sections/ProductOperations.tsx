import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { RichText } from '@/components/site/RichText';
import { InViewTextEffect, getIcon, type SectionCtx } from '@/sections/shared';

export interface ProductOperationsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductOperations({ content, ctx }: { content: ProductOperationsContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#080f1e]' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect><br />
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={content.description} /></p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.items.map((op, i) => {
            const Icon = getIcon(op.icon);
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.06 }}
                className={`relative rounded-2xl p-0.5 ${isDarkMode ? 'border-[0.75px] border-white/10' : 'border border-slate-200 shadow-sm'}`}
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className={`relative rounded-[calc(1rem-2px)] p-6 h-full ${isDarkMode ? 'bg-[#101a30]' : 'bg-white'}`}>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{op.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={op.description} /></p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
