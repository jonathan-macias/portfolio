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

## Project structure

```
src/
  app/
    layout.tsx       # metadata, fonts, theme script
    page.tsx         # all sections
    globals.css      # color tokens (light/dark)
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
