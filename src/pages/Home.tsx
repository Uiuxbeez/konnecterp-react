import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Layers, Shield, Zap } from 'lucide-react';
import { usePageSections } from '@/lib/usePageSections';
import { InViewTextEffect, type SectionCtx } from '@/sections/shared';
import { Hero, type HeroContent } from '@/sections/Hero';
import { Statistics, type StatisticsContent } from '@/sections/Statistics';
import { TrustedCompanies, type TrustedCompaniesContent } from '@/sections/TrustedCompanies';
import { IndustrySolutions, type IndustrySolutionsContent } from '@/sections/IndustrySolutions';
import { GstCompliance, type GstComplianceContent } from '@/sections/GstCompliance';
import { WhyChooseUs, type WhyChooseUsContent } from '@/sections/WhyChooseUs';
import { CustomerStories, type CustomerStoriesContent } from '@/sections/CustomerStories';
import { ContactSection, type ContactContent } from '@/sections/ContactSection';
import { FooterSection, type FooterContent } from '@/sections/FooterSection';
import type { PageSection } from '@/lib/usePageSections';
import type { SectionType } from '@shared/sections';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SiteHeader } from '@/components/site/SiteHeader';
import { DemoModal } from '@/components/site/DemoModal';
import { VideoModal } from '@/components/site/VideoModal';
import { ScrollToTopButton } from '@/components/site/ScrollToTopButton';

