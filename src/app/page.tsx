import type { ReactNode } from "react";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
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

const label = "font-mono text-label uppercase";

// Shared two-column sheet: every section's rail lines up on the same grid.
// The rail only sticks when the window is tall enough to show all of it.
const sheetRail =
  "lg:col-span-4 lg:self-start xl:col-span-3 lg:[@media(min-height:36rem)]:sticky lg:[@media(min-height:36rem)]:top-20";
const sheetBody = "min-w-0 lg:col-span-8 xl:col-span-9";

const actionVariants = {
  primary: "bg-accent text-accent-fg hover:bg-fg hover:text-bg",
  outline: "border border-fg text-fg hover:bg-fg hover:text-bg",
  inverseOutline: "border border-current hover:bg-accent-fg hover:text-accent",
};

const actionSizes = {
  default: "h-11 px-4",
  compact: "h-9 px-3",
};

function ActionLink({
  href,
  children,
  variant = "outline",
  size = "default",
  newTab = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof actionVariants;
  size?: keyof typeof actionSizes;
  newTab?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(newTab ? external : {})}
      className={`group inline-flex items-center justify-center gap-2 transition-colors duration-150 ease-spec ${label} ${actionSizes[size]} ${actionVariants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-sheet px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
        </div>
        <Contact />
      </main>
      <footer className="mx-auto flex w-full max-w-sheet flex-col gap-1 px-4 py-6 text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <span className="font-mono text-label">© {profile.name}</span>
        <span className="font-mono text-label">Built with Next.js, TypeScript and Tailwind CSS</span>
      </footer>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-fg bg-bg">
      <div className="mx-auto flex max-w-sheet flex-wrap items-center justify-between px-4 sm:px-6 md:h-14 lg:px-8">
        <a href="#top" className="flex h-14 items-center gap-2.5">
          <span className="inline-flex size-8 items-center justify-center bg-fg font-display text-sm font-extrabold text-bg">
            JM
          </span>
          <span className={`hidden sm:inline ${label}`}>{profile.name}</span>
        </a>
        <nav
          aria-label="Sections"
          className="order-last -mx-4 flex w-[calc(100%+2rem)] divide-x divide-border border-t border-border sm:-mx-6 sm:w-[calc(100%+3rem)] md:order-none md:mx-0 md:ml-auto md:mr-3 md:w-auto md:divide-x-0 md:border-0"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex h-10 grow items-center justify-center px-1.5 text-muted transition-colors duration-150 ease-spec hover:text-fg md:h-9 md:px-3 ${label}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ActionLink href={profile.links.resume} newTab size="compact">
            <DownloadIcon className="size-3.5" />
            Resume
          </ActionLink>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const fields = [
    { term: "Role", value: profile.title },
    { term: "Focus", value: profile.focus },
    { term: "Based", value: profile.location },
    { term: "Overlap", value: profile.timezone },
  ];

  return (
    <section id="top" className="pb-14 pt-10 lg:pb-20 lg:pt-14">
      <div className="grid gap-10 xl:grid-cols-12 xl:items-end xl:gap-8">
        <h1 className="font-display text-display font-extrabold uppercase xl:col-span-7">
          {profile.name.split(" ").map((word) => (
            <span key={word} className="block">
              {word}{" "}
            </span>
          ))}
        </h1>
        <div className="relative border border-fg bg-surface xl:col-span-5">
          <span className="absolute -right-px -top-px size-2 bg-signal" aria-hidden />
          <dl className="divide-y divide-border">
            {fields.map((f) => (
              <div key={f.term} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-3 px-4 py-2.5">
                <dt className={`text-muted ${label}`}>{f.term}</dt>
                <dd className="text-[0.9375rem] font-medium leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rule-top mt-10 grid gap-8 pt-8 lg:mt-14 xl:grid-cols-12 xl:gap-8">
        <p className="max-w-2xl text-xl leading-snug sm:text-2xl xl:col-span-7">{profile.tagline}</p>
        <div className="flex flex-wrap content-start gap-2 xl:col-span-5">
          <ActionLink href="#projects" variant="primary" className="w-full sm:w-auto">
            See AI projects
            <ArrowIcon className="size-4 transition-transform duration-150 ease-spec motion-safe:group-hover:translate-x-1" />
          </ActionLink>
          <ActionLink href={profile.links.github} newTab className="flex-1 sm:flex-none">
            <GitHubIcon /> GitHub
          </ActionLink>
          <ActionLink href={profile.links.linkedin} newTab className="flex-1 sm:flex-none">
            <LinkedInIcon /> LinkedIn
          </ActionLink>
          <ActionLink href={`mailto:${profile.email}`} className="flex-1 sm:flex-none">
            <MailIcon /> Email
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className={`text-accent ${label}`}>{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-none sm:text-5xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border py-16 lg:py-24">
      <div className="grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <SectionTitle eyebrow="About" title="Backend engineer who ships AI features to production" />
        </div>
        <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-muted lg:col-span-7 lg:mt-7">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <dl className="rule-top mt-12 grid grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {about.stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col-reverse justify-end gap-3 border-b border-border py-5 pr-4 even:border-l even:pl-4 [&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:pl-6 lg:first:pl-0 lg:[&:nth-child(3)]:border-l"
          >
            <dt className="max-w-[24ch] text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="font-display text-readout font-bold text-signal">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-t border-border py-16">
      <SectionTitle eyebrow="AI Projects" title="Built end to end, measured with evals" />
      <div>
        {projects.map((p, i) => (
          <ProjectSheet key={p.slug} project={p} figure={`FIG. ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

function ProjectSheet({ project: p, figure }: { project: Project; figure: string }) {
  return (
    <article className="rule-top grid gap-10 py-10 last:pb-0 lg:grid-cols-12 lg:gap-8 lg:py-14">
      <div className={sheetRail}>
        <p className={`text-muted ${label}`}>{p.kind}</p>
        <h3 className="mt-2 font-display text-4xl font-bold leading-none sm:text-5xl lg:text-[2.75rem]">{p.name}</h3>
        <dl className="mt-8 border-t border-fg">
          {p.metrics.map((m) => (
            <div key={m.label} className="grid grid-cols-[6.75rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-border py-2.5">
              <dt className="col-start-2 row-start-1 text-sm leading-snug text-muted">{m.label}</dt>
              <dd className="col-start-1 row-start-1 font-display text-3xl font-bold leading-none text-signal">{m.value}</dd>
            </div>
          ))}
        </dl>
        <ActionLink href={p.repo} newTab className="mt-6 w-full sm:w-auto lg:w-full">
          <GitHubIcon /> View code
        </ActionLink>
      </div>

      <div className={sheetBody}>
        <p className="max-w-3xl text-xl leading-snug sm:text-2xl">{p.summary}</p>
        <SheetField title="Problem">
          <p className="max-w-[68ch] leading-relaxed text-muted">{p.problem}</p>
        </SheetField>
        <div className="mt-8">
          <FlowDiagram layers={p.diagram} caption={p.diagramCaption} figure={figure} />
        </div>
        <SheetField title="Highlights">
          <BulletList items={p.highlights} />
        </SheetField>
        {p.challenges && (
          <SheetField title="Problems I solved">
            <IncidentLog incidents={p.challenges} />
          </SheetField>
        )}
        <SheetField title="Stack">
          <MonoList items={p.stack} className="max-w-[68ch] text-label" />
        </SheetField>
      </div>
    </article>
  );
}

function SheetField({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-border pt-4 sm:grid sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-x-6">
      <h4 className={`mb-3 text-muted sm:mb-0 sm:mt-1 ${label}`}>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[68ch] space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-muted">
          <span className="mt-[0.65em] size-1.5 shrink-0 bg-signal" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Running mono text that only breaks between items, with the separator kept on the line above.
function MonoList({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={`font-mono leading-relaxed ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="inline">
          <span className="whitespace-nowrap">
            {item}
            {i < items.length - 1 && (
              <span className="text-muted" aria-hidden>
                {" ·"}
              </span>
            )}
          </span>{" "}
        </li>
      ))}
    </ul>
  );
}

function IncidentLog({ incidents }: { incidents: NonNullable<Project["challenges"]> }) {
  return (
    <ol className="divide-y divide-border">
      {incidents.map((c, i) => (
        <li
          key={c.title}
          className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 py-3 first:pt-0 last:pb-0 xl:grid-cols-[3rem_13rem_minmax(0,1fr)]"
        >
          <span className={`mt-1 text-accent ${label}`} aria-hidden>
            P-{String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-semibold leading-snug transition-colors duration-150 ease-spec group-hover:text-accent">{c.title}</p>
          <p className="col-start-2 mt-1 text-[0.9375rem] leading-relaxed text-muted xl:col-start-3 xl:mt-0">{c.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-border py-16">
      <SectionTitle eyebrow="Experience" title="Where I've built production systems" />
      <ol>
        {experience.map((r) => (
          <li key={r.company} className="rule-top grid gap-6 py-8 last:pb-0 lg:grid-cols-12 lg:gap-8 lg:py-12">
            <div className={sheetRail}>
              <p className={`text-accent ${label}`}>{r.period}</p>
              <p className="mt-3 font-semibold leading-snug">{r.company}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{r.context}</p>
            </div>
            <div className={sheetBody}>
              <h3 className="font-display text-3xl font-bold leading-none sm:text-4xl">{r.title}</h3>
              <div className="mt-6">
                <BulletList items={r.bullets} />
              </div>
              {r.earlier && (
                <SheetField title="Earlier">
                  <p className="font-semibold leading-snug">{r.earlier.title}</p>
                  <p className={`mt-1.5 text-muted ${label}`}>{r.earlier.period}</p>
                  <p className="mt-2 leading-relaxed text-muted">{r.earlier.detail}</p>
                </SheetField>
              )}
            </div>
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
      <dl className="rule-top">
        {skills.map((g) => (
          <IndexRow key={g.group} term={g.group}>
            <MonoList items={g.items} className="max-w-[80ch] text-[0.8125rem]" />
          </IndexRow>
        ))}
        <IndexRow term="Education" className="-mt-px border-t border-t-fg">
          <ul className="space-y-1.5 text-muted">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="font-medium text-fg">{e.degree}</span> — {e.school} ({e.year})
              </li>
            ))}
          </ul>
        </IndexRow>
        <IndexRow term="Languages">
          <ul className="space-y-1.5 text-muted">
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </IndexRow>
      </dl>
    </section>
  );
}

function IndexRow({
  term,
  children,
  className = "",
}: {
  term: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group grid gap-2 border-b border-border py-4 last:border-b-0 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <dt className="font-display text-2xl font-bold leading-tight transition-colors duration-150 ease-spec group-hover:text-accent lg:col-span-4 xl:col-span-3">
        {term}
      </dt>
      <dd className={`${sheetBody} self-center`}>{children}</dd>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-accent text-accent-fg">
      <div className="mx-auto max-w-sheet px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 xl:grid-cols-12 xl:items-end xl:gap-8">
          <div className="xl:col-span-7">
            <p className={label}>Contact</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl">Let&apos;s talk</h2>
          </div>
          <p className="max-w-xl text-lg leading-snug xl:col-span-5">
            I&apos;m always happy to connect about backend, cloud and AI engineering. The fastest way to reach me is email.
          </p>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="mt-10 block font-display text-[clamp(1.25rem,5vw,4rem)] font-bold leading-none underline decoration-2 underline-offset-[0.14em] transition-[text-decoration-thickness] duration-150 ease-spec hover:decoration-4 lg:mt-14"
        >
          {profile.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-2 border-t border-current pt-6 lg:mt-14">
          <ActionLink href={profile.links.linkedin} newTab variant="inverseOutline" className="flex-1 sm:flex-none">
            <LinkedInIcon /> LinkedIn
          </ActionLink>
          <ActionLink href={profile.links.resume} newTab variant="inverseOutline" className="flex-1 sm:flex-none">
            <DownloadIcon /> Resume (PDF)
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
