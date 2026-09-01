import { db } from "../db/client";
import { pages, sections } from "../db/schema";
import { eq } from "drizzle-orm";
import { PAGE_TEMPLATES } from "../../shared/templates";
import { SECTION_DEFS_BY_TYPE, type SectionType } from "../../shared/sections";

export class UnknownTemplateError extends Error {}

type SectionContentOverrides = Partial<Record<SectionType, Record<string, unknown>>>;

export async function createPageFromTemplate(opts: {
  slug: string;
  title: string;
  template: string;
  sectionContent?: SectionContentOverrides;
}) {
  const def = PAGE_TEMPLATES[opts.template];
  if (!def) throw new UnknownTemplateError(`Unknown template "${opts.template}"`);

  const [page] = await db.insert(pages).values({ slug: opts.slug, title: opts.title, template: opts.template }).returning();

  const rows = def.sectionTypes.map((type: SectionType, i: number) => {
    const meta = SECTION_DEFS_BY_TYPE[type];
    return {
      pageId: page.id,
      type,
      name: meta.name,
      position: i,
      enabled: true,
      content: { ...meta.defaultContent, ...(opts.sectionContent?.[type] ?? {}) },
      publishedContent: { ...meta.defaultContent, ...(opts.sectionContent?.[type] ?? {}) },
    };
  });
  if (rows.length > 0) await db.insert(sections).values(rows);

  return page;
}

