import React, { useState, useEffect, useRef } from 'react';
import { TextEffect } from '@/components/ui/text-effect';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, BarChart3, Box, Users, ShoppingCart, Activity, Shield, CheckCircle2, Factory, 
  Stethoscope, GraduationCap, Building2, Truck, BookOpen, Layers, Menu, X, Check, Monitor, 
  LayoutDashboard, ChevronRight, ChevronLeft, Moon, Sun, ArrowUp, Briefcase, FileText, Lock, Globe,
  MessageSquare, Settings, CreditCard, PieChart, Database, Network, LineChart, Server, Zap, RefreshCw, Smartphone,
  User, Mail, Phone, Building, ChevronDown, PartyPopper, Play, TrendingUp, Package, Handshake, HardHat, Cpu, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

// ── Demo Modal ────────────────────────────────────────────────────────────────
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];
const MODULES = ['Finance & Accounting', 'Inventory Management', 'CRM & Sales', 'HR & Payroll', 'Manufacturing', 'Project Management'];

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', size: '', module: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (open) { setStep('form'); setForm({ name: '', company: '', email: '', phone: '', size: '', module: '' }); setErrors({}); }
  }, [open]);

  // Lock body scroll
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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header stripe */}
            <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">KonnectERP.</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Book Your Free Demo</h2>
              <p className="text-blue-100 text-sm mt-1">See how KonnectERP can transform your business in 30 minutes.</p>
            </div>

            {/* Body */}
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
                  {/* Name */}
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

                  {/* Company */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Company Size + Module */}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
                      <div className="relative">
                        <select
                          value={form.module}
                          onChange={e => field('module', e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                        >
                          <option value="">All Modules</option>
                          {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
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
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ── Network Mesh Canvas Background ────────────────────────────────────────────
function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const N = 90;
    let particles: P[] = [];
    const reset = () => {
      particles = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
      }));
    };
    reset();

    let mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener('mousemove', onMove);

    const D = 155;
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 220) { p.vx += dx * 0.000035; p.vy += dy * 0.000035; }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.75) { p.vx *= 0.75 / spd; p.vy *= 0.75 / spd; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / D) * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147,197,253,0.75)';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', onMove); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'auto' }} />;
}

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

// Normal text: blur + fade + slight rise per word
const smoothTitleVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

// Gradient text: NO blur on items — filter:blur() on child spans breaks
// background-clip:text on ancestor elements by creating separate compositing layers.
// Gradient class is applied directly on the TextEffect root span instead.
const smoothGradientVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

