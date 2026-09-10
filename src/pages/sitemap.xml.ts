import { projects } from '../data/projects';
import { site } from '../data/site';
export const routes = [
  '/',
  '/about/',
  '/experience/',
  '/projects/',
  '/lab/',
  '/resume/',
  '/contact/',
  '/lab/transportation-dashboard/',
  '/lab/cost-calculator/',
  ...projects.map((project) => `/projects/${project.slug}/`),
];
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${site.url}${route}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
