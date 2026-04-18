# Ryan Huang — Portfolio

A single-page portfolio built with Astro + Tailwind CSS + React islands. Live at
[ryanxhuang.com](https://ryanxhuang.com).

## Tech stack

- [Astro](https://astro.build/) — static site generator, ships zero JS by default
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [React](https://react.dev/) — interactive islands only (Framer Motion for scroll animations)
- [TypeScript](https://www.typescriptlang.org/) — strict mode
- [GitHub Pages](https://pages.github.com/) — hosting (CNAME → ryanxhuang.com)

## Local development

```bash
npm install         # one-time
npm run dev         # http://localhost:4321
npm run typecheck   # astro check (TS + astro)
npm run build       # build -> dist/
npm run preview     # serve the built site
```

Node version is pinned in `.nvmrc` (20).

## Project layout

```
/
├── public/                     # Static assets served as-is
│   ├── f1tenth-hero.jpg        # RoboRacer hero (desktop, 1600px)
│   ├── f1tenth-hero-sm.jpg     # RoboRacer hero (mobile, 800px)
│   ├── resume.pdf
│   ├── og-image.svg
│   ├── favicon.svg
│   ├── robots.txt
│   └── CNAME
├── src/
│   ├── components/             # One-off Astro + React components
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro       # Single-page site
│   └── styles/global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── .github/workflows/deploy.yml
```

The site is a single page — every section (`HeroSection`, `AboutSection`,
`RoboRacerShowcase`, `ProjectsSection`, `SkillsCarousel`, `ResumeSection`,
`ContactForm`) lives under `src/components/` and is composed in
`src/pages/index.astro`.

## Hydration strategy

- `HeroSection` uses `client:load` (above-fold entry animations run on load).
- `SkillsCarousel` is SSR'd with no directive — ships zero JS.
- All other React sections use `client:visible` — they hydrate only when
  scrolled into view, keeping initial JS small.

## Updating content

- Personal info + copy: `src/components/*.tsx` / `*.astro`
- Projects list: `src/pages/index.astro` (`projects` array)
- Resume PDF: `public/resume.pdf`
- Color palette: `tailwind.config.mjs`

## Deployment

Pushes to `main` are deployed to GitHub Pages via
`.github/workflows/deploy.yml`. The workflow runs `astro check` → `astro build`,
then publishes `dist/`.

## License

MIT.
