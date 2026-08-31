import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'wouter';
import { Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { blogApi, type BlogPost, type BlogListItem, type BlogMeta } from '@/lib/blog-api';
import { BlogCard } from '@/blog-sections/BlogCard';
import { BlogSidebar } from '@/blog-sections/BlogSidebar';
import { ShareButtons } from '@/blog-sections/ShareButtons';
import NotFound from '@/pages/not-found';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function RelatedSlider({ posts, isDarkMode }: { posts: BlogListItem[]; isDarkMode: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>More from the Blog</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              isDarkMode ? 'border-white/15 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              isDarkMode ? 'border-white/15 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="hide-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-1 px-1">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} isDarkMode={isDarkMode} className="w-[280px] shrink-0 snap-start" />
        ))}
      </div>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { byType: byHomeType } = usePageSections('home');
  const footerContent = byHomeType('footer') as unknown as FooterContent;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogListItem[]>([]);
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPost(null);
    setNotFound(false);
    blogApi
      .getBySlug(slug ?? '')
      .then((res) => {
        if (cancelled) return;
        setPost(res.post);
        setRelated(res.related);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });
    blogApi.meta().then((m) => !cancelled && setMeta(m)).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useDocumentMeta(post ? `${post.title} | KonnectERP Blog` : 'Blog | KonnectERP', post?.excerpt);

  if (notFound) return <NotFound />;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

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

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080E1D]">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post?.title ?? '…' }]} isDarkMode />
          </motion.div>

          {!post ? (
            <div className="animate-pulse space-y-4">
              <div className="h-3 w-32 bg-white/10 rounded" />
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="h-10 w-1/2 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              {post.tags[0] && <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">{post.tags[0]}</p>}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-6 tracking-tight text-white">
                <InViewTextEffect>{post.title}</InViewTextEffect>
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4" /> {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
                </span>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={`py-16 relative ${isDarkMode ? 'bg-[#080f1e]' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          {!post ? (
            <div className={`animate-pulse aspect-[21/9] rounded-2xl max-w-5xl mx-auto ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                </motion.div>

                <div className={`flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          isDarkMode ? 'border-white/10 bg-white/[0.04] text-slate-300' : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ShareButtons url={shareUrl} title={post.title} isDarkMode={isDarkMode} />
                </div>

                <div className={`prose max-w-none space-y-5 text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {post.content
                    .split(/\n\s*\n/)
                    .filter((p) => p.trim())
                    .map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                </div>

                <div className={`mt-8 pt-6 border-t flex items-center justify-between flex-wrap gap-4 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Found this useful?</span>
                  <ShareButtons url={shareUrl} title={post.title} isDarkMode={isDarkMode} />
                </div>

                <RelatedSlider posts={related} isDarkMode={isDarkMode} />
              </div>

              <div className="lg:col-span-1">
                <BlogSidebar meta={meta} isDarkMode={isDarkMode} />
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
