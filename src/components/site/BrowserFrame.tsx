import React from 'react';

export function BrowserFrame({
  url = 'app.konnecterp.com',
  className = '',
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200/10 shadow-2xl bg-[#0d1626] ${className}`}>
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1626] border-b border-white/[0.06]">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.06] text-[11px] text-slate-400 max-w-xs w-full justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-slate-500 shrink-0"><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm3 8H9V6a3 3 0 0 1 6 0z" /></svg>
            {url}
          </div>
        </div>
        <div className="w-10 shrink-0" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
