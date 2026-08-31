import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RichText } from '@/components/site/RichText';
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from '@/lib/cms-button-actions';
import { getIcon, type SectionCtx } from '@/sections/shared';

export interface ProductAdaptContent {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  cardBadge: string;
  cardTitle: string;
  cardDescription: string;
  cardImage: string;
  ctaText: string;
  ctaVisible?: boolean;
  ctaAction?: CmsButtonAction;
  ctaHref?: string;
  options: { icon: string; label: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductAdapt({ content, ctx }: { content: ProductAdaptContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#0B1220]' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-[55%]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{content.title}</h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={content.paragraph1} /></p>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={content.paragraph2} /></p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="lg:w-[45%] w-full">
            <div className="relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col p-8 shadow-xl">
              <img src={content.cardImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F4A]/92 via-[#0B1F4A]/85 to-[#0B1F4A]/92" />
              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/80 border border-white/15 mb-4">
                  {content.cardBadge}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{content.cardTitle}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6"><RichText text={content.cardDescription} /></p>

                <div className="grid grid-cols-2 gap-3 mt-auto mb-6">
                  {content.options.map((d, i) => {
                    const Icon = getIcon(d.icon);
                    return (
                      <div key={i} className="flex items-center gap-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-3">
                        <Icon className="w-4 h-4 text-[#F97316] shrink-0" />
                        <span className="text-xs font-semibold text-white">{d.label}</span>
                      </div>
                    );
                  })}
                </div>

                {isCmsButtonVisible(content.ctaVisible) && (
                  <button
                    onClick={() => runCmsButtonAction(content.ctaAction, content.ctaHref, ctx, "demo_modal")}
                    className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white hover:text-[#F97316] transition-colors"
                  >
                    {content.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
