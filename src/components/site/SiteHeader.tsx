import React, { useState } from 'react';
import { motion, AnimatePresence, type MotionValue } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X, Monitor, Moon, Sun, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { runCmsButtonAction } from '@/lib/cms-button-actions';
import { getMenuColumnClass, getMenuColumns, MEGA_MENU_THRESHOLD } from '@/lib/nav';
import { useNavigation } from '@/lib/useNavigation';
import { useSiteSettings } from '@/lib/useSiteSettings';
import type { ThemeMode } from '@/hooks/useSiteChrome';
import type { HeaderCtaButton } from '@shared/site-settings';

export interface SiteHeaderProps {
  isDarkMode: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  headerBackdropFilter: MotionValue<string>;
  headerBgLight: MotionValue<string>;
  headerBorderLight: MotionValue<string>;
  headerShadowLight: MotionValue<string>;
  headerBgDark: MotionValue<string>;
  headerBorderDark: MotionValue<string>;
  headerShadowDark: MotionValue<string>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  openDemo: () => void;
  openForm?: (slug: string) => void;
  /**
   * Set on pages whose content directly under the header is always dark
   * (e.g. PageHero), regardless of the site-wide light/dark toggle — otherwise
   * a "light" theme renders dark navy nav text on top of that dark background
   * and it becomes unreadable. Forces the header chrome itself to render in
   * its dark styling without affecting the toggle or the page content below.
   */
  overDarkBackground?: boolean;
}

const THEME_OPTIONS: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
  { mode: 'auto', icon: <Monitor className="w-4 h-4" />, label: 'Auto' },
  { mode: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
];

function getHeaderCtaClass(cta: HeaderCtaButton, chromeDark: boolean) {
  if (cta.style === 'secondary') {
    return chromeDark
      ? 'bg-transparent text-white border-white/30 hover:bg-white/10'
      : 'bg-[#041D4D] text-white border-[#041D4D]/25 hover:bg-[#0a2d6b]';
  }
  return 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-orange-900/30 border-0';
}

