import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Send, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { DemoModal } from "@/components/site/DemoModal";
import { VideoModal } from "@/components/site/VideoModal";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { FooterSection, type FooterContent } from "@/sections/FooterSection";
import { getIcon } from "@/sections/shared";
import { usePageSections } from "@/lib/usePageSections";
import { useSiteChrome } from "@/hooks/useSiteChrome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { cn } from "@/lib/utils";
import { isCmsButtonVisible, runCmsButtonAction } from "@/lib/cms-button-actions";

type CareerStat = { icon: string; value: string; label: string };
type CareerJob = {
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
  applyText?: string;
  applyHref?: string;
};

export default function Career() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { sections, byType } = usePageSections("career");
  const hasSection = (type: string) => sections.some((section) => section.type === type);
  const heroContent = byType("product_hero");
  const rolesContent = byType("career_roles");
  const footerContent = byType("footer") as unknown as FooterContent;
  const stats = (rolesContent.stats as CareerStat[] | undefined) ?? [];
  const jobs = (rolesContent.jobs as CareerJob[] | undefined) ?? [];
  const [openIndex, setOpenIndex] = useState(3);

  useDocumentMeta(
    "Careers | KonnectERP",
    "Explore career opportunities at Konnect Analytics and join a growing ERP product and consulting team."
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
        overDarkBackground
      />

      <main>
        {hasSection("product_hero") && (
        <PageHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: (heroContent.breadcrumbLabel as string) || "Careers" },
          ]}
          eyebrow={(heroContent.eyebrow as string) || ""}
          title={(heroContent.title as string) || ""}
          highlight={(heroContent.highlight as string) || ""}
          subhead={(heroContent.subhead as string) || ""}
          description={(heroContent.description as string) || ""}
          primaryButtonText={(heroContent.primaryButtonText as string) || ""}
          showPrimaryButton={isCmsButtonVisible(heroContent.primaryButtonVisible)}
          onPrimaryClick={() => {
            if (heroContent.primaryButtonAction === "link" && heroContent.primaryButtonHref === "#open-roles") {
              document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
              return;
            }
            runCmsButtonAction(heroContent.primaryButtonAction, heroContent.primaryButtonHref, {
              openDemo: chrome.openDemo,
              openVideo: chrome.openVideo,
            }, "link");
          }}
        />
        )}

        {hasSection("career_roles") && (
        <section id="open-roles" className="bg-white py-20 dark:bg-[#080E1D]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">{rolesContent.eyebrow as string}</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] dark:text-white md:text-5xl">{rolesContent.title as string}</h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="sticky top-28 overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1730] shadow-2xl shadow-slate-300/60">
                  <div className="relative min-h-[620px] p-6 md:p-8">
                    <img src={(rolesContent.backgroundImage as string) || "/images/hero-meeting.jpg"} alt="KonnectERP career team" className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#071021]/95 via-[#112B5B]/82 to-[#071021]/96" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(249,115,22,0.3),transparent_34%)]" />

                    <div className="relative z-10 flex min-h-[560px] flex-col justify-between">
                      <div>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300 backdrop-blur">
                          <Sparkles className="h-4 w-4" />
                          {rolesContent.cardEyebrow as string}
                        </div>
                        <h3 className="max-w-md text-4xl font-bold leading-tight text-white md:text-5xl">
                          {rolesContent.cardTitle as string}
                        </h3>
                        <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                          {rolesContent.cardDescription as string}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {stats.map((stat) => {
                          const Icon = getIcon(stat.icon);
                          return (
                            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                              <Icon className="mb-3 h-5 w-5 text-orange-400" />
                              <p className="text-2xl font-black text-white">{stat.value}</p>
                              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-300">{stat.label}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-lg border border-orange-400/25 bg-orange-500/15 p-4">
                        <p className="text-sm font-semibold text-white">{rolesContent.footerTitle as string}</p>
                        <p className="mt-1 text-xs leading-5 text-orange-100">{rolesContent.footerDescription as string}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="space-y-4">
                {jobs.map((job, index) => {
                  const open = openIndex === index;

                  return (
                    <div key={job.title} className={cn("overflow-hidden rounded-xl border bg-white transition-all dark:bg-white/5", open ? "border-orange-200 shadow-xl shadow-orange-100/60 dark:border-orange-500/40 dark:shadow-none" : "border-slate-200 shadow-sm dark:border-white/10")}>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                      >
                        <span className="font-bold text-slate-900 dark:text-white">{index + 1}. {job.title}</span>
                        <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform", open && "rotate-180")} />
                      </button>

                      {open && (
                        <div className="border-t border-slate-100 px-5 pb-6 pt-2">
                          <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10 dark:text-slate-300"><MapPin className="h-3 w-3 text-orange-500" /> {job.location}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10 dark:text-slate-300"><Clock className="h-3 w-3 text-orange-500" /> {job.type}</span>
                          </div>
                          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{job.summary}</p>

                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="mt-5">
                              <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Key Responsibilities</h4>
                              <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {job.responsibilities.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.requirements && job.requirements.length > 0 && (
                            <div className="mt-5">
                              <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Requirements</h4>
                              <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {job.requirements.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <a href={job.applyHref || "mailto:sales@konnectbi.com"} className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#F97316] px-5 text-sm font-bold text-white">
                            {job.applyText || "Apply Now"} <Send className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>
        )}
      </main>

      <FooterSection content={footerContent} />
      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
