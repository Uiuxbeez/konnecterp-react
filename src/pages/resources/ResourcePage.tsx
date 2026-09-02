import { useParams } from 'wouter';
import { usePageSections, type PageSection } from '@/lib/usePageSections';
import type { SectionType } from '@shared/sections';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SiteHeader } from '@/components/site/SiteHeader';
import { PageHero } from '@/components/site/PageHero';
import { FooterSection, type FooterContent } from '@/sections/FooterSection';
import { ScrollToTopButton } from '@/components/site/ScrollToTopButton';
import { DemoModal } from '@/components/site/DemoModal';
import { VideoModal } from '@/components/site/VideoModal';
import { PageLoadingState } from '@/components/site/PageLoadingState';
import { AgileCycle, type AgileCycleContent } from '@/resource-sections/AgileCycle';
import { MethodologyStages, type MethodologyStagesContent } from '@/resource-sections/MethodologyStages';
import { MethodologyPackages, type MethodologyPackagesContent } from '@/resource-sections/MethodologyPackages';
import { BrochureFeatures, type BrochureFeaturesContent } from '@/resource-sections/BrochureFeatures';
import { BrochureCta, type BrochureCtaContent } from '@/resource-sections/BrochureCta';
import type { SectionCtx } from '@/sections/shared';
import NotFound from '@/pages/not-found';

interface ResourceHeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
  subhead: string;
  description: string;
  primaryButtonText: string;
  heroImage?: string;
  heroImageCropX?: number;
  heroImageCropY?: number;
}

function renderResourceSection(section: PageSection, ctx: SectionCtx, byType: (t: SectionType) => Record<string, unknown>) {
  switch (section.type) {
    case 'methodology_cycle':
      return <AgileCycle key={section.id} content={byType('methodology_cycle') as unknown as AgileCycleContent} ctx={ctx} />;
    case 'methodology_stages':
      return <MethodologyStages key={section.id} content={byType('methodology_stages') as unknown as MethodologyStagesContent} ctx={ctx} />;
    case 'methodology_packages':
      return <MethodologyPackages key={section.id} content={byType('methodology_packages') as unknown as MethodologyPackagesContent} ctx={ctx} />;
    case 'brochure_features':
      return <BrochureFeatures key={section.id} content={byType('brochure_features') as unknown as BrochureFeaturesContent} ctx={ctx} />;
    case 'brochure_cta':
      return <BrochureCta key={section.id} content={byType('brochure_cta') as unknown as BrochureCtaContent} ctx={ctx} />;
    default:
      return null;
  }
}

export default function ResourcePage() {
  const { slug } = useParams<{ slug: string }>();
  const chrome = useSiteChrome();
  const { isDarkMode, openDemo } = chrome;

  const { sections, page, notFound, byType, loading } = usePageSections(slug ?? '');
  const { byType: byHomeType } = usePageSections('home');
  const footerContent = byHomeType('footer') as unknown as FooterContent;

  const heroContent = byType('product_hero') as unknown as ResourceHeroContent;
  const pageTitle = page?.title ?? heroContent.highlight ?? slug;

  useDocumentMeta(page?.metaTitle || `${pageTitle} | KonnectERP`, page?.metaDescription || heroContent.description);

  const sectionCtx: SectionCtx = { isDarkMode, openDemo, openForm: chrome.openForm, openVideo: chrome.openVideo };
  const bodySections = sections.filter((s) => s.type !== 'product_hero');

  if (notFound) {
    return <NotFound />;
  }

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
        overDarkBackground
      />

      {loading ? (
        <PageLoadingState />
      ) : (
        <>
          <PageHero
            breadcrumb={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/#resources' },
              { label: pageTitle },
            ]}
            eyebrow={heroContent.eyebrow}
            title={heroContent.title}
            highlight={heroContent.highlight}
            subhead={heroContent.subhead}
            description={heroContent.description}
            primaryButtonText={heroContent.primaryButtonText}
            heroImage={heroContent.heroImage}
            heroImageCropX={heroContent.heroImageCropX}
            heroImageCropY={heroContent.heroImageCropY}
            onPrimaryClick={openDemo}
          />

          {bodySections.map((section) => renderResourceSection(section, sectionCtx, byType))}
        </>
      )}

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
