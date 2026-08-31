import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  Users, Building2, Activity, BarChart3, Package, Factory, Shield, ShoppingCart, Layers,
  FileText, Truck, CreditCard, Briefcase, TrendingUp, Handshake, HardHat, HelpCircle,
  UserCog, Eye, Zap, Cloud, Server, Monitor, Smartphone, CheckCircle2, ClipboardList,
  AlertTriangle, DollarSign, Settings, ShieldCheck, PackageCheck, ClipboardCheck, Calculator,
  MapPin, Mail, Phone, Headphones, Bell, Fingerprint, Gauge, GitBranch, LockKeyhole,
  Sparkles, Database, FileSignature, Facebook, Twitter, Instagram, MessageCircle, Linkedin,
  PackageSearch, BriefcaseBusiness, GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";

// Keep in sync with ICON_OPTIONS in shared/sections.ts — every icon name a
// section's content can reference must be imported and listed here, since
// this map (not a dynamic lookup) is what the public site renders from.
export const ICON_MAP: Record<string, LucideIcon> = {
  Users, Building2, Activity, BarChart3, Package, Factory, Shield, ShoppingCart, Layers,
  FileText, Truck, CreditCard, Briefcase, TrendingUp, Handshake, HardHat, UserCog, Eye,
  Zap, Cloud, Server, Monitor, Smartphone, CheckCircle2, ClipboardList, AlertTriangle,
  DollarSign, Settings, ShieldCheck, PackageCheck, ClipboardCheck, Calculator,
  MapPin, Mail, Phone, Headphones, HelpCircle, Bell, Fingerprint, Gauge, GitBranch,
  LockKeyhole, Sparkles, Database, FileSignature, Facebook, Twitter, Instagram,
  MessageCircle, Linkedin, PackageSearch, BriefcaseBusiness, GraduationCap,
};

export function getIcon(name: string | undefined): LucideIcon {
  return (name && ICON_MAP[name]) || HelpCircle;
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const smoothTitleVariants = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0 } } },
  item: { hidden: { opacity: 0, y: 10, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } },
};

const smoothGradientVariants = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0 } } },
  item: { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } } },
};

export function InViewTextEffect({
  children,
  className,
  gradient,
}: {
  children: string;
  className?: string;
  gradient?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const variants = gradient ? smoothGradientVariants : smoothTitleVariants;
  const effectClass = gradient ? [gradient, className].filter(Boolean).join(" ") : className;
  return (
    <span ref={ref}>
      <TextEffect as="span" per="word" variants={variants} trigger={isInView} className={effectClass}>
        {children}
      </TextEffect>
    </span>
  );
}

export interface SectionCtx {
  isDarkMode: boolean;
  openDemo: () => void;
  openVideo: () => void;
}

// ── Network Mesh Canvas Background (used by the Hero section) ──────────────
export function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

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
    canvas.addEventListener("mousemove", onMove);

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
        ctx.fillStyle = "rgba(147,197,253,0.75)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "auto" }} />;
}
