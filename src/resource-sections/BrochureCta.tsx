import { motion } from 'framer-motion';
import { CheckCircle2, Download } from 'lucide-react';
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from '@/lib/cms-button-actions';
import type { SectionCtx } from '@/sections/shared';

export interface BrochureCtaContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVisible?: boolean;
  buttonAction?: CmsButtonAction;
  buttonHref?: string;
  fileUrl: string;
  backgroundImage: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BrochureCta({ content, ctx }: { content: BrochureCtaContent; ctx: SectionCtx }) {
  const hasFile = Boolean(content.fileUrl?.trim());
  const buttonHref = content.buttonHref?.trim() || content.fileUrl;
  const shouldRenderLink = isCmsButtonVisible(content.buttonVisible) && Boolean(buttonHref.trim()) && (content.buttonAction === "link" || (!content.buttonAction && hasFile));

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4A]/96 via-[#0B1F4A]/93 to-[#080E1D]/92" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{content.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-white">
              {content.title} <span className="text-[#F97316]">{content.highlight}</span>
            </h2>
            <p className="text-lg mb-9 max-w-xl mx-auto text-slate-300">{content.description}</p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
              {content.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" /> {f}
                </span>
              ))}
            </div>

            {shouldRenderLink ? (
              <a
                href={buttonHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#EA580C] text-white shadow-orange-900/30"
              >
                {content.buttonText} <Download className="w-4 h-4" />
              </a>
            ) : isCmsButtonVisible(content.buttonVisible) ? (
              <button
                onClick={() => {
                  if (!content.buttonAction && hasFile) {
                    window.location.href = content.fileUrl;
                    return;
                  }

                  runCmsButtonAction(content.buttonAction, buttonHref, ctx, hasFile ? "link" : "demo_modal");
                }}
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#EA580C] text-white shadow-orange-900/30"
              >
                {content.buttonText} <Download className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
