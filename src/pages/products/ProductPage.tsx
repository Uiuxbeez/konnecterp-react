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
import { ProductIntro, type ProductIntroContent } from '@/product-sections/ProductIntro';
import { ProductOperations, type ProductOperationsContent } from '@/product-sections/ProductOperations';
import { ProductOutcomes, type ProductOutcomesContent } from '@/product-sections/ProductOutcomes';
import { ProductAdapt, type ProductAdaptContent } from '@/product-sections/ProductAdapt';
import { ProductIndustries, type ProductIndustriesContent } from '@/product-sections/ProductIndustries';
import { ProductGains, type ProductGainsContent } from '@/product-sections/ProductGains';
import { ProductCta, type ProductCtaContent } from '@/product-sections/ProductCta';
import type { SectionCtx } from '@/sections/shared';
import { isCmsButtonVisible, runCmsButtonAction, type CmsButtonAction } from '@/lib/cms-button-actions';
import NotFound from '@/pages/not-found';

interface ProductHeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
  subhead: string;
  description: string;
  primaryButtonText: string;
  primaryButtonVisible?: boolean;
  primaryButtonAction?: CmsButtonAction;
  primaryButtonHref?: string;
}

function renderProductSection(section: PageSection, ctx: SectionCtx, byType: (t: SectionType) => Record<string, unknown>) {
  switch (section.type) {
    case 'product_intro':
      return <ProductIntro key={section.id} content={byType('product_intro') as unknown as ProductIntroContent} ctx={ctx} />;
    case 'product_operations':
      return <ProductOperations key={section.id} content={byType('product_operations') as unknown as ProductOperationsContent} ctx={ctx} />;
    case 'product_outcomes':
      return <ProductOutcomes key={section.id} content={byType('product_outcomes') as unknown as ProductOutcomesContent} ctx={ctx} />;
    case 'product_adapt':
      return <ProductAdapt key={section.id} content={byType('product_adapt') as unknown as ProductAdaptContent} ctx={ctx} />;
    case 'product_industries':
      return <ProductIndustries key={section.id} content={byType('product_industries') as unknown as ProductIndustriesContent} ctx={ctx} />;
    case 'product_gains':
      return <ProductGains key={section.id} content={byType('product_gains') as unknown as ProductGainsContent} ctx={ctx} />;
    case 'product_cta':
      return <ProductCta key={section.id} content={byType('product_cta') as unknown as ProductCtaContent} ctx={ctx} />;
    default:
      return null;
  }
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const chrome = useSiteChrome();
  const { isDarkMode } = chrome;

  const { sections, page, notFound, byType } = usePageSections(slug ?? '');
  const { byType: byHomeType } = usePageSections('home');
  const footerContent = byHomeType('footer') as unknown as FooterContent;

  const heroContent = byType('product_hero') as unknown as ProductHeroContent;
  const pageTitle = page?.title ?? heroContent.highlight ?? slug;

  useDocumentMeta(`${pageTitle} | KonnectERP`, heroContent.description);

  const sectionCtx: SectionCtx = { isDarkMode, openDemo: chrome.openDemo, openVideo: chrome.openVideo };
  const bodySections = sections.filter((s) => s.type !== 'product_hero');
  const handlePrimaryButtonClick = () => {
    runCmsButtonAction(heroContent.primaryButtonAction, heroContent.primaryButtonHref, sectionCtx, 'demo_modal');
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
        overDarkBackground
      />

      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/#products' },
          { label: pageTitle },
        ]}
        eyebrow={heroContent.eyebrow}
        title={heroContent.title}
        highlight={heroContent.highlight}
        subhead={heroContent.subhead}
        description={heroContent.description}
        primaryButtonText={heroContent.primaryButtonText}
        showPrimaryButton={isCmsButtonVisible(heroContent.primaryButtonVisible)}
        onPrimaryClick={handlePrimaryButtonClick}
      />

      {bodySections.map((section) => renderProductSection(section, sectionCtx, byType))}

      <FooterSection content={footerContent} />

      <ScrollToTopButton show={chrome.showScrollTop} />
      <DemoModal open={chrome.isDemoModalOpen} onClose={() => chrome.setIsDemoModalOpen(false)} />
      <VideoModal open={chrome.isVideoModalOpen} onClose={() => chrome.setIsVideoModalOpen(false)} />
    </div>
  );
}
