// All site content lives here. Update this file to update the site.

export const profile = {
  name: "Jonathan Macías",
  title: "Senior Software Engineer",
  focus: ".NET · Azure · AI Integration",
  tagline:
    "I build backend systems, web platforms and AI-powered applications on .NET, Azure and Python — for international clients in financial services, fintech and retail.",
  location: "Cúcuta, Colombia",
  timezone: "UTC-5 · full US Eastern/Central overlap",
  email: "jthmacias1995@gmail.com",
  links: {
    github: "https://github.com/jonathan-macias",
    linkedin: "https://www.linkedin.com/in/jonathan-macias-mora/",
    resume: "/Jonathan_Macias_Resume.pdf",
  },
};

export const about = {
  paragraphs: [
    "I'm a software engineer with 5+ years shipping production systems. Most of my work is backend: ASP.NET Core APIs, event-driven microservices, SQL Server and PostgreSQL tuning, and integrations with data warehouses, payment providers, messaging and e-invoicing platforms — secured with Microsoft Entra ID and Amazon Cognito on Azure and AWS.",
    "Lately I've been building LLM applications end to end: AI agents with tool calling, MCP servers, RAG on pgvector, and — the part most demos skip — eval suites that gate every change in CI.",
  ],
  stats: [
    { value: "5+", label: "years building production software" },
    { value: "2", label: "clouds in production — Azure & AWS" },
    { value: "35%", label: "faster SQL Server workloads" },
    { value: "98%", label: "eval pass rate on my AI triage agent" },
  ],
};

export type Diagram = { label: string; items: string[] }[];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  problem: string;
  highlights: string[];
  challenges?: { title: string; detail: string }[];
  metrics: { value: string; label: string }[];
  diagram: Diagram;
  diagramCaption: string;
  stack: string[];
  repo: string;
};