export function SiteHeader({
  isDarkMode, themeMode, setThemeMode,
  headerBackdropFilter, headerBgLight, headerBorderLight, headerShadowLight, headerBgDark, headerBorderDark, headerShadowDark,
  isMobileMenuOpen, setIsMobileMenuOpen, openDemo, openForm,
  overDarkBackground = false,
}: SiteHeaderProps) {
  const chromeDark = isDarkMode || overDarkBackground;
  const navigation = useNavigation();
  const settings = useSiteSettings();
  const headerCtas = settings.header.ctas;
  const mobileDemoCta =
    headerCtas.find((cta) => cta.enabled && cta.text.toLowerCase().includes('demo')) ??
    headerCtas.find((cta) => cta.enabled && cta.style === 'primary') ??
    headerCtas.find((cta) => cta.enabled);
  const mobileDrawerCtas = headerCtas.filter((cta) => cta.enabled && cta !== mobileDemoCta);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Set<string>>(new Set());
  const handleHeaderCtaClick = (cta: HeaderCtaButton) => {
    runCmsButtonAction(
      cta.action,
      cta.target,
      { openDemo, openForm, openVideo: () => {} },
      'demo_modal',
    );
  };
  const toggleMobileMenu = (label: string) => {
    setExpandedMobileMenus((current) => {
      const next = new Set(current);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: chromeDark ? headerBgDark : headerBgLight,
          backdropFilter: headerBackdropFilter,
          borderBottomColor: chromeDark ? headerBorderDark : headerBorderLight,
          boxShadow: chromeDark ? headerShadowDark : headerShadowLight,
        }}
        className="fixed top-0 overflow-visible w-full z-50 border-b"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="/" className="relative flex items-center cursor-pointer">
            {chromeDark && (
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
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            <a href="/" className={`text-sm font-medium ${chromeDark ? 'text-white hover:text-white/80' : 'text-[#0B1F4A]'}`}>
              Home
            </a>
            {navigation.map((group) => {
              const menuColumns = getMenuColumns(group.items);
              const isMegaMenu = group.items.length > MEGA_MENU_THRESHOLD;
              const columnClass = getMenuColumnClass(menuColumns.length);

              return (
                <div key={group.label} className="relative group cursor-pointer py-8">
                  <a href={group.href} className={`text-sm font-medium flex items-center gap-1 ${chromeDark ? 'text-white' : 'text-[#0B1F4A]'}`}>
                    {group.label} <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                  </a>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 ${
                      isMegaMenu ? "w-[min(920px,calc(100vw-2rem))]" : "min-w-[290px]"
                    }`}
                  >
                    <div className="mb-3 border-b border-border/70 pb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{group.footerLabel ?? group.label}</p>
                      {group.description && <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>}
                    </div>
                    <div className={isMegaMenu ? `grid gap-3 ${columnClass}` : "space-y-1"}>
                      {menuColumns.map((column, columnIndex) => (
                        <div key={`${group.label}-${columnIndex}`} className="space-y-1">
                          {column.map((item) => (
                            <a key={item.label} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                              {item.label}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex items-center rounded-full border p-0.5 gap-0.5 transition-colors ${chromeDark ? 'bg-white/10 border-white/15' : 'bg-slate-100 border-slate-200'}`}>
              {THEME_OPTIONS.map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  title={mode === 'auto' ? 'Auto — light 4 AM–6:30 PM, dark 6:30 PM–4 AM' : `${label} mode`}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    themeMode === mode
                      ? chromeDark ? 'bg-white/20 text-white shadow-sm' : 'bg-white text-[#0B1F4A] shadow-sm'
                      : chromeDark ? 'text-white/50 hover:text-white/80' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {icon}
                  <span className={themeMode === mode ? 'inline' : 'hidden'}>{label}</span>
                </button>
              ))}
            </div>
            {headerCtas.filter((cta) => cta.enabled).map((cta, index) => (
              <Button
                key={`${cta.style}-${index}`}
                onClick={() => handleHeaderCtaClick(cta)}
                className={`h-9 px-4 text-sm font-semibold rounded-md border transition-colors ${cta.style === 'secondary' ? 'btn-infinity' : ''} ${getHeaderCtaClass(cta, chromeDark)}`}
              >
                {cta.style === 'secondary' && <Handshake className="w-4 h-4 mr-2 inline-block" />}
                {cta.text}
              </Button>
            ))}
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {mobileDemoCta && !isMobileMenuOpen && (
        <button
          type="button"
          aria-label={mobileDemoCta.text}
          onClick={() => handleHeaderCtaClick(mobileDemoCta)}
          className="fixed right-2 top-[42%] z-40 inline-flex h-36 w-10 -translate-y-1/2 flex-col items-center justify-center gap-2 overflow-hidden rounded-full border border-white/25 bg-gradient-to-b from-[#FF8A1F] via-[#F97316] to-[#EA580C] text-white shadow-[0_16px_34px_rgba(15,23,42,0.22),0_8px_22px_rgba(249,115,22,0.32)] transition-transform hover:-translate-y-1/2 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#F97316]/40 lg:hidden"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          </span>
          <span
            className="whitespace-nowrap text-[11px] font-extrabold leading-none tracking-wide"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {mobileDemoCta.text}
          </span>
        </button>
      )}

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
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-5 rounded-2xl border border-border bg-muted/40 p-3">
                <div className="mb-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Theme</p>
                  <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1">
                    {THEME_OPTIONS.map(({ mode, icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => setThemeMode(mode)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          themeMode === mode
                            ? 'bg-[#0B1F4A] text-white shadow-sm dark:bg-white dark:text-[#0B1220]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {icon}{label}
                      </button>
                    ))}
                  </div>
                </div>
                {mobileDrawerCtas.length > 0 && (
                  <div className="grid gap-2">
                    {mobileDrawerCtas.map((cta, index) => (
                      <Button
                        key={`${cta.style}-${index}`}
                        variant={cta.style === 'secondary' ? 'outline' : 'default'}
                        className={`w-full justify-center ${cta.style === 'secondary' ? 'gap-2' : ''}`}
                        onClick={() => { setIsMobileMenuOpen(false); handleHeaderCtaClick(cta); }}
                      >
                        {cta.style === 'secondary' && <Handshake className="w-4 h-4" />}
                        {cta.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <nav className="flex flex-col gap-1">
              <a
                href="/"
                className="text-left text-base font-semibold text-foreground py-3 border-b border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              {navigation.map((group) => {
                const isExpanded = expandedMobileMenus.has(group.label);
                return (
                  <div key={group.label} className="border-b border-border">
                    <div className="flex items-center gap-2">
                      <a
                        href={group.href}
                        className="flex-1 py-3 text-base font-semibold text-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {group.label}
                      </a>
                      {group.items.length > 0 && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${group.label} submenu`}
                          onClick={() => toggleMobileMenu(group.label)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {isExpanded && group.items.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 pb-3 pl-3">
                            {group.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
