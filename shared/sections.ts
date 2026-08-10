// Single source of truth for Page Builder section types: default content (used to
// seed the DB and as a fallback if the API is unreachable) and field schemas (used
// to auto-generate the admin edit forms). Shared between the Express seed script
// and the React app (admin + public site).

export type FieldDef =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "image" }
  | { key: string; label: string; type: "icon" }
  | { key: string; label: string; type: "number" }
  | { key: string; label: string; type: "list"; itemLabel?: string }
  | { key: string; label: string; type: "repeater"; itemLabel: string; addRemove?: boolean; fields: FieldDef[] };

export const ICON_OPTIONS = [
  "Users", "Building2", "Activity", "BarChart3", "Package", "Factory", "Shield",
  "ShoppingCart", "Layers", "FileText", "Truck", "CreditCard", "Briefcase",
  "TrendingUp", "Handshake", "HardHat", "UserCog", "Eye", "Zap", "Cloud",
  "Server", "Monitor", "Smartphone", "CheckCircle2",
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
  | "product_cta";

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
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
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
      secondaryButtonText: "Watch Platform Overview",
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
    ],
    defaultContent: {
      eyebrow: "Industry Solutions",
      title: "Flexible Modules",
      highlight: "Unified Control",
      description:
        "Deploy the exact solution your business requires today - from core inventory to full end-to-end production. Every module shares the same real-time data, eliminating workarounds and data silos.",
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
      { key: "eyebrow", label: "Eyebrow Tag", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "highlight", label: "Highlight Text", type: "text" },
      { key: "subhead", label: "Subhead", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
    ],
    defaultContent: {
      eyebrow: "01 · ERP for SMEs",
      title: "ERP Software Built for",
      highlight: "Growing Businesses",
      subhead: "Simplify Everyday Operations. Gain Control. Grow with Confidence.",
      description:
        "Growing businesses often rely on spreadsheets, disconnected applications, and manual coordination to manage day-to-day operations. As business volume increases, these systems make it harder to control inventory, track orders, monitor production, and understand profitability.",
      primaryButtonText: "Talk to Our ERP Experts",
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
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    defaultContent: {
      title: "Make Your Next Stage of",
      highlight: "Growth Easier to Manage",
      description: "Move from disconnected processes to a more organized, visible, and scalable way of running your business.",
      buttonText: "Talk to Our ERP Experts",
      backgroundImage: "/images/industry-trading.jpg",
    },
  },
];

export const SECTION_DEFS_BY_TYPE: Record<SectionType, SectionMeta> = Object.fromEntries(
  SECTION_DEFS.map((s) => [s.type, s])
) as Record<SectionType, SectionMeta>;
