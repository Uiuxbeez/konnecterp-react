import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, BarChart3, Box, Users, ShoppingCart, Activity, Shield, CheckCircle2, Factory, 
  Stethoscope, GraduationCap, Building2, Truck, BookOpen, Layers, Menu, X, Check, Monitor, 
  LayoutDashboard, ChevronRight, ChevronLeft, Moon, Sun, ArrowUp, Briefcase, FileText, Lock, Globe,
  MessageSquare, Settings, CreditCard, PieChart, Database, Network, LineChart, Server, Zap, RefreshCw, Smartphone,
  User, Mail, Phone, Building, ChevronDown, PartyPopper, Play, TrendingUp, Package, Handshake, HardHat, Cpu, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';

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

export default function Home() {
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);
  const headerBg = useTransform(headerBgOpacity, v => `rgba(255, 255, 255, ${v * 0.85})`);
  const headerBackdropFilter = useTransform(headerBlur, v => `blur(${v}px)`);
  const headerBorderColor = useTransform(headerBgOpacity, v => `rgba(226, 232, 240, ${v})`);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

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
          backgroundColor: headerBg,
          backdropFilter: headerBackdropFilter,
          borderBottomColor: headerBorderColor
        }}
        className="fixed top-0 w-full z-50 border-b border-transparent transition-colors duration-300"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">
              KonnectERP<span className="text-primary">.</span>
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group cursor-pointer py-8">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
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
            <a href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground">Solutions</a>
            <a href="#industries" className="text-sm font-medium text-muted-foreground hover:text-foreground">Industries</a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground">Benefits</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" className="text-foreground">Log In</Button>
            <Button onClick={openDemo} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">
              Request Demo
            </Button>
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
              <span className="text-2xl font-bold text-foreground">KonnectERP.</span>
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
              <div className="pt-4 flex flex-col gap-4">
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
          {/* Dark navy overlay — lighter at top, near-opaque toward the bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(4,10,26,0.55) 0%, rgba(4,10,26,0.72) 30%, rgba(3,8,22,0.90) 62%, rgba(2,6,18,0.97) 100%)',
            }}
          />
          {/* Particle network mesh, blended over the photo */}
          <div className="absolute inset-0 opacity-60 mix-blend-screen">
            <NetworkMesh />
          </div>
          {/* Decorative vertical line accents — 5 equally spaced, left to right */}
          {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block"
              style={{ left: `${pct}%` }}
            />
          ))}
          {/* Decorative outlined square boxes */}
          <div className="absolute top-[14%] left-[4%] w-16 h-16 rounded-xl border border-white/15 hidden md:block" />
          <div className="absolute bottom-[8%] right-[6%] w-20 h-20 rounded-xl border border-white/10 hidden md:block" />
        </div>

        {/* ── Centered text block ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-32 pb-10 px-4"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-6 border border-white/15 backdrop-blur-sm tracking-wide">
            Cloud ERP for Indian Manufacturing &amp; Trading
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] mb-5 tracking-tight max-w-3xl">
            Run Every Department.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">
              From One Dashboard.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-200/85 mb-8 max-w-2xl leading-relaxed">
            KonnectERP unifies your production, sales, procurement, HR, and accounts — with GST, E-Invoicing, and Indian compliance built in from day one. No integrations to cobble together. No data silos.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openDemo}
              className="h-11 px-6 text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md transition-colors shadow-lg shadow-blue-900/30"
            >
              Request Free Demo
            </button>
            <button
              onClick={openVideo}
              className="h-11 px-6 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-md transition-colors backdrop-blur-sm"
            >
              Explore Platform
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-5 flex items-center gap-5 text-xs text-slate-300/70">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-slate-300/60" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-slate-300/60" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-slate-300/60" /> Setup in minutes</span>
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
              <div key={i} className="relative rounded-2xl border-[0.75px] border-white/10 p-0.5">
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
                  style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(8px)' }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${s.accent ? 'bg-[#F97316]/20 text-[#F97316]' : 'bg-white/10 text-white/70'}`}>
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className={`text-3xl font-extrabold mb-1 ${s.accent ? 'text-[#F97316]' : 'text-white'}`}>
                    {s.value.toLocaleString()}{s.suffix}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
                  <div className="text-[10px] font-medium text-slate-400 tracking-wide">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Trusted-by strip, blended into the same dark backdrop ── */}
        <div className="relative z-10 border-t border-white/10 py-10 overflow-hidden">
          {/* Blurred glowing circle accents */}
          <div className="absolute -top-10 left-[6%] w-40 h-40 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-[10%] w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 text-center mb-6 relative">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trusted by growing businesses across multiple industries</p>
          </div>
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-8">
            {['Rajesh Industries', 'TechCorp', 'MegaRetail', 'BuildRight', 'LogiWave', 'GlobalManufacturing'].map((name) => (
              <div key={name} className="flex items-center gap-2 text-sm font-semibold text-slate-400/70">
                <Building2 className="w-4 h-4" />
                {name}
              </div>
            ))}
          </div>
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
            {['ISO 27001 Certified', 'SOC 2 Type II', 'GDPR Ready'].map(badge => (
              <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs font-medium text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full border border-slate-300/60" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. India Compliance Section */}
      <section id="products" className="py-24 bg-[#0B1220] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">India Compliance, Built In</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              GST, E-Invoice, Payroll.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">All Automated.</span>
            </h2>
            <p className="text-lg text-slate-400">
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
            <div className="relative lg:flex-[1.1] min-h-[380px] lg:min-h-0 rounded-2xl border-[0.75px] border-white/10 p-0.5">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative rounded-[calc(1rem-2px)] overflow-hidden bg-[#101a30] flex flex-col h-full">
                <div className="relative flex-1 min-h-[180px]">
                  <img
                    src="/images/gst-compliance-person.jpg"
                    alt="GST Returns & Filing"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#101a30] to-transparent" />
                  <button
                    onClick={openDemo}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#0B1220]" />
                  </div>
                </div>
                <div className="p-6 pt-9">
                  <h3 className="text-base font-bold text-white mb-2">GST Returns & Filing</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Auto-populated GSTR-1, GSTR-3B, and reconciliation reports. No manual data entry.</p>
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
                  <div key={f.title} className="relative rounded-2xl border-[0.75px] border-white/10 p-0.5">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div className="relative rounded-[calc(1rem-2px)] bg-[#101a30] p-6 h-full">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
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
                  <div key={f.title} className="relative rounded-2xl border-[0.75px] border-white/10 p-0.5">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div className="relative rounded-[calc(1rem-2px)] bg-[#101a30] p-6 h-full">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4b. Offerings Showcase — tabbed product deep-dive */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
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
      <section id="industries" className="py-24 bg-foreground relative overflow-hidden">
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

      {/* 5b. Industry Solutions — feature + grid layout */}
      <section className="py-24 bg-[#0B1220] relative overflow-hidden">
        {/* Decorative blurred glows */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-5 border border-white/15">
              <Building2 className="w-3.5 h-3.5" /> Industry Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Businesses achieve more<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">
                with KonnectERP
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              Purpose-built workflows for the industries that power India's economy.
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
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

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
              className="h-11 px-6 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-md transition-colors backdrop-blur-sm"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* 6. Benefits / Why KonnectERP Section */}
      <section id="benefits" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Why Businesses Choose KonnectERP</h2>
            <p className="text-lg text-muted-foreground">The platform that scales with you, providing unprecedented control over your entire operation.</p>
          </div>

          <div className="space-y-24">
            {/* Block 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="relative h-80 bg-gradient-to-tr from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl border border-border flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4 opacity-20">
                        {Array.from({length: 36}).map((_, i) => <div key={i} className="bg-primary/50 rounded-sm"></div>)}
                    </div>
                    <div className="relative z-10 w-full max-w-sm bg-card border border-border shadow-xl rounded-xl p-6">
                        <div className="h-4 w-1/3 bg-muted rounded mb-4"></div>
                        <div className="flex gap-4 items-end h-32 mt-8">
                            <motion.div initial={{height:0}} whileInView={{height:"40%"}} transition={{duration:1}} className="flex-1 bg-primary/40 rounded-t"></motion.div>
                            <motion.div initial={{height:0}} whileInView={{height:"60%"}} transition={{duration:1, delay:0.2}} className="flex-1 bg-primary/60 rounded-t"></motion.div>
                            <motion.div initial={{height:0}} whileInView={{height:"100%"}} transition={{duration:1, delay:0.4}} className="flex-1 bg-primary rounded-t"></motion.div>
                        </div>
                    </div>
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute top-8 right-8 bg-card border border-border shadow-lg rounded-lg p-3 flex items-center gap-2 z-20"
                    >
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-bold">Real-Time Data</span>
                    </motion.div>
                </div>
              </motion.div>
              <div className="lg:w-1/2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Real-Time Visibility</h3>
                <p className="text-lg text-muted-foreground mb-6">See your entire business at a glance. Make decisions based on up-to-the-minute data across finance, sales, and operations without waiting for end-of-month reports.</p>
                <ul className="space-y-3">
                  {['Live dashboards for every role', 'Customizable KPI tracking', 'Instant drill-down reporting'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="relative h-80 bg-gradient-to-tr from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col gap-4 w-full max-w-sm z-10 px-8">
                        <motion.div initial={{x: -50, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:0.5}} className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                            <div className="h-2 w-24 bg-muted rounded"></div>
                        </motion.div>
                        <div className="flex justify-center -my-2 z-20">
                            <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        </div>
                        <motion.div initial={{x: -50, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:0.5, delay:0.2}} className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center"><Box className="w-4 h-4 text-green-600 dark:text-green-400" /></div>
                            <div className="h-2 w-32 bg-muted rounded"></div>
                        </motion.div>
                        <div className="flex justify-center -my-2 z-20">
                            <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        </div>
                         <motion.div initial={{x: -50, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:0.5, delay:0.4}} className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center"><CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>
                            <div className="h-2 w-20 bg-muted rounded"></div>
                        </motion.div>
                    </div>
                </div>
              </motion.div>
              <div className="lg:w-1/2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Automated Workflows</h3>
                <p className="text-lg text-muted-foreground mb-6">Eliminate manual data entry and human error. When a sale closes, inventory is deducted, and finance is notified—automatically.</p>
                <ul className="space-y-3">
                  {['Cross-department automation', 'Custom approval hierarchies', 'Trigger-based alerts'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Block 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                 <div className="relative h-80 bg-gradient-to-tr from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                    <div className="relative flex items-center justify-center w-full h-full">
                        <motion.div 
                           animate={{ y: [0, -10, 0] }}
                           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                           className="absolute w-64 h-48 bg-card border border-border shadow-2xl rounded-xl z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-3 w-1/3 bg-muted rounded"></div>
                                <Monitor className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-muted rounded"></div>
                                <div className="h-2 w-5/6 bg-muted rounded"></div>
                                <div className="h-2 w-4/6 bg-muted rounded"></div>
                            </div>
                        </motion.div>
                        <motion.div 
                           animate={{ y: [0, 10, 0] }}
                           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                           className="absolute w-24 h-40 bg-card border border-border shadow-xl rounded-xl z-30 right-10 bottom-10 p-2"
                        >
                            <div className="flex justify-center mb-2">
                                <Smartphone className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <div className="h-10 w-full bg-primary/20 rounded mb-2"></div>
                            <div className="h-2 w-full bg-muted rounded mb-1"></div>
                            <div className="h-2 w-2/3 bg-muted rounded"></div>
                        </motion.div>
                    </div>
                </div>
              </motion.div>
              <div className="lg:w-1/2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Cloud Access Anywhere</h3>
                <p className="text-lg text-muted-foreground mb-6">Work from any device, anywhere in the world. Secure, fast, and fully responsive across desktops, tablets, and smartphones.</p>
                <ul className="space-y-3">
                  {['Native mobile apps available', 'Zero on-premise hardware required', 'Global low-latency CDN'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ERP Dashboard Showcase */}
      <section className="py-24 bg-muted/30">
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
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(145deg, #060d1f 0%, #0a1a3a 35%, #071428 65%, #040c1c 100%)' }}>
        {/* Star-field dots */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Glow orbs */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[60px]" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
                Rock solid.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Always on.</span>
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
                      <div className="absolute inset-2 rounded-lg bg-[#0a1628]/80 border border-white/10 overflow-hidden flex flex-col">
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Real Results From Real Businesses</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "Bharti Manufacturing",
                ind: "Manufacturing",
                challenge: "Disconnected systems leading to stockouts.",
                solution: "Full ERP integration across 3 facilities.",
                result: "Reduced operational costs by 28%",
                badge: "-28% Costs"
              },
              {
                company: "Nexus Retail Chain",
                ind: "Retail & E-commerce",
                challenge: "High inventory shrinkage and slow reconciliation.",
                solution: "Real-time POS and warehouse tracking.",
                result: "Inventory accuracy improved to 99.8%",
                badge: "99.8% Accuracy"
              },
              {
                company: "SwiftDistrib",
                ind: "Wholesale",
                challenge: "Manual, paper-based purchase orders.",
                solution: "Automated procurement and vendor portal.",
                result: "Order processing time cut by 60%",
                badge: "60% Faster"
              }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col"
              >
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 self-start">
                  {story.ind}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{story.company}</h3>
                <div className="space-y-4 mb-8 flex-1">
                  <div>
                    <span className="text-sm font-bold text-muted-foreground block mb-1">Challenge</span>
                    <p className="text-foreground">{story.challenge}</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-muted-foreground block mb-1">Solution</span>
                    <p className="text-foreground">{story.solution}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-border mt-auto">
                    <span className="text-sm font-bold text-muted-foreground block mb-2">Result</span>
                    <div className="text-lg font-bold text-foreground mb-2">"{story.result}"</div>
                    <div className="text-primary font-black text-xl">{story.badge}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Statistics Section */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20 text-center">
            {[
              { value: 500, suffix: '+', label: 'Businesses Managed' },
              { value: 50, suffix: 'k+', label: 'Daily Transactions' },
              { value: 99.9, suffix: '%', label: 'System Uptime' },
              { value: 15, suffix: '+', label: 'Industry Verticals' }
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations Section */}
      <section className="py-24 bg-muted/50">
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
        className="relative overflow-hidden py-28"
        style={{ background: 'linear-gradient(160deg, #070B18 0%, #0B1020 55%, #060d1c 100%)' }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #4b7bff 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        {/* Ambient glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0B5CFF]/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F4A 0%, #162d66 40%, #F97316 100%)' }}>
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

      {/* 12. CTA Section */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F4A 0%, #1a3a7a 50%, #F97316 100%)' }}>
        {/* Decorative glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(11,31,74,0.6) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-orange-200 text-sm font-semibold mb-6 border border-white/15 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Join 500+ businesses already scaling with KonnectERP
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to Transform<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-200 to-white">Your Business Operations?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Join hundreds of businesses that have scaled faster and smarter with KonnectERP.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={openDemo}
              className="h-14 px-10 text-lg font-semibold text-[#0B1F4A] bg-white hover:bg-orange-50 rounded-xl shadow-2xl transition-all hover:scale-105 hover:shadow-orange-500/25">
              Book Free Demo
            </button>
            <button onClick={openDemo}
              className="h-14 px-10 text-lg font-semibold text-white border-2 border-white/30 hover:border-white/60 rounded-xl backdrop-blur-sm transition-all hover:bg-white/10">
              Talk to an Expert
            </button>
          </div>
          <p className="mt-8 text-sm text-white/40">No credit card required · Free 14-day trial · Setup in minutes</p>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-foreground text-muted pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Layers className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">KonnectERP<span className="text-primary">.</span></span>
              </div>
              <p className="text-gray-400 mb-6 max-w-xs">
                The intelligent cloud ERP platform that helps ambitious companies scale their operations efficiently.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Finance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Inventory</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sales & CRM</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HR & Payroll</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Solutions</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Small Business</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mid-Market</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Industries</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Manufacturing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Retail</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Distribution</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Healthcare</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li className="pt-2 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> info@konnecterp.com</li>
                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> +91 98765 43210</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>&copy; {new Date().getFullYear()} KonnectERP. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
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
