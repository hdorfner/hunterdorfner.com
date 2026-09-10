# HunterDorfner.com · Version 2

A professional portfolio and learning space at the intersection of supply chain, operations, technology, and analytics. V2 replaces the original one-page HTML/CSS site with Astro-generated static pages, reusable components, typed case-study content, and two small Lab experiments.

## Start here

Use **Node 24 LTS** (`.nvmrc`; Astro requires at least Node 22.12) and npm. There are no required environment variables or production credentials for local work.

```bash
npm install
npm run dev
```

Open the local address printed by Astro (port 4173). To reproduce the locked dependency install, use `npm ci`. Development binds to `0.0.0.0` so remote development previews can reach it; do not expose a development server on an untrusted network. `terminal.local` is an explicitly allowed development-preview host and is never a production URL.

```bash
npm run build          # static output in dist/; does not deploy
npm run preview        # serve the production build locally
npm run validate       # formatting, Astro/TypeScript, build, Node tests
npm run deploy:dry-run # validate Worker packaging without deploying
npm run format         # format source, styles, and documentation
```

`npm test` checks an existing `dist/`; run a fresh build first after making changes. `.gitignore` excludes build output, dependencies, runtime state, logs, and local environment files.

## Stack and decisions

- **Astro 7, static output:** complete HTML for every route; no React, client router, server functions, database, or Cloudflare adapter.
- **Typed data:** project records and career content are separate from presentation. A five-project collection does not need a CMS or content-layer dependency. Move case studies to Astro content collections if longer Markdown becomes useful.
- **CSS design tokens:** navy, blue, white, system fonts, restrained borders, and generous spacing. No web-font requests, UI framework, or animation library.
- **Progressive enhancement:** a small shared mobile-menu script; dashboard filtering and calculator code only on their respective routes. The dashboard renders all records without JavaScript; the calculator provides a clearly labeled static example with disabled inputs until its script is ready.
- **Minimal runtime dependencies:** Astro is the only direct production dependency. TypeScript, Astro Check, Prettier with its Astro plugin, and Wrangler are development tools. `package-lock.json` pins transitive versions.
- **AI-assisted learning project:** the website case study describes the development assistance honestly. See [the architecture walkthrough](docs/ARCHITECTURE.md).

## Project structure

| Location                          | Purpose                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `src/pages/`                      | Home, About, Experience, Projects, Lab, Resume, Contact, 404; file-based routes |
| `src/pages/projects/[slug].astro` | Generates one static case study per project record                              |
| `src/layouts/Layout.astro`        | Shared document, metadata, Person JSON-LD, header, footer                       |
| `src/components/`                 | Header, Footer, ProjectCard, Experience, PageIntro, ContactCTA                  |
| `src/data/`                       | Site identity, navigation, skills, projects, experience                         |
| `src/lib/transportation.mjs`      | Deterministic synthetic records and tested calculation functions                |
| `src/styles/global.css`           | Design tokens, responsive layout, focus, print, reduced motion                  |
| `src/pages/sitemap.xml.ts`        | Build-time sitemap; explicit route list plus generated projects                 |
| `src/pages/data/shipments.csv.ts` | Build-time CSV generated from the same dashboard records                        |
| `public/`                         | Favicon, social image, robots.txt, Cloudflare response headers                  |
| `tests/`                          | Build artifact/link/metadata checks and calculation tests                       |
| `docs/`                           | Architecture, repository audit, validation record, social asset provenance      |

## Adding a project

1. Add a record to `src/data/projects.ts` using the `Project` type. Use a unique lowercase, hyphenated slug, truthful status, specific summary, appropriate tags, and case-study sections.
2. Distinguish completed work from demonstrations and proposed work. Publish no employer records, customer-identifying data, proprietary reports, or sensitive procedures.
3. The landing page, detail route, and sitemap use that record automatically. The first two records are currently selected for the homepage.
4. Run `npm run validate`. The page-count assertion in `tests/site.test.mjs` is intentionally explicit; update it when deliberately adding or removing a route.

## Adding a Lab experiment

1. Create `src/pages/lab/your-experiment.astro` and use the shared layout.
2. Put pure calculations in `src/lib/`; keep browser interaction in a page-level `<script>` and use semantic form controls.
3. Give the page a useful initial state and explain data sources, units, assumptions, and limitations.
4. Add its link to `src/pages/lab/index.astro` and its URL to `src/pages/sitemap.xml.ts`.
5. Test nontrivial calculations with Node's built-in test runner; inspect keyboard, narrow-screen, and no-JavaScript behavior.

## Résumé and content maintenance

No résumé PDF existed in V1. The Resume page currently offers an email request and links to verified experience and education. To enable a download, put a reviewed PDF at `public/resume/hunter-dorfner-resume.pdf`, then set `site.resume` in `src/data/site.ts` to `/resume/hunter-dorfner-resume.pdf`. The interface automatically becomes a real download link. Do not add a dead link or an invented résumé.

