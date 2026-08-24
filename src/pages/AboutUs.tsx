import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Cloud,
  Database,
  FileSignature,
  FileText,
  Fingerprint,
  Gauge,
  GitBranch,
  Layers,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { DemoModal } from "@/components/site/DemoModal";
import { VideoModal } from "@/components/site/VideoModal";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { FooterSection, type FooterContent } from "@/sections/FooterSection";
import { usePageSections } from "@/lib/usePageSections";
import { useSiteChrome } from "@/hooks/useSiteChrome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const strengths = [
  { icon: Fingerprint, title: "User & role based access control", desc: "Granular permissions and hierarchy approvals for every department." },
  { icon: BarChart3, title: "Real-time dashboards and reports", desc: "Business intelligence at your fingertips with live operational insight." },
  { icon: GitBranch, title: "Multi-branch and multi-location operations", desc: "Centralized control for distributed teams, plants, warehouses, and branches." },
  { icon: ShieldCheck, title: "GST compliance", desc: "Automated and compliant workflows aligned to Indian tax requirements." },
  { icon: Bell, title: "Transaction email and SMS alerts", desc: "Instant notifications for all key business transactions." },
  { icon: FileSignature, title: "E-invoicing, e-way bill and e-signature", desc: "Automated digital workflows for legal and compliance needs." },
  { icon: Gauge, title: "GPS tracking and bio-metrics integration", desc: "Track teams and connect biometric attendance data with ERP workflows." },
  { icon: LockKeyhole, title: "Data security and AWS hosting", desc: "Hosted on Amazon with layered security and dependable availability." },
  { icon: Sparkles, title: "Frequent upgrades at no extra cost", desc: "Stay current with new features, improvements, and platform refinements." },
  { icon: Database, title: "150 reports, 400+ transactions, 20+ industries", desc: "Comprehensive coverage for daily business operations and analysis." },
  { icon: PackageCheck, title: "Quickest onboarding for all needs", desc: "A complete ERP solution covering core business functions quickly." },
  { icon: FileText, title: "Digital document management", desc: "Manage, store, and track organizational documents digitally." },
  { icon: Users, title: "Hierarchy level approvals", desc: "Approval flows that follow your organization structure and workflow rules." },
];

const leaders = [
  { name: "Mr. Saravanan KB", role: "CEO", initials: "SK" },
  { name: "Ms. Prathina", role: "CFO", initials: "MP" },
  { name: "Mr. Gowtham", role: "CTO", initials: "MG" },
  { name: "Mr. Gnanaprakash", role: "COO", initials: "MG" },
];

const products = [
  { label: "Core 1", desc: "CRM/Sales, Purchase, Inventory, QC, Sub-Contracting, Simple Production" },
  { label: "Core 2", desc: "CRM/Sales, Purchase, Inventory, QC, Sub-Contracting, Production Planning and Control" },
  { label: "Trade", desc: "CRM/Sales, Purchase, Inventory, QC" },
  { label: "Portals", desc: "Service Portal, Vendor Portal, DMS Portal" },
  { label: "Mobile App", desc: "Director, Sales, Service, Shop Floor Mobile App" },
  { label: "Add-on Modules", desc: "Accounting, HR, Service Management, Project Management, Plant Maintenance, Asset Management, Business Intelligence Dashboards" },
];

const presence = ["Pune", "Coimbatore", "Chennai", "Bangalore"];

export default function AboutUs() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { byType } = usePageSections("home");
  const footerContent = byType("footer") as unknown as FooterContent;

  useDocumentMeta(
    "About Us | KonnectERP",
    "Learn about Konnect Analytics, the company behind KonnectERP cloud ERP for Indian enterprises, manufacturers, traders, and distributors."
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
            { label: "About Us" },
          ]}
          eyebrow="Our Company"
          title="Built for Indian business."
          highlight="Proven by ERP experts."
          subhead="Konnect Analytics brings cloud ERP, business intelligence, and consulting depth together for growing enterprises."
          description="Founded in 2014, our 50+ member team combines 200+ years of collective ERP experience to help Indian businesses simplify operations, compliance, finance, sales, inventory, HR, and reporting."
          primaryButtonText="Talk to Us"
          onPrimaryClick={chrome.openDemo}
        />

        <section className="bg-white py-20">
          <div className="container mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative min-h-[420px]">
              <img src="/images/hero-meeting.jpg" alt="KonnectERP team planning implementation" className="absolute left-0 top-0 h-[330px] w-[78%] rounded-lg object-cover grayscale" />
              <div className="absolute bottom-0 right-0 w-[72%] rounded-lg border-4 border-white bg-[#F97316] p-8 shadow-2xl">
                <img src="/images/konnect-logo.png" alt="KonnectERP" className="mx-auto h-14 w-auto brightness-0 invert" />
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-white">
                  <Stat value="2014" label="Founded" />
                  <Stat value="50+" label="Team" />
                  <Stat value="200+" label="Years exp." />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">About Us</p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#0B1F4A] md:text-5xl">
                Cloud ERP shaped by real implementation work.
              </h2>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Konnect Analytics (KA) serves clients across India with business intelligence, enterprise resource planning, and consulting solutions. We are a pioneer in delivering next-generation enterprise solutions on cloud.
                </p>
                <p>
                  KonnectERP is purpose-built for Indian enterprises to manage core business functions with simplicity, compliance, and control. It simplifies complex operations with practical, scalable tools for finance, inventory, sales, HR, GST, and other statutory needs.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <ValueBlock title="Mission" text="To make every service of the organization work with accuracy, speed, and transparency so management can take timely decisions for productivity and growth." />
                <ValueBlock title="Vision" text="To deliver exceptional enterprise solutions of global standards through continuous innovation and user-friendly design." />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">Platform Strength</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] md:text-5xl">User and role based access control</h2>
            </div>
            <div className="grid gap-x-12 gap-y-5 lg:grid-cols-2">
              {strengths.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (index % 2) * 0.06 }}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-500">{item.desc}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">People</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1F4A] md:text-5xl">Our Leadership Team</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader) => (
                <div key={leader.name} className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-orange-500 bg-gradient-to-br from-slate-900 to-slate-600 text-2xl font-black text-white">
                    {leader.initials}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{leader.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-500">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#4B515C] py-20 text-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">What We Build</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Our Products</h2>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-white/10 bg-black lg:grid-cols-[1fr_0.92fr]">
              <div className="space-y-6 bg-gradient-to-br from-zinc-950 to-zinc-900 p-8 md:p-10">
                {products.map((product) => (
                  <div key={product.label}>
                    <h3 className="text-sm font-bold text-white">{product.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-orange-400">{product.desc}</p>
                  </div>
                ))}
              </div>
              <div className="relative min-h-[360px] bg-black p-8 md:p-10">
                <div className="absolute inset-0 opacity-30">
                  <img src="/images/globe-wireframe.svg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <Cloud className="mb-5 h-10 w-10 text-orange-400" />
                    <h3 className="max-w-md text-3xl font-bold leading-tight">Cloud ERP with modular depth for every growth stage.</h3>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                      Start with core ERP, then add portals, mobile apps, dashboards, and specialist modules as your operations mature.
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
      </main>

      <FooterSection content={footerContent} />
      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} />
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
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