function InViewTextEffect({
  children,
  className,
  gradient,
}: {
  children: string;
  className?: string;
  gradient?: string; // pass bg-clip-text gradient classes here instead of a parent wrapper
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const variants = gradient ? smoothGradientVariants : smoothTitleVariants;
  const effectClass = gradient
    ? [gradient, className].filter(Boolean).join(' ')
    : className;
  return (
    <span ref={ref}>
      <TextEffect as='span' per='word' variants={variants} trigger={isInView} className={effectClass}>
        {children}
      </TextEffect>
    </span>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 60], [0, 14]);
  const headerBackdropFilter = useTransform(headerBlur, v => `blur(${v}px)`);
  // Light mode: fades to white
  const headerBgLight = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']);
  const headerBorderLight = useTransform(scrollY, [0, 60], ['rgba(226,232,240,0)', 'rgba(226,232,240,0.8)']);
  const headerShadowLight = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 12px 0 rgba(0,0,0,0.07)']);
  // Dark mode: fades to deep navy
  const headerBgDark = useTransform(scrollY, [0, 60], ['rgba(8,12,24,0)', 'rgba(8,12,24,0.88)']);
  const headerBorderDark = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.08)']);
  const headerShadowDark = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 20px 0 rgba(0,0,0,0.4)']);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Theme: 'light' | 'dark' | 'auto' ──────────────────────────────
  type ThemeMode = 'light' | 'dark' | 'auto';
  const isNightTime = (d: Date) => {
    const mins = d.getHours() * 60 + d.getMinutes();
    return mins >= 18 * 60 + 30 || mins < 4 * 60; // 18:30 → 04:00
  };
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [now, setNow] = useState(() => new Date());
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && isNightTime(now));

  // Tick every minute so auto mode reacts to time changes
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Keep <html> class in sync
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const openDemo = () => setIsDemoModalOpen(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFloatingPlayerOpen, setIsFloatingPlayerOpen] = useState(true);
  const openVideo = () => setIsVideoModalOpen(true);


  const OFFERINGS = [
    {
      id: 'erp',
      label: 'ERP Suite',
      tagline: 'Your entire business, one platform',
      icon: Layers,
      accentColor: '#F97316',
      lightColor: '#FFF7ED',
      features: [
        { icon: BarChart3, title: 'Real-Time Financial Dashboards', desc: 'P&L, balance sheets, and cash-flow statements updated live.' },
        { icon: Package, title: 'End-to-End Inventory Control', desc: 'Multi-warehouse, batch tracking, and automated reorder rules.' },
        { icon: RefreshCw, title: 'Automated Workflows', desc: 'Approvals, PO generation, and invoicing without manual steps.' },
        { icon: Globe, title: 'Multi-Company & Multi-Currency', desc: 'Run multiple entities and currencies from one login.' },
      ],
      mockup: (
        <div className="flex h-full bg-[#f8fafc] rounded-xl overflow-hidden border border-gray-200 shadow-xl">
          {/* Sidebar */}
          <div className="w-44 flex flex-col py-5 px-3 gap-1 shrink-0" style={{ background: 'linear-gradient(160deg, #0B1F4A 0%, #162d66 100%)' }}>
            <div className="text-white font-bold text-xs px-2 mb-3 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> KonnectERP</div>
            {['Dashboard','Finance','Inventory','Purchase','Sales','Manufacturing','Reports'].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] font-medium ${i === 0 ? 'bg-white/20 text-white' : 'text-blue-200/70 hover:bg-white/10'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />{item}
              </div>
            ))}
          </div>
          {/* Main */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="text-xs font-bold text-gray-700 mb-3">Financial Overview — FY 2025–26</div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[{ l:'Revenue', v:'₹1.24 Cr', d:'+18%', up:true }, { l:'Expenses', v:'₹42.1L', d:'+4%', up:false }, { l:'Net Profit', v:'₹82.3L', d:'+31%', up:true }].map((s,i)=>(
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm">
                  <div className="text-[9px] text-gray-400 mb-0.5">{s.l}</div>
                  <div className="text-sm font-black text-gray-800">{s.v}</div>
                  <div className={`text-[9px] font-semibold ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>{s.d} vs last yr</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm mb-2">
              <div className="text-[9px] text-gray-400 mb-2">Monthly Revenue</div>
              <div className="flex items-end gap-1 h-16">
                {[40,55,48,72,60,85,68,92,78,88,70,100].map((h,i)=>(
                  <div key={i} className={`flex-1 rounded-t`} style={{height:`${h}%`, background: i===11 ? '#F97316' : 'rgba(249,115,22,0.2)'}} />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-gray-300 mt-1">
                {['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'].map(m=><span key={m}>{m}</span>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm">
                <div className="text-[9px] text-gray-400 mb-1">Pending Payables</div>
                {['Vendor A — ₹4.2L','Vendor B — ₹1.8L','Vendor C — ₹3.1L'].map((v,i)=>(
                  <div key={i} className="text-[9px] text-gray-600 border-b border-gray-50 py-0.5">{v}</div>
                ))}
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm">
                <div className="text-[9px] text-gray-400 mb-1">Outstanding Receivables</div>
                {['Client X — ₹6.5L','Client Y — ₹2.3L','Client Z — ₹4.8L'].map((v,i)=>(
                  <div key={i} className="text-[9px] text-gray-600 border-b border-gray-50 py-0.5">{v}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bi',
      label: 'Business Intelligence',
      tagline: 'Turn data into decisions instantly',
      icon: BarChart2,
      accentColor: '#7C3AED',
      lightColor: '#F5F3FF',
      features: [
        { icon: PieChart, title: 'Custom Dashboards & KPIs', desc: 'Drag-and-drop widgets tailored to every role and department.' },
        { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Spot trends before they happen with AI-driven forecasting.' },
        { icon: Database, title: 'Unified Data Layer', desc: 'Connect finance, sales, HR, and ops data in one analytics hub.' },
        { icon: LineChart, title: 'Scheduled Reports', desc: 'Auto-deliver reports to stakeholders via email or WhatsApp.' },
      ],
      mockup: (
        <div className="flex flex-col h-full bg-[#0f0a1e] rounded-xl overflow-hidden border border-violet-900/50 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <BarChart2 className="w-4 h-4 text-violet-400" />
            <span className="text-white text-xs font-bold">Analytics Studio</span>
            <div className="ml-auto flex gap-1.5">
              {['Q1','Q2','Q3','Q4'].map((q,i)=>(
                <span key={q} className={`text-[9px] px-2 py-0.5 rounded-md font-semibold ${i===3?'bg-violet-500 text-white':'text-white/40 hover:text-white/70'}`}>{q}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 p-3 grid grid-cols-2 gap-2 overflow-hidden">
            {/* Revenue vs target */}
            <div className="bg-white/5 rounded-lg p-2.5 col-span-2">
              <div className="text-[9px] text-white/40 mb-1">Revenue vs Target — 12 Months</div>
              <div className="flex items-end gap-0.5 h-14">
                {[{a:60,t:70},{a:75,t:70},{a:68,t:70},{a:85,t:80},{a:78,t:80},{a:92,t:80},{a:88,t:85},{a:95,t:85},{a:82,t:85},{a:100,t:90},{a:91,t:90},{a:98,t:90}].map((m,i)=>(
                  <div key={i} className="flex-1 flex items-end gap-px">
                    <div className="flex-1 bg-violet-500/80 rounded-t-sm" style={{height:`${m.a}%`}} />
                    <div className="flex-1 bg-white/10 rounded-t-sm" style={{height:`${m.t}%`}} />
                  </div>
                ))}
              </div>
            </div>
            {/* Top products donut placeholder */}
            <div className="bg-white/5 rounded-lg p-2.5">
              <div className="text-[9px] text-white/40 mb-2">Sales by Region</div>
              {[{r:'North',pct:38,c:'bg-violet-400'},{r:'South',pct:27,c:'bg-blue-400'},{r:'West',pct:21,c:'bg-emerald-400'},{r:'East',pct:14,c:'bg-amber-400'}].map((r,i)=>(
                <div key={i} className="flex items-center gap-1.5 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${r.c}`} />
                  <div className="text-[9px] text-white/60 flex-1">{r.r}</div>
                  <div className="text-[9px] font-bold text-white/80">{r.pct}%</div>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-lg p-2.5">
              <div className="text-[9px] text-white/40 mb-1">Key Metrics</div>
              {[{l:'Avg Deal Size',v:'₹2.4L'},{l:'Churn Rate',v:'1.8%'},{l:'NPS Score',v:'72'},{l:'CAC',v:'₹18K'}].map((m,i)=>(
                <div key={i} className="flex justify-between py-0.5 border-b border-white/5">
                  <span className="text-[9px] text-white/50">{m.l}</span>
                  <span className="text-[9px] font-bold text-violet-300">{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'crm',
      label: 'CRM & Sales',
      tagline: 'Close more deals, faster',
      icon: Handshake,
      accentColor: '#059669',
      lightColor: '#ECFDF5',
      features: [
        { icon: Users, title: 'Lead & Pipeline Management', desc: 'Capture, qualify, and convert leads through a visual Kanban pipeline.' },
        { icon: MessageSquare, title: 'WhatsApp & Email Integration', desc: 'Communicate with prospects directly from within the CRM.' },
        { icon: Activity, title: 'Sales Forecasting', desc: 'AI-powered revenue projections based on historical pipeline data.' },
        { icon: Zap, title: 'Automated Follow-Ups', desc: 'Never miss a follow-up with smart reminders and sequences.' },
      ],
      mockup: (
        <div className="flex flex-col h-full bg-[#f8fafc] rounded-xl overflow-hidden border border-gray-200 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-white">
            <Handshake className="w-4 h-4 text-emerald-600" />
            <span className="text-gray-800 text-xs font-bold">Sales Pipeline</span>
            <div className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-100">₹38.2L Active</div>
          </div>
          <div className="flex gap-2 p-3 overflow-hidden flex-1">
            {[
              { stage:'Prospect', color:'bg-gray-100', dot:'bg-gray-400', deals:[{n:'Rajesh Industries',v:'₹4.2L'},{n:'MegaBuild Ltd',v:'₹2.8L'}] },
              { stage:'Proposal', color:'bg-blue-50', dot:'bg-blue-400', deals:[{n:'TechCorp Pvt',v:'₹6.5L'},{n:'Alpha Retail',v:'₹3.1L'}] },
              { stage:'Negotiation', color:'bg-amber-50', dot:'bg-amber-400', deals:[{n:'SwiftLogix',v:'₹8.2L'},{n:'BuildRight',v:'₹5.4L'}] },
              { stage:'Won', color:'bg-emerald-50', dot:'bg-emerald-400', deals:[{n:'Nexus Chain',v:'₹9.8L'},{n:'PrimeDist',v:'₹7.1L'}] },
            ].map((col,i)=>(
              <div key={i} className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide truncate">{col.stage}</span>
                </div>
                {col.deals.map((d,j)=>(
                  <div key={j} className={`${col.color} rounded-lg p-2 border border-gray-100`}>
                    <div className="text-[9px] font-semibold text-gray-700 truncate">{d.n}</div>
                    <div className="text-[10px] font-black text-gray-800">{d.v}</div>
                  </div>
                ))}
                <div className="mt-auto text-[8px] text-gray-300 text-center">+{i+2} more</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'hrms',
      label: 'HR & Payroll',
      tagline: 'Your people, perfectly managed',
      icon: Users,
      accentColor: '#EA580C',
      lightColor: '#FFF7ED',
      features: [
        { icon: Briefcase, title: 'Employee Lifecycle Management', desc: 'Onboarding, transfers, appraisals, and exits — all in one place.' },
        { icon: CreditCard, title: 'Automated Payroll & Compliance', desc: 'PF, ESI, TDS, and payslips generated automatically every month.' },
        { icon: CheckCircle2, title: 'Attendance & Leave Tracking', desc: 'Biometric integration, geo-fencing, and smart leave policies.' },
        { icon: Activity, title: 'Performance Management', desc: 'Set goals, conduct reviews, and track KPIs for every employee.' },
      ],
      mockup: (
        <div className="flex flex-col h-full bg-[#f8fafc] rounded-xl overflow-hidden border border-gray-200 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-white">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-gray-800 text-xs font-bold">HR Dashboard</span>
            <div className="ml-auto text-[9px] font-semibold text-gray-400">June 2026</div>
          </div>
          <div className="flex-1 p-3 overflow-hidden grid grid-cols-5 gap-2">
            {/* Left stats */}
            <div className="col-span-2 flex flex-col gap-2">
              {[{l:'Total Employees',v:'248',d:'+4 this month',c:'text-emerald-500'},{l:'On Leave Today',v:'12',d:'4 pending approval',c:'text-amber-500'},{l:'Monthly Payroll',v:'₹42.8L',d:'Processed',c:'text-blue-500'}].map((s,i)=>(
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm">
                  <div className="text-[9px] text-gray-400">{s.l}</div>
                  <div className="text-sm font-black text-gray-800">{s.v}</div>
                  <div className={`text-[9px] ${s.c} font-medium`}>{s.d}</div>
                </div>
              ))}
            </div>
            {/* Right employee list + payroll */}
            <div className="col-span-3 flex flex-col gap-2">
              <div className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm flex-1">
                <div className="text-[9px] text-gray-400 mb-1.5">Recent Activity</div>
                {[{n:'Priya Sharma',a:'Joined — Engineering',t:'Today',c:'bg-emerald-100 text-emerald-700'},{n:'Rahul Mehta',a:'Leave Approved',t:'Yesterday',c:'bg-blue-100 text-blue-700'},{n:'Anita Patel',a:'Payslip Generated',t:'Jun 10',c:'bg-orange-100 text-orange-700'},{n:'Suresh Kumar',a:'Promotion Approved',t:'Jun 8',c:'bg-violet-100 text-violet-700'}].map((e,i)=>(
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-gray-50 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[8px] font-bold text-orange-600 shrink-0">{e.n[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-semibold text-gray-700 truncate">{e.n}</div>
                      <div className="text-[8px] text-gray-400 truncate">{e.a}</div>
                    </div>
                    <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${e.c}`}>{e.t}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm">
                <div className="text-[9px] text-gray-400 mb-1">Dept. Headcount</div>
                {[{d:'Engineering',n:68,max:80},{d:'Operations',n:82,max:90},{d:'Sales',n:45,max:60}].map((d,i)=>(
                  <div key={i} className="flex items-center gap-1.5 mb-1 last:mb-0">
                    <div className="text-[8px] text-gray-500 w-16 truncate">{d.d}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-1"><div className="h-full bg-orange-400 rounded-full" style={{width:`${(d.n/d.max)*100}%`}} /></div>
                    <div className="text-[8px] font-bold text-gray-600">{d.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const [activeOffering, setActiveOffering] = useState('erp');
  const [expandedIndustry, setExpandedIndustry] = useState(0);
  const [ctaForm, setCtaForm] = useState({ name: '', company: '', mobile: '', industry: '', teamSize: '', consent: false });
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCtaSubmitted(true);
  };

  const INDUSTRY_CARDS = [
    {
      id: 0,
      tag: 'Process Manufacturing',
      title: 'Scale production without losing control',
      desc: 'Manage BOMs, batch processing, quality control, and cost-of-production in one connected system built for process manufacturers.',
      metric: 'Reduced production waste by 34%',
      gradient: 'linear-gradient(135deg, #0f2d6b 0%, #1a4a9e 40%, #0d3580 100%)',
      image: '/images/industry-manufacturing.jpg',
      icon: Factory,
      accentColor: '#60A5FA',
      highlights: ['Batch & Process BOM', 'Quality Control', 'Costing & Variance', 'Multi-Unit Production'],
    },
    {
      id: 1,
      tag: 'Trading Sector',
      title: 'Buy smart, sell faster, grow bigger',
      desc: 'Automate purchase orders, track multi-location stock in real time, and manage customer credit limits — all from a single trading ERP.',
      metric: 'Order processing 3× faster',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)',
      image: '/images/industry-trading.jpg',
      icon: ShoppingCart,
      accentColor: '#34D399',
      highlights: ['Purchase Automation', 'Multi-Warehouse Stock', 'Credit Limit Control', 'Price Lists & Schemes'],
    },
    {
      id: 2,
      tag: 'Job Work',
      title: 'Track every job, bill every minute',
      desc: 'Manage subcontracting, job cards, material in/out, and billing for job work operations with full traceability and zero revenue leakage.',
      metric: 'Zero revenue leakage on job orders',
      gradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)',
      image: '/images/industry-jobwork.jpg',
      icon: Briefcase,
      accentColor: '#C4B5FD',
      highlights: ['Job Card Management', 'Material Traceability', 'Sub-Contractor Billing', 'Work-In-Progress Tracking'],
    },
    {
      id: 3,
      tag: 'Retail & Distribution',
      title: 'Sell everywhere, fulfil anywhere',
      desc: 'Connect your retail stores, distributor network, and e-commerce channels. Manage stock, schemes, and settlements from one platform.',
      metric: 'Inventory accuracy lifted to 99.8%',
      gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 100%)',
      image: '/images/industry-retail.jpg',
      icon: Package,
      accentColor: '#FCD34D',
      highlights: ['POS & Retail Billing', 'Distributor Management', 'Scheme & Discount Engine', 'E-Commerce Sync'],
    },
    {
      id: 4,
      tag: 'Construction & Projects',
      title: 'Deliver projects on time and on budget',
      desc: 'Track project budgets, contractor bills, material consumption, and milestones in real time — built for construction companies and EPC firms.',
      metric: 'Project cost overruns cut by 28%',
      gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 40%, #44403c 100%)',
      image: '/images/industry-construction.jpg',
      icon: HardHat,
      accentColor: '#FCA5A5',
      highlights: ['Project Budgeting', 'Contractor Billing', 'Site Material Tracking', 'Milestone & Progress'],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={`min-h-screen bg-background font-sans overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* 1. Sticky Header / Navbar */}
      <motion.header
        style={{
          backgroundColor: isDarkMode ? headerBgDark : headerBgLight,
          backdropFilter: headerBackdropFilter,
          borderBottomColor: isDarkMode ? headerBorderDark : headerBorderLight,
          boxShadow: isDarkMode ? headerShadowDark : headerShadowLight,
        }}
        className="fixed top-0 w-full z-50 border-b"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="relative flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Blurred glow behind logo — dark mode only, fades out at top (transparent header) */}
            {isDarkMode && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background: 'radial-gradient(ellipse 120% 140% at 50% 55%, rgba(251,146,60,0.28) 0%, rgba(59,130,246,0.18) 55%, transparent 100%)',
                  filter: 'blur(14px)',
                  transform: 'scale(1.35)',
                  borderRadius: '50%',
                }}
              />
            )}
            <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-10 w-auto relative" />
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group cursor-pointer py-8">
              <span className={`text-sm font-medium flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                Products <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6 grid grid-cols-2 gap-6">
                {[
                  { icon: BarChart3, title: 'Finance', desc: 'Accounting & Analytics' },
                  { icon: Box, title: 'Inventory', desc: 'Warehouse & Stock' },
                  { icon: Users, title: 'HR & Payroll', desc: 'Employee Management' },
                  { icon: Factory, title: 'Manufacturing', desc: 'Production Planning' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 hover:bg-muted rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href="#solutions" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-white/80' : 'text-[#0B1F4A]'}`}>Solutions</a>
            <a href="#industries" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-white/80' : 'text-[#0B1F4A]'}`}>Industries</a>
            <a href="#benefits" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-white/80' : 'text-[#0B1F4A]'}`}>Benefits</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {/* Three-mode theme toggle: Light / Auto / Dark */}
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
            <button className={`h-9 px-4 text-sm font-semibold rounded-md border transition-colors ${isDarkMode ? 'bg-transparent text-white border-white/30 hover:bg-white/10' : 'bg-[#041D4D] text-white border-[#041D4D]/25 hover:bg-[#0a2d6b]'}`}>Log In</button>
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
            <div className="p-4 flex flex-col gap-4">
              {['Products', 'Solutions', 'Industries', 'Benefits'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium text-foreground py-2 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              {/* Theme toggle in mobile menu */}
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

      {/* 2. Hero Section — full-bleed photo backdrop, matches approved reference */}
      <section className="relative flex flex-col overflow-hidden">

        {/* ── Background photo ── */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-meeting.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Overlay — dark in dark mode, very light in light mode so photo stays prominent */}
          <div
            className="absolute inset-0"
            style={{
              background: isDarkMode
                ? 'linear-gradient(180deg, rgba(4,10,26,0.14) 0%, rgba(4,10,26,0.50) 30%, rgba(3,8,22,0.77) 62%, rgba(2,6,18,0.86) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.30) 62%, rgba(255,255,255,0.42) 100%)',
            }}
          />
          {/* Particle network mesh */}
          <div className={`absolute inset-0 mix-blend-screen ${isDarkMode ? 'opacity-60' : 'opacity-20'}`}>
            <NetworkMesh />
          </div>
          {/* Decorative vertical line accents — 5 equally spaced, left to right */}
          {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
            <div
              key={pct}
              className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent to-transparent hidden md:block ${isDarkMode ? 'via-white/15' : 'via-slate-400/20'}`}
              style={{ left: `${pct}%` }}
            />
          ))}
          {/* Decorative outlined square boxes */}
          <div className={`absolute top-[14%] left-[4%] w-16 h-16 rounded-xl hidden md:block ${isDarkMode ? 'border border-white/15' : 'border border-slate-400/20'}`} />
          <div className={`absolute bottom-[8%] right-[6%] w-20 h-20 rounded-xl hidden md:block ${isDarkMode ? 'border border-white/10' : 'border border-slate-400/15'}`} />
        </div>

        {/* ── Centered text block ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-32 pb-10 px-4"
        >
          <motion.div variants={fadeInUp} className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm tracking-wide border ${isDarkMode ? 'bg-white/10 text-white/80 border-white/15' : 'bg-white/60 text-slate-700 border-slate-300/70'}`}>
            Cloud ERP for Indian Manufacturing &amp; Trading
          </motion.div>

          <motion.h1 variants={fadeInUp} className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] mb-5 tracking-tight max-w-3xl ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>
            <InViewTextEffect>Run Every Department.</InViewTextEffect><br />
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">From One Dashboard.</InViewTextEffect>
          </motion.h1>

          <motion.p variants={fadeInUp} className={`text-base md:text-lg mb-8 max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-200/85' : 'text-[#111827]/80'}`}>
            KonnectERP unifies your production, sales, procurement, HR, and accounts — with GST, E-Invoicing, and Indian compliance built in from day one. No integrations to cobble together. No data silos.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openDemo}
              className={`h-11 px-6 text-sm font-semibold rounded-md transition-colors shadow-lg ${isDarkMode ? 'bg-[#F97316] hover:bg-[#ea6c0a] text-white shadow-orange-500/30' : 'bg-[#0B1F4A] hover:bg-[#162d68] text-white shadow-slate-900/30'}`}
            >
              Request Free Demo
            </button>
            <button
              onClick={openVideo}
              className={`h-11 px-6 text-sm font-semibold rounded-md border transition-colors backdrop-blur-sm ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white border-white/15' : 'bg-transparent hover:bg-orange-50 text-[#F97316] border-[#F97316]'}`}
            >
              Explore Platform
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-5 flex items-center gap-5 text-xs ${isDarkMode ? 'text-slate-300/70' : 'text-slate-500'}`}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-300/60' : 'text-orange-400'}`} /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-300/60' : 'text-orange-400'}`} /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-300/60' : 'text-orange-400'}`} /> Setup in minutes</span>
          </motion.div>
        </motion.div>

        {/* ── Stat cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 container mx-auto px-4 pb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, value: 5000, suffix: '+', label: 'Active Users', sub: 'ACROSS INDIA', accent: true },
              { icon: Building2, value: 20, suffix: '+', label: 'Industries Served', sub: 'NATIONWIDE COVERAGE' },
              { icon: Activity, value: 400, suffix: '+', label: 'Transactions Built-in', sub: 'ZERO-INTEGRATION NEEDED' },
              { icon: BarChart3, value: 150, suffix: '+', label: 'Reports & Dashboards', sub: 'REAL-TIME ANALYTICS' },
            ].map((s, i) => (
              <div key={i} className="relative rounded-2xl p-0.5 border-[0.75px] border-white/10">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div
                  className="relative rounded-[calc(1rem-2px)] p-5 h-full overflow-hidden"
                  style={{ background: 'rgba(11,31,74,0.82)', backdropFilter: 'blur(10px)' }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${s.accent ? 'bg-[#F97316]/20 text-[#F97316]' : 'bg-white/10 text-white/70'}`}>
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className={`text-3xl font-extrabold mb-1 ${s.accent ? 'text-[#F97316]' : 'text-white'}`}>
                    {s.value.toLocaleString()}{s.suffix}
                  </div>
                  <div className="text-sm font-semibold mb-1 text-white">{s.label}</div>
                  <div className="text-[10px] font-medium text-slate-400 tracking-wide">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Trusted-by strip ── */}
        <div className={`relative z-10 py-10 overflow-hidden border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200/60'}`}>
          {isDarkMode && (
            <>
              <div className="absolute -top-10 left-[6%] w-40 h-40 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-[10%] w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
            </>
          )}
          <div className="container mx-auto px-4 text-center mb-6 relative">
            <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Trusted by growing businesses across multiple industries</p>
          </div>
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-8">
            {['Rajesh Industries', 'TechCorp', 'MegaRetail', 'BuildRight', 'LogiWave', 'GlobalManufacturing'].map((name) => (
              <div key={name} className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-slate-400/70' : 'text-slate-500'}`}>
                <Building2 className="w-4 h-4" />
                {name}
              </div>
            ))}
          </div>
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
            {['ISO 27001 Certified', 'SOC 2 Type II', 'GDPR Ready'].map(badge => (
              <div key={badge} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${isDarkMode ? 'border-white/15 text-slate-300' : 'border-slate-200 text-slate-500 bg-white'}`}>
                <span className={`w-1.5 h-1.5 rounded-full border ${isDarkMode ? 'border-slate-300/60' : 'border-slate-400'}`} /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

 {/* 5b. Industry Solutions — feature + grid layout */}
      <section className="py-24 relative overflow-hidden bg-[#080f1e]">
        {/* deep blue glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border bg-white/10 text-white/80 border-white/15">
              <Building2 className="w-3.5 h-3.5" /> Core ERP
            </div>
            <p className="text-xs font-bold text-blue-400/70 uppercase tracking-widest mb-4">The Complete Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              <InViewTextEffect>Everything Your Business Needs.</InViewTextEffect><br />
              <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">Nothing You Don't.</InViewTextEffect>
            </h2>
            <p className="text-lg max-w-lg mx-auto text-slate-400">
              Pick the modules you need today. Add more as you grow. All sharing the same data layer so nothing falls through the cracks.
            </p>
          </motion.div>

          {/* Feature row: expandable accordion of industry cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col lg:flex-row gap-4 lg:h-[420px]"
          >
            {INDUSTRY_CARDS.map((card, idx) => {
              const Icon = card.icon;
              const isOpen = expandedIndustry === idx;
              return (
                <motion.div
                  key={card.id}
                  onClick={() => setExpandedIndustry(idx)}
                  onMouseEnter={() => setExpandedIndustry(idx)}
                  animate={{ flex: isOpen ? 2.6 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative min-h-[220px] lg:min-h-0 rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 cursor-pointer"
                  style={{ background: card.gradient }}
                >
                  {card.image && (
                    <img
                      src={card.image}
                      alt={card.tag}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* dark-blue overlay — matches reference screenshot */}
                  <div className="absolute inset-0 bg-[#0a1628]/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#0a1628]/60 to-[#0d1f3c]/30" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#060d1a]/90 via-[#0a1628]/50 to-transparent" />

                  <div className="relative z-10 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                      <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                    </div>
                    <motion.span
                      animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
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
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3 max-w-sm">
                            {card.title}
                          </h3>
                          <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-sm">
                            {card.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {card.highlights.slice(0, 3).map((h, i) => (
                              <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm">
                                {h}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                              style={{ backgroundColor: `${card.accentColor}22`, color: card.accentColor, border: `1px solid ${card.accentColor}40` }}
                            >
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

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <button
              onClick={openDemo}
              className="h-11 px-6 text-sm font-semibold bg-[#F97316] hover:bg-[#EA580C] text-white rounded-md transition-colors shadow-lg shadow-orange-900/20"
            >
              Explore More
            </button>
            <button
              onClick={openDemo}
              className="h-11 px-6 text-sm font-semibold rounded-md border transition-colors backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border-white/15"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* 4. India Compliance Section */}
      <section id="products" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#0B1220]' : 'bg-white'}`}>
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">India Compliance, Built In</p>
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
              <InViewTextEffect>GST, E-Invoice, Payroll.</InViewTextEffect><br />
              <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">All Automated.</InViewTextEffect>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Stop switching between portals. KonnectERP handles every Indian compliance requirement from within your normal workflows — no plugins, no third-party subscriptions, no re-keying.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col lg:flex-row gap-4"
          >
            {/* Left photo card — GST Returns & Filing */}
            <div className={`relative lg:flex-[1.1] min-h-[380px] lg:min-h-0 rounded-2xl p-0.5 ${isDarkMode ? 'border-[0.75px] border-white/10' : 'border border-slate-200 shadow-lg'}`}>
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className={`relative rounded-[calc(1rem-2px)] overflow-hidden flex flex-col h-full ${isDarkMode ? 'bg-[#101a30]' : 'bg-slate-50'}`}>
                <div className="relative flex-1 min-h-[180px]">
                  <img
                    src="/images/gst-compliance-person.jpg"
                    alt="GST Returns & Filing"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t to-transparent ${isDarkMode ? 'from-[#101a30]' : 'from-slate-50'}`} />
                  <button
                    onClick={openDemo}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#0B1F4A]" />
                  </div>
                </div>
                <div className="p-6 pt-9">
                  <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>GST Returns & Filing</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Auto-populated GSTR-1, GSTR-3B, and reconciliation reports. No manual data entry.</p>
                </div>
              </div>
            </div>

            {/* Right — feature cards */}
            <div className="lg:flex-[2] flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: FileText, title: 'E-Invoicing (IRP)', desc: 'Direct integration with the Invoice Registration Portal. IRN and QR code generation in seconds.' },
                  { icon: Truck, title: 'E-Way Bill Generation', desc: 'Auto-generate and cancel E-Way Bills from within dispatch workflows. No portal switching.' },
                ].map((f) => (
                  <div key={f.title} className={`relative rounded-2xl p-0.5 ${isDarkMode ? 'border-[0.75px] border-white/10' : 'border border-slate-200 shadow-sm'}`}>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className={`relative rounded-[calc(1rem-2px)] p-6 h-full ${isDarkMode ? 'bg-[#101a30]' : 'bg-white'}`}>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{f.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-3 gap-4 flex-1">
                {[
                  { icon: CreditCard, title: 'TDS & TCS Compliance', desc: 'Automatic TDS deduction, challan generation, and 26Q/27Q filing reports.' },
                  { icon: Briefcase, title: 'PF, ESI & Payroll', desc: 'India-compliant salary processing with PF, ESI, PT deductions and Form 16 generation.' },
                  { icon: Building2, title: 'Multi-Company & Branch', desc: 'Manage multiple entities, branches, and warehouses with consolidated reporting.' },
                ].map((f) => (
                  <div key={f.title} className={`relative rounded-2xl p-0.5 ${isDarkMode ? 'border-[0.75px] border-white/10' : 'border border-slate-200 shadow-sm'}`}>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className={`relative rounded-[calc(1rem-2px)] p-6 h-full ${isDarkMode ? 'bg-[#101a30]' : 'bg-white'}`}>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{f.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4b. Offerings Showcase — tabbed product deep-dive */}
      <section className="hidden py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-8xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#F97316] text-sm font-semibold mb-4 border border-[#F97316]/20">
              <Layers className="w-3.5 h-3.5" /> Our Core Offerings
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              One Platform. Four Powerful Suites.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Choose the modules that match your business needs — or deploy them all together for total operational control.
            </p>
          </motion.div>

          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {OFFERINGS.map((o) => {
              const Icon = o.icon;
              const isActive = activeOffering === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setActiveOffering(o.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-lg border-transparent'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  style={isActive ? { backgroundColor: o.accentColor, boxShadow: `0 4px 20px ${o.accentColor}40` } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {o.label}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            {OFFERINGS.filter(o => o.id === activeOffering).map((offering) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid lg:grid-cols-2 gap-10 items-stretch"
                >
                  {/* Left — features */}
                  <div className="flex flex-col justify-center">
                    <div
                      className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-xl text-sm font-bold mb-5 border"
                      style={{ backgroundColor: offering.lightColor, color: offering.accentColor, borderColor: `${offering.accentColor}25` }}
                    >
                      <Icon className="w-4 h-4" />
                      {offering.label}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                      {offering.tagline}
                    </h3>
                    <p className="text-gray-500 mb-8 text-base leading-relaxed">
                      {offering.id === 'erp' && 'Run finance, inventory, procurement, sales, and manufacturing from a single connected platform — no more siloed spreadsheets or disconnected tools.'}
                      {offering.id === 'bi' && 'Transform raw business data into beautiful, actionable dashboards. Empower every decision-maker with the right insight at the right time.'}
                      {offering.id === 'crm' && 'Track every lead, deal, and customer interaction. Automate follow-ups and forecast revenue with confidence — so your sales team focuses on closing.'}
                      {offering.id === 'hrms' && 'From onboarding to payroll to appraisals — manage your entire workforce in one place. Fully compliant with Indian labour laws and GST regulations.'}
                    </p>

                    <div className="space-y-4">
                      {offering.features.map((feat, i) => {
                        const FIcon = feat.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.3 }}
                            className="flex gap-4 items-start group"
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: offering.lightColor }}
                            >
                              <FIcon className="w-5 h-5" style={{ color: offering.accentColor }} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm mb-0.5">{feat.title}</div>
                              <div className="text-gray-500 text-sm leading-relaxed">{feat.desc}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={openDemo}
                        className="h-11 px-6 rounded-lg font-semibold text-sm text-white transition-colors shadow-lg"
                        style={{ backgroundColor: offering.accentColor, boxShadow: `0 4px 16px ${offering.accentColor}35` }}
                      >
                        Book a Demo
                      </button>
                      <button className="h-11 px-6 rounded-lg font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right — mockup */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl"
                    style={{ boxShadow: `0 24px 60px ${offering.accentColor}20, 0 8px 24px rgba(0,0,0,0.08)` }}
                  >
                    {offering.mockup}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Industry Solutions Section */}
      <section id="industries" className="hidden py-24 bg-foreground relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent opacity-50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-600/20 to-transparent opacity-50 blur-3xl rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Built For Every Industry</h2>
            <p className="text-lg text-gray-400 max-w-2xl">Pre-configured workflows and specialized modules designed for the unique challenges of your sector.</p>
          </div>

          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar">
            {[
              { icon: Factory, name: "Manufacturing", desc: "End-to-end production control from BOM to final delivery." },
              { icon: ShoppingCart, name: "Retail", desc: "Omnichannel POS, inventory, and loyalty management." },
              { icon: Truck, name: "Wholesale Distribution", desc: "Optimize supply chain, logistics, and multi-warehouse stock." },
              { icon: Building2, name: "Construction", desc: "Project costing, sub-contractor management, and equipment tracking." },
              { icon: Stethoscope, name: "Healthcare", desc: "Patient management, billing, and compliance tracking." },
              { icon: GraduationCap, name: "Education", desc: "Student lifecycle, fee management, and academic planning." },
              { icon: Box, name: "Logistics", desc: "Fleet tracking, route optimization, and delivery management." }
            ].map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="shrink-0 w-80 snap-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-8 hover:bg-white/15 transition-colors"
              >
                <ind.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">{ind.name}</h3>
                <p className="text-gray-400">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* 6. Why Businesses Choose KonnectERP — Deep Industry Knowledge */}
      <section id="benefits" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#06163C]' : 'bg-white'}`}>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-5">Built for your sector</p>
            <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
              <InViewTextEffect>Deep Industry Knowledge.</InViewTextEffect><br />
              <span className="text-[#F97316]"><InViewTextEffect>Not Generic Templates.</InViewTextEffect></span>
            </h2>
            <p className={`max-w-lg mx-auto text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              KonnectERP ships with pre-configured workflows for 20+<br />
              Indian industry verticals. Less setup. Faster go-live.
            </p>
          </motion.div>

          {/* Rows */}
          <div className="space-y-10">

            {/* ── Row 1: Photo LEFT, Content RIGHT ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-stretch"
            >
              {/* Photo */}
              <div className="lg:w-[44%] relative rounded-2xl overflow-hidden max-h-[320px]">
                <img
                  src="/images/industry-manufacturing.jpg"
                  alt="Discrete & Process Manufacturing"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: 320 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 ${isDarkMode ? 'bg-[#06163C]/75' : 'bg-white/80'}`}>
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Real-Time Data</span>
                </div>
              </div>

              {/* Content card */}
              <div className="lg:w-[56%] relative px-10 overflow-hidden flex flex-col justify-between">
                <span className={`absolute top-2 right-6 text-[110px] font-black leading-none select-none pointer-events-none ${isDarkMode ? 'text-white/[0.05]' : 'text-slate-900/[0.04]'}`}>01</span>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-900/40">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-2">Manufacturing</p>
                  <h3 className={`text-2xl font-bold mb-3 leading-snug ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Discrete &amp; Process Manufacturing</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    From automotive components to food processing — KonnectERP handles multi-level BOMs, work orders, quality control, and shop-floor tracking. Built for India's factory floors.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {['Automotive Components', 'Electrical &amp; Electronics', 'Sheet Metal Fabrication', 'Food Processing', 'Injection Molding', 'EV Manufacturers'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={openDemo}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Row 2: Content LEFT, Photo RIGHT ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col lg:flex-row-reverse gap-6 items-stretch"
            >
              {/* Photo */}
              <div className="lg:w-[44%] relative rounded-2xl overflow-hidden max-h-[320px]">
                <img
                  src="/images/industry-trading.jpg"
                  alt="Trading & Distribution"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: 320 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 ${isDarkMode ? 'bg-[#06163C]/75' : 'bg-white/80'}`}>
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Real-Time Data</span>
                </div>
              </div>

              {/* Content card */}
              <div className="lg:w-[56%] relative overflow-hidden px-10 flex flex-col justify-between">
                <span className={`absolute top-2 right-6 text-[110px] font-black leading-none select-none pointer-events-none ${isDarkMode ? 'text-white/[0.05]' : 'text-slate-900/[0.04]'}`}>02</span>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-900/40">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-2">Trading</p>
                  <h3 className={`text-2xl font-bold mb-3 leading-snug ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Trading &amp; Distribution</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Multi-warehouse inventory, purchase orders, sales orders, and GST-compliant invoicing for super stockists, distributors, and importers/exporters.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {['Consumer Electronics', 'Super Stockists', 'Wholesale Distribution', 'Domestic &amp; Exports'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={openDemo}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Row 3: Photo LEFT, Content RIGHT ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-6 items-stretch"
            >
              {/* Photo */}
              <div className="lg:w-[44%] relative rounded-2xl overflow-hidden max-h-[320px]">
                <img
                  src="/images/industry-jobwork.jpg"
                  alt="Contract & Job Work"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: 320 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 ${isDarkMode ? 'bg-[#06163C]/75' : 'bg-white/80'}`}>
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Real-Time Data</span>
                </div>
              </div>

              {/* Content card */}
              <div className="lg:w-[56%] relative p-10 overflow-hidden flex flex-col justify-between">
                <span className={`absolute top-2 right-6 text-[110px] font-black leading-none select-none pointer-events-none ${isDarkMode ? 'text-white/[0.05]' : 'text-slate-900/[0.04]'}`}>03</span>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-900/40">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-2">Job Work</p>
                  <h3 className={`text-2xl font-bold mb-3 leading-snug ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Contract &amp; Job Work</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Track material in/out, sub-contracting, process costing, and challan management. From surface finishing to full contract manufacturing.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {['Surface Finishing', 'Powder Coating', 'Tools &amp; Dies', 'Project-Based Manufacturing'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={openDemo}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. ERP Dashboard Showcase */}
      <section className="hidden py-24 bg-muted/30">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Experience The Platform</h2>
                <p className="text-lg text-muted-foreground">A clean, intuitive interface that your team will actually enjoy using.</p>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
            >
                <div className="rounded-2xl border border-gray-800 bg-[#0F172A] shadow-2xl overflow-hidden text-gray-100 flex flex-col">
                    {/* Header */}
                    <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0F172A]">
                        <div className="flex items-center gap-4">
                            <Layers className="text-primary w-5 h-5" />
                            <span className="font-semibold text-white tracking-wide">KonnectERP</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-64 h-8 bg-gray-800 rounded-md border border-gray-700"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                        </div>
                    </div>
                    {/* Body */}
                    <div className="flex h-[600px]">
                        {/* Sidebar */}
                        <div className="w-56 border-r border-gray-800 p-4 space-y-1 bg-[#111827]">
                            {['Dashboard', 'Sales', 'Inventory', 'Finance', 'Manufacturing', 'HR & Payroll', 'Reports'].map((item, i) => (
                                <div key={i} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-3 ${i===0 ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'}`}>
                                    <div className="w-4 h-4 rounded-sm bg-current opacity-50"></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                        {/* Content */}
                        <div className="flex-1 p-6 bg-[#020817] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
                            
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {[
                                    {title: "Total Revenue", val: "$2.4M", inc: "+12.5%"},
                                    {title: "Orders Pending", val: "142", inc: "-4.2%"},
                                    {title: "Active Projects", val: "18", inc: "+2.4%"},
                                    {title: "Employee Count", val: "248", inc: "0%"}
                                ].map((k,i) => (
                                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-[#0F172A]">
                                        <div className="text-gray-400 text-sm mb-2">{k.title}</div>
                                        <div className="text-2xl font-bold text-white mb-1">{k.val}</div>
                                        <div className={`text-xs ${k.inc.startsWith('+') ? 'text-emerald-400' : k.inc.startsWith('-') ? 'text-rose-400' : 'text-gray-500'}`}>{k.inc} from last month</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 p-6 rounded-xl border border-gray-800 bg-[#0F172A]">
                                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Analytics</h3>
                                    <div className="h-64 flex items-end gap-3">
                                        {[40, 55, 45, 70, 65, 85, 60, 90, 80, 100, 85, 110].map((h, i) => (
                                            <div key={i} className="flex-1 bg-primary/80 rounded-t hover:bg-primary transition-colors cursor-pointer" style={{height: `${h}%`}}></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1 p-6 rounded-xl border border-gray-800 bg-[#0F172A]">
                                    <h3 className="text-lg font-semibold text-white mb-4">Inventory Status</h3>
                                    <div className="space-y-6">
                                        {[
                                            {n: "Raw Materials", p: 75, c: "bg-blue-500"},
                                            {n: "WIP", p: 45, c: "bg-amber-500"},
                                            {n: "Finished Goods", p: 85, c: "bg-emerald-500"},
                                            {n: "Packaging", p: 30, c: "bg-rose-500"}
                                        ].map((s,i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-300">{s.n}</span>
                                                    <span className="text-gray-400">{s.p}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${s.c}`} style={{width: `${s.p}%`}}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 7b. Immersive Platform Showcase + Floating Video Player */}
      <section className="hidden relative overflow-hidden py-24" style={{ background: 'linear-gradient(145deg, #060d1f 0%, #0a1a3a 35%, #071428 65%, #040c1c 100%)' }}>
        {/* Star-field dots */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Glow orbs */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[60px]" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: rich dark ERP mockup ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Browser shell */}
              <div className="bg-[#111827] rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ boxShadow: '0 32px 80px rgba(11,92,255,0.18), 0 8px 32px rgba(0,0,0,0.5)' }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2937] border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-[#111827] rounded-md px-3 py-1 max-w-xs mx-auto">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] text-gray-400 font-medium">app.konnecterp.com/dashboard</span>
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="flex" style={{ height: 380 }}>
                  {/* Sidebar */}
                  <div className="w-48 bg-[#0d1424] border-r border-white/5 flex flex-col py-4 shrink-0">
                    <div className="px-4 mb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-[#0B5CFF] rounded-md flex items-center justify-center"><Layers className="w-3 h-3 text-white" /></div>
                        <span className="text-xs font-bold text-white">KonnectERP</span>
                      </div>
                      <div className="text-[9px] text-gray-500">Acme Manufacturing Ltd.</div>
                    </div>
                    {[
                      { icon: LayoutDashboard, label: 'Dashboard', active: true },
                      { icon: BarChart3, label: 'Finance', active: false },
                      { icon: Package, label: 'Inventory', active: false },
                      { icon: Handshake, label: 'Sales & CRM', active: false },
                      { icon: Users, label: 'HR & Payroll', active: false },
                      { icon: Factory, label: 'Manufacturing', active: false },
                      { icon: BarChart2, label: 'Analytics', active: false },
                      { icon: Settings, label: 'Settings', active: false },
                    ].map(({ icon: Icon, label, active }, i) => (
                      <div key={i} className={`flex items-center gap-2.5 px-4 py-2 text-[10px] font-medium ${active ? 'bg-[#0B5CFF]/15 text-[#60A5FA] border-r-2 border-[#0B5CFF]' : 'text-gray-500 hover:text-gray-300'}`}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-5 overflow-hidden bg-[#0f1625]">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-white text-sm font-bold">Good morning, Rajesh</div>
                        <div className="text-[10px] text-gray-500">June 16, 2026 · FY 2025–26</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0B5CFF]/20 flex items-center justify-center"><Activity className="w-3.5 h-3.5 text-[#60A5FA]" /></div>
                        <div className="w-7 h-7 rounded-full bg-[#1f2937] border border-white/10 flex items-center justify-center text-[9px] font-bold text-white">RK</div>
                      </div>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { label: 'Revenue', value: '₹1.24 Cr', change: '+18%', up: true, color: '#60A5FA' },
                        { label: 'Orders', value: '3,841', change: '+9%', up: true, color: '#34D399' },
                        { label: 'Inventory', value: '12,402', change: '-2%', up: false, color: '#FBBF24' },
                        { label: 'EBITDA', value: '₹38.2L', change: '+22%', up: true, color: '#A78BFA' },
                      ].map((kpi, i) => (
                        <div key={i} className="bg-[#1a2235] rounded-xl p-3 border border-white/5">
                          <div className="text-[9px] text-gray-500 mb-1">{kpi.label}</div>
                          <div className="text-sm font-black text-white mb-0.5">{kpi.value}</div>
                          <div className={`text-[9px] font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-400' : 'text-red-400'}`}>
                            <TrendingUp className="w-2.5 h-2.5" /> {kpi.change}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart + pipeline */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Revenue chart */}
                      <div className="col-span-2 bg-[#1a2235] rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-semibold text-gray-400">Revenue Trend</span>
                          <span className="text-[9px] text-[#60A5FA] bg-[#0B5CFF]/15 px-2 py-0.5 rounded-full">Monthly</span>
                        </div>
                        <div className="flex items-end gap-1 h-20">
                          {[38,52,44,68,58,80,62,88,72,84,66,100].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.04 }}
                              className={`flex-1 rounded-t-sm ${i === 11 ? 'bg-[#0B5CFF]' : 'bg-[#0B5CFF]/25'}`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                          {['Apr','','','Jul','','','Oct','','','Jan','','Mar'].map((m, i) => (
                            <span key={i} className="text-[7px] text-gray-600 flex-1 text-center">{m}</span>
                          ))}
                        </div>
                      </div>

                      {/* Pending tasks */}
                      <div className="bg-[#1a2235] rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] font-semibold text-gray-400 mb-2">Alerts</div>
                        {[
                          { label: 'Low Stock Items', val: '14', c: 'text-amber-400' },
                          { label: 'Pending Invoices', val: '7', c: 'text-red-400' },
                          { label: 'Open POs', val: '23', c: 'text-blue-400' },
                          { label: 'Payroll Due', val: '3d', c: 'text-purple-400' },
                        ].map((a, i) => (
                          <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                            <span className="text-[9px] text-gray-400">{a.label}</span>
                            <span className={`text-[9px] font-bold ${a.c}`}>{a.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-5 bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Avg. Time Saved</div>
                  <div className="text-sm font-black text-white">14 hrs / week</div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: headline + features ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold mb-5 border border-white/15">
                <Zap className="w-3 h-3" /> Powered by KonnectERP
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-5 tracking-tight">
                <InViewTextEffect>Rock solid.</InViewTextEffect><br />
                <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Always on.</InViewTextEffect>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-md">
                KonnectERP runs your entire business without downtime, lag, or data loss — giving you the confidence to focus on growth, not firefighting.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Shield, title: '99.9% Uptime SLA', desc: 'Enterprise-grade infrastructure with automatic failover and zero-downtime deployments.' },
                  { icon: Zap, title: 'Sub-second response times', desc: 'Optimised queries and edge caching mean your team never waits for data.' },
                  { icon: RefreshCw, title: 'Real-time sync across all modules', desc: 'A sale in CRM instantly updates inventory, finance, and production — no batch jobs.' },
                  { icon: Globe, title: 'Access from anywhere', desc: 'Full-featured on desktop, tablet, and mobile — even with slow connectivity.' },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#0B5CFF]/15 border border-[#0B5CFF]/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#60A5FA]" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5">{f.title}</div>
                        <div className="text-gray-500 text-sm leading-relaxed">{f.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={openDemo}
                  className="h-11 px-6 rounded-lg font-semibold text-sm bg-[#0B5CFF] hover:bg-[#0B5CFF]/90 text-white transition-colors shadow-lg"
                >
                  Book Free Demo
                </button>
                <button
                  onClick={openVideo}
                  className="h-11 px-6 rounded-lg font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Demo
                </button>
              </div>

              {/* ── Floating mini video player ── */}
              <AnimatePresence>
                {isFloatingPlayerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5, delay: 1 }}
                    className="absolute -bottom-8 right-0 w-56 rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(11,92,255,0.2)' }}
                    onClick={openVideo}
                  >
                    {/* Thumbnail area */}
                    <div
                      className="relative h-32 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #0d1f4a 0%, #1a3a6b 50%, #0B5CFF 100%)' }}
                    >
                      {/* Mini dashboard inside thumbnail */}
                      <div className="absolute inset-2 rounded-lg bg-[#06163C]/80 border border-white/10 overflow-hidden flex flex-col">
                        <div className="h-4 bg-[#111827] flex items-center gap-1 px-2">
                          {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                        </div>
                        <div className="flex-1 p-1.5 grid grid-cols-3 gap-1">
                          {[40,70,55,80,60,95].map((h,i) => (
                            <div key={i} className="flex items-end">
                              <div className="w-full bg-[#0B5CFF]/40 rounded-sm" style={{height:`${h}%`}} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg"
                      >
                        <Play className="w-4 h-4 text-[#0B5CFF] fill-[#0B5CFF] ml-0.5" />
                      </motion.div>

                      {/* Close button */}
                      <button
                        onClick={e => { e.stopPropagation(); setIsFloatingPlayerOpen(false); }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-20"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Label bar */}
                    <div className="bg-[#111827] border-t border-white/10 px-3 py-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-white truncate">See KonnectERP in action</div>
                        <div className="text-[9px] text-gray-500">2 min product walkthrough</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Customer Success Stories */}
      <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#080E1D]' : 'bg-slate-50'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-700/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
              <InViewTextEffect>Real Result From Real</InViewTextEffect>{' '}
              <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Business.</InViewTextEffect>
            </h2>
            <p className={`max-w-lg mx-auto text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Stop jumping between disconnected tools. KonnectERP brings every department into one unified, intelligent system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                company: 'Bharti Manufacturing',
                ind: 'Manufacturing',
                indColor: isDarkMode ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-blue-600 bg-blue-50 border-blue-200',
                challenge: 'Disconnected systems leading to stockouts.',
                solution: 'Full ERP integration across 3 facilities.',
                result: '"Reduced operational costs by 28%"',
                badge: '-28% Costs',
                badgeColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              },
              {
                company: 'Nexus Retail Chain',
                ind: 'Retail & E-commerce',
                indColor: isDarkMode ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-blue-600 bg-blue-50 border-blue-200',
                challenge: 'High inventory shrinkage and slow reconciliation.',
                solution: 'Real-time POS and warehouse tracking.',
                result: '"Inventory accuracy improved to 99.8%"',
                badge: '99.8% Accuracy',
                badgeColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              },
              {
                company: 'SwiftDistrib',
                ind: 'Wholesale',
                indColor: isDarkMode ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-blue-600 bg-blue-50 border-blue-200',
                challenge: 'Manual, paper-based purchase orders.',
                solution: 'Automated procurement and vendor portal.',
                result: '"Order processing time cut by 60%"',
                badge: '60% Faster',
                badgeColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col rounded-2xl p-7 transition-colors ${isDarkMode ? 'bg-[#0d1626] border border-white/[0.07] hover:border-white/[0.14]' : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'}`}
              >
                <div className={`inline-block self-start px-2.5 py-1 rounded-md border text-[10px] font-bold tracking-widest uppercase mb-5 ${story.indColor}`}>
                  {story.ind}
                </div>
                <h3 className={`text-xl font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{story.company}</h3>
                <div className="space-y-4 flex-1 mb-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Challenge</span>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{story.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Solution</span>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{story.solution}</p>
                  </div>
                </div>
                <div className={`pt-5 mt-auto border-t ${isDarkMode ? 'border-white/[0.07]' : 'border-slate-100'}`}>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-2">Result</span>
                  <p className={`font-semibold text-sm mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{story.result}</p>
                  <span className={`text-lg font-black ${story.badgeColor}`}>{story.badge}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Built Different / Globe section + Stats */}
      <section className={`relative overflow-hidden ${isDarkMode ? 'bg-[#001133]' : 'bg-white'}`}>

        {/* ── Globe + Built Different ── */}
        <div className="relative overflow-hidden" style={{ minHeight: 680 }}>

          {/* ── Rotating dotted globe — full width ── */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <div className="pointer-events-auto w-full h-full">
              <RotatingEarth height={680} darkMode={isDarkMode} className="w-full h-full opacity-95" />
            </div>
          </div>

          {/* ── Content overlaid on globe ── */}
          <div className="relative z-10 px-8 md:px-16 py-20 max-w-[1400px] mx-auto">

            {/* Top headline — centred */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-12"
            >
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-400 mb-4">
                Why 5,000 Businesses Choose Konnect
              </p>
              <h2 className={`text-4xl md:text-[52px] font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                <InViewTextEffect>Built Different.</InViewTextEffect><br />
                <span className="text-[#F97316]"><InViewTextEffect>Proven in the Field.</InViewTextEffect></span>
              </h2>
            </motion.div>

            {/* Three-column row: feature-left | feature-right | callouts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">

              {/* Col 1 — features left */}
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

              {/* Col 2 — features right */}
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

              {/* Col 3 — office & security callouts */}
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

        {/* ── Stats bar — always dark navy ── */}
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

      {/* 10. Integrations Section */}
      <section className="hidden py-24 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Connect With Your Favorite Tools</h2>
              <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">KonnectERP plays nice with the software you already use. Seamlessly sync data across your entire tech stack.</p>
              
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 max-w-4xl mx-auto mb-10 opacity-70">
                  {/* Text fallbacks for logos */}
                  {['WhatsApp', 'Tally', 'Razorpay', 'Google Workspace', 'Microsoft 365', 'Shopify', 'WooCommerce', 'Power BI'].map((logo) => (
                      <div key={logo} className="text-2xl font-bold text-foreground flex items-center gap-2">
                          <Network className="w-6 h-6 text-primary" /> {logo}
                      </div>
                  ))}
              </div>
              <p className="text-sm font-bold text-primary uppercase tracking-widest">And 100+ more integrations</p>
          </div>
      </section>

      {/* 10b. Finance & Payments Orbital Section */}
      <section
        className="hidden relative overflow-hidden py-28"
        style={{ background: 'linear-gradient(160deg, #070B18 0%, #0B1020 55%, #060d1c 100%)' }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #4b7bff 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        {/* Ambient glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0B5CFF]/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase text-[#60A5FA]"
              style={{ borderColor: 'rgba(96,165,250,0.35)', background: 'rgba(11,92,255,0.08)', boxShadow: '0 0 16px rgba(11,92,255,0.2)' }}>
              FINANCE & PAYMENTS
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1]">
              Manage payments{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60A5FA 0%, #818CF8 100%)' }}>
                your way
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              Zero reconciliation gaps, automated approvals, and real-time visibility across every rupee in and out of your business.
            </p>
            <button
              onClick={openDemo}
              className="text-[#60A5FA] hover:text-white text-sm font-semibold flex items-center gap-1.5 mx-auto transition-colors group"
            >
              Explore Finance Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ── Orbital diagram (desktop) ── */}
          <div className="hidden md:flex items-center justify-center" style={{ height: 620 }}>
            {/* Concentric rings */}
            {[340, 240, 140].map((r, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: r * 2,
                  height: r * 2,
                  border: `1px solid rgba(96,165,250,${[0.06, 0.10, 0.16][i]})`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Orbit dots on the outer ring */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const cx = Math.sin(rad) * 340;
              const cy = -Math.cos(rad) * 340;
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#3B82F6]/50"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`,
                    boxShadow: '0 0 6px #3B82F6',
                  }}
                />
              );
            })}

            {/* Center glow */}
            <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center relative"
                style={{ background: 'radial-gradient(circle, #1a3a8f 0%, #0B5CFF 60%, #0a2060 100%)', boxShadow: '0 0 40px rgba(11,92,255,0.7), 0 0 80px rgba(11,92,255,0.25)' }}>
                <Layers className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Orbiting container — slow sway */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'orbitSway 16s ease-in-out infinite alternate' }}>
              {[
                { label: 'Digital Payments', desc: 'Contactless, mobile wallets, and tap-to-pay solutions.', icon: CreditCard, angle: 0 },
                { label: 'Accounts Payable', desc: 'Streamline vendor payments and outgoing transactions.', icon: ArrowRight, angle: 60 },
                { label: 'Accounts Receivable', desc: 'Automate invoicing, recurring billing, and tracking.', icon: TrendingUp, angle: 120 },
                { label: 'GST & Tax Filing', desc: 'Auto-calculate, reconcile, and file returns on time.', icon: FileText, angle: 180 },
                { label: 'In-Store Processing', desc: 'Accept all card types, contactless, and mobile wallets.', icon: Monitor, angle: 240 },
                { label: 'Online Payments', desc: 'E-commerce, virtual terminal, and payment link flows.', icon: Globe, angle: 300 },
              ].map(({ label, desc, icon: Icon, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const RADIUS = 280;
                const cx = Math.sin(rad) * RADIUS;
                const cy = -Math.cos(rad) * RADIUS;
                return (
                  <div
                    key={angle}
                    className="absolute group"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`,
                      animation: `counterSway 16s ease-in-out infinite alternate, cardFloat${angle} 4s ease-in-out infinite`,
                    }}
                  >
                    <div
                      className="w-44 rounded-2xl p-4 cursor-pointer transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: 'rgba(10,10,22,0.75)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.04)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05) translateY(-8px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(11,92,255,0.25), 0 0 0 1px rgba(96,165,250,0.2)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = '';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.04)';
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: 'rgba(11,92,255,0.18)', border: '1px solid rgba(96,165,250,0.2)' }}>
                        <Icon className="w-4 h-4 text-[#60A5FA]" />
                      </div>
                      <div className="text-white text-xs font-bold mb-1 leading-tight">{label}</div>
                      <div className="text-gray-500 text-[10px] leading-relaxed">{desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile fallback: 2-column grid ── */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {[
              { label: 'Digital Payments', desc: 'Contactless, mobile wallets, and tap-to-pay.', icon: CreditCard },
              { label: 'Accounts Payable', desc: 'Automate vendor payments and approvals.', icon: ArrowRight },
              { label: 'Accounts Receivable', desc: 'Invoicing, recurring billing, and tracking.', icon: TrendingUp },
              { label: 'GST & Tax Filing', desc: 'Auto-calculate and file returns on time.', icon: FileText },
              { label: 'In-Store Processing', desc: 'Card, contactless, and wallet payments.', icon: Monitor },
              { label: 'Online Payments', desc: 'Payment links and virtual terminals.', icon: Globe },
            ].map(({ label, desc, icon: Icon }, i) => (
              <div key={i} className="rounded-2xl p-4"
                style={{ background: 'rgba(10,10,22,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(11,92,255,0.18)' }}>
                  <Icon className="w-4 h-4 text-[#60A5FA]" />
                </div>
                <div className="text-white text-xs font-bold mb-1">{label}</div>
                <div className="text-gray-500 text-[10px] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Security Section */}
      <section className="hidden py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F4A 0%, #162d66 40%, #F97316 100%)' }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Enterprise-Grade Security</h2>
              <p className="text-xl text-orange-100 mb-10">Your business data is your most valuable asset. We protect it with military-grade encryption and stringent access controls.</p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "SSL Encryption", desc: "256-bit encryption for data in transit and at rest." },
                  { title: "Role-Based Access", desc: "Granular permissions for every user and module." },
                  { title: "Automated Backups", desc: "Daily multi-region cloud backups ensure zero data loss." },
                  { title: "Audit Logs", desc: "Complete traceability of every action taken in the system." },
                  { title: "Multi-Level Approval", desc: "Enforce Maker-Checker rules for critical transactions." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/20">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-orange-100/80">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative flex justify-center">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-80"
              >
                <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative w-full h-full border-4 border-white/20 rounded-full flex items-center justify-center p-8 backdrop-blur-sm">
                  <div className="w-full h-full border-4 border-white/40 rounded-full flex items-center justify-center p-8">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                      <Shield className="w-24 h-24 text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center animate-bounce">
                  <Lock className="w-6 h-6 text-green-500" />
                </div>
                <div className="absolute bottom-10 left-10 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                  <Server className="w-6 h-6 text-blue-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA / Demo Request Section */}
      <section className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-[#080E1D]' : 'bg-white'}`}>
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-8xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* ── Left column ── */}
            <div className="lg:w-[52%]">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">
                Why 5,000 Businesses Choose Konnect
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-5 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                <InViewTextEffect>Ready to See KonnectERP</InViewTextEffect><br />
                <span className="text-[#F97316]"><InViewTextEffect>Live?</InViewTextEffect></span>
              </h2>
              <p className={`text-base leading-relaxed mb-10 max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Book a personalised 30-minute demo with our industry specialists. We'll show you exactly how KonnectERP works for your sector — not a generic product tour.
              </p>

              {/* Step 1 */}
              <div className="flex gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">1</div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {['Free 30-minute demo', 'Live in weeks, not months', 'No credit card required', '100% Confidential'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">2</div>
                <div>
                  <p className={`font-bold text-sm mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Reach Us Directly</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-1">
                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      sales@konnectbi.com
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      +91 98431 11651
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">3</div>
                <div>
                  <p className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Install, support, optimize</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>White-glove setup with ongoing optimization and support</p>
                </div>
              </div>
            </div>

            {/* ── Right column — inline form card ── */}
            <div className="lg:w-[48%] w-full">
              <div className={`rounded-2xl p-8 ${isDarkMode ? 'border border-white/[0.08] bg-[#0d1626]' : 'border border-slate-200 bg-white shadow-lg'}`}>
                {ctaSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>You're all set!</h3>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>We'll reach out within 24 hours to confirm your demo slot.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-5">
                    <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>Request Your Free Demo</h3>

                    {/* Name + Company */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                          Your Name <span className="text-orange-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Rajesh Kumar"
                          value={ctaForm.name}
                          onChange={e => setCtaForm(f => ({ ...f, name: e.target.value }))}
                          required
                          className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? 'bg-[#162035] border-white/10 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widests uppercase text-slate-400 mb-1.5">
                          Company Name <span className="text-orange-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Manufacturing Pvt. Ltd."
                          value={ctaForm.company}
                          onChange={e => setCtaForm(f => ({ ...f, company: e.target.value }))}
                          required
                          className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? 'bg-[#162035] border-white/10 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400'}`}
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                        Mobile Number <span className="text-orange-400">*</span>
                      </label>
                      <div className="flex">
                        <div className={`flex items-center px-3 rounded-l-lg border border-r-0 text-sm font-medium shrink-0 ${isDarkMode ? 'bg-[#162035] border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                          +91
                        </div>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={ctaForm.mobile}
                          onChange={e => setCtaForm(f => ({ ...f, mobile: e.target.value }))}
                          required
                          className={`flex-1 h-11 px-3 rounded-r-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? 'bg-[#162035] border-white/10 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400'}`}
                        />
                      </div>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                        Your Industry <span className="text-orange-400">*</span>
                      </label>
                      <select
                        value={ctaForm.industry}
                        onChange={e => setCtaForm(f => ({ ...f, industry: e.target.value }))}
                        required
                        className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors appearance-none ${isDarkMode ? 'bg-[#162035] border-white/10' : 'bg-slate-50 border-slate-200 text-[#0B1F4A]'}`}
                        style={{ color: ctaForm.industry ? (isDarkMode ? '#fff' : '#0B1F4A') : '#64748b' }}
                      >
                        <option value="" disabled>Select your industry</option>
                        {['Manufacturing', 'Trading & Distribution', 'Retail', 'Construction', 'Job Work', 'Healthcare', 'Education', 'Logistics', 'Other'].map(opt => (
                          <option key={opt} value={opt} style={{ background: isDarkMode ? '#162035' : '#fff', color: isDarkMode ? '#fff' : '#0B1F4A' }}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Team size */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                        Team Size
                      </label>
                      <input
                        type="text"
                        placeholder="Number of employees"
                        value={ctaForm.teamSize}
                        onChange={e => setCtaForm(f => ({ ...f, teamSize: e.target.value }))}
                        className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:border-blue-500/60 transition-colors ${isDarkMode ? 'bg-[#162035] border-white/10 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-[#0B1F4A] placeholder:text-slate-400'}`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full h-12 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base transition-colors shadow-lg shadow-orange-900/30"
                    >
                      Book My Free Demo
                    </button>

                    {/* Consent */}
                    <div className="flex gap-2.5 items-start pt-1">
                      <input
                        type="checkbox"
                        id="cta-consent"
                        checked={ctaForm.consent}
                        onChange={e => setCtaForm(f => ({ ...f, consent: e.target.checked }))}
                        className="mt-0.5 w-3.5 h-3.5 accent-blue-500 shrink-0"
                      />
                      <label htmlFor="cta-consent" className="text-slate-500 text-[11px] leading-relaxed cursor-pointer">
                        By opting in, you agree to our{' '}
                        <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
                        {' '}and Terms of Use. By providing my phone number, I agree to receive text messages from the business.
                      </label>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-[#0B204B] relative overflow-hidden">

        {/* Large faint watermark */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 14vw, 320px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            bottom: '-0.1em',
          }}
        >
          Konnect ERP
        </div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-8 pt-14 pb-0 max-w-8xl">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-14">

            {/* Brand column */}
            <div>
              {/* Logo */}
              <div className="mb-5">
                <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-12 w-auto" />
              </div>

              <p className="text-slate-400 text-sm leading-relaxed max-w-[220px] mb-6">
                The intelligent cloud ERP platform that helps ambitious companies scale their operations efficiently.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-300 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" className="fill-[#0B1220]" /></svg>
                </a>
                {/* X / Twitter */}
                <a href="#" aria-label="X" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-300"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-bold text-xs tracking-[0.16em] uppercase mb-5">Products</h4>
              <ul className="space-y-3">
                {['Finance', 'Inventory', 'Sales & CRM', 'HR & Payroll'].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-white font-bold text-xs tracking-[0.16em] uppercase mb-5">Solutions</h4>
              <ul className="space-y-3">
                {['Small Business', 'Mid-Market', 'Enterprise'].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-white font-bold text-xs tracking-[0.16em] uppercase mb-5">Industries</h4>
              <ul className="space-y-3">
                {['Manufacturing', 'Retail', 'Distribution', 'Healthcare'].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-xs tracking-[0.16em] uppercase mb-5">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.07] py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs">© 2026 KonnectERP. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Security'].map(link => (
                <a key={link} href="#" className="text-slate-500 text-xs hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
      `}} />
    </div>
  );
}
