import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { RichText } from "@/components/site/RichText";
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from "@/lib/cms-button-actions";
import { InViewTextEffect, getIcon, type SectionCtx } from "./shared";

export interface GstFeature {
  icon: string;
  title: string;
  description: string;
}

export interface GstComplianceContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  featuredImage: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredButtonVisible?: boolean;
  featuredButtonAction?: CmsButtonAction;
  featuredButtonHref?: string;
  features: GstFeature[];
}

export function GstCompliance({ content, ctx }: { content: GstComplianceContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const [firstRow, secondRow] = [content.features.slice(0, 2), content.features.slice(2)];

  return (
    <section id="products" className={`py-24 relative overflow-hidden ${isDarkMode ? "bg-[#0B1220]" : "bg-white"}`}>
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>
            <br />
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={content.description} /></p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-col lg:flex-row gap-4">
          <div className={`relative lg:flex-[1.1] min-h-[380px] lg:min-h-0 rounded-2xl p-0.5 ${isDarkMode ? "border-[0.75px] border-white/10" : "border border-slate-200 shadow-lg"}`}>
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <div className={`relative rounded-[calc(1rem-2px)] overflow-hidden flex flex-col h-full ${isDarkMode ? "bg-[#101a30]" : "bg-slate-50"}`}>
              <div className="relative flex-1 min-h-[180px]">
                <img src={content.featuredImage} alt={content.featuredTitle} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t to-transparent ${isDarkMode ? "from-[#101a30]" : "from-slate-50"}`} />
                {isCmsButtonVisible(content.featuredButtonVisible) && (
                  <button
                    onClick={() => runCmsButtonAction(content.featuredButtonAction, content.featuredButtonHref, ctx, "demo_modal")}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                )}
                <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#0B1F4A]" />
                </div>
              </div>
              <div className="p-6 pt-9">
                <h3 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.featuredTitle}</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={content.featuredDescription} /></p>
              </div>
            </div>
          </div>

          <div className="lg:flex-[2] flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {firstRow.map((f) => {
                const Icon = getIcon(f.icon);
                return (
                  <div key={f.title} className={`relative rounded-2xl p-0.5 ${isDarkMode ? "border-[0.75px] border-white/10" : "border border-slate-200 shadow-sm"}`}>
                    <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className={`relative rounded-[calc(1rem-2px)] p-6 h-full ${isDarkMode ? "bg-[#101a30]" : "bg-white"}`}>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{f.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={f.description} /></p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 flex-1">
              {secondRow.map((f) => {
                const Icon = getIcon(f.icon);
                return (
                  <div key={f.title} className={`relative rounded-2xl p-0.5 ${isDarkMode ? "border-[0.75px] border-white/10" : "border border-slate-200 shadow-sm"}`}>
                    <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className={`relative rounded-[calc(1rem-2px)] p-6 h-full ${isDarkMode ? "bg-[#101a30]" : "bg-white"}`}>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{f.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={f.description} /></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
