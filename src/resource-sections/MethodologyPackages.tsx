import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RichText } from '@/components/site/RichText';
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from '@/lib/cms-button-actions';
import { getIcon, type SectionCtx } from '@/sections/shared';

export interface MethodologyPackagesContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonVisible?: boolean;
  buttonAction?: CmsButtonAction;
  buttonHref?: string;
  backgroundImage: string;
  packages: { icon: string; text: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function MethodologyPackages({ content, ctx }: { content: MethodologyPackagesContent; ctx: SectionCtx }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4A]/95 via-[#0B1F4A]/92 to-[#080E1D]/90" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{content.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-white">
              {content.title} <span className="text-[#F97316]">{content.highlight}</span>
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-300"><RichText text={content.description} /></p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {content.packages.map((p, i) => {
                const Icon = getIcon(p.icon);
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-sm font-semibold text-white"
                  >
                    <Icon className="w-4 h-4 text-[#F97316] shrink-0" />
                    {p.text}
                  </span>
                );
              })}
            </div>

            {isCmsButtonVisible(content.buttonVisible) && (
              <button
                onClick={() => runCmsButtonAction(content.buttonAction, content.buttonHref, ctx, "demo_modal")}
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#EA580C] text-white shadow-orange-900/30"
              >
                {content.buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
