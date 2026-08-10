import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, isDarkMode }: { items: BreadcrumbItem[]; isDarkMode: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs font-medium">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <a
                href={item.href}
                className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0B1F4A]'}`}
              >
                {item.label}
              </a>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className={isDarkMode ? 'text-white/90' : 'text-[#0B1F4A]'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className={`w-3 h-3 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />}
          </span>
        );
      })}
    </nav>
  );
}
