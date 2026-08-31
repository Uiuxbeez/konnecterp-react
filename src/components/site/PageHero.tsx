import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InViewTextEffect } from '@/sections/shared';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';
import { BrowserFrame } from './BrowserFrame';
import { MiniDashboardMock } from './MiniDashboardMock';

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  highlight,
  subhead,
  description,
  primaryButtonText,
  showPrimaryButton = true,
  onPrimaryClick,
}: {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  highlight: string;
  subhead: string;
  description: string;
  primaryButtonText: string;
  showPrimaryButton?: boolean;
  onPrimaryClick: () => void;
}) {
  // Always dark-styled — a fixed, professional inner-page hero band, independent
  // of the site-wide light/dark toggle (matches the Home page's dark CTA sections).
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#080E1D]">
      {/* Decorative glows — same treatment as the CTA/Contact section on Home */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />
      {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent hidden md:block"
          style={{ left: `${pct}%` }}
        />
      ))}

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
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm tracking-wide border bg-white/10 text-white/80 border-white/15"
            >
              {eyebrow}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight text-white">
              <InViewTextEffect>{title}</InViewTextEffect>
              <br />
              <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{highlight}</InViewTextEffect>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed font-medium"
            >
              {subhead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base text-slate-400 mb-9 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>

            {showPrimaryButton && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <button
                  onClick={onPrimaryClick}
                  className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-md transition-colors shadow-lg bg-[#F97316] hover:bg-[#ea6c0a] text-white shadow-orange-500/30"
                >
                  {primaryButtonText} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hidden lg:block lg:w-[44%] relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 blur-2xl pointer-events-none" />
            <div className="relative">
              <BrowserFrame>
                <MiniDashboardMock />
              </BrowserFrame>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
