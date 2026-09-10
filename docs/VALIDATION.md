# V2 validation record

## Passed locally

- `npm install` and a fresh lockfile install with `npm ci`.
- `npm run validate`: formatting, Astro/TypeScript checks, static production build, and all **12 tests**.
- Astro: **15 HTML pages**, **0 errors, 0 warnings, 0 hints** in the type/template check. Sitemap and CSV are additional static outputs.
- Every internal link, local asset reference, and linked fragment resolves against the build output.
- Unique page titles/descriptions, canonical metadata, Open Graph/Twitter metadata, Person JSON-LD, one H1 and one main landmark per page, language, and skip link.
- Sitemap exactly matches the 14 public content routes; 404 is excluded and noindex. Robots references the canonical sitemap.
- Dashboard CSV reconciles with all 24 synthetic records. Weighted cost-per-mile, on-time percentage, empty summary, region totals, calculator formula, and invalid input cases pass.
- Generated HTML has no development client, internal-preview URLs, or third-party script URLs.
- PNG signature verified and social card visually inspected.
- Workers `wrangler deploy --dry-run` succeeds with existing Worker identity, no bindings, and no upload/deployment.
- `npm audit --omit=dev --audit-level=moderate`: **0 vulnerabilities** at time of validation.
- Source review and credential-pattern scan found no API keys, private key blocks, GitHub tokens, or AWS access keys in deliverables. No employer datasets, customer identifiers, personal home address, health, salary, or other private profile information added.
- `git diff --check` passes.

## Performance measurements

Production homepage HTML: approximately **10.1 KB raw / 3.3 KB gzip**. Shared CSS: approximately **17.2 KB raw / 4.4 KB gzip** per route (Astro emits route-specific variants). The three Lab module files total approximately **2.6 KB raw / 1.5 KB gzip**; routes load only the modules they use. The small shared navigation script is inlined by Astro. No client UI framework or remote fonts. The social PNG is metadata-only, not a body image request.

These are build artifact sizes, **not Lighthouse scores** or a claim about real-user performance.

## Accessibility review performed

Reviewed source for semantic navigation, current-page states, menu disclosure, Escape/focus behavior, no-JavaScript fallbacks, labeled inputs, native validation, live result updates, table caption and headers, visible focus, responsive breakpoints, and reduced motion.

Calculated principal color contrasts: body text on white 14.9:1, muted text on white 6.32:1, muted text on the light surface 5.83:1, blue links on white 6.28:1. Focus indicator is 3.38:1 on white and 4.89:1 on navy. These targeted checks do not replace a rendered accessibility audit.

## Browser limitation — required before merge

The supervised preview initially received duplicate command flags. The dev script and explicit Astro server settings were corrected, after which the preview service reported healthy. The cloud browser connection then stalled; recovery documentation retrieval stalled as well. Browser/visual checks could not be completed. No rendered screenshots, responsive viewport results, real keyboard-interaction results, axe audit, screen-reader results, or Lighthouse score are claimed.

Before merging, inspect all routes at 1440px, 1024px, 768px, 390px, and 320px, plus 200% zoom. Verify:

- no unintended horizontal page overflow, clipped text, or overlapping cards;
- mobile Menu opens/closes, its state is announced, Escape restores focus, closed links leave the tab order;
- skip link and visible focus through navigation, project links, forms, and table scrolling;
- dashboard filtering updates all metrics, visible records, chart regions, and live status;
- calculator accepts valid inputs, rejects invalid inputs, marks prior results as stale after edits, and calculates the expected result;
- no-JavaScript navigation and static dashboard/example remain usable;
- reduced motion and screen-reader announcements;
- external LinkedIn/email interactions and a browser Lighthouse/accessibility review.

## Account-side checks — not performed

Cloudflare account settings and live infrastructure were not accessed or changed. Confirm the existing project's production branch is `main`, its Node runtime supports Astro, its build is `npm run build`, and its deployment matches the README's Workers or Pages path. Never deploy the development branch to the production Worker. Check real HTTP 404, caching/security headers, domain behavior, and social-image reachability on an approved non-production preview or after approved deployment.

Analytics is inactive in source, and no résumé PDF is invented. Review public case-study wording and approximate accomplishments before publication. The PR remains a draft pending browser and deployment review.
