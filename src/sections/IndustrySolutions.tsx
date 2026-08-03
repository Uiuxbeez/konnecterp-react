import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp, Building2 } from "lucide-react";
import { InViewTextEffect, getIcon, type SectionCtx } from "./shared";

export interface IndustryCard {
  tag: string;
  title: string;
  description: string;
  metric: string;
  image: string;
  icon: string;
  gradient: string;
  accentColor: string;
  highlights: string[];
}

export interface IndustrySolutionsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cards: IndustryCard[];
}

export function IndustrySolutions({ content, ctx }: { content: IndustrySolutionsContent; ctx: SectionCtx }) {
  const { isDarkMode, openDemo } = ctx;
  const [expanded, setExpanded] = useState(0);

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? "bg-[#080f1e]" : "bg-white"}`}>
      {isDarkMode && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/20 blur-3xl pointer-events-none" />
        </>
      )}

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border ${isDarkMode ? "bg-white/10 text-white/80 border-white/15" : "bg-orange-50 text-orange-600 border-orange-200"}`}>
            <Building2 className="w-3.5 h-3.5" /> {content.eyebrow}
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>
            <br />
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg max-w-lg mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{content.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col lg:flex-row gap-4 lg:h-[420px]"
        >
          {content.cards.map((card, idx) => {
            const Icon = getIcon(card.icon);
            const isOpen = expanded === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setExpanded(idx)}
                onMouseEnter={() => setExpanded(idx)}
                animate={{ flex: isOpen ? 2.6 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative min-h-[220px] lg:min-h-0 rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 cursor-pointer"
                style={{ background: card.gradient }}
              >
                {card.image && <img src={card.image} alt={card.tag} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-[#0a1628]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#0a1628]/60 to-[#0d1f3c]/30" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#060d1a]/90 via-[#0a1628]/50 to-transparent" />

                <div className="relative z-10 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                  </div>
                  <motion.span
                    animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap overflow-hidden"
                    style={{ color: card.accentColor, borderColor: `${card.accentColor}40`, backgroundColor: `${card.accentColor}18` }}
                  >
                    {card.tag}
                  </motion.span>
                </div>

                <div className="relative z-10 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div key="open" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.35, delay: 0.1 }}>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3 max-w-sm">{card.title}</h3>
                        <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-sm">{card.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {card.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm">
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: `${card.accentColor}22`, color: card.accentColor, border: `1px solid ${card.accentColor}40` }}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            {card.metric}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); openDemo(); }}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform shrink-0"
                          >
                            <ArrowRight className="w-4 h-4 text-gray-800" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block text-xs font-bold text-white/90 tracking-wide [writing-mode:vertical-rl] rotate-180 lg:[writing-mode:vertical-rl]"
                      >
                        {card.tag}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <button onClick={openDemo} className="h-11 px-6 text-sm font-semibold bg-[#F97316] hover:bg-[#EA580C] text-white rounded-md transition-colors shadow-lg shadow-orange-900/20">
            Explore More
          </button>
          <button
            onClick={openDemo}
            className={`h-11 px-6 text-sm font-semibold rounded-md border transition-colors ${isDarkMode ? "bg-white/10 hover:bg-white/20 text-white border-white/15 backdrop-blur-sm" : "bg-white hover:bg-slate-50 text-[#0B1F4A] border-slate-300"}`}
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
