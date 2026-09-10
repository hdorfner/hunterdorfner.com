export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  year: string;
  role: string;
  note: string;
  sections: { title: string; body: string }[];
  demo?: { href: string; label: string };
}
export const projects: Project[] = [
  {
    slug: 'fleet-idle-reduction',
    title: 'Fleet Idle Reduction',
    category: 'Operations / Analytics',
    status: 'Completed initiative',
    summary:
      'Turning a regional performance goal into a repeatable process for managers and drivers.',
    tags: ['Excel', 'Change management', 'Operations analytics'],
    metric: '≈37%',
    metricLabel: 'reduction in idle percentage',
    year: 'J.B. Hunt · 2025',
    role: 'Regional initiative lead',
    note: 'Sanitized account of professional work. Figures are approximate; no employer datasets, fleet identities, or internal reports are published.',
    sections: [
      {
        title: 'Problem',
        body: 'Reducing driver idle percentage across approximately 10 fleets and roughly 800 drivers required more than a target. Managers needed a consistent way to understand performance, identify opportunities, and follow through with drivers.',
      },
      {
        title: 'Approach',
        body: 'I connected measurement with a practical management routine: Excel reporting, performance checkpoints, manager coordination, and individual driver improvement plans. The aim was to make the next action clear, rather than simply circulate another report.',
      },
      {
        title: 'Tools',
        body: 'Excel supported recurring performance reporting. Communication materials and driver improvement plans helped translate those reports into conversations and actions. Original spreadsheets and operational data are not shared here.',
      },
      {
        title: 'Implementation',
        body: 'I led the regional effort, coordinated with managers across participating fleets, and used recurring checkpoints to keep attention on progress. Driver improvement plans and communication materials reinforced the same objective at the fleet level.',
      },
      {
        title: 'Outcome',
        body: 'The initiative resulted in an approximately 37% relative reduction in idle percentage over roughly three months. That is a relative reduction, not a 37-percentage-point change. No fuel savings or emissions estimate is claimed without supporting data.',
      },
      {
        title: 'Lessons & impact',
        body: 'The lesson I take from this work is that reporting matters most when it changes a decision or a behavior. A clear measure, a consistent review rhythm, and people who understand their next step can make improvement repeatable.',
      },
    ],
  },
  {
    slug: 'transportation-analytics-dashboard',
    title: 'Transportation Analytics Dashboard',
    category: 'Data / Visualization',
    status: 'Synthetic-data demo',
    summary:
      'A small, inspectable dashboard exploring service, shipment volume, and transportation cost.',
    tags: ['Data visualization', 'JavaScript', 'Synthetic data'],
    metric: '24',
    metricLabel: 'demonstration shipments',
    year: 'Portfolio · V2',
    role: 'Learning project',
    note: 'Every shipment, carrier, cost, and service result is synthetic. This demonstration contains no employer data and is not a live operations tool.',
    demo: { href: '/lab/transportation-dashboard/', label: 'Open the dashboard' },
    sections: [
      {
        title: 'Problem',
        body: 'Transportation teams need to see service and cost together. This portfolio exercise asks a simple question: how can a small dashboard make those measures understandable without hiding the underlying records?',
      },
      {
        title: 'Approach',
        body: 'A fixed set of 24 fictional shipments feeds the summary measures, regional cost comparison, and accessible data table. Filtering by region recalculates all of the displayed results from the same records.',
      },
      {
        title: 'Tools',
        body: 'The current demonstration uses Astro, TypeScript, JavaScript, and CSS. A downloadable CSV makes the example data available for independent exploration in Excel. Power BI, SQL, and Python are planned extensions, not technologies claimed as implemented in this demo.',
      },
      {
        title: 'Implementation',
        body: 'Summary values are calculated at build time for a useful no-JavaScript page. A small browser script adds region filtering. Cost per mile divides total cost by total miles, rather than averaging shipment rates; on-time delivery uses the count of on-time records divided by all selected records.',
      },
      {
        title: 'Outcome',
        body: 'A working, lightweight demonstration with transparent calculations and inspectable source records. It makes no claim about real-world service levels, savings, or employer performance.',
      },
      {
        title: 'Next experiments',
        body: 'Recreate the measures in SQL, build a Power BI report from the same CSV, and use Python to validate the results. Keeping a common demonstration dataset would make those implementations easier to compare.',
      },
    ],
  },
  {
    slug: 'thon-event-operations',
    title: 'Penn State THON Event Operations',
    category: 'Leadership / Event operations',
    status: 'Completed leadership experience',
    summary:
      'Coordinating people, safety planning, and event operations at a substantial volunteer scale.',
    tags: ['Leadership', 'Risk management', 'Coordination'],
    metric: '≈1,200',
    metricLabel: 'committee members',
    year: 'Penn State · 2023–2024',
    role: 'Rules & Regulations Event Safety Director',
    note: 'Leadership scope is approximate. The fundraising figure describes the organization’s collective result, not money individually raised. No sensitive safety procedures are published.',
    sections: [
      {
        title: 'Problem',
        body: 'Large-scale event operations depend on people making consistent decisions under changing conditions. Event safety required coordinated planning, clear responsibilities, and communication across a substantial volunteer organization.',
      },
      {
        title: 'Approach',
        body: 'As a member of the THON Executive Committee, I led approximately 21 captains and roughly 1,200 committee members. My responsibilities brought leadership, event operations, safety planning, and budget stewardship together.',
      },
      {
        title: 'Tools & decision making',
        body: 'Planning, budget management, and coordination were central to the work. This case study focuses on the leadership responsibility and the value of using operational information to inform decisions; internal plans and safety details remain private.',
      },
      {
        title: 'Implementation',
        body: 'I contributed to large-scale event operations and safety planning while managing an approximately $75,000 budget. The work required coordinating across teams and helping captains connect their responsibilities to the broader event.',
      },
      {
        title: 'Outcome',
        body: 'I supported an organization that raised approximately $16.9 million during that cycle. My contribution was through executive leadership and event operations as part of a much larger collective effort.',
      },
      {
        title: 'Lessons & impact',
        body: 'This experience shaped how I think about leadership: clear ownership and preparation help people make better decisions when the pace increases. That perspective carries directly into transportation and operations work.',
      },
    ],
  },
  {
    slug: 'hunterdorfner-com',
    title: 'HunterDorfner.com',
    category: 'Web development / Learning',
    status: 'Version 2',
    summary: 'Evolving a one-page introduction into a static portfolio built to grow.',
    tags: ['Astro', 'TypeScript', 'CSS', 'Cloudflare'],
    metric: 'V1 → V2',
    metricLabel: 'from a page to a platform',
    year: 'Personal project · 2026',
    role: 'Project owner · AI-assisted development',
    note: 'V2 was developed with AI assistance under my direction. This project is also a learning environment; it does not imply that I independently authored every line of code.',
    sections: [
      {
        title: 'Starting point',
        body: 'Version 1 was a plain HTML/CSS page containing an introduction, experience, education, and contact links. Its simplicity made it fast, but adding case studies and experiments would have meant repeating more markup and styles.',
      },
      {
        title: 'Architecture',
        body: 'Version 2 uses Astro to generate static HTML. A shared layout owns metadata and the page shell. Header, Footer, ProjectCard, and Experience components keep repeated patterns consistent, while typed project records generate individual case-study routes.',
      },
      {
        title: 'Technology',
        body: 'Astro, TypeScript, semantic HTML, CSS design tokens, and small JavaScript modules form the site. Git and GitHub support reviewable changes. Cloudflare can serve the generated assets without a server-rendering adapter or a client-side application framework.',
      },
      {
        title: 'Implementation',
        body: 'Dedicated routes separate the portfolio, background, experience, résumé area, and Lab. The Lab starts with a synthetic transportation dashboard and cost calculator. Shared metadata, a sitemap, an accessible mobile menu, and reduced-motion styles form the foundation for future additions.',
      },
      {
        title: 'Lessons to carry forward',
        body: 'The most useful concepts to learn here are the separation of content from presentation, file-based routing, reusable components, and progressive enhancement. Static HTML does the primary work; JavaScript adds only the interactions that need it.',
      },
      {
        title: 'Next chapter',
        body: 'Use this site to practice adding a new case study, testing an experiment, and reviewing a pull request before applying those habits to a future Dari Delite rebuild.',
      },
    ],
  },
  {
    slug: 'dari-delite-digital-platform',
    title: 'Dari Delite Digital Platform',
    category: 'Small business / Digital',
    status: 'Ongoing work · future roadmap',
    summary: 'Bringing a family business perspective to a more connected digital presence.',
    tags: ['Small-business operations', 'Digital marketing', 'Branding'],
    metric: 'Local roots.',
    metricLabel: 'a more connected digital presence',
    year: 'Bridgeville, Pennsylvania',
    role: 'Family-business digital support',
    note: 'A developing case study. Completed support is distinguished from proposed work; no unverified sales, conversion, or revenue impact is claimed.',
    sections: [
      {
        title: 'Context',
        body: 'Dari Delite is my family’s seasonal ice cream business in Bridgeville, Pennsylvania. Working around a small business makes the connection between customer communication and everyday operations tangible.',
      },
      {
        title: 'Work to date',
        body: 'My support has included website content, digital marketing, email communication, signage, and branding materials. These are practical pieces of the customer experience: helping people find information, understand what is available, and stay connected to the business.',
      },
      {
        title: 'Approach',
        body: 'Keep information clear and consistent across the website, social channels, email, and in-store signage. Evaluate each digital addition by whether it helps a customer or makes the business easier to run.',
      },
      {
        title: 'Potential platform',
        body: 'A future rebuild could connect product information, hiring, email marketing, merchandise, and simple analytics. These are areas for exploration, not a claim that a unified platform or new e-commerce system has already been completed.',
      },
      {
        title: 'Current outcome',
        body: 'This page establishes the project’s scope and gives future work a place to be documented. Results and examples can be added as individual pieces are completed and reviewed for publication.',
      },
      {
        title: 'What I am learning',
        body: 'A small business needs technology that fits the way it operates. This personal website is a place to practice development and deployment before taking on a larger business-facing rebuild.',
      },
    ],
  },
];
