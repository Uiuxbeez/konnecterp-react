import { useState } from "react";
import { CheckCircle2, Mail, Phone, ChevronDown } from "lucide-react";
import { InViewTextEffect, type SectionCtx } from "./shared";

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

const INDUSTRY_OPTIONS = ["Manufacturing", "Trading & Distribution", "Retail", "Construction", "Job Work", "Healthcare", "Education", "Logistics", "Other"];

export function ContactSection({ content, ctx }: { content: ContactContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const [form, setForm] = useState({ name: "", company: "", mobile: "", industry: "", teamSize: "", consent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <div className={`rounded-2xl p-8 ${isDarkMode ? "border border-white/[0.08] bg-[#0d1626]" : "border border-slate-200 bg-white shadow-lg"}`}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>You're all set!</h3>
                  <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>We'll reach out within 24 hours to confirm your demo slot.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.formTitle}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                        Your Name <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Rajesh Kumar"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? "bg-[#162035] border-white/10 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400"}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                        Company Name <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Manufacturing Pvt. Ltd."
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        required
                        className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? "bg-[#162035] border-white/10 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Mobile Number <span className="text-orange-400">*</span>
                    </label>
                    <div className="flex">
                      <div className={`flex items-center px-3 rounded-l-lg border border-r-0 text-sm font-medium shrink-0 ${isDarkMode ? "bg-[#162035] border-white/10 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}>+91</div>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={form.mobile}
                        onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                        required
                        className={`flex-1 h-11 px-3 rounded-r-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? "bg-[#162035] border-white/10 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Your Industry <span className="text-orange-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.industry}
                        onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                        required
                        className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors appearance-none ${isDarkMode ? "bg-[#162035] border-white/10" : "bg-slate-50 border-slate-200 text-[#0B1F4A]"}`}
                        style={{ color: form.industry ? (isDarkMode ? "#fff" : "#0B1F4A") : "#64748b" }}
                      >
                        <option value="" disabled>Select your industry</option>
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} style={{ background: isDarkMode ? "#162035" : "#fff", color: isDarkMode ? "#fff" : "#0B1F4A" }}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">Team Size</label>
                    <input
                      type="text"
                      placeholder="Number of employees"
                      value={form.teamSize}
                      onChange={(e) => setForm((f) => ({ ...f, teamSize: e.target.value }))}
                      className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? "bg-[#162035] border-white/10 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400"}`}
                    />
                  </div>

                  <button type="submit" className="w-full h-12 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base transition-colors shadow-lg shadow-orange-900/30">
                    {content.submitButtonText}
                  </button>

                  <div className="flex gap-2.5 items-start pt-1">
                    <input
                      type="checkbox"
                      id="cta-consent"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 w-3.5 h-3.5 accent-blue-500 shrink-0"
                    />
                    <label htmlFor="cta-consent" className="text-slate-500 text-[11px] leading-relaxed cursor-pointer">
                      By opting in, you agree to our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> and Terms of Use. By providing my phone number, I agree to receive text messages from the business.
                    </label>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
