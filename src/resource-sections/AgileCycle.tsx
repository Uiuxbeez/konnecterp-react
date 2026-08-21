import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { InViewTextEffect, getIcon, type SectionCtx } from '@/sections/shared';

export interface AgileCycleContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  centerLabel: string;
  steps: { icon: string; title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NODE_COLORS = ['from-[#F97316] to-[#EA580C]', 'from-blue-500 to-blue-600', 'from-violet-500 to-violet-600', 'from-emerald-500 to-emerald-600'];
// Position of each node's caption relative to the node itself, so labels never overlap the hub.
const CAPTION_POS = ['bottom-full mb-2', 'left-full ml-3 text-left', 'top-full mt-2', 'right-full mr-3 text-right'];
const NODE_JUSTIFY = ['justify-center', 'justify-end', 'justify-center', 'justify-start'];
const NODE_ALIGN = ['items-end', 'items-center', 'items-start', 'items-center'];

function Node({ index, content }: { index: number; content: { icon: string; title: string } }) {
  const Icon = getIcon(content.icon);
  return (
    <div className={`relative flex ${NODE_JUSTIFY[index]} ${NODE_ALIGN[index]} h-full w-full`}>
      <div className="relative">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${NODE_COLORS[index]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-[10px] font-bold text-[#0B1F4A] shadow-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className={`absolute ${CAPTION_POS[index]} w-32 sm:w-36 text-xs sm:text-sm font-bold text-[#0B1F4A] dark:text-white leading-snug`}>
          {content.title}
        </p>
      </div>
    </div>
  );
}

export function AgileCycle({ content, ctx }: { content: AgileCycleContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const steps = content.steps.slice(0, 4);

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#0B1220]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>{' '}
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{content.description}</p>
        </motion.div>

        {/* Circular flow infographic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[30rem] mb-16 sm:mb-20"
        >
          <div className={`absolute inset-[16%] rounded-full border-2 border-dashed ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`} />

          <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
            <div className="col-start-1 row-start-1 flex items-end justify-end pb-2 pr-2">
              <ArrowRight className={`w-5 h-5 rotate-[315deg] ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            </div>
            <div className="col-start-2 row-start-1"><Node index={0} content={steps[0]} /></div>
            <div className="col-start-3 row-start-1 flex items-end justify-start pb-2 pl-2">
              <ArrowRight className={`w-5 h-5 rotate-45 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            </div>

            <div className="col-start-1 row-start-2"><Node index={3} content={steps[3]} /></div>
            <div className="col-start-2 row-start-2 flex items-center justify-center">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-xl ${isDarkMode ? 'bg-gradient-to-br from-[#162d66] to-[#0B1F4A]' : 'bg-gradient-to-br from-[#0B1F4A] to-[#162d66]'}`}>
                <Layers className="w-5 h-5 text-[#F97316] mb-1" />
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight px-2">{content.centerLabel}</span>
              </div>
            </div>
            <div className="col-start-3 row-start-2"><Node index={1} content={steps[1]} /></div>

            <div className="col-start-1 row-start-3 flex items-start justify-end pt-2 pr-2">
              <ArrowRight className={`w-5 h-5 rotate-[225deg] ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            </div>
            <div className="col-start-2 row-start-3"><Node index={2} content={steps[2]} /></div>
            <div className="col-start-3 row-start-3 flex items-start justify-start pt-2 pl-2">
              <ArrowRight className={`w-5 h-5 rotate-[135deg] ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            </div>
          </div>
        </motion.div>

        {/* Full descriptions below, for readability */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl border p-5 ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-50'}`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${NODE_COLORS[i]} flex items-center justify-center mb-3 text-[10px] font-bold text-white`}>
                {i + 1}
              </div>
              <h3 className={`text-sm font-bold mb-1.5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{s.title}</h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
