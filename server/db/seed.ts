import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { pages, sections, blogPosts } from "./schema";
import { SECTION_DEFS_BY_TYPE } from "../../shared/sections";
import { PAGE_TEMPLATES } from "../../shared/templates";
import { createPageFromTemplate, ensureCoreBuilderPages } from "../lib/createPage";

async function seedHome() {
  let [home] = await db.select().from(pages).where(eq(pages.slug, "home"));
  if (!home) {
    [home] = await db.insert(pages).values({ slug: "home", title: "Home Page", template: "home" }).returning();
    console.log(`Created page "home" (id=${home.id})`);
  }

  const existing = await db.select().from(sections).where(eq(sections.pageId, home.id));
  const existingTypes = new Set(existing.map((s) => s.type));
  const homeSectionTypes = PAGE_TEMPLATES.home.sectionTypes;

  const toInsert = homeSectionTypes
    .filter((type) => !existingTypes.has(type))
    .map((type) => {
      const meta = SECTION_DEFS_BY_TYPE[type];
      return {
        pageId: home.id,
        type,
        name: meta.name,
        position: homeSectionTypes.indexOf(type),
        enabled: true,
        content: meta.defaultContent,
        publishedContent: meta.defaultContent,
      };
    });

  if (toInsert.length > 0) {
    await db.insert(sections).values(toInsert);
    console.log(`Seeded ${toInsert.length} home section(s): ${toInsert.map((s) => s.type).join(", ")}`);
  } else {
    console.log("Home page sections already present — nothing to seed.");
  }

  const orderedSections = await db.select().from(sections).where(eq(sections.pageId, home.id));
  await Promise.all(
    orderedSections.map((section) => {
      const templatePosition = homeSectionTypes.indexOf(section.type as typeof homeSectionTypes[number]);
      return db
        .update(sections)
        .set({ position: templatePosition >= 0 ? templatePosition : section.position })
        .where(eq(sections.id, section.id));
    })
  );
}

async function seedErpForSmes() {
  const [existing] = await db.select().from(pages).where(eq(pages.slug, "erp-for-smes"));
  if (existing) {
    console.log('Page "erp-for-smes" already exists — skipping.');
    return;
  }
  const page = await createPageFromTemplate({ slug: "erp-for-smes", title: "ERP for SMEs", template: "product" });
  console.log(`Created page "erp-for-smes" (id=${page.id}) from the product template`);
}

const BLOG_IMAGES = [
  "/images/hero-meeting.jpg",
  "/images/industry-manufacturing.jpg",
  "/images/industry-trading.jpg",
  "/images/gst-compliance-person.jpg",
  "/images/industry-construction.jpg",
  "/images/industry-jobwork.jpg",
  "/images/industry-retail.jpg",
];

