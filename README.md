# KonnectERP Website

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
  