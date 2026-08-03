import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { getIcon, type SectionCtx } from "./shared";

export interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface StatisticsContent {
  stats: StatItem[];
}

export function Statistics({ content, ctx }: { content: StatisticsContent; ctx: SectionCtx }) {
  return (
    <section className={`relative py-4 md:py-8 ${ctx.isDarkMode ? "bg-[#080c18]" : "bg-white"}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 pb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {content.stats.map((s, i) => {
            const Icon = getIcon(s.icon);
            const accent = i === 0;
            return (
              <div key={i} className="relative rounded-2xl p-0.5 border-[0.75px] border-white/10">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative rounded-[calc(1rem-2px)] p-5 h-full overflow-hidden" style={{ background: "rgba(11,31,74,0.82)", backdropFilter: "blur(10px)" }}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${accent ? "bg-[#F97316]/20 text-[#F97316]" : "bg-white/10 text-white/70"}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className={`text-3xl font-extrabold mb-1 ${accent ? "text-[#F97316]" : "text-white"}`}>
                    {s.value.toLocaleString()}{s.suffix}
                  </div>
                  <div className="text-sm font-semibold mb-1 text-white">{s.label}</div>
                  <div className="text-[10px] font-medium text-slate-400 tracking-wide">{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
