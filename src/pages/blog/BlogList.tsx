import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearch, useLocation } from 'wouter';
import { X } from 'lucide-react';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SiteHeader } from '@/components/site/SiteHeader';
import { Breadcrumb } from '@/components/site/Breadcrumb';
import { FooterSection, type FooterContent } from '@/sections/FooterSection';
import { ScrollToTopButton } from '@/components/site/ScrollToTopButton';
import { DemoModal } from '@/components/site/DemoModal';
import { VideoModal } from '@/components/site/VideoModal';
import { InViewTextEffect } from '@/sections/shared';
import { usePageSections } from '@/lib/usePageSections';
import { blogApi, type BlogListItem } from '@/lib/blog-api';
import { BlogCard } from '@/blog-sections/BlogCard';
import { Pagination } from '@/blog-sections/Pagination';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogList() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { byType: byHomeType } = usePageSections('home');
  const footerContent = byHomeType('footer') as unknown as FooterContent;

  const search = useSearch();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(search);
  const page = Math.max(1, Number(params.get('page')) || 1);
  const tag = params.get('tag') ?? undefined;

  const [posts, setPosts] = useState<BlogListItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useDocumentMeta('Blog | KonnectERP', 'Insights, guides, and updates on ERP, manufacturing, and business operations from the KonnectERP team.');

  useEffect(() => {
    let cancelled = false;
    setPosts(null);
    setError(null);
    blogApi
      .list(page, tag)
      .then((res) => {
        if (cancelled) return;
        setPosts(res.posts);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load posts');
      });
    return () => {
      cancelled = true;
    };
  }, [page, tag]);

  const goToPage = (p: number) => {
    const next = new URLSearchParams(search);
    if (p <= 1) next.delete('page');
    else next.set('page', String(p));
    setLocation(`/blog${next.toString() ? `?${next.toString()}` : ''}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        openForm={chrome.openForm}
        overDarkBackground
      />

      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080E1D]">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 flex justify-center">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} isDarkMode />
          </motion.div>
          <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">Insights & Updates</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight text-white">
            <InViewTextEffect>The KonnectERP</InViewTextEffect>{' '}
            <InViewTextEffect gradient="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#C084A0] to-[#818CF8]">Blog</InViewTextEffect>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practical guides, product updates, and perspectives on running a connected, efficient business.
          </p>
        </div>
      </section>

      <section className={`py-20 relative ${isDarkMode ? 'bg-[#080f1e]' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          {tag && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex items-center justify-center gap-2 mb-10">
              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Showing posts tagged <span className="font-bold text-[#F97316]">{tag}</span>
              </span>
              <Link
                href="/blog"
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  isDarkMode ? 'border-white/15 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Clear <X className="w-3 h-3" />
              </Link>
            </motion.div>
          )}

          {error && <p className="text-center text-sm text-red-500 py-10">{error}</p>}

          {!posts && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className={`aspect-[16/10] ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                  <div className="p-5 space-y-3">
                    <div className={`h-3 w-24 rounded ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                    <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                    <div className={`h-4 w-2/3 rounded ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts && posts.length === 0 && (
            <p className={`text-center py-16 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>No blog posts found.</p>
          )}

          {posts && posts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} isDarkMode={isDarkMode} delay={i * 0.05} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={goToPage} isDarkMode={isDarkMode} />
        </div>
      </section>

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
