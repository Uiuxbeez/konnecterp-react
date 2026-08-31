// Single source of truth for Page Builder section types: default content (used to
// seed the DB and as a fallback if the API is unreachable) and field schemas (used
// to auto-generate the admin edit forms). Shared between the Express seed script
// and the React app (admin + public site).

export type FieldDef =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "image" }
  | { key: string; label: string; type: "file"; accept?: string; buttonText?: string }
  | { key: string; label: string; type: "icon" }
  | { key: string; label: string; type: "number" }
  | { key: string; label: string; type: "boolean"; helpText?: string }
  | { key: string; label: string; type: "select"; options: { label: string; value: string }[]; helpText?: string }
  | { key: string; label: string; type: "list"; itemLabel?: string }
  | { key: string; label: string; type: "repeater"; itemLabel: string; addRemove?: boolean; fields: FieldDef[] };

const BUTTON_ACTION_OPTIONS = [
  { label: "Open demo popup", value: "demo_modal" },
  { label: "Open video popup", value: "video_modal" },
  { label: "Link to page or URL", value: "link" },
];

export const ICON_OPTIONS = [
  "Users", "Building2", "Activity", "BarChart3", "Package", "Factory", "Shield",
  "ShoppingCart", "Layers", "FileText", "Truck", "CreditCard", "Briefcase",
  "TrendingUp", "Handshake", "HardHat", "UserCog", "Eye", "Zap", "Cloud",
  "Server", "Monitor", "Smartphone", "CheckCircle2", "ClipboardList",
  "AlertTriangle", "DollarSign", "Settings", "ShieldCheck", "PackageCheck",
  "ClipboardCheck", "Calculator", "MapPin", "Mail", "Phone", "Headphones", "HelpCircle",
  "Bell", "Fingerprint", "Gauge", "GitBranch", "LockKeyhole", "Sparkles", "Database",
  "FileSignature", "Facebook", "Twitter", "Instagram", "MessageCircle", "Linkedin",
  "PackageSearch", "BriefcaseBusiness", "GraduationCap",
] as const;

export type SectionType =
  | "hero"
  | "statistics"
  | "trusted_companies"
  | "industry_solutions"
  | "gst_compliance"
  | "why_choose_us"
  | "customer_stories"
  | "contact"
  | "footer"
  | "product_hero"
  | "product_intro"
  | "product_operations"
  | "product_outcomes"
  | "product_adapt"
  | "product_industries"
  | "product_gains"
  | "product_cta"
  | "industry_hero"
  | "industry_flow"
  | "industry_challenges_benefits"
  | "methodology_cycle"
  | "methodology_stages"
  | "methodology_packages"
  | "brochure_features"
  | "brochure_cta"
  | "about_company"
  | "about_strengths"
  | "about_leadership"
  | "about_products"
  | "contact_details"
  | "contact_support_cta"
  | "career_roles"
  | "case_studies_grid"
  | "testimonial_collage"
  | "testimonial_cards"
  | "faq_accordion";

export interface SectionMeta {
  type: SectionType;
  name: string;
  fields: FieldDef[];
  defaultContent: Record<string, unknown>;
}

