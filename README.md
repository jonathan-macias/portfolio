# Jonathan Macías — Portfolio

Personal site: Senior Software Engineer (.NET · Azure · AI Integration).

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4. Light/dark theme follows the system and can be toggled.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Update content

All text lives in [`src/data/profile.ts`](src/data/profile.ts): profile, about, projects, experience, skills, education and languages. Edit that file only — the page renders from it.

To update the resume, replace `public/Jonathan_Macias_Resume.pdf` (keep the same file name).

## Design system

The visual direction is "Spec Sheet": the site is art-directed like an engineering datasheet. Design tokens live in [`src/app/globals.css`](src/app/globals.css).

- **Type:** Archivo for text and condensed display, Martian Mono for labels and metadata.
- **Color:** stone, ink and one orange. `--signal` is 3.4:1 on the background, so it is for wires, ports and numerals 24px and up. Small orange text uses `--accent`.
- **Shape:** square corners and hairline rules instead of cards.
- **Motion:** CSS only, and off under `prefers-reduced-motion`.

## Project structure

```
src/
  app/
    layout.tsx       # metadata, fonts, theme script
    page.tsx         # all sections
    globals.css      # design tokens (light/dark), motion
    icon.svg         # favicon
  components/
    FlowDiagram.tsx  # architecture diagram for projects
    ThemeToggle.tsx
    icons.tsx
  data/
    profile.ts       # site content
public/
  Jonathan_Macias_Resume.pdf
```

## Deploy

Deployed on Vercel from the `main` branch: every push redeploys automatically.
