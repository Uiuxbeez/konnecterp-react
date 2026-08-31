import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { DemoModal } from "@/components/site/DemoModal";
import { VideoModal } from "@/components/site/VideoModal";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { FooterSection, type FooterContent } from "@/sections/FooterSection";
import { RichText } from "@/components/site/RichText";
import { getIcon } from "@/sections/shared";
import { usePageSections } from "@/lib/usePageSections";
import { useSiteChrome } from "@/hooks/useSiteChrome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { isCmsButtonVisible, runCmsButtonAction } from "@/lib/cms-button-actions";

type SocialLink = { label: string; icon: string; href: string };
type Branch = { city: string; phones: string[] };
type Pill = { icon: string; label: string };

export default function ContactUs() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { sections, page, byType } = usePageSections("contact");
  const hasSection = (type: string) => sections.some((section) => section.type === type);
  const heroContent = byType("product_hero");
  const contactContent = byType("contact_details");
  const supportContent = byType("contact_support_cta");
  const footerContent = byType("footer") as unknown as FooterContent;
  const addressLines = (contactContent.addressLines as string[] | undefined) ?? [];
  const socialLinks = (contactContent.socialLinks as SocialLink[] | undefined) ?? [];
  const branches = (contactContent.branches as Branch[] | undefined) ?? [];
  const pills = (supportContent.pills as Pill[] | undefined) ?? [];

  useDocumentMeta(
    page?.metaTitle || "Contact Us | KonnectERP",
    page?.metaDescription || "Contact Konnect Analytics for ERP demos, product support, implementation discussions, and office details across India."
  );

  return (
    <div className={`min-h-screen bg-background font-sans overflow-x-hidden ${isDarkMode ? "dark" : ""}`}>
      <SiteHeader
        isDarkMode={chrome.isDarkMode}
        themeMode={chrome.themeMode}
        setThemeMode={chrome.setThemeMode}
        headerBackdropFilter={chrome.headerBackdropFilter}
        headerBgLight={chrome.headerBgLight}
        headerBorderLight={chrome.headerBorderLight}
        headerShadowLight={chrome.headerShadowLight}
        headerBgDark={chrome.headerBgDark}
        headerBorderDark={chrome.headerBorderDark}
        headerShadowDark={chrome.headerShadowDark}
        isMobileMenuOpen={chrome.isMobileMenuOpen}
        setIsMobileMenuOpen={chrome.setIsMobileMenuOpen}
        openDemo={chrome.openDemo}
        openForm={chrome.openForm}
        overDarkBackground
      />

      <main>
        {hasSection("product_hero") && (
        <PageHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: (heroContent.breadcrumbLabel as string) || "Contact" },
          ]}
          eyebrow={(heroContent.eyebrow as string) || ""}
          title={(heroContent.title as string) || ""}
          highlight={(heroContent.highlight as string) || ""}
          subhead={(heroContent.subhead as string) || ""}
          description={(heroContent.description as string) || ""}
          primaryButtonText={(heroContent.primaryButtonText as string) || ""}
          showPrimaryButton={isCmsButtonVisible(heroContent.primaryButtonVisible)}
          heroImage={heroContent.heroImage as string | undefined}
          heroImageCropX={heroContent.heroImageCropX as number | undefined}
          heroImageCropY={heroContent.heroImageCropY as number | undefined}
          onPrimaryClick={() =>
            runCmsButtonAction(heroContent.primaryButtonAction, heroContent.primaryButtonHref, {
              openDemo: chrome.openDemo,
              openForm: chrome.openForm,
              openVideo: chrome.openVideo,
            }, "demo_modal")
          }
        />
        )}

        {hasSection("contact_details") && (
        <section className="relative overflow-hidden bg-white py-20 dark:bg-[#080E1D]">
          <div className="absolute inset-0 pointer-events-none opacity-55">
            <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [transform:perspective(700px)_rotateX(64deg)] [transform-origin:top]" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [transform:perspective(700px)_rotateX(-64deg)] [transform-origin:bottom]" />
          </div>

          <div className="container relative z-10 mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                <span className="rounded-full bg-[#0B1220] px-3 py-1 text-white dark:bg-white dark:text-[#0B1220]">{contactContent.pillLabel as string}</span>
                {contactContent.pillText as string}
                <ArrowRight className="h-3.5 w-3.5" />
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#0B1F4A] dark:text-white md:text-5xl">
                {String(contactContent.title ?? "").split("\n").map((line, index, lines) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < lines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="mb-6 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
                <RichText text={contactContent.description as string} />
              </p>

              <div className="space-y-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{contactContent.companyName as string}</p>
                  {addressLines.map((line) => <p key={line}>{line}</p>)}
                </div>
                <p><strong>Landmark:</strong> {contactContent.landmark as string}</p>
                <div>
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> {contactContent.email as string}</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> {contactContent.phone as string}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {socialLinks.map((item) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-400 text-[#0B1F4A] transition-colors hover:bg-orange-500 hover:text-white dark:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {branches.map((branch) => (
                  <div key={branch.city}>
                    <h3 className="mb-3 text-lg font-bold text-[#0B1F4A] dark:text-white">{branch.city}</h3>
                    {branch.phones.map((phone) => (
                      <p key={phone} className="text-sm leading-6 text-slate-500 dark:text-slate-300">{phone}</p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}>
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/5">
                <iframe
                  title={(contactContent.mapTitle as string) || "Map"}
                  src={(contactContent.mapSrc as string) || ""}
                  className="h-[460px] w-full md:h-[640px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </section>
        )}

        {hasSection("contact_support_cta") && (
        <section className="bg-white pb-20 dark:bg-[#080E1D]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative overflow-hidden rounded-2xl bg-[#0B1730] px-6 py-16 text-center text-white md:px-12 md:py-20">
              <img src={(supportContent.backgroundImage as string) || "/images/hero-meeting.jpg"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1734]/95 via-[#14284D]/90 to-[#071021]/95" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.16),transparent_42%)]" />

              <div className="relative z-10">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">{supportContent.eyebrow as string}</p>
                <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                  {supportContent.title as string} <span className="text-[#F97316]">{supportContent.highlight as string}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
                  <RichText text={supportContent.description as string} />
                </p>

                <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
                  {pills.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
                        <Icon className="h-4 w-4 text-orange-400" />
                        {item.label}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <a href={(supportContent.primaryButtonHref as string) || "#"} className="inline-flex h-12 items-center justify-center rounded-md bg-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-950/30">
                    {supportContent.primaryButtonText as string}
                  </a>
                  <a href={(supportContent.secondaryButtonHref as string) || "#"} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 text-sm font-bold text-white hover:bg-white/15">
                    {supportContent.secondaryButtonText as string} <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </main>

      <FooterSection content={footerContent} />
      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