Career dates follow the V2 brief. The idle reduction is a **relative** reduction, not percentage points. THON fundraising is credited to the organization. The Dari Delite case study separates existing support from a future platform roadmap. Review all public copy before merging.

## Cloudflare deployment — preserve the existing application

The repository's original `wrangler.jsonc` identifies a **Workers Static Assets** application named **`hunterdorfner-personal`**, serving `dist`. V2 preserves that name, assets directory, and compatibility date. It adds explicit `404-page` handling. This is repository evidence; account-side hosting, Git integration, domains, branch controls, and production settings must be confirmed in the existing Cloudflare project before merging.

The old `.cloudflare/pages.yml` was not a supported Cloudflare build configuration. It was removed, along with README claims that Cloudflare automatically read it. Workers and Pages are distinct deployment paths; do not create a new application or migrate DNS just to ship V2.

### If the existing application is Workers

Review the existing application's build settings:

| Setting           | Expected value                       |
| ----------------- | ------------------------------------ |
| Production branch | `main`                               |
| Root directory    | repository root                      |
| Node version      | `24` (or supported Node >=22.12)     |
| Build command     | `npm run build`                      |
| Deploy command    | `npx wrangler deploy`                |
| Worker name       | `hunterdorfner-personal` (preserved) |
| Static assets     | `./dist`                             |

Do not run a production deploy from the V2 branch. `npm run deploy:dry-run` validates local configuration without uploading. A non-production branch must **not** run the production deploy command against the same Worker; confirm branch controls in Cloudflare before relying on automatic previews. Use only separately configured preview/version deployment controls. No production credential is needed for a local build.

### If the account actually uses Pages

Keep the existing Pages application and custom domain. Configure **build `npm run build`, output `dist`, root repository root, Node 24, production branch `main`** in its existing Git integration. Do not run the Workers deployment command from Pages. The checked-in Wrangler configuration intentionally remains the existing Workers configuration; do not mix `assets` and `pages_build_output_dir` into one file. If Pages configuration-as-code is desired later, first export/review that project's real settings and make a separate reviewed configuration change.

### Merge and rollback

This V2 work belongs on a development branch and requires a reviewed PR into `main`. Before merging, confirm Node/build settings and inspect a non-production preview if configured. After an approved merge, check the home page, a deep project URL, the Lab, a missing URL (HTTP 404), sitemap, social card, headers, and custom domain. Revert the V2 merge or use the existing provider's previous deployment rollback if needed; do not delete the live project or alter DNS.

References: [Astro on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/), [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), [Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).

## SEO, accessibility, and performance

Each page has its own title and description, canonical URL, Open Graph and Twitter metadata. Person JSON-LD contains only supplied professional information. `public/og.png` is a dedicated landscape social image, not a favicon; it is shared site-wide while titles and descriptions remain page-specific. The static sitemap includes public pages and excludes the noindex 404. Existing homepage fragment links for introduction, experience, education, and contact remain valid.

Semantic landmarks, a skip link, one H1 per page, visible focus, disclosure navigation with `aria-expanded`, Escape handling, table captions, labels, live result announcements, and reduced-motion styling provide the accessibility foundation. No percentage skill bars are used. Tests check structural properties; they are not a substitute for screen-reader review.

Only the navigation and interactive Lab behavior ship browser JavaScript. System fonts eliminate font downloads; the social image is metadata-only and does not load into the page body. Cloudflare `_headers` supplies basic response hardening and long-lived caching for hashed Astro assets. No form submission service, tracking cookies, or client secrets are introduced.

## Privacy-conscious analytics — deliberately disabled

No Cloudflare account or analytics token was available for configuration verification. No analytics script is included in the source. To enable later, choose **one** method to avoid duplicate beacons:

1. **Proxied domain:** Cloudflare dashboard → Web Analytics → Add a site → select `hunterdorfner.com` → Done. Review automatic injection and regional collection settings under Manage site.
2. **Pages:** existing Pages project → Metrics → Enable under Web Analytics. Cloudflare injects the beacon on the next deployment.
3. **Manual snippet:** Web Analytics → Add a site → hostname → Manage site → copy the generated JavaScript snippet. Add it immediately before `</body>` in `Layout.astro`, with a production-host guard if previews share the same build. Disable automatic injection if using this method. Never insert an account API credential; the snippet uses a public site identifier.

After enabling, confirm exactly one beacon on the production hostname and check that data arrives. Keep preview traffic out. Document the changed collection behavior, adjust the external-script test intentionally, and review privacy disclosures for the actual configuration. [Official enablement guide](https://developers.cloudflare.com/web-analytics/get-started/).
