import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { shipments } from '../src/lib/transportation.mjs';
const root = new URL('../dist/', import.meta.url).pathname;
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const pages = walk(root).filter((path) => path.endsWith('.html'));
const routes = pages
  .filter((path) => !path.endsWith('/404.html'))
  .map((path) => '/' + relative(root, path).replace(/index\.html$/, ''));
const attrs = (html, tag, attr) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]*)"`, 'g'))].map(
    (match) => match[1],
  );
const read = (path) => readFileSync(path, 'utf8');

test('all portfolio routes are built, with unique metadata and semantic landmarks', () => {
  assert.equal(pages.length, 15);
  const titles = new Set(),
    descriptions = new Set();
  for (const path of pages) {
    const html = read(path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && description, path);
    assert.ok(!titles.has(title), `Duplicate title: ${path}`);
    assert.ok(!descriptions.has(description), `Duplicate description: ${path}`);
    titles.add(title);
    descriptions.add(description);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.equal((html.match(/<main\b/g) || []).length, 1, path);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /href="#main"/);
    assert.match(html, /<link rel="canonical" href="https:\/\/hunterdorfner.com\//);
    for (const name of [
      'og:title',
      'og:description',
      'og:url',
      'og:image',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
    ])
      assert.ok(html.includes(`"${name}"`), `${path}: ${name}`);
    assert.match(html, /https:\/\/hunterdorfner.com\/og.png/);
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema['@type'], 'Person');
    assert.equal(schema.name, 'Hunter Dorfner');
  }
});
test('all local links, assets, and fragments resolve', () => {
  for (const path of pages) {
    const html = read(path);
    const base = new URL(
      '/' + relative(root, path).replace(/index\.html$/, ''),
      'https://hunterdorfner.com',
    );
    for (const href of [
      ...attrs(html, 'a', 'href'),
      ...attrs(html, 'link', 'href'),
      ...attrs(html, 'script', 'src'),
      ...attrs(html, 'img', 'src'),
    ]) {
      if (/^(mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, base);
      if (url.origin !== base.origin) continue;
      let target = join(root, url.pathname);
      if (url.pathname.endsWith('/')) target = join(target, 'index.html');
      assert.ok(existsSync(target), `${path}: missing ${href}`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(read(target).includes(`id="${id}"`), `${path}: missing fragment ${href}`);
      }
    }
  }
});
test('sitemap covers exactly the public HTML routes and robots references it', () => {
  const sitemap = read(join(root, 'sitemap.xml'));
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  assert.deepEqual(urls.sort(), routes.sort());
  assert.ok(!sitemap.includes('404'));
  assert.ok(!sitemap.includes('terminal.local'));
  assert.match(read(join(root, 'robots.txt')), /Sitemap: https:\/\/hunterdorfner.com\/sitemap.xml/);
  assert.match(read(join(root, '404.html')), /noindex, follow/);
});
test('CSV matches dashboard records and no-JavaScript output contains all shipments', () => {
  const rows = read(join(root, 'data/shipments.csv')).trim().split('\n');
  assert.equal(rows.length, 25);
  assert.equal(rows[0], 'shipment,region,carrier,miles,cost_usd,on_time');
  for (const [i, row] of shipments.entries())
    assert.equal(
      rows[i + 1],
      [row.id, row.region, row.carrier, row.miles, row.cost, row.onTime].join(','),
    );
  const html = read(join(root, 'lab/transportation-dashboard/index.html'));
  assert.equal((html.match(/<tr data-region=/g) || []).length, 24);
});
test('production HTML has no development client or external script dependencies', () => {
  for (const path of pages) {
    const html = read(path);
    assert.ok(!html.includes('@vite/client'));
    assert.ok(!html.includes('astro-dev-toolbar'));
    assert.ok(!html.includes('terminal.local'));
    assert.ok(!html.includes('localhost:'));
    assert.ok(!attrs(html, 'script', 'src').some((src) => src.startsWith('https:')));
  }
});
test('social card is a real PNG, and executable bundles stay small', () => {
  const png = readFileSync(join(root, 'og.png'));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  const scripts = walk(root).filter((path) => path.endsWith('.js'));
  assert.ok(scripts.length > 0);
  assert.ok(
    scripts.reduce((sum, path) => sum + readFileSync(path).length, 0) < 20000,
    'Unexpected browser JavaScript growth',
  );
});
