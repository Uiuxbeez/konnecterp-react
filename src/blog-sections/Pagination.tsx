import { ChevronLeft, ChevronRight } from 'lucide-react';

function pageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | 'ellipsis')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push('ellipsis');
    out.push(p);
    prev = p;
  }
  return out;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  isDarkMode,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  isDarkMode: boolean;
}) {
  if (totalPages <= 1) return null;

  const btnBase = `inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-lg text-sm font-semibold transition-colors`;
  const idle = isDarkMode ? 'text-slate-300 hover:bg-white/5 border border-white/10' : 'text-slate-600 hover:bg-slate-100 border border-slate-200';
  const active = 'bg-[#F97316] text-white border border-[#F97316]';
  const disabled = 'opacity-40 cursor-not-allowed';

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 flex-wrap mt-14">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${btnBase} ${page <= 1 ? `${idle} ${disabled}` : idle}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageRange(page, totalPages).map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className={`px-1 text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            …
          </span>
        ) : (
          <button key={p} type="button" onClick={() => onChange(p)} className={`${btnBase} ${p === page ? active : idle}`} aria-current={p === page ? 'page' : undefined}>
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={`${btnBase} ${page >= totalPages ? `${idle} ${disabled}` : idle}`}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
