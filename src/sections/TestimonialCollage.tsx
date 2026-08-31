import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { RichText } from "@/components/site/RichText";
import type { SectionCtx } from "./shared";

export interface TestimonialCollagePhoto {
  image: string;
  alt: string;
  name: string;
  role: string;
}

export interface TestimonialCollageContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  photos: TestimonialCollagePhoto[];
}

export function TestimonialCollage({ content, ctx }: { content: TestimonialCollageContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const photos = content.photos ?? [];

  return (
    <section className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-white"}`}>
      <div className="container mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "border-white/15 bg-white/10 text-white/80" : "border-orange-200 bg-orange-50 text-orange-600"}`}>
            <Quote className="h-3.5 w-3.5 text-[#F97316]" />
            {content.eyebrow}
          </div>
          <h2 className={`mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            {content.title}
            <br />
            <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`max-w-2xl text-base leading-8 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}><RichText text={content.description} /></p>
        </motion.div>

        <div className="relative min-h-[420px]">
          <div className={`absolute inset-0 rounded-[2rem] blur-2xl ${isDarkMode ? "bg-gradient-to-br from-orange-500/10 via-white/5 to-blue-500/10" : "bg-gradient-to-br from-orange-100 via-slate-100 to-blue-100"}`} />
          <div className="relative grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={`${photo.image}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`overflow-hidden rounded-2xl border shadow-xl ${index % 2 === 1 ? "translate-y-10" : ""} ${isDarkMode ? "border-white/10 bg-white/10" : "border-slate-200 bg-white"}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={photo.image} alt={photo.alt || photo.name} className="h-full w-full object-cover grayscale transition-transform duration-500 hover:scale-105 hover:grayscale-0" />
                </div>
                <div className="p-4">
                  <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{photo.name}</p>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{photo.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
