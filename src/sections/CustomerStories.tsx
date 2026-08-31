import { motion } from "framer-motion";
import { RichText } from "@/components/site/RichText";
import { InViewTextEffect, type SectionCtx } from "./shared";

export interface Story {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  badge: string;
}

export interface CustomerStoriesContent {
  title: string;
  description: string;
  stories: Story[];
}

export function CustomerStories({ content, ctx }: { content: CustomerStoriesContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const indColor = isDarkMode ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-blue-600 bg-blue-50 border-blue-200";
  const badgeColor = isDarkMode ? "text-blue-400" : "text-blue-600";

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-700/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>
          </h2>
          <p className={`max-w-lg mx-auto text-base leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={content.description} /></p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {content.stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col rounded-2xl p-7 transition-colors ${isDarkMode ? "bg-[#0d1626] border border-white/[0.07] hover:border-white/[0.14]" : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm"}`}
            >
              <div className={`inline-block self-start px-2.5 py-1 rounded-md border text-[10px] font-bold tracking-widest uppercase mb-5 ${indColor}`}>{story.industry}</div>
              <h3 className={`text-xl font-bold mb-5 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{story.company}</h3>
              <div className="space-y-4 flex-1 mb-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Challenge</span>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{story.challenge}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Solution</span>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{story.solution}</p>
                </div>
              </div>
              <div className={`pt-5 mt-auto border-t ${isDarkMode ? "border-white/[0.07]" : "border-slate-100"}`}>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-2">Result</span>
                <p className={`font-semibold text-sm mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{story.result}</p>
                <span className={`text-lg font-black ${badgeColor}`}>{story.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
