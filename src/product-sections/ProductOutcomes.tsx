import { motion } from 'framer-motion';
import { getIcon, type SectionCtx } from '@/sections/shared';

export interface ProductOutcomesContent {
  title: string;
  highlight: string;
  description: string;
  image: string;
  items: { icon: string; title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductOutcomes({ content, ctx }: { content: ProductOutcomesContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#06163C]' : 'bg-white'}`}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/6 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
          <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            {content.title} <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{content.description}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:w-[42%] w-full relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-0"
          >
            <img src={content.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className={`lg:w-[58%] w-full rounded-2xl overflow-hidden border ${isDarkMode ? 'border-white/[0.08]' : 'border-slate-200'}`}
          >
            {content.items.map((o, i) => {
              const Icon = getIcon(o.icon);
              return (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-6 ${i % 2 === 0 ? (isDarkMode ? 'bg-white/[0.03]' : 'bg-slate-50') : isDarkMode ? 'bg-transparent' : 'bg-white'} ${i !== content.items.length - 1 ? `border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-slate-100'}` : ''}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold mb-1.5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{o.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{o.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