const CORE_BUILDER_PAGES: Array<{
  slug: string;
  title: string;
  template: string;
  sectionContent?: SectionContentOverrides;
}> = [
  {
    slug: "about-us",
    title: "About Us",
    template: "about",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "About Us",
        eyebrow: "Our Company",
        title: "Built for Indian business.",
        highlight: "Proven by ERP experts.",
        subhead: "Konnect Analytics brings cloud ERP, business intelligence, and consulting depth together for growing enterprises.",
        description:
          "Founded in 2014, our 50+ member team combines 200+ years of collective ERP experience to help Indian businesses simplify operations, compliance, finance, sales, inventory, HR, and reporting.",
        primaryButtonText: "Talk to Us",
        primaryButtonVisible: true,
        primaryButtonAction: "demo_modal",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "contact",
    title: "Contact Us",
    template: "contact",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Contact",
        eyebrow: "Contact",
        title: "Let's talk.",
        highlight: "We're all ears.",
        subhead: "Whether you have a question, a product idea, or want to see KonnectERP in action, our team is ready.",
        description:
          "Reach our Coimbatore office, connect with regional teams, or request a guided conversation about the right ERP setup for your business.",
        primaryButtonText: "Request Demo",
        primaryButtonVisible: true,
        primaryButtonAction: "demo_modal",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "career",
    title: "Career",
    template: "career",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Careers",
        eyebrow: "Careers",
        title: "Build meaningful ERP.",
        highlight: "Grow with Konnect.",
        subhead: "Join a product and consulting team solving real business operations for Indian enterprises.",
        description:
          "We are looking for people who like practical systems, customer clarity, and steady execution across ERP, support, marketing, sales, and business analysis.",
        primaryButtonText: "Explore Roles",
        primaryButtonVisible: true,
        primaryButtonAction: "link",
        primaryButtonHref: "#open-roles",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    template: "case_studies",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Case Studies",
        eyebrow: "Customer Stories",
        title: "Case Studies",
        highlight: "Real ERP Results",
        subhead: "Explore client stories, logos, and downloadable case study documents.",
        description:
          "See how KonnectERP helps businesses connect teams, simplify operations, and make decisions with real-time data.",
        primaryButtonText: "Explore Case Studies",
        primaryButtonVisible: true,
        primaryButtonAction: "link",
        primaryButtonHref: "#case-studies-list",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "clients",
    title: "Clients",
    template: "clients",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Clients",
        eyebrow: "Our Clients",
        title: "Trusted by",
        highlight: "Businesses Across India",
        subhead: "A growing network of companies use KonnectERP to simplify operations and gain real-time control.",
        description:
          "Explore a dynamic client logo grid managed from the Page Builder. Add new client logos anytime and present them as clean cards instead of a scrolling strip.",
        primaryButtonText: "Request Demo",
        primaryButtonVisible: true,
        primaryButtonAction: "demo_modal",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    template: "testimonials",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Testimonials",
        eyebrow: "Client Testimonials",
        title: "Testimonials",
        highlight: "Real Customer Voices",
        subhead: "Read what KonnectERP users say about saving time and simplifying everyday operations.",
        description:
          "Customer feedback from businesses using KonnectERP for purchase orders, sales quotes, invoicing, data search, and operational control.",
        primaryButtonText: "View Testimonials",
        primaryButtonVisible: true,
        primaryButtonAction: "link",
        primaryButtonHref: "#testimonial-cards",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "faq",
    title: "FAQ",
    template: "faq",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "FAQ",
        eyebrow: "Help Center",
        title: "Frequently Asked",
        highlight: "Questions",
        subhead: "Find quick answers about KonnectERP features, implementation, support, and demos.",
        description:
          "Browse common questions from businesses evaluating or implementing KonnectERP.",
        primaryButtonText: "Request Demo",
        primaryButtonVisible: true,
        primaryButtonAction: "demo_modal",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
    },
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    template: "plain_content",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Privacy Policy",
        eyebrow: "Legal",
        title: "Privacy Policy",
        highlight: "KonnectERP",
        subhead: "Add your company privacy policy and data usage details in one editable page.",
        description:
          "Use the page body editor below to paste the full policy content and format it with headings, paragraphs, links, and lists.",
        primaryButtonText: "",
        primaryButtonVisible: false,
        primaryButtonAction: "link",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
      plain_rich_content: {
        body:
          "<h2>Privacy Policy</h2><p>Paste your full privacy policy content here. Use the editor toolbar to format headings, paragraphs, links, and lists.</p><h3>Information We Collect</h3><ul><li>Add the information types collected by the business.</li><li>Add how the information is used and protected.</li></ul><h3>Contact</h3><p>Add the contact details for privacy questions.</p>",
      },
    },
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    template: "plain_content",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Terms and Conditions",
        eyebrow: "Legal",
        title: "Terms and Conditions",
        highlight: "KonnectERP",
        subhead: "Add your website, product, or service terms in one editable page.",
        description:
          "Use the page body editor below to paste the full terms content and format it with headings, paragraphs, links, and lists.",
        primaryButtonText: "",
        primaryButtonVisible: false,
        primaryButtonAction: "link",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
      plain_rich_content: {
        body:
          "<h2>Terms and Conditions</h2><p>Paste your full terms and conditions content here. Use the editor toolbar to format headings, paragraphs, links, and lists.</p><h3>Use of Website</h3><ul><li>Add acceptable use terms here.</li><li>Add limitations, obligations, or service terms here.</li></ul><h3>Contact</h3><p>Add the contact details for terms-related questions.</p>",
      },
    },
  },
  {
    slug: "implementation-methodology",
    title: "Implementation Methodology",
    template: "methodology",
    sectionContent: {
      product_hero: {
        breadcrumbLabel: "Implementation Methodology",
        eyebrow: "Implementation Methodology",
        title: "Faster ERP Implementation.",
        highlight: "Clearer Adoption. Better Results.",
        subhead: "Konnect ERP follows a structured implementation methodology supported by Konnect One, our implementation support app.",
        description:
          "From project kickoff to go-live and post-implementation support, every milestone, requirement, task, and update stays visible and coordinated.",
        primaryButtonText: "Implement with Confidence",
        primaryButtonVisible: true,
        primaryButtonAction: "demo_modal",
        primaryButtonHref: "",
        secondaryButtonText: "",
        secondaryButtonVisible: false,
      },
      methodology_cycle: {
        eyebrow: "Powered by Konnect One",
        title: "Implementation",
        highlight: "Visibility",
        description:
          "Konnect One provides implementation visibility throughout the ERP journey. Every milestone, requirement, task, and update stays visible and coordinated.",
        centerLabel: "Konnect One",
        steps: [
          { icon: "ClipboardList", title: "Track Milestones", description: "Track implementation milestones, pending requirements, and project progress in one place." },
          { icon: "Users", title: "Assign Responsibilities", description: "Assign coordinators, responsibilities, and ownership so every team knows the next action." },
          { icon: "Activity", title: "Monitor Adoption", description: "Monitor user activity, adoption, licenses, subscriptions, and post-go-live activities." },
          { icon: "MessageCircle", title: "Centralize Communication", description: "Centralize client-Konnect communication from kickoff through go-live and support." },
        ],
      },
      methodology_stages: {
        eyebrow: "Our Implementation Process",
        title: "Our Implementation",
        highlight: "Process",
        description: "Konnect ERP follows a structured implementation methodology supported by Konnect One, our implementation support app.",
        stages: [
          { icon: "Server", title: "Account Setup", items: ["Set up your ERP environment and implementation requirements."] },
          { icon: "Rocket", title: "Project Kick-Off", items: ["Align teams, timelines, responsibilities, and implementation goals."] },
          { icon: "Network", title: "Business Process Mapping", items: ["Understand and map your business workflows for the ERP."] },
          { icon: "Settings", title: "System Setup & Configuration", items: ["Configure the system based on approved processes and requirements."] },
          { icon: "GraduationCap", title: "Key User Training", items: ["Train key users for effective system adoption."] },
          { icon: "ClipboardCheck", title: "User Acceptance Testing", items: ["Validate processes, reports, print formats, and workflows before go-live."] },
          { icon: "CheckCircle2", title: "Go-Live & Hypercare", items: ["Launch the system with dedicated support for a smooth transition."] },
        ],
      },
      methodology_packages: {
        eyebrow: "Business Impact",
        title: "From Implementation",
        highlight: "to Adoption",
        description: "Plan -> Prepare -> Assign -> Track -> Go-Live. Konnect One helps teams stay aligned, informed, and ready at every stage of ERP implementation.",
        buttonText: "Implement with Confidence",
        buttonVisible: true,
        buttonAction: "demo_modal",
        buttonHref: "",
        packages: [
          { icon: "Zap", text: "Faster Adoption" },
          { icon: "Eye", text: "Greater Transparency" },
          { icon: "Rocket", text: "Smoother Go-Live" },
          { icon: "Headphones", text: "Continuous Support" },
        ],
      },
    },
  },
];

