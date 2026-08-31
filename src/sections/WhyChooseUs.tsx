import { motion } from "framer-motion";
import { ArrowUpRight, Activity, CheckCircle2, TrendingUp } from "lucide-react";
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from "@/lib/cms-button-actions";
import { InViewTextEffect, type SectionCtx } from "./shared";

export interface WhyChooseRow {
  tag: string;
  title: string;
  description: string;
  image: string;
  bullets: string[];
}

export interface WhyChooseUsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  rowButtonVisible?: boolean;
  rowButtonAction?: CmsButtonAction;
  rowButtonHref?: string;
  rows: WhyChooseRow[];
}

export function WhyChooseUs({ content, ctx }: { content: WhyChooseUsContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section id="benefits" className={`py-24 relative overflow-hidden ${isDarkMode ? "bg-[#06163C]" : "bg-white"}`}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-5">{content.eyebrow}</p>
          <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-5 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>
            <br />
            <span className="text-[#F97316]"><InViewTextEffect>{content.highlight}</InViewTextEffect></span>
          </h2>
          <p className={`max-w-lg mx-auto text-base leading-relaxed whitespace-pre-line ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{content.description}</p>
        </motion.div>

        <div className="space-y-10">
          {content.rows.map((row, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row gap-6 items-stretch ${reversed ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-[44%] relative rounded-2xl overflow-hidden max-h-[320px]">
                  <img src={row.image} alt={row.title} className="w-full h-full object-cover" style={{ maxHeight: 320 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className={`absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 ${isDarkMode ? "bg-[#06163C]/75" : "bg-white/80"}`}>
                    <Activity className="w-3.5 h-3.5 text-green-400" />
                    <span className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>Real-Time Data</span>
                  </div>
                </div>

                <div className="lg:w-[56%] relative px-10 overflow-hidden flex flex-col justify-between">
                  <span className={`absolute top-2 right-6 text-[110px] font-black leading-none select-none pointer-events-none ${isDarkMode ? "text-white/[0.05]" : "text-slate-900/[0.04]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-900/40">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-2">{row.tag}</p>
                    <h3 className={`text-2xl font-bold mb-3 leading-snug ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{row.title}</h3>
                    <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{row.description}</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                      {row.bullets.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                          <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {isCmsButtonVisible(content.rowButtonVisible) && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => runCmsButtonAction(content.rowButtonAction, content.rowButtonHref, ctx, "demo_modal")}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4 text-gray-900" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
