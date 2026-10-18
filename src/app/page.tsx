import type { ReactNode } from "react";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
} from "@/components/icons";
import {
  about,
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
  type Project,
} from "@/data/profile";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {profile.name} · Built with Next.js, TypeScript and Tailwind CSS
      </footer>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-fg">
            JM
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-3 py-1.5 text-sm text-muted transition hover:text-fg md:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.links.resume}
            {...external}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
          >
            <DownloadIcon className="size-3.5" />
            Resume
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="py-16 sm:py-24">
      <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
        <PinIcon className="size-3.5" />
        {profile.location} · {profile.timezone}
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
        {profile.title} — {profile.focus}
      </p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition hover:opacity-90"
        >
          See AI projects <ArrowIcon />
        </a>
        <IconLink href={profile.links.github} label="GitHub" icon={<GitHubIcon />} />
        <IconLink href={profile.links.linkedin} label="LinkedIn" icon={<LinkedInIcon />} />
        <IconLink href={`mailto:${profile.email}`} label="Email" icon={<MailIcon />} newTab={false} />
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  icon,
  newTab = true,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      {...(newTab ? external : {})}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 font-medium transition hover:border-accent hover:text-accent"
    >
      {icon}
      {label}
    </a>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border py-16">
      <SectionTitle eyebrow="About" title="Backend engineer who ships AI features to production" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 leading-relaxed text-muted">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-3">
          {about.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-accent">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-t border-border py-16">
      <SectionTitle eyebrow="AI Projects" title="Built end to end, measured with evals" />
      <div className="space-y-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.kind}</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight">{p.name}</h3>
        </div>
        <a
          href={p.repo}
          {...external}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          <GitHubIcon /> View code
        </a>
      </div>
      <p className="mt-4 text-lg leading-relaxed">{p.summary}</p>
      <p className="mt-3 leading-relaxed text-muted">
        <span className="font-semibold text-fg">Problem: </span>
        {p.problem}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {p.metrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-accent-soft px-3.5 py-2">
            <span className="font-bold text-accent">{m.value}</span>{" "}
            <span className="text-sm text-muted">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <FlowDiagram layers={p.diagram} caption={p.diagramCaption} />
      </div>

      <ul className="mt-6 space-y-2.5">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3 leading-relaxed text-muted">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      {p.challenges && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">Problems I solved</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {p.challenges.map((c) => (
              <div key={c.title} className="rounded-xl border border-border p-4">
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </article>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-muted-surface px-2.5 py-1 font-mono text-xs">
      {children}
    </span>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-border py-16">
      <SectionTitle eyebrow="Experience" title="Where I've built production systems" />
      <ol className="space-y-10 border-l border-border pl-6">
        {experience.map((r) => (
          <li key={r.company} className="relative">
            <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-accent bg-bg" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-bold">{r.title}</h3>
              <span className="font-mono text-sm text-muted">{r.period}</span>
            </div>
            <p className="font-medium text-accent">{r.company}</p>
            <p className="mt-1 text-sm text-muted">{r.context}</p>
            <ul className="mt-4 space-y-2">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            {r.earlier && (
              <div className="mt-5 rounded-lg border border-dashed border-border px-4 py-3 text-sm">
                <span className="font-semibold">{r.earlier.title}</span>
                <span className="font-mono text-muted"> · {r.earlier.period}</span>
                <p className="mt-0.5 text-muted">{r.earlier.detail}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-t border-border py-16">
      <SectionTitle eyebrow="Skills" title="Tools I use in production" />
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold">{g.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold">Education</h3>
          <ul className="mt-2 space-y-2 text-sm text-muted">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="font-medium text-fg">{e.degree}</span> — {e.school} ({e.year})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Languages</h3>
          <ul className="mt-2 space-y-2 text-sm text-muted">
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border py-16">
      <div className="rounded-2xl bg-accent px-6 py-10 text-center text-accent-fg sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Let&apos;s talk</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">
          I&apos;m always happy to connect about backend, cloud and AI engineering. The fastest way to reach me is email.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent-fg px-5 py-2.5 font-medium text-accent transition hover:opacity-90"
          >
            <MailIcon /> {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            {...external}
            className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2.5 font-medium transition hover:opacity-80"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a
            href={profile.links.resume}
            {...external}
            className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2.5 font-medium transition hover:opacity-80"
          >
            <DownloadIcon /> Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
