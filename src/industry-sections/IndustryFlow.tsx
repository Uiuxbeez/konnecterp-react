import { motion } from 'framer-motion';
import { InViewTextEffect, getIcon, type SectionCtx } from '@/sections/shared';
import { SquigglyArrow } from './SquigglyArrow';

export interface IndustryFlowContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  steps: { icon: string; title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function IndustryFlow({ content, ctx }: { content: IndustryFlowContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 md:py-28 relative overflow-hidden ${isDarkMode ? 'bg-[#0B1220]' : 'bg-orange-50/40'}`}>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>{' '}
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{content.description}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start gap-16 md:gap-0">
          {content.steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            const offsetDown = i % 2 === 1;
            return (
              <div key={i} className="flex flex-1 items-start">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.12 }}
                  className={`flex flex-col items-center text-center flex-1 px-3 ${offsetDown ? 'md:mt-16' : ''}`}
                >
                  <div className="relative mb-5">
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-orange-100 shadow-sm'}`}>
                      <Icon className="w-9 h-9 text-[#F97316]" strokeWidth={1.75} />
                    </div>
                    <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-[#0B1F4A] border-4 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed max-w-[15rem] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{step.description}</p>
                </motion.div>

                {i < content.steps.length - 1 && (
                  <SquigglyArrow
                    flip={i % 2 === 1}
                    className={`hidden md:block w-16 h-16 shrink-0 mt-8 ${offsetDown ? 'md:mt-24' : ''}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
