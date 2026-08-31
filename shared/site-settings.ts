export interface FooterSocialLink {
  label: string;
  href: string;
  visible?: boolean;
}

export interface SiteSettings {
  footer: {
    tagline: string;
    copyright: string;
    socialLinks: FooterSocialLink[];
    footerMenuHrefs: string[];
  };
  whatsapp: {
    enabled: boolean;
    phone: string;
    message: string;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  footer: {
    tagline: "The intelligent cloud ERP platform that helps ambitious companies scale their operations efficiently.",
    copyright: "© 2026 KonnectERP. All rights reserved.",
    footerMenuHrefs: ["#products", "#industries", "#customers", "#resources", "/about-us"],
    socialLinks: [
      { label: "Facebook", href: "#", visible: true },
      { label: "LinkedIn", href: "#", visible: true },
      { label: "Instagram", href: "#", visible: true },
      { label: "YouTube", href: "#", visible: true },
      { label: "X", href: "#", visible: true },
    ],
  },
  whatsapp: {
    enabled: true,
    phone: "919843111651",
    message: "Hi KonnectERP team, I would like to know more about your ERP solutions.",
  },
};
