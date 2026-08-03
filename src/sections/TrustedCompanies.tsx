import type { SectionCtx } from "./shared";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface TrustedCompaniesContent {
  heading: string;
  logos: LogoItem[];
}

export function TrustedCompanies({ content, ctx }: { content: TrustedCompaniesContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <div className={`relative z-10 py-10 overflow-hidden border-t ${isDarkMode ? "bg-[#080c18] border-white/10" : "bg-white border-slate-200/60"}`}>
      {isDarkMode && (
        <>
          <div className="absolute -top-10 left-[6%] w-40 h-40 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-[10%] w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        </>
      )}
      <div className="text-center mb-6 relative">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{content.heading}</p>
      </div>

      <div className="relative w-full overflow-hidden mb-2">
        <div className={`absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-r from-[#080c18] to-transparent" : "bg-gradient-to-r from-white to-transparent"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-l from-[#080c18] to-transparent" : "bg-gradient-to-l from-white to-transparent"}`} />

        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) =>
            content.logos.map((brand) => (
              <div key={`${copy}-${brand.src}`} className="inline-flex h-24 w-[195px] md:w-[300px] lg:w-[203px] items-center justify-center mx-5 md:mx-10 shrink-0">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className={`max-h-20 max-w-full object-contain transition-opacity ${isDarkMode ? "opacity-90 brightness-110" : "opacity-90"}`}
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
