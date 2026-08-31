import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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

type StatItem = { value: string; label: string };
type ValueItem = { title: string; text: string };
type StrengthItem = { icon: string; title: string; description: string };
type LeaderItem = { name: string; role: string; initials: string };
type ProductItem = { label: string; description: string };

export default function AboutUs() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { sections, page, byType } = usePageSections("about-us");
  const hasSection = (type: string) => sections.some((section) => section.type === type);
  const heroContent = byType("product_hero");
  const companyContent = byType("about_company");
  const strengthsContent = byType("about_strengths");
  const leadershipContent = byType("about_leadership");
  const productsContent = byType("about_products");
  const footerContent = byType("footer") as unknown as FooterContent;
  const stats = (companyContent.stats as StatItem[] | undefined) ?? [];
  const values = (companyContent.values as ValueItem[] | undefined) ?? [];
  const paragraphs = (companyContent.paragraphs as string[] | undefined) ?? [];
  const strengths = (strengthsContent.items as StrengthItem[] | undefined) ?? [];
  const leaders = (leadershipContent.leaders as LeaderItem[] | undefined) ?? [];
  const products = (productsContent.products as ProductItem[] | undefined) ?? [];
  const presence = (productsContent.presence as string[] | undefined) ?? [];
  const ProductPanelIcon = getIcon(productsContent.panelIcon as string | undefined);

  useDocumentMeta(
    page?.metaTitle || "About Us | KonnectERP",
    page?.metaDescription || "Learn about Konnect Analytics, the company behind KonnectERP cloud ERP for Indian enterprises, manufacturers, traders, and distributors."
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
            { label: (heroContent.breadcrumbLabel as string) || "About Us" },
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

        {hasSection("about_company") && (
        <section className="bg-white py-20 dark:bg-[#080E1D]">
          <div className="container mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative min-h-[420px]">
              <img src={(companyContent.image as string) || "/images/hero-meeting.jpg"} alt={(companyContent.imageAlt as string) || ""} className="absolute left-0 top-0 h-[330px] w-[78%] rounded-lg object-cover grayscale" />
              <div className="absolute bottom-0 right-0 w-[72%] rounded-lg border-4 border-white bg-[#F97316] p-8 shadow-2xl">
                <img src="/images/konnect-logo.png" alt="KonnectERP" className="mx-auto h-14 w-auto brightness-0 invert" />
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-white">
                  {stats.map((stat) => (
                    <Stat key={`${stat.value}-${stat.label}`} value={stat.value} label={stat.label} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">{companyContent.eyebrow as string}</p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#0B1F4A] dark:text-white md:text-5xl">
                {companyContent.title as string}
              </h2>
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {paragraphs.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {values.map((value) => <ValueBlock key={value.title} title={value.title} text={value.text} />)}
              </div>
            </motion.div>
          </div>
        </section>
        )}

        {hasSection("about_strengths") && (
        <section className="bg-slate-50 py-20 dark:bg-[#0B1220]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">{strengthsContent.eyebrow as string}</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] dark:text-white md:text-5xl">{strengthsContent.title as string}</h2>
            </div>
            <div className="grid gap-x-12 gap-y-5 lg:grid-cols-2">
              {strengths.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (index % 2) * 0.06 }}
                    className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-300"><RichText text={item.description} /></span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {hasSection("about_leadership") && (
        <section className="bg-white py-20 dark:bg-[#080E1D]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">{leadershipContent.eyebrow as string}</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] dark:text-white md:text-5xl">{leadershipContent.title as string}</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader) => (
                <div key={leader.name} className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
                  <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-orange-500 bg-gradient-to-br from-slate-900 to-slate-600 text-2xl font-black text-white">
                    {leader.initials}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{leader.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-500">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {hasSection("about_products") && (
        <section className="bg-[#4B515C] py-20 text-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">{productsContent.eyebrow as string}</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{productsContent.title as string}</h2>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-white/10 bg-black lg:grid-cols-[1fr_0.92fr]">
              <div className="space-y-6 bg-gradient-to-br from-zinc-950 to-zinc-900 p-8 md:p-10">
                {products.map((product) => (
                  <div key={product.label}>
                    <h3 className="text-sm font-bold text-white">{product.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-orange-400"><RichText text={product.description} /></p>
                  </div>
                ))}
              </div>
              <div className="relative min-h-[360px] bg-black p-8 md:p-10">
                <div className="absolute inset-0 opacity-30">
                  <img src={(productsContent.backgroundImage as string) || "/images/globe-wireframe.svg"} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <ProductPanelIcon className="mb-5 h-10 w-10 text-orange-400" />
                    <h3 className="max-w-md text-3xl font-bold leading-tight">{productsContent.panelTitle as string}</h3>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                      <RichText text={productsContent.panelDescription as string} />
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {presence.map((city) => (
                      <span key={city} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                        <MapPin className="h-3 w-3 text-orange-400" /> {city}
                      </span>
                    ))}
                  </div>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/75">{label}</p>
    </div>
  );
}

function ValueBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{title}</h3>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}
