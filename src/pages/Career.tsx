import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Building2, ChevronDown, Clock, GraduationCap, MapPin, Send, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { DemoModal } from "@/components/site/DemoModal";
import { VideoModal } from "@/components/site/VideoModal";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { FooterSection, type FooterContent } from "@/sections/FooterSection";
import { usePageSections } from "@/lib/usePageSections";
import { useSiteChrome } from "@/hooks/useSiteChrome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { cn } from "@/lib/utils";

const jobs = [
  {
    title: "Customer Success Manager (CSM)",
    location: "Coimbatore / Hybrid",
    type: "Full-time",
    summary: "Own customer onboarding, adoption, renewals, and success outcomes for ERP implementation accounts.",
  },
  {
    title: "Marketing Associate",
    location: "Coimbatore",
    type: "Full-time",
    summary: "Support campaigns, content, events, lead generation, and partner marketing for KonnectERP.",
  },
  {
    title: "Customer Support Associate",
    location: "Coimbatore",
    type: "Full-time",
    summary: "Handle customer queries, coordinate issue resolution, and help users get more from the platform.",
  },
  {
    title: "SENIOR BUSINESS ANALYST",
    location: "Pune or Mumbai",
    type: "Full-time",
    summary:
      "As a Business Analyst, you will be responsible for analyzing business processes, identifying areas for improvement, and developing solutions for our product-based ERP company. You will work closely with cross-functional teams to gather requirements, document processes, and manage project timelines.",
    responsibilities: [
      "Collaborate with stakeholders to understand their business needs and translate them into functional requirements",
      "Conduct gap analysis to identify areas for improvement in our ERP system",
      "Develop and maintain process documentation and standard operating procedures",
      "Work closely with development teams to ensure the product meets requirements and specifications",
      "Analyze data to identify trends and insights that will help improve business processes",
      "Manage project timelines and deliverables to ensure timely completion of projects",
      "Provide end-user training and support to ensure adoption and effective use of the product",
      "Collaborate with the QA team to develop and execute test plans",
      "Conduct user acceptance testing and provide feedback to development teams",
    ],
    requirements: [
      "6 to 10 years of experience in business analysis or related field",
      "Experience with ERP systems, preferably in a product-based company",
      "Strong analytical and problem-solving skills",
      "Excellent communication and interpersonal skills",
      "Ability to manage multiple projects and priorities in a fast-paced environment",
      "Knowledge of Agile methodology is a plus",
    ],
  },
  {
    title: "ERP Technical Support",
    location: "Coimbatore",
    type: "Full-time",
    summary: "Support ERP configurations, technical tickets, integrations, and issue diagnosis for live customers.",
  },
  {
    title: "BDE/Sales Executive",
    location: "Chennai / Bengaluru",
    type: "Full-time",
    summary: "Build pipeline, qualify ERP opportunities, conduct demos, and coordinate with presales teams.",
  },
  {
    title: "COE (SME)",
    location: "Remote / Hybrid",
    type: "Full-time",
    summary: "Bring domain expertise to ERP templates, customer workshops, and best-practice process design.",
  },
];

export default function Career() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { byType } = usePageSections("home");
  const footerContent = byType("footer") as unknown as FooterContent;
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
        <PageHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Careers" },
          ]}
          eyebrow="Careers"
          title="Build meaningful ERP."
          highlight="Grow with Konnect."
          subhead="Join a product and consulting team solving real business operations for Indian enterprises."
          description="We are looking for people who like practical systems, customer clarity, and steady execution across ERP, support, marketing, sales, and business analysis."
          primaryButtonText="Explore Roles"
          onPrimaryClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
        />

        <section id="open-roles" className="bg-white py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">Open Positions</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] md:text-5xl">Submit Your Information</h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="sticky top-28 overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1730] shadow-2xl shadow-slate-300/60">
                  <div className="relative min-h-[620px] p-6 md:p-8">
                    <img src="/images/hero-meeting.jpg" alt="KonnectERP career team" className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#071021]/95 via-[#112B5B]/82 to-[#071021]/96" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(249,115,22,0.3),transparent_34%)]" />

                    <div className="relative z-10 flex min-h-[560px] flex-col justify-between">
                      <div>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300 backdrop-blur">
                          <Sparkles className="h-4 w-4" />
                          Life at Konnect
                        </div>
                        <h3 className="max-w-md text-4xl font-bold leading-tight text-white md:text-5xl">
                          Work where ERP becomes practical business impact.
                        </h3>
                        <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                          Build, support, and implement cloud ERP with teams who understand operations, finance, compliance, inventory, and customer success.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { icon: Users, value: "50+", label: "Team members" },
                          { icon: Building2, value: "4", label: "City presence" },
                          { icon: BriefcaseBusiness, value: "7", label: "Open roles" },
                          { icon: GraduationCap, value: "ERP", label: "Product learning" },
                        ].map((stat) => (
                          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                            <stat.icon className="mb-3 h-5 w-5 text-orange-400" />
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-300">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-orange-400/25 bg-orange-500/15 p-4">
                        <p className="text-sm font-semibold text-white">Send your profile for the role that fits you best.</p>
                        <p className="mt-1 text-xs leading-5 text-orange-100">Our team will review your details and connect for the next steps.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="space-y-4">
                {jobs.map((job, index) => {
                  const open = openIndex === index;

                  return (
                    <div key={job.title} className={cn("overflow-hidden rounded-xl border bg-white transition-all", open ? "border-orange-200 shadow-xl shadow-orange-100/60" : "border-slate-200 shadow-sm")}>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                      >
                        <span className="font-bold text-slate-900">{index + 1}. {job.title}</span>
                        <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform", open && "rotate-180")} />
                      </button>

                      {open && (
                        <div className="border-t border-slate-100 px-5 pb-6 pt-2">
                          <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><MapPin className="h-3 w-3 text-orange-500" /> {job.location}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Clock className="h-3 w-3 text-orange-500" /> {job.type}</span>
                          </div>
                          <p className="text-sm leading-7 text-slate-600">{job.summary}</p>

                          {job.responsibilities && (
                            <div className="mt-5">
                              <h4 className="mb-3 text-sm font-bold text-slate-900">Key Responsibilities</h4>
                              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                                {job.responsibilities.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.requirements && (
                            <div className="mt-5">
                              <h4 className="mb-3 text-sm font-bold text-slate-900">Requirements</h4>
                              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                                {job.requirements.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <a href="mailto:sales@konnectbi.com" className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#F97316] px-5 text-sm font-bold text-white">
                            Apply Now <Send className="h-4 w-4" />
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
      </main>

      <FooterSection content={footerContent} />
      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
