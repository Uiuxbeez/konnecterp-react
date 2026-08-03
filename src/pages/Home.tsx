import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Shield, CheckCircle2,
  Menu, X, Monitor,
  ChevronRight, Moon, Sun, ArrowUp,
  Server, Layers, Zap,
  User, Mail, Phone, Building, ChevronDown, Handshake,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageSections } from '@/lib/usePageSections';
import { MENU_GROUPS } from '@/lib/nav';
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

// ── Demo Modal ────────────────────────────────────────────────────────────────
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', size: '', module: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { setStep('form'); setForm({ name: '', company: '', email: '', phone: '', size: '', module: '' }); setErrors({}); }
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid business email is required';
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Valid phone number is required';
    if (!form.size) e.size = 'Please select company size';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1400);
  };

  const field = (key: keyof typeof form, value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-blue-100 text-sm mt-1">See How Manufacturing Industry-Specific Konnect ERP Fits Your Operations</p>
            </div>

            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="px-8 py-6 space-y-4 max-h-[60vh] overflow-y-auto"
                  noValidate
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => field('name', e.target.value)}
                        placeholder="Rajesh Kumar"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => field('company', e.target.value)}
                        placeholder="Acme Manufacturing Ltd."
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.company ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => field('email', e.target.value)}
                        placeholder="rajesh@acme.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => field('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={form.size}
                          onChange={e => field('size', e.target.value)}
                          className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.size ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <option value="">Employees</option>
                          {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.module}
                          onChange={e => field('module', e.target.value)}
                          placeholder="Describe any specific requirements"
                          className="w-full pl-3 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Scheduling your demo...
                      </>
                    ) : (
                      <>Book Free Demo <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">No credit card required. Our team will reach out within 24 hours.</p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 py-10 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set, {form.name.split(' ')[0]}!</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    We've received your demo request for <strong>{form.company}</strong>.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Our team will contact you at <strong>{form.email}</strong> within 24 hours to confirm your slot.
                  </p>
                  <div className="w-full bg-orange-50 rounded-xl p-4 text-left space-y-2 mb-6">
                    <p className="text-xs font-semibold text-[#F97316] uppercase tracking-wide">What to expect</p>
                    {['30-minute personalised product walkthrough', 'Live Q&A with an ERP specialist', 'Custom pricing tailored to your business'].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full h-11 text-white font-semibold rounded-lg transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}
                  >
                    Back to KonnectERP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

// ── Video Lightbox Modal ───────────────────────────────────────────────────────
const DEMO_VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1';

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={DEMO_VIDEO_URL}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="KonnectERP Demo"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors backdrop-blur-sm border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 60], [0, 14]);
  const headerBackdropFilter = useTransform(headerBlur, v => `blur(${v}px)`);
  const headerBgLight = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']);
  const headerBorderLight = useTransform(scrollY, [0, 60], ['rgba(226,232,240,0)', 'rgba(226,232,240,0.8)']);
  const headerShadowLight = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 12px 0 rgba(0,0,0,0.07)']);
  const headerBgDark = useTransform(scrollY, [0, 60], ['rgba(8,12,24,0)', 'rgba(8,12,24,0.88)']);
  const headerBorderDark = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.08)']);
  const headerShadowDark = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 20px 0 rgba(0,0,0,0.4)']);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  type ThemeMode = 'light' | 'dark' | 'auto';
  const isNightTime = (d: Date) => {
    const mins = d.getHours() * 60 + d.getMinutes();
    return mins >= 18 * 60 + 30 || mins < 4 * 60;
  };
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [now, setNow] = useState(() => new Date());
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && isNightTime(now));

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const openDemo = () => setIsDemoModalOpen(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsDemoModalOpen(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const openVideo = () => setIsVideoModalOpen(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { sections, byType } = usePageSections('home');
  const sectionCtx: SectionCtx = { isDarkMode, openDemo, openVideo };
  const bodySections = sections.filter((s) => s.type !== 'footer');
  const footerContent = byType('footer') as unknown as FooterContent;

  return (
    <div className={`min-h-screen bg-background font-sans overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Sticky Header / Navbar */}
      <motion.header
        style={{
          backgroundColor: isDarkMode ? headerBgDark : headerBgLight,
          backdropFilter: headerBackdropFilter,
          borderBottomColor: isDarkMode ? headerBorderDark : headerBorderLight,
          boxShadow: isDarkMode ? headerShadowDark : headerShadowLight,
        }}
        className="fixed top-0 overflow-visible w-full z-50 border-b"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="relative flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {isDarkMode && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background: 'radial-gradient(ellipse 120% 140% at 50% 55%, rgba(251,146,60,0.68) 0%, rgba(59,130,246,0.18) 55%, transparent 100%)',
                  filter: 'blur(16px)',
                  transform: 'scale(2)',
                  borderRadius: '68%',
                }}
              />
            )}
            <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-10 w-auto relative" />
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-white/80' : 'text-[#0B1F4A]'}`}
            >
              Home
            </button>
            {MENU_GROUPS.map((group) => (
              <div key={group.label} className="relative group cursor-pointer py-8">
                <a href={group.href} className={`text-sm font-medium flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                  {group.label} <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                </a>
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[290px] bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="mb-3 border-b border-border/70 pb-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{group.footerLabel ?? group.label}</p>
                    {group.description && <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <a key={item.label} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex items-center rounded-full border p-0.5 gap-0.5 transition-colors ${isDarkMode ? 'bg-white/10 border-white/15' : 'bg-slate-100 border-slate-200'}`}>
              {([
                { mode: 'light', icon: <Sun className="w-4 h-4" />,     label: 'Light' },
                { mode: 'auto',  icon: <Monitor className="w-4 h-4" />, label: 'Auto'  },
                { mode: 'dark',  icon: <Moon className="w-4 h-4" />,    label: 'Dark'  },
              ] as { mode: ThemeMode; icon: React.ReactNode; label: string }[]).map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  title={mode === 'auto' ? 'Auto — light 4 AM–6:30 PM, dark 6:30 PM–4 AM' : `${label} mode`}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    themeMode === mode
                      ? isDarkMode ? 'bg-white/20 text-white shadow-sm' : 'bg-white text-[#0B1F4A] shadow-sm'
                      : isDarkMode ? 'text-white/50 hover:text-white/80' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {icon}
                  <span className={themeMode === mode ? 'inline' : 'hidden'}>{label}</span>
                </button>
              ))}
            </div>
            <Button onClick={openDemo} className="bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-orange-900/30 border-0">
              Request Demo
            </Button>
            <button
              className={`h-9 px-4 text-sm font-semibold rounded-md border transition-colors btn-infinity ${isDarkMode ? 'bg-transparent text-white border-white/30 hover:bg-white/10' : 'bg-[#041D4D] text-white border-[#041D4D]/25 hover:bg-[#0a2d6b]'}`}
              aria-label="Become a Partner"
            >
              <Handshake className="w-4 h-4 mr-2 inline-block" />
              Become a Partner
            </button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="h-20 border-b border-border flex items-center justify-between px-4">
              <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-9 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4 overflow-y-auto">
              <button
                type="button"
                className="text-left text-lg font-medium text-foreground py-2 border-b border-border"
                onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Home
              </button>
              {MENU_GROUPS.map((group) => (
                <div key={group.label} className="border-b border-border pb-3">
                  <a href={group.href} className="block text-lg font-medium text-foreground py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {group.label}
                  </a>
                  <div className="grid gap-1 pl-3">
                    {group.items.map((item) => (
                      <a key={item.label} href={item.href} className="py-1.5 text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2 pb-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Theme</p>
                <div className="flex items-center gap-2 rounded-full border border-border bg-muted p-1">
                  {([
                    { mode: 'light', icon: <Sun className="w-4 h-4" />,     label: 'Light' },
                    { mode: 'auto',  icon: <Monitor className="w-4 h-4" />, label: 'Auto'  },
                    { mode: 'dark',  icon: <Moon className="w-4 h-4" />,    label: 'Dark'  },
                  ] as { mode: ThemeMode; icon: React.ReactNode; label: string }[]).map(({ mode, icon, label }) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        themeMode === mode
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {icon}{label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2 flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>Log In</Button>
                <Button className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); openDemo(); }}>Request Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <DemoModal open={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <VideoModal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        html { scroll-behavior: smooth; }
        @keyframes beamMove {
          0%   { transform: translateX(-8px); opacity: 0.04; }
          50%  { opacity: 0.10; }
          100% { transform: translateX(8px);  opacity: 0.04; }
        }
        @keyframes heroFloatMain {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-15px); }
        }
        @keyframes heroFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes orbitSway {
          0%   { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes counterSway {
          0%   { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }
        @keyframes cardFloat0 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        @keyframes cardFloat60 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        @keyframes cardFloat120 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        @keyframes cardFloat180 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        @keyframes cardFloat240 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        @keyframes cardFloat300 {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -6px; }
        }
        /* Marquee brand logos: mild blue tint by default, show full color on hover, keep marquee running */
        .animate-marquee img {
          filter: saturate(0.6) hue-rotate(200deg) brightness(0.95);
          transition: filter 220ms ease, opacity 200ms ease;
          opacity: 0.95;
        }
        .animate-marquee img:hover,
        .animate-marquee a:hover img,
        .animate-marquee img:focus,
        .animate-marquee a:focus img {
          filter: none;
          opacity: 1;
        }
        .btn-infinity {
          position: relative;
          overflow: hidden;
        }
        .btn-infinity::before {
          content: '';
          position: absolute;
          left: -120%;
          top: 0;
          height: 100%;
          width: 220%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 80%, transparent 100%);
          transform: translateX(0);
          animation: infinityMove 3.2s linear infinite;
          pointer-events: none;
        }
        @keyframes infinityMove {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .btn-infinity svg { transition: transform 220ms ease; }
        .btn-infinity:hover svg { transform: translateY(-2px) rotate(-6deg); }
      `}} />
    </div>
  );
}
