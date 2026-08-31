import { CheckCircle2, Mail, Phone } from "lucide-react";
import { InViewTextEffect, type SectionCtx } from "./shared";
import { PublicForm } from "@/components/site/PublicForm";

export interface ContactContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  checklist: string[];
  step2Title: string;
  email: string;
  phone: string;
  step3Title: string;
  step3Description: string;
  formTitle: string;
  submitButtonText: string;
}

export function ContactSection({ content, ctx }: { content: ContactContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section className={`py-20 relative overflow-hidden ${isDarkMode ? "bg-[#080E1D]" : "bg-white"}`}>
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-8xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-[52%]">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">{content.eyebrow}</p>
            <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-5 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
              <InViewTextEffect>{content.title}</InViewTextEffect>
              <br />
              <span className="text-[#F97316]"><InViewTextEffect>{content.highlight}</InViewTextEffect></span>
            </h2>
            <p className={`text-base leading-relaxed mb-10 max-w-md ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{content.description}</p>

            <div className="flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">1</div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {content.checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">2</div>
              <div>
                <p className={`font-bold text-sm mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.step2Title}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-1">
                  <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {content.email}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {content.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">3</div>
              <div>
                <p className={`font-bold text-sm mb-1 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.step3Title}</p>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{content.step3Description}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-[48%] w-full">
            <div className={`overflow-hidden rounded-2xl ${isDarkMode ? "border border-white/[0.08] bg-white" : "border border-slate-200 bg-white shadow-lg"}`}>
              <PublicForm slug="demo-request" source="home-contact-section" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
