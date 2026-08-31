import { useParams } from 'wouter';
import { usePageSections, type PageSection } from '@/lib/usePageSections';
import type { SectionType } from '@shared/sections';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SiteHeader } from '@/components/site/SiteHeader';
import { FooterSection, type FooterContent } from '@/sections/FooterSection';
import { ScrollToTopButton } from '@/components/site/ScrollToTopButton';
import { DemoModal } from '@/components/site/DemoModal';
import { VideoModal } from '@/components/site/VideoModal';
import { IndustryHero, type IndustryHeroContent } from '@/industry-sections/IndustryHero';
import { IndustryFlow, type IndustryFlowContent } from '@/industry-sections/IndustryFlow';
import { IndustryChallengesBenefits, type IndustryChallengesBenefitsContent } from '@/industry-sections/IndustryChallengesBenefits';
import { ProductCta, type ProductCtaContent } from '@/product-sections/ProductCta';
import type { SectionCtx } from '@/sections/shared';
import { runCmsButtonAction } from '@/lib/cms-button-actions';
import NotFound from '@/pages/not-found';

function renderIndustrySection(section: PageSection, ctx: SectionCtx, byType: (t: SectionType) => Record<string, unknown>) {
  switch (section.type) {
    case 'industry_flow':
      return (
        <div key={section.id} id="flow">
          <IndustryFlow content={byType('industry_flow') as unknown as IndustryFlowContent} ctx={ctx} />
        </div>
      );
    case 'industry_challenges_benefits':
      return (
        <IndustryChallengesBenefits
          key={section.id}
          content={byType('industry_challenges_benefits') as unknown as IndustryChallengesBenefitsContent}
        />
      );
    case 'product_cta':
      return <ProductCta key={section.id} content={byType('product_cta') as unknown as ProductCtaContent} ctx={ctx} />;
    default:
      return null;
  }
}

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;

  const { sections, page, notFound, byType } = usePageSections(slug ?? '');
  const { byType: byHomeType } = usePageSections('home');
  const footerContent = byHomeType('footer') as unknown as FooterContent;

  const heroContent = byType('industry_hero') as unknown as IndustryHeroContent;
  const pageTitle = page?.title ?? heroContent.headingLine1 ?? slug;

  useDocumentMeta(page?.metaTitle || `${pageTitle} | KonnectERP`, page?.metaDescription || heroContent.description);

  const sectionCtx: SectionCtx = { isDarkMode, openDemo: chrome.openDemo, openForm: chrome.openForm, openVideo: chrome.openVideo };
  const bodySections = sections.filter((s) => s.type !== 'industry_hero');

  const scrollToFlow = () => {
    document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handlePrimaryButtonClick = () => {
    runCmsButtonAction(heroContent.primaryButtonAction, heroContent.primaryButtonHref, sectionCtx, 'demo_modal');
  };
  const handleSecondaryButtonClick = () => {
    if (!heroContent.secondaryButtonAction && !heroContent.secondaryButtonHref) {
      scrollToFlow();
      return;
    }

    runCmsButtonAction(heroContent.secondaryButtonAction, heroContent.secondaryButtonHref, sectionCtx, 'link');
  };

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

      <IndustryHero
        content={heroContent}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/#industries' }, { label: pageTitle }]}
        onPrimaryClick={handlePrimaryButtonClick}
        onSecondaryClick={handleSecondaryButtonClick}
      />

      {bodySections.map((section) => renderIndustrySection(section, sectionCtx, byType))}

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} slug={chrome.activeFormSlug} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
