import { motion } from "framer-motion";
import { ArrowRight, CircleHelp, ExternalLink, Facebook, Headphones, Instagram, Linkedin, Mail, MessageCircle, PackageSearch, Phone, Twitter } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { DemoModal } from "@/components/site/DemoModal";
import { VideoModal } from "@/components/site/VideoModal";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { FooterSection, type FooterContent } from "@/sections/FooterSection";
import { usePageSections } from "@/lib/usePageSections";
import { useSiteChrome } from "@/hooks/useSiteChrome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const branches = [
  { city: "Chennai", phones: ["+91 9080601291", "+91 7303336060"] },
  { city: "Bengaluru", phones: ["+91 9585511152", "+91 7303336060"] },
  { city: "Nashik", phones: ["+91 9345955482", "+91 7303336060"] },
  { city: "Mumbai", phones: ["+91 9345955482", "+91 7303336060"] },
];

const socialLinks = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "WhatsApp", icon: MessageCircle, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function ContactUs() {
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;
  const { byType } = usePageSections("home");
  const footerContent = byType("footer") as unknown as FooterContent;

  useDocumentMeta(
    "Contact Us | KonnectERP",
    "Contact Konnect Analytics for ERP demos, product support, implementation discussions, and office details across India."
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
            { label: "Contact" },
          ]}
          eyebrow="Contact"
          title="Let's talk."
          highlight="We're all ears."
          subhead="Whether you have a question, a product idea, or want to see KonnectERP in action, our team is ready."
          description="Reach our Coimbatore office, connect with regional teams, or request a guided conversation about the right ERP setup for your business."
          primaryButtonText="Request Demo"
          onPrimaryClick={chrome.openDemo}
        />

        <section className="relative overflow-hidden bg-white py-20">
          <div className="absolute inset-0 pointer-events-none opacity-55">
            <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [transform:perspective(700px)_rotateX(64deg)] [transform-origin:top]" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [transform:perspective(700px)_rotateX(-64deg)] [transform-origin:bottom]" />
          </div>

          <div className="container relative z-10 mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <span className="rounded-full bg-[#0B1220] px-3 py-1 text-white">Contact</span>
                Answers, simplified
                <ArrowRight className="h-3.5 w-3.5" />
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#0B1F4A] md:text-5xl">
                Let's Talk.
                <br />
                We're All Ears.
              </h2>
              <p className="mb-6 max-w-md text-base leading-7 text-slate-600">
                Whether you have a burning question, a big idea, or just want to say hi, we are ready.
              </p>

              <div className="space-y-4 text-sm leading-6 text-slate-700">
                <div>
                  <p className="font-bold text-slate-900">Konnect Analytics India Pvt Ltd</p>
                  <p>No. 37, Ground Floor,</p>
                  <p>PRIKOS TOWERS, Palanisamy Colony,</p>
                  <p>Kalapatti Main Road, Indira Nagar,</p>
                  <p>Civil Aerodrome Post, Coimbatore, Tamil Nadu - 641014</p>
                </div>
                <p><strong>Landmark:</strong> Near Zone Connect</p>
                <div>
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> sales@konnectbi.com</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> +91 9843111651, +91 7303336060</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-400 text-[#0B1F4A] transition-colors hover:bg-orange-500 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {branches.map((branch) => (
                  <div key={branch.city}>
                    <h3 className="mb-3 text-lg font-bold text-[#0B1F4A]">{branch.city}</h3>
                    {branch.phones.map((phone) => (
                      <p key={phone} className="text-sm leading-6 text-slate-500">{phone}</p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}>
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                <iframe
                  title="Konnect Analytics India Pvt Ltd map"
                  src="https://www.google.com/maps?q=Konnect%20Analytics%20India%20Pvt%20Ltd%20Coimbatore&output=embed"
                  className="h-[460px] w-full md:h-[640px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white pb-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative overflow-hidden rounded-2xl bg-[#0B1730] px-6 py-16 text-center text-white md:px-12 md:py-20">
              <img src="/images/hero-meeting.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1734]/95 via-[#14284D]/90 to-[#071021]/95" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.16),transparent_42%)]" />

              <div className="relative z-10">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">Need clarity?</p>
                <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                  Still wondering about <span className="text-[#F97316]">something?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
                  Check our FAQs or talk to our support team directly. We are here for you.
                </p>

                <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
                  {[
                    { icon: CircleHelp, label: "FAQs" },
                    { icon: Headphones, label: "Support Team" },
                    { icon: PackageSearch, label: "Products" },
                  ].map((item) => (
                    <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
                      <item.icon className="h-4 w-4 text-orange-400" />
                      {item.label}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <a href="/#resources" className="inline-flex h-12 items-center justify-center rounded-md bg-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-950/30">
                    Check Our FAQs
                  </a>
                  <a href="/#products" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 text-sm font-bold text-white hover:bg-white/15">
                    Visit Our Products <ExternalLink className="h-4 w-4" />
                  </a>
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
