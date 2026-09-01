import { motion } from 'framer-motion';
import {
  Rocket, RefreshCw, Star, CheckCircle2,
  UserCog, Package, BookOpen, Network, FileText, ChefHat, Printer, Search,
  GraduationCap, Users, ListChecks, Keyboard, FilePlus2, ClipboardCheck, Headphones, BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { RichText } from '@/components/site/RichText';
import { InViewTextEffect, getIcon, type SectionCtx } from '@/sections/shared';

export interface MethodologyStagesContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  stages: { icon: string; title: string; items: string[] }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STAGE_THEME = [
  { grad: 'from-[#F97316] to-[#EA580C]', chip: 'bg-orange-50 text-orange-700 border-orange-200', chipDark: 'bg-orange-500/10 text-orange-300 border-orange-500/20' },
  { grad: 'from-blue-500 to-blue-600', chip: 'bg-blue-50 text-blue-700 border-blue-200', chipDark: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
  { grad: 'from-violet-500 to-violet-600', chip: 'bg-violet-50 text-violet-700 border-violet-200', chipDark: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  { grad: 'from-emerald-500 to-emerald-600', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', chipDark: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  { grad: 'from-amber-500 to-amber-600', chip: 'bg-amber-50 text-amber-700 border-amber-200', chipDark: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  { grad: 'from-[#0B1F4A] to-[#162d66]', chip: 'bg-slate-100 text-[#0B1F4A] border-slate-300', chipDark: 'bg-white/10 text-slate-200 border-white/20' },
];

const ITEM_ICON_MAP: Record<string, LucideIcon> = {
  'Kick off': Rocket,
  'User Identification': UserCog,
  'Plan Work Package': Package,
  'Study Scope': BookOpen,
  'Process Understanding': Network,
  'Module Notes': FileText,
  'Cook-Book': ChefHat,
  'Print Format': Printer,
  'Open Item Tracker': Search,
  'Basic Training': GraduationCap,
  'Live Training': Users,
  'Master List': ListChecks,
  'Live Entry': Keyboard,
  'GAPS': Search,
  'New Requirement': FilePlus2,
  'Close Item Tracker': ClipboardCheck,
  'Handover to Support': Headphones,
  'Reports': BarChart3,
};

function ItemChip({ item, className }: { item: string; className: string }) {
  const Icon = ITEM_ICON_MAP[item] ?? CheckCircle2;
  return (
    <span className={`inline-flex items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold leading-snug ${className}`}>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{item}</span>
    </span>
  );
}

function FeedbackLoopPill({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative mb-8 flex items-center justify-center">
      <div className={`absolute left-2 right-2 top-1/2 border-t-2 border-dashed sm:left-10 sm:right-10 ${isDarkMode ? 'border-blue-400/25' : 'border-blue-300'}`} />
      <span className={`relative z-10 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'border-blue-400/30 bg-[#080f1e] text-blue-300' : 'border-blue-200 bg-white text-blue-600'}`}>
        <RefreshCw className="h-3.5 w-3.5" />
        Feedback Loop
      </span>
    </div>
  );
}

function NoteBar({ isDarkMode, className = '' }: { isDarkMode: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'} ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1F4A]">
        <Star className="h-4 w-4 fill-white text-white" />
      </span>
      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        Every stage is interconnected for continuous improvement and successful ERP implementation.
      </p>
    </div>
  );
}

export function MethodologyStages({ content, ctx }: { content: MethodologyStagesContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 ${isDarkMode ? 'bg-[#080f1e]' : 'bg-slate-50'}`}>
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
          <h2 className={`mb-5 text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>{' '}
            <InViewTextEffect gradient="bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8] bg-clip-text text-transparent">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-base leading-8 md:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <RichText text={content.description} />
          </p>
        </motion.div>

        <div className={`rounded-3xl border p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'border-white/10 bg-white/[0.025]' : 'border-slate-200 bg-white/80 shadow-sm'}`}>
          <FeedbackLoopPill isDarkMode={isDarkMode} />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.stages.map((stage, i) => {
              const theme = STAGE_THEME[i % STAGE_THEME.length];
              const Icon = getIcon(stage.icon);
              return (
                <motion.article
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.05 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 ${
                    isDarkMode ? 'border-white/10 bg-[#0B1220]/80' : 'border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.grad} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${isDarkMode ? theme.chipDark : theme.chip}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={`mb-4 min-h-[2.5rem] text-base font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
                    {stage.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stage.items.map((item, j) => (
                      <ItemChip key={j} item={item} className={isDarkMode ? theme.chipDark : theme.chip} />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <NoteBar isDarkMode={isDarkMode} className="mx-auto mt-8 max-w-2xl" />
        </div>
      </div>
    </section>
  );
}
