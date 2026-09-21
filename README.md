# KonnectERP Website

## Sitemaps and Search Console

In **Admin > Settings > Sitemaps & Google Search Console**, enter the live website
origin and optionally select Google's HTML verification file. Click **Save & Generate
SEO Files** to write `public/sitemap.xml`, `public/sitemap.html`, `public/robots.txt`,
and the verification file. Regenerate after publishing or deleting content.
The XML/HTML files include core public routes, CMS pages with enabled published
sections, and published blog posts. Private forms, admin routes, and blog drafts
are excluded. Existing robots directives and verification files are retained.

The API also stores generated files in the existing settings table and serves
them at their root paths; Vite development proxies those paths to the API.
For separate static frontend hosting, download the generated files from admin,
place them in the frontend checkout's `public/`, and build/deploy that checkout.
Alternatively configure the frontend host to proxy these root paths to the API.
Runtime writes on a separate API host cannot modify your local checkout or an
already deployed static frontend. The API filesystem must permit writes to `public/`.

Open each generated link on the live frontend domain before verifying in GSC.
Submit `/sitemap.xml` in GSC's Sitemaps report. Sitemap submission does not guarantee indexing.

Run generator validation tests with `npx tsx --test server/lib/seo.test.ts`.

  A premium enterprise SaaS marketing website built with React + TypeScript + Tailwind CSS v4 + Framer Motion.

  ## Quick Start

  ```bash
  npm install
  npm run dev
  ```

  Open [http://localhost:5173](http://localhost:5173) in your browser.

  ## Scripts

  | Command | Description |
  |---|---|
  | `npm run dev` | Start development server on port 5173 |
  | `npm run build` | Build for production → `dist/` |
  | `npm run preview` | Preview production build locally |
  | `npm run typecheck` | Run TypeScript type checks |

  ## Stack

  - **React 19** + TypeScript
  - **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
  - **Framer Motion** — animations
  - **Lucide React** — icons
  - **Radix UI** — accessible headless components
  - **Vite 7** — build tool

  ## Project Structure

  ```
  src/
  ├── pages/
  │   └── Home.tsx        ← entire single-page site (all sections)
  ├── components/
  │   └── ui/             ← shadcn/ui component library
  ├── App.tsx             ← routing wrapper (wouter)
  ├── main.tsx            ← React entry point
  └── index.css           ← Tailwind + CSS custom properties
  ```

  ## Customisation

  - **Brand colours** — edit `src/index.css` CSS variables (`--primary`, `--background`, etc.)
  - **Content / copy** — all static data is hardcoded in `src/pages/Home.tsx`
  - **Demo modal** — set `DEMO_VIDEO_URL` constant near the top of `Home.tsx` to your real YouTube video ID
