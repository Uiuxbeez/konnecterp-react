import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from "@/lib/cms-button-actions";
import { InViewTextEffect, NetworkMesh, fadeInUp, staggerContainer, type SectionCtx } from "./shared";

export interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonVisible?: boolean;
  primaryButtonAction?: CmsButtonAction;
  primaryButtonHref?: string;
  secondaryButtonText: string;
  secondaryButtonVisible?: boolean;
  secondaryButtonAction?: CmsButtonAction;
  secondaryButtonHref?: string;
  backgroundImage: string;
  checklist: string[];
}

export function Hero({ content, ctx }: { content: HeroContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const showPrimaryButton = isCmsButtonVisible(content.primaryButtonVisible);
  const showSecondaryButton = isCmsButtonVisible(content.secondaryButtonVisible);

  return (
    <section className="relative flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <img src={content.backgroundImage} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, rgba(4,10,26,0.14) 0%, rgba(4,10,26,0.50) 30%, rgba(3,8,22,0.77) 62%, rgba(2,6,18,0.86) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.96) 68%, rgba(255,255,255,1.00) 100%)",
          }}
        />
        <div className={`absolute inset-0 mix-blend-screen ${isDarkMode ? "opacity-60" : "opacity-20"}`}>
          <NetworkMesh />
        </div>
        {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
          <div
            key={pct}
            className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent to-transparent hidden md:block ${isDarkMode ? "via-white/15" : "via-slate-400/20"}`}
            style={{ left: `${pct}%` }}
          />
        ))}
        <div className={`absolute top-[14%] left-[4%] w-16 h-16 rounded-xl hidden md:block ${isDarkMode ? "border border-white/15" : "border border-slate-400/20"}`} />
        <div className={`absolute bottom-[8%] right-[6%] w-20 h-20 rounded-xl hidden md:block ${isDarkMode ? "border border-white/10" : "border border-slate-400/15"}`} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-32 pb-16 px-4"
      >
        <motion.div variants={fadeInUp} className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm tracking-wide border ${isDarkMode ? "bg-white/10 text-white/80 border-white/15" : "bg-white/60 text-slate-700 border-slate-300/70"}`}>
          {content.badge}
        </motion.div>

        <motion.h1 variants={fadeInUp} className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] mb-5 tracking-tight max-w-3xl ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
          <InViewTextEffect>{content.title}</InViewTextEffect>
          <br />
          <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
        </motion.h1>

        <motion.p variants={fadeInUp} className={`text-base md:text-lg mb-8 max-w-2xl leading-relaxed ${isDarkMode ? "text-slate-200/85" : "text-[#141414]/95"}`}>
          {content.description}
        </motion.p>

        {(showPrimaryButton || showSecondaryButton) && (
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            {showPrimaryButton && (
              <button
                onClick={() => runCmsButtonAction(content.primaryButtonAction, content.primaryButtonHref, ctx, "demo_modal")}
                className={`h-11 px-6 text-sm font-semibold rounded-md transition-colors shadow-lg ${isDarkMode ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white shadow-orange-500/30" : "bg-[#0B1F4A] hover:bg-[#162d68] text-white shadow-slate-900/30"}`}
              >
                {content.primaryButtonText}
              </button>
            )}
            {showSecondaryButton && (
              <button
                onClick={() => runCmsButtonAction(content.secondaryButtonAction, content.secondaryButtonHref, ctx, "video_modal")}
                className={`h-11 px-6 text-sm font-semibold rounded-md border transition-colors backdrop-blur-sm ${isDarkMode ? "bg-white/10 hover:bg-white/20 text-white border-white/15" : "bg-transparent hover:bg-orange-50 text-[#F97316] border-[#F97316]"}`}
              >
                {content.secondaryButtonText}
              </button>
            )}
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className={`mt-5 flex flex-wrap items-center justify-center gap-5 text-xs ${isDarkMode ? "text-slate-300/70" : "text-slate-500"}`}>
          {content.checklist.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? "text-slate-300/60" : "text-orange-400"}`} /> {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
