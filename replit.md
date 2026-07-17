# KonnectERP Website

A premium enterprise SaaS marketing website for KonnectERP — a Cloud ERP platform for Indian manufacturing & trading companies.

## Stack

- **React 19** + TypeScript
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Framer Motion** — animations
- **Lucide React** — icons
- **Radix UI / shadcn-ui** — accessible headless components
- **Vite 7** — build tool
- **Wouter** — client-side routing

## Running the app

```bash
npm install
npm run dev
```

The dev server starts on port 5000 (configured in `vite.config.ts`).

## Project structure

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

## Customisation notes

- **Brand colours** — edit `src/index.css` CSS variables (`--primary`, `--background`, etc.)
- **Content / copy** — all static data is hardcoded in `src/pages/Home.tsx`
- **Demo modal** — set `DEMO_VIDEO_URL` constant near the top of `Home.tsx` to your real YouTube video ID

## User preferences