export const SECTION_DEFS: SectionMeta[] = [
  {
    type: "hero",
    name: "Hero Banner",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "primaryButtonVisible", label: "Show Primary Button", type: "boolean" },
      { key: "primaryButtonAction", label: "Primary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "primaryButtonHref", label: "Primary Button Link URL / Page Path", type: "text" },
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
      { key: "secondaryButtonVisible", label: "Show Secondary Button", type: "boolean" },
      { key: "secondaryButtonAction", label: "Secondary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "secondaryButtonHref", label: "Secondary Button Link URL / Page Path", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "checklist", label: "Checklist Items", type: "list", itemLabel: "Item" },
    ],
    defaultContent: {
      badge: "Next-Gen Enterprise Solutions on Cloud",
      title: "One Platform",
      highlight: "Total Operational Control",
      description:
        "Seamlessly connect Procure-to-Pay, Plan-to-Produce, Asset-to-Performance, and Project-to-Profit on a single platform. Konnect ERP delivers end-to-end operational clarity with pre-defined industry templates and native Indian compliance from day one.",
      primaryButtonText: "Schedule Demo",
      primaryButtonVisible: true,
      primaryButtonAction: "demo_modal",
      primaryButtonHref: "",
      secondaryButtonText: "Watch Platform Overview",
      secondaryButtonVisible: true,
      secondaryButtonAction: "video_modal",
      secondaryButtonHref: "",
      backgroundImage: "/images/hero-meeting.jpg",
      checklist: ["Pre-Build Industry Specific ERP", "Faster Deployment", "Transparent Pricing"],
    },
  },
  {
    type: "statistics",
    name: "Statistics",
    fields: [
      {
        key: "stats",
        label: "Stat Cards",
        type: "repeater",
        itemLabel: "Stat",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "value", label: "Value", type: "number" },
          { key: "suffix", label: "Suffix", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "sub", label: "Sub Label", type: "text" },
        ],
      },
    ],
    defaultContent: {
      stats: [
        { icon: "Users", value: 5000, suffix: "+", label: "Active Users", sub: "ACROSS INDIA" },
        { icon: "Building2", value: 20, suffix: "+", label: "Industries Served", sub: "NATIONWIDE COVERAGE" },
        { icon: "Activity", value: 400, suffix: "+", label: "Transactions Built-in", sub: "ZERO-INTEGRATION NEEDED" },
        { icon: "BarChart3", value: 150, suffix: "+", label: "Reports & Dashboards", sub: "REAL-TIME ANALYTICS" },
      ],
    },
  },
  {
    type: "trusted_companies",
    name: "Trusted Companies",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "logos",
        label: "Logos",
        type: "repeater",
        itemLabel: "Logo",
        addRemove: true,
        fields: [
          { key: "src", label: "Image", type: "image" },
          { key: "alt", label: "Alt Text", type: "text" },
        ],
      },
    ],
    defaultContent: {
      heading: "Trusted by growing businesses across multiple industries",
      logos: [
        { src: "/images/brands/brand-1.avif", alt: "Brand logo 1" },
        { src: "/images/brands/brand-2.jpg", alt: "Brand logo 2" },
        { src: "/images/brands/brand-3.png", alt: "Brand logo 3" },
        { src: "/images/brands/brand-4.jpg", alt: "Brand logo 4" },
        { src: "/images/brands/brand-5.png", alt: "Brand logo 5" },
        { src: "/images/brands/brand-6.jpg", alt: "Brand logo 6" },
        { src: "/images/brands/brand-7.png", alt: "Brand logo 7" },
      ],
    },
  },
  {
    type: "industry_solutions",
    name: "Industry Solutions",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "cardButtonVisible", label: "Show Card Arrow Button", type: "boolean" },
      { key: "cardButtonAction", label: "Card Arrow Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "cardButtonHref", label: "Card Arrow Button Link URL / Page Path", type: "text" },
      {
        key: "cards",
        label: "Industry Cards",
        type: "repeater",
        itemLabel: "Industry",
        fields: [
          { key: "tag", label: "Tag", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "metric", label: "Metric", type: "text" },
          { key: "image", label: "Image", type: "image" },
          { key: "icon", label: "Icon", type: "icon" },
          { key: "highlights", label: "Highlights", type: "list", itemLabel: "Highlight" },
        ],
      },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "primaryButtonVisible", label: "Show Primary Button", type: "boolean" },
      { key: "primaryButtonAction", label: "Primary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "primaryButtonHref", label: "Primary Button Link URL / Page Path", type: "text" },
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
      { key: "secondaryButtonVisible", label: "Show Secondary Button", type: "boolean" },
      { key: "secondaryButtonAction", label: "Secondary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "secondaryButtonHref", label: "Secondary Button Link URL / Page Path", type: "text" },
    ],
    defaultContent: {
      eyebrow: "Industry Solutions",
      title: "Flexible Modules",
      highlight: "Unified Control",
      description:
        "Deploy the exact solution your business requires today - from core inventory to full end-to-end production. Every module shares the same real-time data, eliminating workarounds and data silos.",
      cardButtonVisible: true,
      cardButtonAction: "demo_modal",
      cardButtonHref: "",
      primaryButtonText: "Explore More",
      primaryButtonVisible: true,
      primaryButtonAction: "link",
      primaryButtonHref: "/products",
      secondaryButtonText: "Talk to an Expert",
      secondaryButtonVisible: true,
      secondaryButtonAction: "demo_modal",
      secondaryButtonHref: "",
      cards: [
        {
          tag: "Process Manufacturing",
          title: "Scale production without losing control",
          description:
            "Manage BOMs, batch processing, quality control, and cost-of-production in one connected system built for process manufacturers.",
          metric: "Reduced production waste by 34%",
          image: "/images/industry-manufacturing.jpg",
          icon: "Factory",
          gradient: "linear-gradient(135deg, #0f2d6b 0%, #1a4a9e 40%, #0d3580 100%)",
          accentColor: "#60A5FA",
          highlights: ["Batch & Process BOM", "Quality Control", "Costing & Variance", "Multi-Unit Production"],
        },
        {
          tag: "Trading Sector",
          title: "Buy smart, sell faster, grow bigger",
          description:
            "Automate purchase orders, track multi-location stock in real time, and manage customer credit limits — all from a single trading ERP.",
          metric: "Order processing 3× faster",
          image: "/images/industry-trading.jpg",
          icon: "ShoppingCart",
          gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)",
          accentColor: "#34D399",
          highlights: ["Purchase Automation", "Multi-Warehouse Stock", "Credit Limit Control", "Price Lists & Schemes"],
        },
        {
          tag: "Job Work",
          title: "Track every job, bill every minute",
          description:
            "Manage subcontracting, job cards, material in/out, and billing for job work operations with full traceability and zero revenue leakage.",
          metric: "Zero revenue leakage on job orders",
          image: "/images/industry-jobwork.jpg",
          icon: "Briefcase",
          gradient: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)",
          accentColor: "#C4B5FD",
          highlights: ["Job Card Management", "Material Traceability", "Sub-Contractor Billing", "Work-In-Progress Tracking"],
        },
        {
          tag: "Retail & Distribution",
          title: "Sell everywhere, fulfil anywhere",
          description:
            "Connect your retail stores, distributor network, and e-commerce channels. Manage stock, schemes, and settlements from one platform.",
          metric: "Inventory accuracy lifted to 99.8%",
          image: "/images/industry-retail.jpg",
          icon: "Package",
          gradient: "linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 100%)",
          accentColor: "#FCD34D",
          highlights: ["POS & Retail Billing", "Distributor Management", "Scheme & Discount Engine", "E-Commerce Sync"],
        },
        {
          tag: "Construction & Projects",
          title: "Deliver projects on time and on budget",
          description:
            "Track project budgets, contractor bills, material consumption, and milestones in real time — built for construction companies and EPC firms.",
          metric: "Project cost overruns cut by 28%",
          image: "/images/industry-construction.jpg",
          icon: "HardHat",
          gradient: "linear-gradient(135deg, #1c1917 0%, #292524 40%, #44403c 100%)",
          accentColor: "#FCA5A5",
          highlights: ["Project Budgeting", "Contractor Billing", "Site Material Tracking", "Milestone & Progress"],
        },
      ],
    },
  },
  {
    type: "gst_compliance",
    name: "GST & Compliance",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "featuredImage", label: "Featured Image", type: "image" },
      { key: "featuredTitle", label: "Featured Card Title", type: "text" },
      { key: "featuredDescription", label: "Featured Card Description", type: "textarea" },
      { key: "featuredButtonVisible", label: "Show Featured Arrow Button", type: "boolean" },
      { key: "featuredButtonAction", label: "Featured Arrow Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "featuredButtonHref", label: "Featured Arrow Button Link URL / Page Path", type: "text" },
      {
        key: "features",
        label: "Feature Cards",
        type: "repeater",
        itemLabel: "Feature",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "India Compliance, Built In",
      title: "GST, E-Invoice, Payroll.",
      highlight: "All Automated.",
      description:
        "Stop switching between portals. KonnectERP handles every Indian compliance requirement from within your normal workflows — no plugins, no third-party subscriptions, no re-keying.",
      featuredImage: "/images/gst-compliance-person.jpg",
      featuredTitle: "GST Returns & Filing",
      featuredDescription: "Auto-populated GSTR-1, GSTR-3B, and reconciliation reports. No manual data entry.",
      featuredButtonVisible: true,
      featuredButtonAction: "demo_modal",
      featuredButtonHref: "",
      features: [
        { icon: "FileText", title: "E-Invoicing (IRP)", description: "Direct integration with the Invoice Registration Portal. IRN and QR code generation in seconds." },
        { icon: "Truck", title: "E-Way Bill Generation", description: "Auto-generate and cancel E-Way Bills from within dispatch workflows. No portal switching." },
        { icon: "CreditCard", title: "TDS & TCS Compliance", description: "Automatic TDS deduction, challan generation, and 26Q/27Q filing reports." },
        { icon: "Briefcase", title: "PF, ESI & Payroll", description: "India-compliant salary processing with PF, ESI, PT deductions and Form 16 generation." },
        { icon: "Building2", title: "Multi-Company & Branch", description: "Manage multiple entities, branches, and warehouses with consolidated reporting." },
      ],
    },
  },
  {
    type: "why_choose_us",
    name: "Why Choose Us",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "rowButtonVisible", label: "Show Row Arrow Buttons", type: "boolean" },
      { key: "rowButtonAction", label: "Row Arrow Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "rowButtonHref", label: "Row Arrow Button Link URL / Page Path", type: "text" },
      {
        key: "rows",
        label: "Industry Rows",
        type: "repeater",
        itemLabel: "Row",
        fields: [
          { key: "tag", label: "Tag", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
          { key: "bullets", label: "Bullets", type: "list", itemLabel: "Bullet" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Built for your sector",
      title: "Deep Industry Knowledge.",
      highlight: "Not Generic Templates.",
      description: "KonnectERP ships with pre-configured workflows for 20+ Indian industry verticals. Less setup. Faster go-live.",
      rowButtonVisible: true,
      rowButtonAction: "demo_modal",
      rowButtonHref: "",
      rows: [
        {
          tag: "Manufacturing",
          title: "Discrete & Process Manufacturing",
          description:
            "From automotive components to food processing — KonnectERP handles multi-level BOMs, work orders, quality control, and shop-floor tracking. Built for India's factory floors.",
          image: "/images/industry-manufacturing.jpg",
          bullets: ["Automotive Components", "Electrical & Electronics", "Sheet Metal Fabrication", "Food Processing", "Injection Molding", "EV Manufacturers"],
        },
        {
          tag: "Trading",
          title: "Trading & Distribution",
          description:
            "Multi-warehouse inventory, purchase orders, sales orders, and GST-compliant invoicing for super stockists, distributors, and importers/exporters.",
          image: "/images/industry-trading.jpg",
          bullets: ["Consumer Electronics", "Super Stockists", "Wholesale Distribution", "Domestic & Exports"],
        },
        {
          tag: "Job Work",
          title: "Contract & Job Work",
          description: "Track material in/out, sub-contracting, process costing, and challan management. From surface finishing to full contract manufacturing.",
          image: "/images/industry-jobwork.jpg",
          bullets: ["Surface Finishing", "Powder Coating", "Tools & Dies", "Project-Based Manufacturing"],
        },
      ],
    },
  },
  {
    type: "customer_stories",
    name: "Customer Stories",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "stories",
        label: "Stories",
        type: "repeater",
        itemLabel: "Story",
        fields: [
          { key: "company", label: "Company", type: "text" },
          { key: "industry", label: "Industry", type: "text" },
          { key: "challenge", label: "Challenge", type: "textarea" },
          { key: "solution", label: "Solution", type: "textarea" },
          { key: "result", label: "Result Quote", type: "text" },
          { key: "badge", label: "Badge", type: "text" },
        ],
      },
    ],
    defaultContent: {
      title: "Real Result From Real Business.",
      description: "Stop jumping between disconnected tools. KonnectERP brings every department into one unified, intelligent system.",
      stories: [
        { company: "Bharti Manufacturing", industry: "Manufacturing", challenge: "Disconnected systems leading to stockouts.", solution: "Full ERP integration across 3 facilities.", result: '"Reduced operational costs by 28%"', badge: "-28% Costs" },
        { company: "Nexus Retail Chain", industry: "Retail & E-commerce", challenge: "High inventory shrinkage and slow reconciliation.", solution: "Real-time POS and warehouse tracking.", result: '"Inventory accuracy improved to 99.8%"', badge: "99.8% Accuracy" },
        { company: "SwiftDistrib", industry: "Wholesale", challenge: "Manual, paper-based purchase orders.", solution: "Automated procurement and vendor portal.", result: '"Order processing time cut by 60%"', badge: "60% Faster" },
      ],
    },
  },
  {
    type: "contact",
    name: "Contact Section",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "checklist", label: "Checklist Items", type: "list", itemLabel: "Item" },
      { key: "step2Title", label: "Step 2 Title", type: "text" },
      { key: "email", label: "Contact Email", type: "text" },
      { key: "phone", label: "Contact Phone", type: "text" },
      { key: "step3Title", label: "Step 3 Title", type: "text" },
      { key: "step3Description", label: "Step 3 Description", type: "textarea" },
      { key: "formTitle", label: "Form Title", type: "text" },
      { key: "submitButtonText", label: "Submit Button Text", type: "text" },
    ],
    defaultContent: {
      eyebrow: "Why 5,000 Businesses Choose Konnect",
      title: "Ready to See KonnectERP",
      highlight: "Live?",
      description:
        "Book a personalised 30-minute demo with our industry specialists. We'll show you exactly how KonnectERP works for your sector — not a generic product tour.",
      checklist: ["Free 30-minute demo", "Live in weeks, not months", "No credit card required", "100% Confidential"],
      step2Title: "Reach Us Directly",
      email: "sales@konnectbi.com",
      phone: "+91 98431 11651",
      step3Title: "Install, support, optimize",
      step3Description: "White-glove setup with ongoing optimization and support",
      formTitle: "Request Your Free Demo",
      submitButtonText: "Book My Free Demo",
    },
  },
  {
    type: "footer",
    name: "Footer",
    fields: [
      { key: "tagline", label: "Brand Tagline", type: "textarea" },
      { key: "copyright", label: "Copyright Text", type: "text" },
    ],
    defaultContent: {
      tagline: "The intelligent cloud ERP platform that helps ambitious companies scale their operations efficiently.",
      copyright: "© 2026 KonnectERP. All rights reserved.",
    },
  },

  // ── Product template sections (used by /products/:slug pages) ────────────
  {
    type: "product_hero",
    name: "Hero Banner",
    fields: [
      { key: "breadcrumbLabel", label: "Breadcrumb Label", type: "text" },
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "subhead", label: "Subhead", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "primaryButtonVisible", label: "Show Primary Button", type: "boolean" },
      { key: "primaryButtonAction", label: "Primary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "primaryButtonHref", label: "Primary Button Link URL / Page Path", type: "text" },
    ],
    defaultContent: {
      eyebrow: "01 · ERP for SMEs",
      title: "ERP Software Built for",
      highlight: "Growing Businesses",
      subhead: "Simplify Everyday Operations. Gain Control. Grow with Confidence.",
      description:
        "Growing businesses often rely on spreadsheets, disconnected applications, and manual coordination to manage day-to-day operations. As business volume increases, these systems make it harder to control inventory, track orders, monitor production, and understand profitability.",
      primaryButtonText: "Talk to Our ERP Experts",
      primaryButtonVisible: true,
      primaryButtonAction: "demo_modal",
      primaryButtonHref: "",
    },
  },
  {
    type: "product_intro",
    name: "Intro (Dashboard Preview)",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "dashboardUrl", label: "Browser Frame URL", type: "text" },
    ],
    defaultContent: {
      eyebrow: "How It Works",
      title: "One Connected System for Every Operation",
      description:
        "Konnect ERP for SMEs brings these operations into a structured business environment, helping growing companies replace fragmented processes with better visibility, automation, and control.",
      dashboardUrl: "app.konnecterp.com/dashboard",
    },
  },
  {
    type: "product_operations",
    name: "Feature Grid",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "items",
        label: "Feature Cards",
        type: "repeater",
        itemLabel: "Feature",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Built Around Real Operations",
      title: "Designed Around the",
      highlight: "Way SMEs Work",
      description:
        "From customer enquiry to final payment, and from material purchase to production and delivery, Konnect ERP helps connect the activities that keep your business moving.",
      items: [
        { icon: "ShoppingCart", title: "Sales & Customer Operations", description: "Manage enquiries, quotations, orders, dispatch, invoicing, collections, and customer interactions with greater visibility." },
        { icon: "Package", title: "Purchasing & Suppliers", description: "Control purchase requirements, supplier transactions, approvals, receipts, invoices, and material availability." },
        { icon: "Factory", title: "Inventory & Warehousing", description: "Track stock movement, material availability, warehouse transactions, valuation, and inventory requirements." },
        { icon: "BarChart3", title: "Production & Shop Floor", description: "Plan production, manage BOMs and materials, monitor work orders, track WIP, and improve production visibility." },
        { icon: "Users", title: "Finance & Business Control", description: "Connect operational transactions with accounting, receivables, payables, taxation, costing, and financial reporting." },
        { icon: "UserCog", title: "People & Administration", description: "Manage employee information, attendance, leave, payroll, and other essential workforce processes." },
      ],
    },
  },
  {
    type: "product_outcomes",
    name: "Image + Feature Rows",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image", type: "image" },
      {
        key: "items",
        label: "Rows",
        type: "repeater",
        itemLabel: "Row",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      title: "Replace Manual Processes with",
      highlight: "Connected Workflows",
      description: "Konnect ERP helps businesses reduce dependency on spreadsheets and repetitive manual activities.",
      image: "/images/industry-jobwork.jpg",
      items: [
        { icon: "Eye", title: "Better Visibility", description: "Get timely information on sales, purchases, inventory, production, finance, and business performance." },
        { icon: "Zap", title: "Better Productivity", description: "Automate repetitive workflows and reduce time spent coordinating information between departments." },
        { icon: "Shield", title: "Better Control", description: "Bring approvals, transactions, responsibilities, and business data into a structured system." },
        { icon: "TrendingUp", title: "Better Decisions", description: "Use dashboards, reports, and business information to identify issues and act faster." },
      ],
    },
  },
  {
    type: "product_adapt",
    name: "Flexible Deployment",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
      { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
      { key: "cardBadge", label: "Card Badge", type: "text" },
      { key: "cardTitle", label: "Card Title", type: "text" },
      { key: "cardDescription", label: "Card Description", type: "textarea" },
      { key: "cardImage", label: "Card Background Image", type: "image" },
      { key: "ctaText", label: "Card Link Text", type: "text" },
      { key: "ctaVisible", label: "Show Card Link", type: "boolean" },
      { key: "ctaAction", label: "Card Link Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "ctaHref", label: "Card Link URL / Page Path", type: "text" },
      {
        key: "options",
        label: "Deployment Options",
        type: "repeater",
        itemLabel: "Option",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Flexible by Design",
      title: "ERP That Can Adapt as Your Business Changes",
      paragraph1:
        "Every SME operates differently. Konnect ERP supports configurable business processes, reports, print formats, notifications, and workflows so the system can align with your operating requirements.",
      paragraph2:
        "Deploy it in the environment that suits your organization with Cloud or On-Premise options, while providing access to business information through web and mobile interfaces.",
      cardBadge: "Flexible Deployment",
      cardTitle: "Deploy Your Way",
      cardDescription: "Run Konnect ERP however it suits your business — in the cloud, on your own servers, or accessed on the move.",
      cardImage: "/images/hero-meeting.jpg",
      ctaText: "Talk to an Expert",
      ctaVisible: true,
      ctaAction: "demo_modal",
      ctaHref: "",
      options: [
        { icon: "Cloud", label: "Cloud Hosting" },
        { icon: "Server", label: "On-Premise" },
        { icon: "Monitor", label: "Web Access" },
        { icon: "Smartphone", label: "Mobile Access" },
      ],
    },
  },
  {
    type: "product_industries",
    name: "Who It's For (Background Photo)",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "intro", label: "Intro Line", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "items", label: "Industries", type: "list", itemLabel: "Industry" },
    ],
    defaultContent: {
      eyebrow: "Who It's For",
      title: "Built for Businesses That Are Ready to Move Beyond Spreadsheets",
      intro: "Konnect ERP is suitable for growing:",
      backgroundImage: "/images/industry-manufacturing.jpg",
      items: ["Manufacturing companies", "Engineering businesses", "Trading businesses", "Job work companies", "Industrial businesses", "SMEs with multiple operational functions"],
    },
  },
  {
    type: "product_gains",
    name: "Gains Grid",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      {
        key: "items",
        label: "Gain Cards",
        type: "repeater",
        itemLabel: "Gain",
        addRemove: true,
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "The Payoff",
      title: "What Your Business Gains",
      items: [
        { title: "Less Manual Work", description: "Automate routine tasks and cut down time spent on repetitive data entry." },
        { title: "Better Process Visibility", description: "See what's happening across departments in real time, not after the fact." },
        { title: "Improved Inventory Control", description: "Track stock levels, movement, and valuation accurately at all times." },
        { title: "Faster Business Reporting", description: "Generate reports on demand instead of compiling data manually." },
        { title: "Greater Operational Discipline", description: "Standardized workflows and approvals keep every transaction accountable." },
        { title: "Better Cost Control", description: "Understand true costs across production, purchasing, and operations." },
        { title: "Scalable Business Management", description: "Add users, locations, and processes as you grow — without adding chaos." },
      ],
    },
  },
  {
    type: "product_cta",
    name: "Final CTA (Photo Card)",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonVisible", label: "Show Button", type: "boolean" },
      { key: "buttonAction", label: "Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "buttonHref", label: "Button Link URL / Page Path", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    defaultContent: {
      title: "Make Your Next Stage of",
      highlight: "Growth Easier to Manage",
      description: "Move from disconnected processes to a more organized, visible, and scalable way of running your business.",
      buttonText: "Talk to Our ERP Experts",
      buttonVisible: true,
      buttonAction: "demo_modal",
      buttonHref: "",
      backgroundImage: "/images/industry-trading.jpg",
    },
  },

  // ── Industry template sections (used by /industries/:slug pages) ─────────
  {
    type: "industry_hero",
    name: "Hero Banner",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "headingLine1", label: "Heading Line 1", type: "text" },
      { key: "headingLine2Plain", label: "Heading Line 2 — Plain Part", type: "text" },
      { key: "headingLine2Highlight", label: "Heading Line 2 — Highlighted Part", type: "text" },
      { key: "headingLine3Plain", label: "Heading Line 3 — Plain Part", type: "text" },
      { key: "headingLine3Highlight", label: "Heading Line 3 — Highlighted Part", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "primaryButtonVisible", label: "Show Primary Button", type: "boolean" },
      { key: "primaryButtonAction", label: "Primary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "primaryButtonHref", label: "Primary Button Link URL / Page Path", type: "text" },
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
      { key: "secondaryButtonVisible", label: "Show Secondary Button", type: "boolean" },
      { key: "secondaryButtonAction", label: "Secondary Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "secondaryButtonHref", label: "Secondary Button Link URL / Page Path", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    defaultContent: {
      badge: "ERP for Manufacturing Industry",
      headingLine1: "Manufacturing ERP",
      headingLine2Plain: "Engineered for",
      headingLine2Highlight: "Efficiency.",
      headingLine3Plain: "Built for",
      headingLine3Highlight: "Growth.",
      description:
        "Konnect ERP is a manufacturing ERP software designed to manage production planning, procurement, inventory, quality, costing, sales, and finance across make-to-stock, make-to-order, engineer-to-order, job work, and project manufacturing businesses.",
      primaryButtonText: "Request a Demo",
      primaryButtonVisible: true,
      primaryButtonAction: "demo_modal",
      primaryButtonHref: "",
      secondaryButtonText: "Explore Features",
      secondaryButtonVisible: true,
      secondaryButtonAction: "link",
      secondaryButtonHref: "#flow",
      backgroundImage: "/images/industry-manufacturing.jpg",
    },
  },
  {
    type: "industry_flow",
    name: "Process Flow",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "steps",
        label: "Flow Steps",
        type: "repeater",
        itemLabel: "Step",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Business Transactions",
      title: "End-to-End",
      highlight: "Manufacturing Flow",
      description: "Konnect ERP connects every stage of your manufacturing business from procurement to profitability.",
      steps: [
        { icon: "ShoppingCart", title: "Procure-to-Pay", description: "Manage purchasing, suppliers, material requirements, inventory, and vendor transactions." },
        { icon: "FileText", title: "Order-to-Cash", description: "Connect customer orders with production, inventory, dispatch, invoicing, and collections." },
        { icon: "Settings", title: "Plan-to-Produce", description: "Manage MRP, production planning, capacity, work orders, shop floor operations, WIP, and production costing." },
        { icon: "BarChart3", title: "Record-to-Report", description: "Connect manufacturing costs, inventory valuation, finance, reporting, and business analytics." },
      ],
    },
  },
  {
    type: "industry_challenges_benefits",
    name: "Challenges & Benefits",
    fields: [
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "centerIcon", label: "Center Icon", type: "icon" },
      { key: "challengesEyebrow", label: "Challenges Eyebrow", type: "text" },
      { key: "challengesTitle", label: "Challenges Title", type: "text" },
      { key: "challengesDescription", label: "Challenges Description", type: "textarea" },
      {
        key: "challenges",
        label: "Challenges",
        type: "repeater",
        itemLabel: "Challenge",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "text", label: "Text", type: "text" },
        ],
      },
      { key: "benefitsEyebrow", label: "Benefits Eyebrow", type: "text" },
      { key: "benefitsTitle", label: "Benefits Title", type: "text" },
      {
        key: "benefits",
        label: "Benefits",
        type: "repeater",
        itemLabel: "Benefit",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      backgroundImage: "/images/industry-manufacturing.jpg",
      centerIcon: "Factory",
      challengesEyebrow: "Manufacturing Challenges We Solve",
      challengesTitle: "Overcome Manufacturing Roadblocks",
      challengesDescription: "Konnect ERP helps you tackle everyday manufacturing challenges with greater visibility and control.",
      challenges: [
        { icon: "ClipboardList", text: "Production planning delays" },
        { icon: "AlertTriangle", text: "Material shortages and excess inventory" },
        { icon: "Eye", text: "Limited shop floor visibility" },
        { icon: "Activity", text: "WIP tracking gaps" },
        { icon: "Shield", text: "Quality and rejection issues" },
        { icon: "DollarSign", text: "Manufacturing cost control" },
        { icon: "Truck", text: "Delivery delays" },
      ],
      benefitsEyebrow: "Key Business Benefits",
      benefitsTitle: "Drive Efficiency. Increase Profitability.",
      benefits: [
        { icon: "ClipboardCheck", title: "Better production planning", description: "Optimize schedules and resources to improve on-time delivery." },
        { icon: "PackageCheck", title: "Improved material availability", description: "Ensure right materials at the right time to avoid disruptions." },
        { icon: "Eye", title: "Real-time shop floor visibility", description: "Monitor operations in real time for complete transparency." },
        { icon: "ShieldCheck", title: "Stronger quality control", description: "Reduce defects and improve overall product quality." },
        { icon: "Calculator", title: "Accurate production costing", description: "Track actual costs and improve costing accuracy." },
        { icon: "Package", title: "Better inventory control", description: "Reduce inventory holding and improve turnover." },
        { icon: "TrendingUp", title: "Improved operational profitability", description: "Make data-driven decisions and improve profit margins." },
      ],
    },
  },

  // ── Resources template sections (used by /resources/:slug pages) ─────────
  {
    type: "methodology_cycle",
    name: "Agile Cycle (Infographic)",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "centerLabel", label: "Center Hub Label", type: "text" },
      {
        key: "steps",
        label: "Cycle Phases (exactly 4, clockwise from top)",
        type: "repeater",
        itemLabel: "Phase",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "The Agile Cycle",
      title: "Agile Development",
      highlight: "Methodology",
      description: "Konnect ERP is delivered through four repeating phases, refined continuously with your team's feedback.",
      centerLabel: "Agile Methodology",
      steps: [
        { icon: "ClipboardList", title: "Requirement Gathering & Planning", description: "Understand your business processes and define the scope, timeline, and success criteria." },
        { icon: "Monitor", title: "System Walk-Through", description: "Configure and demonstrate the system against your real business scenarios." },
        { icon: "Eye", title: "Training & Review", description: "Train your team and review outcomes against the agreed plan." },
        { icon: "CheckCircle2", title: "Delivery", description: "Go live with a system validated by your own team, ready to scale." },
      ],
    },
  },
  {
    type: "methodology_stages",
    name: "Implementation Stages",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "stages",
        label: "Stages",
        type: "repeater",
        itemLabel: "Stage",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "items", label: "Checklist Items", type: "list", itemLabel: "Item" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Our Process",
      title: "Implementation",
      highlight: "Methodology",
      description: "Every Konnect ERP rollout moves through six structured stages — nothing skipped, nothing left to guesswork.",
      stages: [
        { icon: "ClipboardList", title: "Analyse", items: ["Kick off", "User Identification", "Plan Work Package"] },
        { icon: "Settings", title: "Configure", items: ["Study Scope", "Process Understanding", "Module Notes"] },
        { icon: "FileText", title: "Train", items: ["Cook-Book", "Print Format", "Open Item Tracker"] },
        { icon: "Monitor", title: "Use", items: ["Basic Training", "Live Training", "Master List"] },
        { icon: "Eye", title: "Review", items: ["Live Entry", "GAPS", "New Requirement"] },
        { icon: "CheckCircle2", title: "Conclude", items: ["Close Item Tracker", "Handover to Support", "Reports"] },
      ],
    },
  },
  {
    type: "methodology_packages",
    name: "Packages CTA",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonVisible", label: "Show Button", type: "boolean" },
      { key: "buttonAction", label: "Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "buttonHref", label: "Button Link URL / Page Path", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      {
        key: "packages",
        label: "Package Pills",
        type: "repeater",
        itemLabel: "Package",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "text", label: "Text", type: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Flexible Packages",
      title: "Konnect ERP",
      highlight: "Packages",
      description: "Start with what you need today and add modules as your business grows — every package shares the same connected data.",
      buttonText: "Talk to Our ERP Experts",
      buttonVisible: true,
      buttonAction: "demo_modal",
      buttonHref: "",
      backgroundImage: "/images/industry-manufacturing.jpg",
      packages: [
        { icon: "ShoppingCart", text: "Sales · Purchase · Inventory" },
        { icon: "Factory", text: "Production · Quality · Sub-Contract" },
        { icon: "Users", text: "HR · Accounts · Plant Maintenance" },
        { icon: "Smartphone", text: "Add-Ons — Task Management, Mobile Apps, Portals & More" },
      ],
    },
  },
  {
    type: "brochure_features",
    name: "What's Inside",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "items",
        label: "Feature Cards",
        type: "repeater",
        itemLabel: "Feature",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "What's Inside",
      title: "Everything You Need to",
      highlight: "Evaluate Konnect ERP",
      description: "A complete look at how Konnect ERP fits your operations — from shop floor to the boardroom.",
      items: [
        { icon: "Factory", title: "Module-by-Module Breakdown", description: "Detailed coverage of manufacturing, inventory, sales, HR, and finance modules." },
        { icon: "BarChart3", title: "Real Customer Outcomes", description: "Case studies and metrics from businesses running Konnect ERP today." },
        { icon: "Cloud", title: "Deployment Options", description: "Cloud, on-premise, and hybrid — how each works and what it costs." },
        { icon: "Handshake", title: "Implementation & Support", description: "What onboarding looks like and the support you can expect after go-live." },
      ],
    },
  },
  {
    type: "brochure_cta",
    name: "Brochure Download",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "features", label: "Feature Highlights", type: "list", itemLabel: "Feature" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonVisible", label: "Show Button", type: "boolean" },
      { key: "buttonAction", label: "Button Action", type: "select", options: BUTTON_ACTION_OPTIONS },
      { key: "buttonHref", label: "Button Link URL / Page Path", type: "text" },
      { key: "fileUrl", label: "Brochure File URL (leave blank to open the demo form instead)", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    defaultContent: {
      eyebrow: "Free Download",
      title: "Download Konnect ERP",
      highlight: "Brochure",
      description: "Get a complete overview of Konnect ERP's manufacturing, inventory, and finance capabilities — built for Indian SMEs and enterprises.",
      features: ["Smart Manufacturing", "Smarter supply chain and production planning", "Automated invoice, purchase order & data entry"],
      buttonText: "Click Here to Download",
      buttonVisible: true,
      buttonAction: "link",
      buttonHref: "",
      fileUrl: "",
      backgroundImage: "/images/hero-meeting.jpg",
    },
  },

  // Core root pages: these mirror the existing static About, Contact, and Career content.
  {
    type: "about_company",
    name: "Company Overview",
    fields: [
      { key: "image", label: "Team Image", type: "image" },
      { key: "imageAlt", label: "Image Alt Text", type: "text" },
      {
        key: "stats",
        label: "Orange Stat Cards",
        type: "repeater",
        itemLabel: "Stat",
        fields: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "paragraphs", label: "Paragraphs", type: "list", itemLabel: "Paragraph" },
      {
        key: "values",
        label: "Mission / Vision Cards",
        type: "repeater",
        itemLabel: "Card",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      image: "/images/hero-meeting.jpg",
      imageAlt: "KonnectERP team planning implementation",
      stats: [
        { value: "2014", label: "Founded" },
        { value: "50+", label: "Team" },
        { value: "200+", label: "Years exp." },
      ],
      eyebrow: "About Us",
      title: "Cloud ERP shaped by real implementation work.",
      paragraphs: [
        "Konnect Analytics (KA) serves clients across India with business intelligence, enterprise resource planning, and consulting solutions. We are a pioneer in delivering next-generation enterprise solutions on cloud.",
        "KonnectERP is purpose-built for Indian enterprises to manage core business functions with simplicity, compliance, and control. It simplifies complex operations with practical, scalable tools for finance, inventory, sales, HR, GST, and other statutory needs.",
      ],
      values: [
        { title: "Mission", text: "To make every service of the organization work with accuracy, speed, and transparency so management can take timely decisions for productivity and growth." },
        { title: "Vision", text: "To deliver exceptional enterprise solutions of global standards through continuous innovation and user-friendly design." },
      ],
    },
  },
  {
    type: "about_strengths",
    name: "Platform Strength",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      {
        key: "items",
        label: "Strength Items",
        type: "repeater",
        itemLabel: "Strength",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Platform Strength",
      title: "User and role based access control",
      items: [
        { icon: "Fingerprint", title: "User & role based access control", description: "Granular permissions and hierarchy approvals for every department." },
        { icon: "BarChart3", title: "Real-time dashboards and reports", description: "Business intelligence at your fingertips with live operational insight." },
        { icon: "GitBranch", title: "Multi-branch and multi-location operations", description: "Centralized control for distributed teams, plants, warehouses, and branches." },
        { icon: "ShieldCheck", title: "GST compliance", description: "Automated and compliant workflows aligned to Indian tax requirements." },
        { icon: "Bell", title: "Transaction email and SMS alerts", description: "Instant notifications for all key business transactions." },
        { icon: "FileSignature", title: "E-invoicing, e-way bill and e-signature", description: "Automated digital workflows for legal and compliance needs." },
        { icon: "Gauge", title: "GPS tracking and bio-metrics integration", description: "Track teams and connect biometric attendance data with ERP workflows." },
        { icon: "LockKeyhole", title: "Data security and AWS hosting", description: "Hosted on Amazon with layered security and dependable availability." },
        { icon: "Sparkles", title: "Frequent upgrades at no extra cost", description: "Stay current with new features, improvements, and platform refinements." },
        { icon: "Database", title: "150 reports, 400+ transactions, 20+ industries", description: "Comprehensive coverage for daily business operations and analysis." },
        { icon: "PackageCheck", title: "Quickest onboarding for all needs", description: "A complete ERP solution covering core business functions quickly." },
        { icon: "FileText", title: "Digital document management", description: "Manage, store, and track organizational documents digitally." },
        { icon: "Users", title: "Hierarchy level approvals", description: "Approval flows that follow your organization structure and workflow rules." },
      ],
    },
  },
  {
    type: "about_leadership",
    name: "Leadership Team",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      {
        key: "leaders",
        label: "Leaders",
        type: "repeater",
        itemLabel: "Leader",
        addRemove: true,
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "initials", label: "Initials", type: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "People",
      title: "Our Leadership Team",
      leaders: [
        { name: "Mr. Saravanan KB", role: "CEO", initials: "SK" },
        { name: "Ms. Prathina", role: "CFO", initials: "MP" },
        { name: "Mr. Gowtham", role: "CTO", initials: "MG" },
        { name: "Mr. Gnanaprakash", role: "COO", initials: "MG" },
      ],
    },
  },
  {
    type: "about_products",
    name: "Our Products",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      {
        key: "products",
        label: "Products",
        type: "repeater",
        itemLabel: "Product",
        addRemove: true,
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      { key: "panelIcon", label: "Panel Icon", type: "icon" },
      { key: "panelTitle", label: "Panel Title", type: "textarea" },
      { key: "panelDescription", label: "Panel Description", type: "textarea" },
      { key: "backgroundImage", label: "Panel Background Image", type: "image" },
      { key: "presence", label: "City Presence", type: "list", itemLabel: "City" },
    ],
    defaultContent: {
      eyebrow: "What We Build",
      title: "Our Products",
      products: [
        { label: "Core 1", description: "CRM/Sales, Purchase, Inventory, QC, Sub-Contracting, Simple Production" },
        { label: "Core 2", description: "CRM/Sales, Purchase, Inventory, QC, Sub-Contracting, Production Planning and Control" },
        { label: "Trade", description: "CRM/Sales, Purchase, Inventory, QC" },
        { label: "Portals", description: "Service Portal, Vendor Portal, DMS Portal" },
        { label: "Mobile App", description: "Director, Sales, Service, Shop Floor Mobile App" },
        { label: "Add-on Modules", description: "Accounting, HR, Service Management, Project Management, Plant Maintenance, Asset Management, Business Intelligence Dashboards" },
      ],
      panelIcon: "Cloud",
      panelTitle: "Cloud ERP with modular depth for every growth stage.",
      panelDescription: "Start with core ERP, then add portals, mobile apps, dashboards, and specialist modules as your operations mature.",
      backgroundImage: "/images/globe-wireframe.svg",
      presence: ["Pune", "Coimbatore", "Chennai", "Bangalore"],
    },
  },
  {
    type: "contact_details",
    name: "Contact Details",
    fields: [
      { key: "pillLabel", label: "Pill Label", type: "text" },
      { key: "pillText", label: "Pill Text", type: "text" },
      { key: "title", label: "Section Title", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "companyName", label: "Company Name", type: "text" },
      { key: "addressLines", label: "Address Lines", type: "list", itemLabel: "Line" },
      { key: "landmark", label: "Landmark", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      {
        key: "socialLinks",
        label: "Social Links",
        type: "repeater",
        itemLabel: "Social Link",
        addRemove: true,
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "icon", label: "Icon", type: "icon" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
      {
        key: "branches",
        label: "Branches",
        type: "repeater",
        itemLabel: "Branch",
        addRemove: true,
        fields: [
          { key: "city", label: "City", type: "text" },
          { key: "phones", label: "Phone Numbers", type: "list", itemLabel: "Phone" },
        ],
      },
      { key: "mapTitle", label: "Map Title", type: "text" },
      { key: "mapSrc", label: "Google Map Embed URL", type: "text" },
    ],
    defaultContent: {
      pillLabel: "Contact",
      pillText: "Answers, simplified",
      title: "Let's Talk.\nWe're All Ears.",
      description: "Whether you have a burning question, a big idea, or just want to say hi, we are ready.",
      companyName: "Konnect Analytics India Pvt Ltd",
      addressLines: [
        "No. 37, Ground Floor,",
        "PRIKOS TOWERS, Palanisamy Colony,",
        "Kalapatti Main Road, Indira Nagar,",
        "Civil Aerodrome Post, Coimbatore, Tamil Nadu - 641014",
      ],
      landmark: "Near Zone Connect",
      email: "sales@konnectbi.com",
      phone: "+91 9843111651, +91 7303336060",
      socialLinks: [
        { label: "Facebook", icon: "Facebook", href: "#" },
        { label: "Twitter", icon: "Twitter", href: "#" },
        { label: "Instagram", icon: "Instagram", href: "#" },
        { label: "WhatsApp", icon: "MessageCircle", href: "#" },
        { label: "LinkedIn", icon: "Linkedin", href: "#" },
      ],
      branches: [
        { city: "Chennai", phones: ["+91 9080601291", "+91 7303336060"] },
        { city: "Bengaluru", phones: ["+91 9585511152", "+91 7303336060"] },
        { city: "Nashik", phones: ["+91 9345955482", "+91 7303336060"] },
        { city: "Mumbai", phones: ["+91 9345955482", "+91 7303336060"] },
      ],
      mapTitle: "Konnect Analytics India Pvt Ltd map",
      mapSrc: "https://www.google.com/maps?q=Konnect%20Analytics%20India%20Pvt%20Ltd%20Coimbatore&output=embed",
    },
  },
  {
    type: "contact_support_cta",
    name: "Support CTA",
    fields: [
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "pills",
        label: "Pills",
        type: "repeater",
        itemLabel: "Pill",
        addRemove: true,
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "primaryButtonHref", label: "Primary Button Link", type: "text" },
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
      { key: "secondaryButtonHref", label: "Secondary Button Link", type: "text" },
    ],
    defaultContent: {
      backgroundImage: "/images/hero-meeting.jpg",
      eyebrow: "Need clarity?",
      title: "Still wondering about",
      highlight: "something?",
      description: "Check our FAQs or talk to our support team directly. We are here for you.",
      pills: [
        { icon: "HelpCircle", label: "FAQs" },
        { icon: "Headphones", label: "Support Team" },
        { icon: "PackageSearch", label: "Products" },
      ],
      primaryButtonText: "Check Our FAQs",
      primaryButtonHref: "/#resources",
      secondaryButtonText: "Visit Our Products",
      secondaryButtonHref: "/#products",
    },
  },
  {
    type: "career_roles",
    name: "Career Roles",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "cardEyebrow", label: "Side Card Eyebrow", type: "text" },
      { key: "cardTitle", label: "Side Card Title", type: "textarea" },
      { key: "cardDescription", label: "Side Card Description", type: "textarea" },
      { key: "backgroundImage", label: "Side Card Image", type: "image" },
      {
        key: "stats",
        label: "Side Card Stats",
        type: "repeater",
        itemLabel: "Stat",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "footerTitle", label: "Side Card Footer Title", type: "text" },
      { key: "footerDescription", label: "Side Card Footer Description", type: "textarea" },
      {
        key: "jobs",
        label: "Jobs",
        type: "repeater",
        itemLabel: "Job",
        addRemove: true,
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "location", label: "Location", type: "text" },
          { key: "type", label: "Type", type: "text" },
          { key: "summary", label: "Summary", type: "textarea" },
          { key: "responsibilities", label: "Responsibilities", type: "list", itemLabel: "Responsibility" },
          { key: "requirements", label: "Requirements", type: "list", itemLabel: "Requirement" },
          { key: "applyText", label: "Apply Button Text", type: "text" },
          { key: "applyHref", label: "Apply Link", type: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Open Positions",
      title: "Submit Your Information",
      cardEyebrow: "Life at Konnect",
      cardTitle: "Work where ERP becomes practical business impact.",
      cardDescription: "Build, support, and implement cloud ERP with teams who understand operations, finance, compliance, inventory, and customer success.",
      backgroundImage: "/images/hero-meeting.jpg",
      stats: [
        { icon: "Users", value: "50+", label: "Team members" },
        { icon: "Building2", value: "4", label: "City presence" },
        { icon: "BriefcaseBusiness", value: "7", label: "Open roles" },
        { icon: "GraduationCap", value: "ERP", label: "Product learning" },
      ],
      footerTitle: "Send your profile for the role that fits you best.",
      footerDescription: "Our team will review your details and connect for the next steps.",
      jobs: [
        { title: "Customer Success Manager (CSM)", location: "Coimbatore / Hybrid", type: "Full-time", summary: "Own customer onboarding, adoption, renewals, and success outcomes for ERP implementation accounts.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
        { title: "Marketing Associate", location: "Coimbatore", type: "Full-time", summary: "Support campaigns, content, events, lead generation, and partner marketing for KonnectERP.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
        { title: "Customer Support Associate", location: "Coimbatore", type: "Full-time", summary: "Handle customer queries, coordinate issue resolution, and help users get more from the platform.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
        {
          title: "SENIOR BUSINESS ANALYST",
          location: "Pune or Mumbai",
          type: "Full-time",
          summary: "As a Business Analyst, you will be responsible for analyzing business processes, identifying areas for improvement, and developing solutions for our product-based ERP company. You will work closely with cross-functional teams to gather requirements, document processes, and manage project timelines.",
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
          applyText: "Apply Now",
          applyHref: "mailto:sales@konnectbi.com",
        },
        { title: "ERP Technical Support", location: "Coimbatore", type: "Full-time", summary: "Support ERP configurations, technical tickets, integrations, and issue diagnosis for live customers.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
        { title: "BDE/Sales Executive", location: "Chennai / Bengaluru", type: "Full-time", summary: "Build pipeline, qualify ERP opportunities, conduct demos, and coordinate with presales teams.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
        { title: "COE (SME)", location: "Remote / Hybrid", type: "Full-time", summary: "Bring domain expertise to ERP templates, customer workshops, and best-practice process design.", responsibilities: [], requirements: [], applyText: "Apply Now", applyHref: "mailto:sales@konnectbi.com" },
      ],
    },
  },
  {
    type: "case_studies_grid",
    name: "Case Study Cards",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "cards",
        label: "Case Study Cards",
        type: "repeater",
        itemLabel: "Case Study",
        addRemove: true,
        fields: [
          { key: "logo", label: "Client Logo", type: "image" },
          { key: "clientName", label: "Client Name", type: "text" },
          { key: "title", label: "Card Title", type: "text" },
          { key: "description", label: "Short Description", type: "textarea" },
          { key: "pdfUrl", label: "PDF File", type: "file", accept: "application/pdf", buttonText: "Upload PDF" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Customer Success",
      title: "Case Studies",
      highlight: "Built From Real Outcomes",
      description: "Explore how businesses use KonnectERP to simplify operations, improve visibility, and scale with confidence.",
      cards: [
        {
          logo: "/images/brands/brand-1.avif",
          clientName: "Manufacturing Client",
          title: "Manufacturing operations unified on one ERP",
          description: "A growing manufacturer connected inventory, production, purchase, sales, and finance workflows with KonnectERP.",
          pdfUrl: "",
        },
        {
          logo: "/images/brands/brand-2.jpg",
          clientName: "Trading Client",
          title: "Trading visibility across branches",
          description: "A multi-branch trading business improved stock accuracy, order processing, and management reporting.",
          pdfUrl: "",
        },
        {
          logo: "/images/brands/brand-3.png",
          clientName: "Distribution Client",
          title: "Distribution control with real-time data",
          description: "A distribution team replaced disconnected reports with live operational dashboards and structured workflows.",
          pdfUrl: "",
        },
      ],
    },
  },
  {
    type: "testimonial_collage",
    name: "User Photo Collage",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "photos",
        label: "User Photo Collage",
        type: "repeater",
        itemLabel: "Photo",
        addRemove: true,
        fields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "alt", label: "Alt Text", type: "text" },
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role / Company", type: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Client Testimonials",
      title: "Real feedback from",
      highlight: "KonnectERP users",
      description: "Hear directly from businesses using KonnectERP to save time, simplify documentation, and improve daily operations.",
      photos: [
        { image: "/images/hero-meeting.jpg", alt: "KonnectERP customer meeting", name: "Customer Team", role: "ERP Users" },
        { image: "/images/industry-manufacturing.jpg", alt: "Manufacturing customer", name: "Manufacturing", role: "Operations" },
        { image: "/images/industry-trading.jpg", alt: "Trading customer", name: "Trading", role: "Sales & Inventory" },
        { image: "/images/industry-construction.jpg", alt: "Project customer", name: "Projects", role: "Planning Team" },
      ],
    },
  },
  {
    type: "testimonial_cards",
    name: "Testimonial Cards",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "cards",
        label: "Testimonials",
        type: "repeater",
        itemLabel: "Testimonial",
        addRemove: true,
        fields: [
          { key: "photo", label: "User Photo", type: "image" },
          { key: "name", label: "Name", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "designation", label: "Designation", type: "text" },
          { key: "testimonial", label: "Testimonial", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Customer Voice",
      title: "Testimonials",
      highlight: "from our users",
      description: "Add and manage customer testimonials from the backend. Each card supports a photo, name, company, designation, and testimonial text.",
      cards: [
        {
          photo: "",
          name: "A. KOLAPPAN",
          company: "AK Engineering",
          designation: "Machinery Manufacturer and Exporter",
          testimonial:
            "We are machinery manufacturer and exporters since 2000, we are using Konnect ERP software for the last 3 years, it saves our time, to prepare PO, Sales Quote, Invoice and data search etc.",
        },
      ],
    },
  },
  {
    type: "faq_accordion",
    name: "FAQ Accordion",
    fields: [
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "items",
        label: "FAQ Items",
        type: "repeater",
        itemLabel: "FAQ",
        addRemove: true,
        fields: [
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "textarea" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "FAQ",
      title: "Frequently Asked",
      highlight: "Questions",
      description: "Quick answers about KonnectERP, implementation, customization, support, and demos.",
      items: [
        {
          question: "What is KonnectERP?",
          answer:
            "KonnectERP is a cloud ERP platform that connects purchase, sales, inventory, production, finance, HR, service, and reporting workflows in one system.",
        },
        {
          question: "Can KonnectERP be customized for our industry?",
          answer:
            "Yes. KonnectERP supports industry-specific modules and workflows, so the implementation can match your business processes instead of forcing a generic setup.",
        },
        {
          question: "How long does implementation usually take?",
          answer:
            "Implementation timelines depend on modules, data migration, approval flows, and integrations. The team can assess your current process and share a practical rollout plan after discovery.",
        },
        {
          question: "Do you provide training and support?",
          answer:
            "Yes. KonnectERP includes onboarding, user training, and support so teams can adopt the platform confidently after go-live.",
        },
        {
          question: "How can I request a demo?",
          answer:
            "Use the Request Demo option on the website or contact the KonnectERP team with your requirements. A product specialist can walk you through the right modules for your business.",
        },
      ],
    },
  },
];

export const SECTION_DEFS_BY_TYPE: Record<SectionType, SectionMeta> = Object.fromEntries(
  SECTION_DEFS.map((s) => [s.type, s])
) as Record<SectionType, SectionMeta>;