// Helper for Animated Counters
const AnimatedCounter = ({ value, duration = 2, suffix = '' }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

function renderManagedSection(section: PageSection, ctx: SectionCtx, byType: (t: SectionType) => Record<string, unknown>) {
  switch (section.type) {
    case 'hero':
      return <Hero key={section.id} content={byType('hero') as unknown as HeroContent} ctx={ctx} />;
    case 'statistics':
      return <Statistics key={section.id} content={byType('statistics') as unknown as StatisticsContent} ctx={ctx} />;
    case 'trusted_companies':
      return <TrustedCompanies key={section.id} content={byType('trusted_companies') as unknown as TrustedCompaniesContent} ctx={ctx} />;
    case 'industry_solutions':
      return <IndustrySolutions key={section.id} content={byType('industry_solutions') as unknown as IndustrySolutionsContent} ctx={ctx} />;
    case 'gst_compliance':
      return <GstCompliance key={section.id} content={byType('gst_compliance') as unknown as GstComplianceContent} ctx={ctx} />;
    case 'why_choose_us':
      return <WhyChooseUs key={section.id} content={byType('why_choose_us') as unknown as WhyChooseUsContent} ctx={ctx} />;
    case 'customer_stories':
      return <CustomerStories key={section.id} content={byType('customer_stories') as unknown as CustomerStoriesContent} ctx={ctx} />;
    case 'contact':
      return <ContactSection key={section.id} content={byType('contact') as unknown as ContactContent} ctx={ctx} />;
    default:
      return null;
  }
}

export default function Home() {
  const chrome = useSiteChrome();
  const { isDarkMode, openDemo, openVideo } = chrome;
  useDocumentMeta();

  const { sections, byType } = usePageSections('home');
  const sectionCtx: SectionCtx = { isDarkMode, openDemo, openVideo };
  const bodySections = sections.filter((s) => s.type !== 'footer');
  const footerContent = byType('footer') as unknown as FooterContent;

  return (
    <div className={`min-h-screen bg-background font-sans overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <SiteHeader
        isDarkMode={chrome.isDarkMode}
        themeMode={chrome.themeMode}
        setThemeMode={chrome.setThemeMode}
        headerBackdropFilter={chrome.headerBackdropFilter}
        headerBgLight={chrome.headerBgLight}
        headerBorderLight={chrome.headerBorderLight}
        headerShadowLight={chrome.headerShadowLight}
        headerBgDark={chrome.headerBgDark}
        headerBorderDark={chrome.headerBorderDark}
        headerShadowDark={chrome.headerShadowDark}
        isMobileMenuOpen={chrome.isMobileMenuOpen}
        setIsMobileMenuOpen={chrome.setIsMobileMenuOpen}
        openDemo={chrome.openDemo}
      />

      {/* CMS-managed sections, rendered in the order set in the Page Builder */}
      {bodySections.map((section) => renderManagedSection(section, sectionCtx, byType))}

      {/* Built Different / Globe section + Stats — not yet CMS-managed */}
      <section className={`relative overflow-hidden ${isDarkMode ? 'bg-[#001133]' : 'bg-white'}`}>
        <div className="relative overflow-hidden" style={{ minHeight: 460 }}>
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/global.svg"
                alt=""
                className={`w-full h-full object-cover object-top ${isDarkMode ? 'opacity-70' : 'opacity-20'}`}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(249,115,22,0.10) 0%, rgba(17,101,239,0.07) 45%, transparent 70%)',
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1280 460"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[
                { x1: 320, y1: 195, x2: 437, y2: 77 },
                { x1: 437, y1: 77, x2: 640, y2: 68 },
                { x1: 640, y1: 68, x2: 860, y2: 203 },
                { x1: 860, y1: 203, x2: 870, y2: 122 },
                { x1: 870, y1: 122, x2: 950, y2: 167 },
                { x1: 950, y1: 167, x2: 860, y2: 203 },
                { x1: 860, y1: 203, x2: 320, y2: 195 },
              ].map((ln, i) => {
                const len = Math.hypot(ln.x2 - ln.x1, ln.y2 - ln.y1);
                return (
                  <motion.line
                    key={i}
                    x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                    stroke={isDarkMode ? 'rgba(99,179,237,0.35)' : 'rgba(17,101,239,0.20)'}
                    strokeWidth="1"
                    strokeDasharray={`${len}`}
                    initial={{ strokeDashoffset: len }}
                    animate={{ strokeDashoffset: [len, 0, -len] }}
                    transition={{
                      duration: 3.5,
                      delay: i * 0.45,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}

              {[
                { cx: 320,  cy: 195, label: 'Tamil Nadu' },
                { cx: 437,  cy: 77, label: 'Maharashtra' },
                { cx: 640,  cy: 68, label: 'Karnataka' },
                { cx: 860,  cy: 203, label: 'Gujarat' },
                { cx: 870,  cy: 122, label: 'Goa' },
                { cx: 950, cy: 167, label: 'Kerala' },
              ].map((dot, i) => (
                <g key={dot.label}>
                  <motion.circle
                    cx={dot.cx} cy={dot.cy} r={10}
                    fill="none"
                    stroke={isDarkMode ? 'rgba(249,115,22,0.5)' : 'rgba(249,115,22,0.4)'}
                    strokeWidth="1"
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.35, repeat: Infinity, ease: 'easeOut' }}
                    style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
                  />
                  <circle
                    cx={dot.cx} cy={dot.cy} r={3.5}
                    fill={isDarkMode ? '#F97316' : '#1165EF'}
                  />
                  <text
                    x={dot.cx} y={dot.cy - 10}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill={isDarkMode ? 'rgba(255,255,255,0.55)' : 'rgba(11,31,74,0.55)'}
                    letterSpacing="0.04em"
                  >
                    {dot.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="relative z-10 px-8 md:px-16 py-20 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-12"
            >
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-400 mb-4">
                Why 5,000 Businesses Choose KonnectERP
              </p>
              <h2 className={`text-4xl md:text-[52px] font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                <InViewTextEffect>Built Different.</InViewTextEffect><br />
                <span className="text-[#F97316]"><InViewTextEffect>Proven in the Field.</InViewTextEffect></span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
              <div className="flex flex-col gap-8">
                {[
                  { icon: Server, title: 'Cloud-Native, Low TCO', desc: 'No servers to buy, no IT staff to manage. Start for a fraction of what legacy ERP costs.' },
                  { icon: Layers, title: 'Modular by Design', desc: "Start with finance and inventory. Add CRM, HRMS, and BI when you're ready. No forced bundles." },
                ].map((feat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }} className="flex gap-3 flex gap-3 rounded-[5px] border border-[rgba(178,178,178,0.23)] bg-white/10 backdrop-blur-sm p-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <feat.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{feat.title}</p>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-8">
                {[
                  { icon: Shield, title: 'Amazon-Hosted Security', desc: 'Triple-layered data security on AWS. Your business data stays private and always backed up.' },
                  { icon: Zap, title: 'Quickest Onboarding', desc: 'Go live in weeks, not months. Pre-configured industry templates mean 80% setup is already done.' },
                ].map((feat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }} className="flex gap-3 flex gap-3 rounded-[5px] border border-[rgba(178,178,178,0.23)] bg-white/10 backdrop-blur-sm p-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <feat.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{feat.title}</p>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col gap-6 lg:pl-8">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1.5">Coimbatore · Pune · Chennai</p>
                  <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>5 Offices Across India</h3>
                </div>
                <div className={`w-12 h-px ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1.5">Amazon AWS Hosted</p>
                  <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Triple-layer security</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-white/[0.07]' : 'bg-[#001133] border-white/[0.07]'}`}>
          <div className="container mx-auto px-4 max-w-8xl">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: 500, suffix: '+', label: 'Businesses Managed' },
                { value: 50, suffix: 'k+', label: 'Daily Transactions' },
                { value: 99.9, suffix: '%', label: 'System Uptime' },
                { value: 15, suffix: '+', label: 'Industry Verticals' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`py-14 px-6 text-center ${i < 3 ? 'md:border-r border-white/[0.07]' : ''} ${i === 0 || i === 2 ? 'border-r border-white/[0.07] md:border-r-0' : ''}`}
                >
                  <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-400 font-semibold text-xs uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />

      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
