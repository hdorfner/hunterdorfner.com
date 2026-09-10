# V1 audit and V2 migration decisions

Base: `main` at `2622708` (full hash retained in Git history). All ten tracked V1 files were inspected. No AGENTS.md, lockfile, CI workflow, résumé PDF, asset library, or application framework was present.

| V1 file                       | Finding                                                                                                 | V2 action                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `index.html`                  | Single page; useful landmarks and skip link; outdated current employment; social tags reference favicon | Separate static pages with shared layout; update content to supplied dates; retain old key fragments |
| `styles.css`                  | Navy/blue palette, repeated cards, wrapping mobile navigation                                           | Shared CSS tokens, editorial hierarchy, responsive layouts and collapsible mobile menu               |
| `favicon.svg`                 | Existing monogram                                                                                       | Move intact to public/                                                                               |
| `package.json`                | Shell copy build; no dependencies or lockfile                                                           | Astro build, pinned lockfile, checks, formatter and Wrangler dry run                                 |
| `.cloudflare/pages.yml`       | Unsupported automatic Pages build-configuration claim                                                   | Remove; document real Workers versus Pages setup                                                     |
| `wrangler.jsonc`              | Worker `hunterdorfner-personal` serves `dist`, compatibility date 2024-10-24                            | Preserve identity/date/output; explicitly serve real 404 page                                        |
| `README.md`                   | Inconsistent Pages/Workers advice and favicon preview guidance                                          | Replace with reproducible setup, deployment review, content and learning instructions                |
| `.gitignore`                  | Only dist and node_modules                                                                              | Add Astro/Wrangler/runtime state, local env files, logs                                              |
| `scripts/generate-preview.js` | Unused decoder; not invoked by build                                                                    | Remove obsolete script                                                                               |
| `social-preview.base64`       | Unused PNG payload; decoded asset failed image validation                                               | Replace with a real, inspected landscape social card                                                 |

## Production boundary

No direct changes to `main`, merge, production deployment, domain, DNS, account credentials, or hosting infrastructure are part of this migration. Account-side deployment configuration is not proven by repository files alone. The PR documents what must be checked before merging.

## Deliberate exclusions

No CMS, database, server-rendering adapter, large UI framework, speculative business results, employer datasets, résumé fabrication, or placeholder download. Analytics is documented but inactive. Dashboard figures are synthetic and calculator outputs are educational estimates.
