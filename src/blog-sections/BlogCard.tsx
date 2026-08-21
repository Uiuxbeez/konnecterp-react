import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import type { BlogListItem } from '@/lib/blog-api';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function BlogCard({ post, isDarkMode, delay = 0, className = '' }: { post: BlogListItem; isDarkMode: boolean; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ delay }}
      className={`group relative rounded-2xl p-0.5 ${isDarkMode ? 'border-[0.75px] border-white/10' : 'border border-slate-200 shadow-sm'} ${className}`}
    >
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <Link href={`/blog/${post.slug}`} className={`relative flex flex-col h-full rounded-[calc(1rem-2px)] overflow-hidden ${isDarkMode ? 'bg-[#101a30]' : 'bg-white'}`}>
        <div className="relative aspect-[16/10] overflow-hidden shrink-0">
          <img
            src={post.featuredImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.tags[0] && (
            <span className="absolute top-3 left-3 rounded-full bg-[#F97316] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              {post.tags[0]}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className={`flex items-center gap-1.5 text-xs font-medium mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </div>
          <h3 className={`text-base font-bold mb-2 leading-snug line-clamp-2 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>{post.title}</h3>
          <p className={`text-sm leading-relaxed line-clamp-2 mb-4 flex-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] group-hover:gap-2.5 transition-all">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
