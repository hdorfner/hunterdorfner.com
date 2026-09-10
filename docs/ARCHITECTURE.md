# A guided tour of Version 2

Start with a small edit, watch what changes, then read the code that connects it. This repository is intentionally understandable without learning a client-side framework first.

## 1. Pages are routes

`src/pages/about.astro` becomes `/about/`. Files under `src/pages/lab/` become Lab URLs. Astro renders them during `npm run build`; Cloudflare serves the resulting HTML. A `.ts` endpoint can also generate a static resource: the sitemap and demonstration CSV are examples, not live APIs.

Try: change the introductory sentence on the About page, then use `npm run dev` to see it update.

## 2. Components remove repeated markup

An Astro component has a frontmatter block between `---` markers and a template below it. Frontmatter runs at build time here. Props carry data into a component. `ProjectCard` receives a project; `Experience` receives one career entry. They do not need a browser framework to render.

Try: change the ProjectCard border or spacing once and see that every card updates.

## 3. Layouts own the page shell

`Layout.astro` renders the HTML document, metadata, Header, Footer, and a `<slot />` where each page's content goes. Pages supply a title and description. Site identity lives in `src/data/site.ts`, so contact details have one shared source.

Try: follow a page's `description` prop into the layout's HTML head.

## 4. Data and presentation have different jobs

`src/data/projects.ts` describes each project. `getStaticPaths()` in `[slug].astro` creates a route for every record. The template lays out its sections. TypeScript catches missing required fields while Astro Check catches template mistakes. The current collection is small enough that typed records keep dependencies and concepts minimal; Markdown content collections are a natural next step for longer writing.

Try: add a small, truthful learning experiment as a project record. Notice that its case-study route, project card, and sitemap entry appear together.

## 5. JavaScript is an enhancement

The homepage content and project pages work without JavaScript. The menu is visible without scripting; once scripting works, narrow screens receive a collapsible menu. The dashboard starts with real HTML for all synthetic records. Its filter changes only the data view. The calculator exposes a precomputed example and enables its inputs only when its script is ready.

Pure calculations in `src/lib/transportation.mjs` can run during a build, in the browser, and in tests. This lets the displayed metrics and downloadable data agree.

Try: change the calculator inputs, then inspect its formula and its tests. Understand why averaging shipment cost-per-mile values is different from dividing total cost by total miles.

## 6. CSS is a small design system

Start at the top of `src/styles/global.css`: colors, maximum width, radius, and font choices are shared tokens. Component classes follow. Media queries adapt the layout at narrower widths; the reduced-motion rule respects the operating-system preference. System fonts are deliberate: fast, familiar, and no third-party font requests.

Try: change a token, inspect desktop and narrow layouts, and decide whether the change improves readability across every route.

## 7. Builds and reviews protect production

`npm run validate` checks formatting, templates/types, the production build, links, metadata, sitemap, CSV, and important calculations. `npm ci` reproduces the lockfile installation. A Git branch separates an experiment from `main`; a pull request makes the final change reviewable. A successful build does not deploy the site.

Try: make one small change on a new branch, validate it, and review its diff before opening a PR. That is the same workflow to carry into a future Dari Delite rebuild.
