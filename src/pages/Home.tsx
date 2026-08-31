import { usePageSections } from '@/lib/usePageSections';
import type { SectionCtx } from '@/sections/shared';
import { Hero, type HeroContent } from '@/sections/Hero';
import { Statistics, type StatisticsContent } from '@/sections/Statistics';
import { BuiltDifferent, type BuiltDifferentContent } from '@/sections/BuiltDifferent';
import { TrustedCompanies, type TrustedCompaniesContent } from '@/sections/TrustedCompanies';
import { IndustrySolutions, type IndustrySolutionsContent } from '@/sections/IndustrySolutions';
import { GstCompliance, type GstComplianceContent } from '@/sections/GstCompliance';
import { WhyChooseUs, type WhyChooseUsContent } from '@/sections/WhyChooseUs';
import { CustomerStories, type CustomerStoriesContent } from '@/sections/CustomerStories';
import { ContactSection, type ContactContent } from '@/sections/ContactSection';
import { FooterSection, type FooterContent } from '@/sections/FooterSection';
import type { PageSection } from '@/lib/usePageSections';
import type { SectionType } from '@shared/sections';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SiteHeader } from '@/components/site/SiteHeader';
import { DemoModal } from '@/components/site/DemoModal';
import { VideoModal } from '@/components/site/VideoModal';
import { ScrollToTopButton } from '@/components/site/ScrollToTopButton';

function renderManagedSection(section: PageSection, ctx: SectionCtx, byType: (t: SectionType) => Record<string, unknown>) {
  switch (section.type) {
    case 'hero':
      return <Hero key={section.id} content={byType('hero') as unknown as HeroContent} ctx={ctx} />;
    case 'statistics':
      return <Statistics key={section.id} content={byType('statistics') as unknown as StatisticsContent} ctx={ctx} />;
    case 'built_different':
      return <BuiltDifferent key={section.id} content={byType('built_different') as unknown as BuiltDifferentContent} isDarkMode={ctx.isDarkMode} />;
    case 'trusted_companies':
      return <TrustedCompanies key={section.id} content={byType('trusted_companies') as unknown as TrustedCompaniesContent} ctx={ctx} />;
    case 'industry_solutions':
      return <IndustrySolutions key={section.id} content={byType('industry_solutions') as unknown as IndustrySolutionsContent} ctx={ctx} />;
    case 'gst_compliance':
      return <GstCompliance key={section.id} content={byType('gst_compliance') as unknown as GstComplianceContent} ctx={ctx} />;
    case 'why_choose_us':
      return <WhyChooseUs key={section.id} content={byType('why_choose_us') as unknown as WhyChooseUsContent} ctx={ctx} />;
    case 'customer_stories':
      return <CustomerStories key={section.id} content={byType('customer_stories') as unknown as CustomerStoriesContent} ctx={ctx} />;
    case 'contact':
      return <ContactSection key={section.id} content={byType('contact') as unknown as ContactContent} ctx={ctx} />;
    default:
      return null;
  }
}

export default function Home() {
  const chrome = useSiteChrome();
  const { isDarkMode, openDemo, openForm, openVideo } = chrome;

  const { sections, page, byType } = usePageSections('home');
  const heroContent = byType('hero') as unknown as HeroContent;
  const homeTitle = [heroContent.title, heroContent.highlight].filter(Boolean).join(' ');
  useDocumentMeta(page?.metaTitle || (homeTitle ? `${homeTitle} | KonnectERP` : undefined), page?.metaDescription || heroContent.description);

  const sectionCtx: SectionCtx = { isDarkMode, openDemo, openForm, openVideo };
  const bodySections = sections.filter((s) => s.type !== 'footer');
  const footerContent = byType('footer') as unknown as FooterContent;

  return (
    <div className={`min-h-screen bg-background font-sans overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
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
      />

      {bodySections.map((section) => renderManagedSection(section, sectionCtx, byType))}

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
