import React from 'react';
import { motion, AnimatePresence, type MotionValue } from 'framer-motion';
import { ChevronRight, Menu, X, Monitor, Moon, Sun, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MENU_GROUPS } from '@/lib/nav';
import type { ThemeMode } from '@/hooks/useSiteChrome';

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

export function SiteHeader({
  isDarkMode, themeMode, setThemeMode,
  headerBackdropFilter, headerBgLight, headerBorderLight, headerShadowLight, headerBgDark, headerBorderDark, headerShadowDark,
  isMobileMenuOpen, setIsMobileMenuOpen, openDemo,
  overDarkBackground = false,
}: SiteHeaderProps) {
  const chromeDark = isDarkMode || overDarkBackground;

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
            {MENU_GROUPS.map((group) => (
              <div key={group.label} className="relative group cursor-pointer py-8">
                <a href={group.href} className={`text-sm font-medium flex items-center gap-1 ${chromeDark ? 'text-white' : 'text-[#0B1F4A]'}`}>
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
            <Button onClick={openDemo} className="bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-orange-900/30 border-0">
              Request Demo
            </Button>
            <button
              className={`h-9 px-4 text-sm font-semibold rounded-md border transition-colors btn-infinity ${chromeDark ? 'bg-transparent text-white border-white/30 hover:bg-white/10' : 'bg-[#041D4D] text-white border-[#041D4D]/25 hover:bg-[#0a2d6b]'}`}
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
              <a
                href="/"
                className="text-left text-lg font-medium text-foreground py-2 border-b border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
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
                  {THEME_OPTIONS.map(({ mode, icon, label }) => (
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
    </>
  );
}