export const projects: Project[] = [
  {
    slug: "support-triage-agent",
    name: "Support Triage Agent",
    kind: "AI agent · Python",
    summary:
      "An AI agent that triages customer-support tickets and returns a validated priority, category, team summary and suggested reply in the customer's language.",
    problem:
      "Manual ticket triage is slow and inconsistent, and mass incidents are detected late. The agent prioritizes with context: whether the customer is repeating an issue, or other customers are reporting the same thing.",
    highlights: [
      "One service layer reused by three consumers: a FastAPI REST API (7 endpoints), the Pydantic AI agent and an MCP server (6 tools) for Claude Desktop and Claude Code.",
      "Least privilege by design: the agent only calls read tools; validated results are persisted by code. The MCP server exposes 4 read and 2 scoped write tools — no delete.",
      "Eval-driven development with pydantic-evals: rule-based checks plus a calibrated LLM judge, gated in GitHub Actions alongside 36 pytest tests.",
      "Model is configurable through an environment variable, with retries and a fallback model when the primary LLM is saturated.",
    ],
    challenges: [
      {
        title: "Concurrency bug",
        detail:
          "Two tools running in parallel shared a database session. Fixed by making them sequential, covered by a regression test.",
      },
      {
        title: "Eval-driven fix",
        detail:
          "An accent-sensitive search missed a mass incident. The eval went from 83% to 100% after the fix.",
      },
      {
        title: "Evaluating the evaluator",
        detail:
          "The LLM judge approved an answer with invented data. I rewrote the rubric and added judge calibration before every run.",
      },
      {
        title: "Prompt injection",
        detail:
          "Layered defense: delimited ticket text, read-only tools and schema-validated output.",
      },
    ],
    metrics: [
      { value: "98%", label: "eval pass rate" },
      { value: "11", label: "live-model eval cases" },
      { value: "36", label: "automated tests" },
      { value: "6", label: "MCP tools" },
    ],
    diagram: [
      { label: "Consumers", items: ["FastAPI REST API", "Pydantic AI agent ⇄ Gemini", "MCP server (Claude)"] },
      { label: "Service layer", items: ["Ticket services", "Triage service"] },
      { label: "Data", items: ["PostgreSQL"] },
    ],
    diagramCaption: "One service layer, three consumers. The agent only reads; code persists the validated result.",
    stack: ["Python 3.12", "FastAPI", "Pydantic v2", "Pydantic AI", "Google Gemini", "MCP", "PostgreSQL", "SQLModel", "pytest", "pydantic-evals", "Docker", "GitHub Actions"],
    repo: "https://github.com/jonathan-macias/support-triage-agent",
  },
  {
    slug: "messageflow",
    name: "MessageFlow",
    kind: "Full-stack · .NET + Next.js",
    summary:
      "A platform that automates WhatsApp campaigns from dynamic datasets, with a model-agnostic LLM layer that drafts message templates from natural language.",
    problem:
      "Teams send personalized WhatsApp campaigns from spreadsheets by hand. MessageFlow turns any Excel file into a dataset, lets users write templates with its columns as variables, and schedules the sends.",
    highlights: [
      "Excel dataset import with dynamic templates using column variables like {{name}} or {{phone}}.",
      "Scheduled flows executed by background jobs, sending through Evolution API to WhatsApp instances.",
      "Model-agnostic LLM layer (Google Gemini today) that drafts templates from a natural-language description using each dataset's variables.",
      "PostgreSQL 18 with pgvector as the vector store for RAG and semantic search.",
      "ASP.NET Core Web API (.NET 10) with CQRS and EF Core, ASP.NET Core Identity with Google OAuth, and a Next.js admin UI.",
    ],
    metrics: [
      { value: ".NET 10", label: "Web API with CQRS" },
      { value: "RAG", label: "on PostgreSQL + pgvector" },
      { value: "Any LLM", label: "provider-agnostic layer" },
    ],
    diagram: [
      { label: "Frontend", items: ["Next.js + React admin UI"] },
      { label: "Backend", items: [".NET 10 Web API (CQRS)", "Background job scheduler", "LLM layer ⇄ Gemini"] },
      { label: "Data & messaging", items: ["PostgreSQL + pgvector", "Evolution API → WhatsApp"] },
    ],
    diagramCaption: "Provider-agnostic LLM layer: swap models without touching business logic.",
    stack: ["C#", ".NET 10", "ASP.NET Core", "EF Core", "PostgreSQL", "pgvector", "Next.js", "React", "TypeScript", "Google Gemini", "Evolution API"],
    repo: "https://github.com/jonathan-macias/MessageFlow-API",
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  context: string;
  bullets: string[];
  earlier?: { title: string; period: string; detail: string };
};

export const experience: Role[] = [
  {
    company: "Nelumbo Consultores",
    title: ".NET Developer · Azure & Power Platform",
    period: "Jan 2025 – Present",
    context: "Software consultancy · International clients in Mexico across financial services, leasing and fintech",
    bullets: [
      "Built an asset-remarketing platform (.NET 10, React, SQL Server) with an internal back office and a customer portal for auctions and direct sales: bidding, accept / reject / relaunch workflows, personalized dashboards and role-based access.",
      "Secured internal and customer users with Microsoft Entra ID and Amazon Cognito (JWT, RBAC); synced data from client data warehouses and deployed on Azure App Service with Storage and Key Vault.",
      "Reduced SQL Server / Azure SQL query execution time by 35% by rewriting stored procedures and redesigning indexes.",
      "Developed .NET microservices for a prepaid-card payroll platform using CQRS, RabbitMQ and PostgreSQL on AWS.",
      "Built a Python / FastAPI gateway that centralizes and secures access to data warehouse APIs in a restricted network.",
      "Delivered Power Platform solutions for collections, lease terminations and WhatsApp campaigns, with Power Automate flows that eliminated 15+ hours per week of manual work.",
    ],
  },
  {
    company: "Epsilon Tech SAS (formerly CS Software SAS)",
    title: "Full-Stack .NET Developer",
    period: "Aug 2021 – Jan 2025",
    context: "Commercial, accounting and e-invoicing software for retailers and restaurants",
    bullets: [
      "Built the cloud version of the company's accounting and e-invoicing platform on .NET 8, ASP.NET Core and React / Next.js, migrating it from the .NET Framework 4.8 monolith that I also maintained.",
      "Containerized services with Docker and built CI/CD pipelines to Azure App Service, cutting deployment time by 40% with zero-downtime releases.",
      "Consolidated REST API integrations, reducing development time for new features by 25%; integrated e-invoicing providers and POS systems.",
      "Improved response times by 30% by optimizing APIs, PostgreSQL indexes and queries; mentored junior developers on testing and TDD.",
    ],
    earlier: {
      title: "IT Support Technician",
      period: "Jul 2019 – Aug 2021",
      detail: "Started in IT support and grew into a software development role within the company.",
    },
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Backend", items: ["C#", ".NET 10 / 8", "ASP.NET Core", ".NET Framework", "EF Core", "LINQ", "REST APIs", "Microservices", "CQRS", "Python", "FastAPI", "Pydantic"] },
  { group: "AI / LLM", items: ["AI agents", "Tool calling", "Structured outputs", "RAG", "pgvector", "MCP", "LLM evals", "LLM-as-judge", "Prompt-injection defense", "Pydantic AI", "Google Gemini", "Claude Code"] },
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { group: "Cloud & DevOps", items: ["Azure App Service", "Azure SQL", "Key Vault", "Azure Storage", "AWS", "Docker", "GitHub Actions", "CI/CD"] },
  { group: "Data & Messaging", items: ["SQL Server", "PostgreSQL", "Dataverse", "Query optimization", "RabbitMQ", "Twilio", "Mailgun"] },
  { group: "Power Platform", items: ["Power Apps", "PCF", "Power Automate", "Custom Connectors", "Power BI"] },
  { group: "Security & Quality", items: ["Microsoft Entra ID", "Amazon Cognito", "OAuth 2.0 / OIDC", "JWT", "xUnit", "pytest", "TDD", "SOLID"] },
];

export const education = [
  { degree: "B.S. in Systems Engineering", school: "Fundación de Educación Superior San José", year: "2023" },
  { degree: "Technologist, Information Systems Analysis and Development", school: "SENA", year: "2016" },
];

export const languages = ["Spanish — native", "English — professional working proficiency"];
