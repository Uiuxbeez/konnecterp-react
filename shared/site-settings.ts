export interface FooterSocialLink {
  label: string;
  href: string;
  visible?: boolean;
}

export interface FooterBottomLink {
  label: string;
  href: string;
  visible?: boolean;
}

export type HeaderCtaAction = "demo_modal" | "custom_form_modal" | "link";

export interface HeaderCtaButton {
  enabled: boolean;
  text: string;
  action: HeaderCtaAction;
  target: string;
  style: "primary" | "secondary";
}

export interface SiteSettings {
  header: {
    ctas: HeaderCtaButton[];
  };
  footer: {
    tagline: string;
    copyright: string;
    socialLinks: FooterSocialLink[];
    footerMenuHrefs: string[];
    bottomLinks: FooterBottomLink[];
  };
  whatsapp: {
    enabled: boolean;
    phone: string;
    message: string;
  };
  forms: {
    autoPopupDelaySeconds: number;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  header: {
    ctas: [
      {
        enabled: true,
        text: "Request Demo",
        action: "demo_modal",
        target: "",
        style: "primary",
      },
      {
        enabled: true,
        text: "Become a Partner",
        action: "link",
        target: "/contact",
        style: "secondary",
      },
    ],
  },
  footer: {
    tagline: "The intelligent cloud ERP platform that helps ambitious companies scale their operations efficiently.",
    copyright: "© 2026 KonnectERP. All rights reserved.",
    footerMenuHrefs: ["#products", "#industries", "#customers", "#resources", "/about-us"],
    bottomLinks: [
      { label: "Privacy Policy", href: "/privacy-policy", visible: true },
      { label: "Terms of Service", href: "/terms-and-conditions", visible: true },
      { label: "Security", href: "#", visible: true },
    ],
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
  forms: {
    autoPopupDelaySeconds: 20,
  },
};
