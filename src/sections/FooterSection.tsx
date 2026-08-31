import { useNavigation } from "@/lib/useNavigation";
import { useSiteSettings } from "@/lib/useSiteSettings";
import type { FooterSocialLink } from "@shared/site-settings";

export interface FooterContent {
  tagline: string;
  copyright: string;
}

const FOOTER_MENU_LIMIT = 3;

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("facebook")) {
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
  }
  if (key.includes("linkedin")) {
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
  }
  if (key.includes("instagram")) {
    return <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-300 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
  }
  if (key.includes("youtube")) {
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" className="fill-[#0B1220]" /></svg>;
  }
  if (key === "x" || key.includes("twitter")) {
    return <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-300"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
  }
  return <span className="text-xs font-bold uppercase text-slate-300">{label.slice(0, 1)}</span>;
}

export function FooterSection({ content }: { content: FooterContent }) {
  const navigation = useNavigation();
  const settings = useSiteSettings();
  const footer = settings.footer;
  const socialLinks = footer.socialLinks.filter((link: FooterSocialLink) => link.visible !== false && link.href);
  const footerNavigation = navigation.filter((group) => footer.footerMenuHrefs.includes(group.href));

  return (
    <footer className="bg-[#0B204B] relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-8 pt-14 pb-0 max-w-8xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(5,minmax(0,1fr))] gap-10 mb-14">
          <div>
            <div className="mb-5">
              <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-12 w-auto" />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-[220px] mb-6">{footer.tagline || content.tagline}</p>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a key={`${link.label}-${link.href}`} href={link.href} aria-label={link.label} className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors">
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </div>

          {footerNavigation.map((group) => (
            <div key={group.label}>
              <h4 className="text-white font-bold text-xs tracking-[0.16em] uppercase mb-5">{group.footerLabel ?? group.label}</h4>
              <ul className="space-y-3">
                {group.items.slice(0, FOOTER_MENU_LIMIT).map((item) => (
                  <li key={item.label}><a href={item.href} className="text-slate-400 text-sm hover:text-white transition-colors">{item.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.07] py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">{footer.copyright || content.copyright}</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Security"].map((link) => (
              <a key={link} href="#" className="text-slate-500 text-xs hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
