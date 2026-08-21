import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb, type BreadcrumbItem } from '@/components/site/Breadcrumb';
import { MiniDashboardMock } from '@/components/site/MiniDashboardMock';

export interface IndustryHeroContent {
  badge: string;
  headingLine1: string;
  headingLine2Plain: string;
  headingLine2Highlight: string;
  headingLine3Plain: string;
  headingLine3Highlight: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
}

export function IndustryHero({
  content,
  breadcrumb,
  onPrimaryClick,
  onSecondaryClick,
}: {
  content: IndustryHeroContent;
  breadcrumb: BreadcrumbItem[];
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080E1D]">
      <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Dark on the left for text legibility, fading out so the photo reads clearly on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080E1D] via-[#080E1D]/90 via-45% to-[#080E1D]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080E1D] via-transparent to-transparent" />

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <Breadcrumb items={breadcrumb} isDarkMode />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-12">
          <div className="lg:w-[56%]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm tracking-wide border bg-white/10 text-white/80 border-white/15 uppercase"
            >
              {content.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] mb-6 tracking-tight text-white"
            >
              {content.headingLine1}
              <br />
              {content.headingLine2Plain} <span className="text-[#F97316]">{content.headingLine2Highlight}</span>
              <br />
              {content.headingLine3Plain} <span className="text-[#F97316]">{content.headingLine3Highlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base text-slate-300 mb-9 leading-relaxed max-w-xl"
            >
              {content.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-3">
              <button
                onClick={onPrimaryClick}
                className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#ea6c0a] text-white shadow-orange-500/30"
              >
                {content.primaryButtonText} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSecondaryClick}
                className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-md border border-white/25 text-white hover:bg-white/10 transition-colors"
              >
                {content.secondaryButtonText} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hidden lg:block lg:w-[44%]"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <MiniDashboardMock />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
