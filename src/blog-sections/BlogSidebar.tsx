import { Link } from 'wouter';
import { Tag, Archive } from 'lucide-react';
import type { BlogMeta } from '@/lib/blog-api';

export function BlogSidebar({ meta, isDarkMode }: { meta: BlogMeta | null; isDarkMode: boolean }) {
  const cardCls = `rounded-2xl border p-6 ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`;
  const headingCls = `flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4 ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`;

  return (
    <aside className="space-y-6">
      <div className={cardCls}>
        <h3 className={headingCls}>
          <Tag className="w-4 h-4 text-[#F97316]" />
          Tags
        </h3>
        {!meta || meta.tags.length === 0 ? (
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>No tags yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <Link
                key={t.name}
                href={`/blog?tag=${encodeURIComponent(t.name)}`}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#F97316]/40 hover:text-[#F97316]'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#F97316]/40 hover:text-[#F97316]'
                }`}
              >
                {t.name}
                <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>({t.count})</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={cardCls}>
        <h3 className={headingCls}>
          <Archive className="w-4 h-4 text-[#F97316]" />
          Archives
        </h3>
        {!meta || meta.archives.length === 0 ? (
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>No archives yet.</p>
        ) : (
          <ul className="space-y-1">
            {meta.archives.map((a) => (
              <li key={`${a.year}-${a.month}`}>
                <div
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-sm ${
                    isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{a.label}</span>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{a.count}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
