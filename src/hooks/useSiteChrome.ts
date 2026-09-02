import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '@/lib/useSiteSettings';

export type ThemeMode = 'light' | 'dark' | 'auto';

function isNightTime(d: Date) {
  const mins = d.getHours() * 60 + d.getMinutes();
  return mins >= 18 * 60 + 30 || mins < 4 * 60;
}

// Shared header/theme/modal/scroll-to-top state used by every page (Home and
// inner pages) so they look and behave identically.
export function useSiteChrome({ autoOpenDemo = true }: { autoOpenDemo?: boolean } = {}) {
  const settings = useSiteSettings();
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
  const [activeFormSlug, setActiveFormSlug] = useState("demo-request");
  const openDemo = () => {
    setActiveFormSlug("demo-request");
    setIsDemoModalOpen(true);
  };
  const openForm = (slug: string) => {
    setActiveFormSlug(slug || "demo-request");
    setIsDemoModalOpen(true);
  };

  useEffect(() => {
    if (!autoOpenDemo) return undefined;
    const delayMs = Math.max(0, Math.min(300, settings.forms.autoPopupDelaySeconds)) * 1000;
    if (delayMs <= 0) return undefined;
    const timer = setTimeout(() => openDemo(), delayMs);
    return () => clearTimeout(timer);
  }, [autoOpenDemo, settings.forms.autoPopupDelaySeconds]);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const openVideo = () => setIsVideoModalOpen(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isDarkMode, themeMode, setThemeMode,
    headerBackdropFilter, headerBgLight, headerBorderLight, headerShadowLight, headerBgDark, headerBorderDark, headerShadowDark,
    isMobileMenuOpen, setIsMobileMenuOpen,
    showScrollTop,
    isDemoModalOpen, setIsDemoModalOpen, activeFormSlug, openDemo, openForm,
    isVideoModalOpen, setIsVideoModalOpen, openVideo,
  };
}
