import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, Flag, RefreshCw, ChevronDown, ArrowRight, Star, CheckCircle2,
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
  { grad: 'from-[#F97316] to-[#EA580C]', chip: 'bg-orange-50 text-orange-700 border-orange-200', chipDark: 'bg-orange-500/10 text-orange-300 border-orange-500/20', ring: 'border-orange-300' },
  { grad: 'from-blue-500 to-blue-600', chip: 'bg-blue-50 text-blue-700 border-blue-200', chipDark: 'bg-blue-500/10 text-blue-300 border-blue-500/20', ring: 'border-blue-300' },
  { grad: 'from-violet-500 to-violet-600', chip: 'bg-violet-50 text-violet-700 border-violet-200', chipDark: 'bg-violet-500/10 text-violet-300 border-violet-500/20', ring: 'border-violet-300' },
  { grad: 'from-emerald-500 to-emerald-600', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', chipDark: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', ring: 'border-emerald-300' },
  { grad: 'from-amber-500 to-amber-600', chip: 'bg-amber-50 text-amber-700 border-amber-200', chipDark: 'bg-amber-500/10 text-amber-300 border-amber-500/20', ring: 'border-amber-300' },
  { grad: 'from-[#0B1F4A] to-[#162d66]', chip: 'bg-slate-100 text-[#0B1F4A] border-slate-300', chipDark: 'bg-white/10 text-slate-200 border-white/20', ring: 'border-slate-300' },
];

// Known checklist labels get a matching icon; anything an admin adds later
// falls back to a plain check icon so the layout never breaks.
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
      <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
      <span>{item}</span>
    </span>
  );
}

function FeedbackLoopPill({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className={`absolute left-6 right-6 sm:left-10 sm:right-10 top-1/2 border-t-2 border-dashed ${isDarkMode ? 'border-blue-400/25' : 'border-blue-300'}`} />
      <span className={`relative z-10 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'bg-[#080f1e] border-blue-400/30 text-blue-300' : 'bg-slate-50 border-blue-200 text-blue-600'}`}>
        <RefreshCw className="w-3.5 h-3.5" />
        Feedback Loop
      </span>
    </div>
  );
}

function NoteBar({ isDarkMode, className = '' }: { isDarkMode: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} ${className}`}>
      <span className="shrink-0 w-8 h-8 rounded-full bg-[#0B1F4A] flex items-center justify-center">
        <Star className="w-4 h-4 text-white fill-white" />
      </span>
      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        Every stage is interconnected for continuous improvement and successful ERP implementation.
      </p>
    </div>
  );
}

export function MethodologyStages({ content, ctx }: { content: MethodologyStagesContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const trunkColor = isDarkMode ? 'border-white/15' : 'border-slate-300';
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(content.stages.map((_, i) => i)));
  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#080f1e]' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 max-w-7xl 2xl:max-w-[1600px] relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            <InViewTextEffect>{content.title}</InViewTextEffect>{' '}
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">{content.highlight}</InViewTextEffect>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={content.description} /></p>
        </motion.div>

        {/* ── Desktop: wide horizontal flowchart (ultra-wide screens only, no scroll risk) ── */}
        <div className="hidden 2xl:block">
          <FeedbackLoopPill isDarkMode={isDarkMode} />

          <div className="overflow-x-auto">
            <div className="flex items-start gap-2 min-w-[1400px] justify-center mx-auto">
              <div className="flex flex-col items-center shrink-0 w-24 pt-1">
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-2 ${isDarkMode ? 'border-white/15 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`}>
                  <Rocket className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`} />
                </div>
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Start</span>
              </div>
              <ArrowRight className={`w-5 h-5 mt-7 shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />

              {content.stages.map((stage, i) => {
                const theme = STAGE_THEME[i % STAGE_THEME.length];
                const Icon = getIcon(stage.icon);
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start"
                  >
                    <div className="flex flex-col items-center w-[168px] shrink-0">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center text-[10px] font-extrabold text-[#0B1F4A] shadow ${theme.ring}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className={`mt-3 mb-2 text-sm font-bold text-center ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{stage.title}</h3>
                      <div className={`w-0.5 h-4 bg-gradient-to-b ${theme.grad}`} />
                      <div className="mt-3 space-y-2 w-full">
                        {stage.items.map((item, j) => (
                          <ItemChip key={j} item={item} className={`w-full ${isDarkMode ? theme.chipDark : theme.chip}`} />
                        ))}
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 mt-7 mx-1 shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                  </motion.div>
                );
              })}

              <div className="flex flex-col items-center shrink-0 w-24 pt-1">
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-2 ${isDarkMode ? 'border-white/15 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`}>
                  <Flag className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`} />
                </div>
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Finish</span>
              </div>
            </div>
          </div>

          <NoteBar isDarkMode={isDarkMode} className="mt-10 max-w-2xl mx-auto" />
        </div>

        {/* ── Mobile / tablet / laptop: collapsible vertical tree (default, zero scroll) ── */}
        <div className="2xl:hidden">
          <FeedbackLoopPill isDarkMode={isDarkMode} />

          <div className="relative max-w-2xl mx-auto">
            <div className={`absolute left-[27px] top-3 bottom-3 border-l-2 border-dashed ${trunkColor}`} />
            <div className="space-y-4">
              {content.stages.map((stage, i) => {
                const theme = STAGE_THEME[i % STAGE_THEME.length];
                const Icon = getIcon(stage.icon);
                const open = openSet.has(i);
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.05 }}
                    className={`relative z-10 rounded-2xl border overflow-hidden ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`}
                  >
                    <button type="button" onClick={() => toggle(i)} className="w-full flex items-center gap-3 sm:gap-4 px-4 py-4 text-left">
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white bg-gradient-to-br ${theme.grad}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br ${theme.grad} shadow`}>
                        <Icon className="w-5 h-5 text-white" />
                      </span>
                      <span className={`flex-1 font-bold ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{stage.title}</span>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 px-4 pb-4 sm:pl-[4.75rem]">
                            {stage.items.map((item, j) => (
                              <ItemChip key={j} item={item} className={isDarkMode ? theme.chipDark : theme.chip} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <NoteBar isDarkMode={isDarkMode} className="mt-8 max-w-2xl mx-auto" />
        </div>
      </div>
    </section>
  );
}