async function seedSectionsForPage(pageId: number, template: string, sectionContent?: SectionContentOverrides) {
  const def = PAGE_TEMPLATES[template];
  if (!def) throw new UnknownTemplateError(`Unknown template "${template}"`);

  const rows = def.sectionTypes.map((type: SectionType, i: number) => {
    const meta = SECTION_DEFS_BY_TYPE[type];
    const content = { ...meta.defaultContent, ...(sectionContent?.[type] ?? {}) };
    return {
      pageId,
      type,
      name: meta.name,
      position: i,
      enabled: true,
      content,
      publishedContent: content,
    };
  });

  await db.delete(sections).where(eq(sections.pageId, pageId));
  if (rows.length > 0) await db.insert(sections).values(rows);
}

export async function ensureCoreBuilderPages() {
  for (const corePage of CORE_BUILDER_PAGES) {
    const [existing] = await db.select().from(pages).where(eq(pages.slug, corePage.slug));
    if (!existing) {
      await createPageFromTemplate(corePage);
      continue;
    }

    const rows = await db.select().from(sections).where(eq(sections.pageId, existing.id));
    const expectedTypes = PAGE_TEMPLATES[corePage.template]?.sectionTypes ?? [];
    const currentTypes = rows.map((row) => row.type);
    const hasStaleTestimonialsHero =
      corePage.slug === "testimonials" &&
      rows.some((row) => {
        if (row.type !== "product_hero" || typeof row.content !== "object" || row.content === null || Array.isArray(row.content)) {
          return false;
        }

        const content = row.content as Record<string, unknown>;
        return content.title === "ERP Software Built for" || content.eyebrow === "01 · ERP for SMEs";
      });
    const hasStaleMethodologyContent =
      corePage.slug === "implementation-methodology" &&
      rows.some((row) => {
        if (!["product_hero", "methodology_cycle", "methodology_stages", "methodology_packages"].includes(row.type)) {
          return false;
        }
        if (typeof row.content !== "object" || row.content === null || Array.isArray(row.content)) {
          return false;
        }

        const content = row.content as Record<string, unknown>;
        return (
          content.title === "Agile Development" ||
          content.centerLabel === "Agile Methodology" ||
          content.highlight === "Packages" ||
          content.title === "Konnect ERP"
        );
      });
    const needsRepair =
      existing.template !== corePage.template ||
      expectedTypes.some((type) => !currentTypes.includes(type)) ||
      hasStaleTestimonialsHero ||
      hasStaleMethodologyContent;

    if (!needsRepair) continue;

    await db
      .update(pages)
      .set({ title: corePage.title, template: corePage.template, updatedAt: new Date() })
      .where(eq(pages.id, existing.id));
    await seedSectionsForPage(existing.id, corePage.template, corePage.sectionContent);
  }
}
