import { useState } from 'react';
import { Link2, Check, Linkedin, Facebook } from 'lucide-react';

// A minimalist "X" glyph — lucide's Twitter icon is the legacy bird mark, not
// the current brand, so a hand-drawn path keeps this visually current.
function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-7.2L4.4 22H1.3l8.1-9.3L1 2h7.3l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z" />
    </svg>
  );
}

export function ShareButtons({ url, title, isDarkMode }: { url: string; title: string; isDarkMode: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore, the visible URL is still shareable.
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: 'Share on X', icon: XGlyph, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: 'Share on LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: 'Share on Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  const btnCls = `inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
    isDarkMode ? 'border-white/15 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#0B1F4A]'
  }`;

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-bold uppercase tracking-wide mr-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Share</span>
      {links.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={btnCls}>
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button type="button" onClick={handleCopy} aria-label="Copy link" className={btnCls}>
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