const DUMMY_POSTS = [
  {
    title: "5 Signs Your Business Has Outgrown Spreadsheets",
    slug: "signs-your-business-outgrown-spreadsheets",
    tags: ["ERP", "Productivity"],
    daysAgo: 2,
    excerpt: "Spreadsheets are great until they aren't. Here's how to tell when disconnected sheets are quietly costing you time, accuracy, and visibility.",
    content: `Most growing businesses start on spreadsheets, and for a while that's fine. The trouble begins when the same numbers live in five different files, and nobody is quite sure which one is current.

If your team spends more time reconciling data than acting on it, that's the first sign. The second is version conflicts — two people editing the same file and one set of changes quietly disappearing.

The real cost isn't the software, it's the decisions made on stale numbers. An ERP platform gives every department a single, live source of truth, so the conversation moves from "whose number is right" to "what should we do next."`,
  },
  {
    title: "Real-Time Inventory Visibility: Why It Matters More Than You Think",
    slug: "real-time-inventory-visibility-why-it-matters",
    tags: ["Manufacturing", "ERP"],
    daysAgo: 9,
    excerpt: "Stockouts and overstocking both drain cash. Real-time inventory visibility across every warehouse is how modern operations avoid both.",
    content: `Ask most operations managers what keeps them up at night, and inventory accuracy is near the top of the list. A stockout delays a customer order; overstocking ties up working capital that could be spent elsewhere.

The traditional fix — periodic manual counts — only tells you where things stood last week. By the time a shortage is discovered, it's already affecting production or fulfillment.

Connected inventory management changes that. Every goods receipt, transfer, and dispatch updates stock levels instantly across every location, so purchasing and production teams are always working from the same live picture, not a snapshot from last Friday.`,
  },
  {
    title: "GST Compliance in 2026: What Every Finance Team Should Automate",
    slug: "gst-compliance-2026-what-to-automate",
    tags: ["GST & Compliance", "Finance"],
    daysAgo: 16,
    excerpt: "Manual GST reconciliation eats hours every month. Here's what finance teams should hand off to automation first.",
    content: `GST compliance isn't optional, and the penalty for getting it wrong isn't just financial — it's the hours spent explaining a mismatch to an auditor months after the invoice was raised.

The three areas that benefit most from automation are invoice-level tax computation, GSTR reconciliation against purchase registers, and e-way bill generation tied directly to dispatch. Each of these is repetitive, rule-based, and error-prone when done by hand.

When your ERP generates GST-compliant invoices at the point of sale and reconciles them automatically against vendor filings, your finance team spends its time reviewing exceptions instead of re-keying data.`,
  },
  {
    title: "From Job Work to Job Costing: Getting Margins Right",
    slug: "job-work-to-job-costing-getting-margins-right",
    tags: ["Manufacturing", "Finance"],
    daysAgo: 25,
    excerpt: "Job work businesses often discover margin problems only at month-end. Real-time job costing catches them while there's still time to act.",
    content: `In job work and contract manufacturing, the difference between a profitable order and a loss-making one often comes down to costs nobody tracked in real time — rework, idle machine time, or a material substitution nobody flagged.

Traditional costing reviews happen after the job ships, which means the insight arrives too late to change anything about that order.

A connected job costing system attributes material, labor, and machine time to each work order as it happens, so you know an order is running over budget while it's still on the shop floor — not when the invoice is already out the door.`,
  },
  {
    title: "Multi-Location Trading: Keeping Every Branch on the Same Ledger",
    slug: "multi-location-trading-same-ledger",
    tags: ["Trading & Distribution", "ERP"],
    daysAgo: 34,
    excerpt: "Running trading operations across multiple branches means every location needs the same pricing, stock, and customer data — instantly.",
    content: `Trading and distribution businesses grow branch by branch, and each new location tends to inherit its own spreadsheet, its own pricing list, and eventually its own version of the truth.

That fragmentation shows up as inconsistent pricing between branches, stock transfers that take days to reconcile, and a head office that can't get a same-day view of company-wide sales.

Centralizing every branch onto one ERP instance means a price change, a new customer, or a stock transfer is visible everywhere the moment it's entered — no nightly batch jobs, no end-of-week reconciliation meetings.`,
  },
  {
    title: "Cloud ERP vs. On-Premise: What Changed in the Last Five Years",
    slug: "cloud-erp-vs-on-premise-what-changed",
    tags: ["Cloud", "ERP"],
    daysAgo: 48,
    excerpt: "The cloud-vs-on-premise debate looked very different five years ago. Here's what's actually changed for growing Indian businesses.",
    content: `Five years ago, the on-premise argument was mostly about control and customization — cloud ERP was seen as rigid, and IT teams didn't trust hosting business-critical data outside their own servers.

Two things shifted that. First, cloud platforms caught up on configurability, so businesses no longer trade flexibility for convenience. Second, the operational cost of maintaining on-premise servers, backups, and security patches quietly became the bigger risk.

For most growing businesses today, the real question isn't cloud versus on-premise — it's whether your ERP vendor can guarantee uptime, data security, and painless upgrades without a dedicated in-house IT team to manage it.`,
  },
  {
    title: "The Real Cost of a Failed ERP Implementation (and How to Avoid One)",
    slug: "real-cost-of-a-failed-erp-implementation",
    tags: ["Implementation", "ERP"],
    daysAgo: 62,
    excerpt: "Most failed ERP rollouts don't fail on technology — they fail on process. Here's what separates a smooth go-live from a stalled one.",
    content: `When an ERP rollout stalls, the postmortem rarely points to the software itself. It points to unclear ownership, requirements that changed mid-project, or a go-live date set before the team was actually trained.

A structured implementation methodology exists precisely to catch these risks early — requirement gathering that involves the people who'll actually use the system, a configuration phase validated against real business scenarios, and training that happens before go-live, not after.

The businesses that get this right treat implementation as a phased partnership with their vendor, not a one-time software install. That's the difference between a system that gets adopted and one that gets quietly abandoned for spreadsheets again.`,
  },
  {
    title: "Why Manufacturing Businesses Need Production Planning, Not Just MRP",
    slug: "manufacturing-needs-production-planning-not-just-mrp",
    tags: ["Manufacturing"],
    daysAgo: 80,
    excerpt: "Material requirement planning tells you what to buy. Production planning tells you what to build, when, and with what capacity.",
    content: `MRP answers a narrow but important question: given a sales order, what raw materials do we need to procure? What it doesn't answer is whether your shop floor actually has the capacity to deliver on time.

That gap is where production planning comes in — sequencing work orders against real machine and labor capacity, so a promised delivery date is grounded in what the floor can actually produce, not just what materials are on hand.

Manufacturers who combine MRP with capacity-aware production planning stop making promises they can't keep, and start seeing bottlenecks weeks before they become missed deadlines.`,
  },
  {
    title: "Customer Case Study: Cutting Month-End Close from 12 Days to 3",
    slug: "case-study-month-end-close-12-days-to-3",
    tags: ["Finance", "ERP"],
    daysAgo: 100,
    excerpt: "A mid-sized distribution business restructured its month-end process around a single connected ERP — here's what changed.",
    content: `Before implementation, this distribution business closed its books in twelve days — not because the accounting was complex, but because finance spent most of that time chasing numbers from sales, warehouse, and purchase teams working off separate systems.

The fix wasn't a new accounting process. It was removing the reconciliation step entirely by putting every department on one ledger, so sales invoices, stock movements, and vendor bills posted to the same books in real time.

Three months after go-live, month-end close was down to three days — and finance spent that time reviewing the numbers instead of assembling them.`,
  },
  {
    title: "Mobile-First Field Operations: Sales Orders From Anywhere",
    slug: "mobile-first-field-operations-sales-orders",
    tags: ["Productivity", "Cloud"],
    daysAgo: 130,
    excerpt: "Field sales teams shouldn't have to wait until they're back at a desk to log an order. Mobile access changes how fast a business can respond.",
    content: `A sales order taken in the field and entered into the system three days later isn't just slow — it's a missed opportunity for the warehouse to start picking, and a delay the customer notices.

Mobile-first ERP access means a field rep can check live stock, apply the right pricing, and raise a sales order from a customer's site, with the same validation and approval rules that apply at head office.

The result isn't just faster order entry. It's a shorter gap between "the customer said yes" and "the order is moving," which compounds into real competitive advantage over a quarter.`,
  },
  {
    title: "Add-On Modules: Scaling Your ERP Without Re-Implementing",
    slug: "add-on-modules-scaling-erp-without-reimplementing",
    tags: ["ERP", "Implementation"],
    daysAgo: 160,
    excerpt: "Your business needs will change. A well-architected ERP should let you add capability without ripping out what already works.",
    content: `One of the most common reasons businesses avoid switching ERP systems is the fear of doing it all over again in two years when they need something the original system can't support.

A modular architecture solves this by design — task management, mobile apps, and portal access sit on top of the same core data model, so adding a capability doesn't mean migrating data or retraining staff on a new system.

That's the real test of a platform's scalability: not how much it can do on day one, but how little friction there is when your business needs something it didn't need before.`,
  },
  {
    title: "Data Security in Cloud ERP: What to Actually Ask Your Vendor",
    slug: "data-security-cloud-erp-questions-to-ask-vendor",
    tags: ["Cloud", "GST & Compliance"],
    daysAgo: 190,
    excerpt: "Not all cloud ERP vendors handle security the same way. These are the questions worth asking before you sign.",
    content: `"Is it secure?" is the wrong question to ask a cloud ERP vendor — every vendor will say yes. The better questions are specific: where is the data hosted, who can access it, and what happens during a failure.

Ask about encryption at rest and in transit, role-based access controls down to the field level, and how frequently backups are tested — not just taken. Ask what the recovery time objective is if the primary data center goes down.

A vendor that answers these questions in specifics, with documentation to back it up, is a very different conversation than one that answers in reassurances. Your business data deserves the specifics.`,
  },
];

async function seedBlog() {
  const existing = await db.select({ slug: blogPosts.slug }).from(blogPosts);
  const existingSlugs = new Set(existing.map((p) => p.slug));
  const toInsert = DUMMY_POSTS.filter((p) => !existingSlugs.has(p.slug)).map((p, i) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    featuredImage: BLOG_IMAGES[i % BLOG_IMAGES.length],
    tags: p.tags,
    author: "KonnectERP Team",
    status: "published",
    publishedAt: new Date(Date.now() - p.daysAgo * 24 * 60 * 60 * 1000),
  }));

  if (toInsert.length > 0) {
    await db.insert(blogPosts).values(toInsert);
    console.log(`Seeded ${toInsert.length} blog post(s).`);
  } else {
    console.log("Blog posts already present — nothing to seed.");
  }
}

async function seed() {
  await seedHome();
  await seedErpForSmes();
  await ensureCoreBuilderPages();
  await seedBlog();
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
