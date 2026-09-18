import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';

const origin = 'https://moo.mudverse.com';
const pages = ['index.html', 'introduction.html', 'about.html', 'resources.html', 'field-notes.html', 'contact.html'];
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));

test('public pages expose unique search metadata and matching canonical/sharing URLs in initial HTML', async () => {
  const titles = new Set(), descriptions = new Set();
  assert.deepEqual((await readdir('dist')).filter(f => f.endsWith('.html')).sort(), [...pages].sort());
  const image = await readFile('dist/social/overview.png');
  assert.equal(image.readUInt32BE(16), 1440); assert.equal(image.readUInt32BE(20), 1100);
  for (const file of pages) {
    const html = await readFile(`dist/${file}`, 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const titleTags = [...head.matchAll(/<title>(.*?)<\/title>/g)];
    assert.equal(titleTags.length, 1, file);
    const title = decode(titleTags[0][1]);
    assert.ok(title.includes('MOO')); assert.ok(!titles.has(title), `Duplicate title: ${file}`); titles.add(title);
    const meta = [...head.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0]));
    const value = name => {
      const matches = meta.filter(m => m.name === name || m.property === name);
      assert.equal(matches.length, 1, `${file}: ${name}`); return matches[0].content;
    };
    const description = value('description');
    assert.ok(description.length > 50 && description.length < 200);
    assert.ok(!descriptions.has(description)); descriptions.add(description);
    const url = origin + (file === 'index.html' ? '/' : `/${file}`);
    const canonicals = [...head.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).filter(a => a.rel === 'canonical');
    assert.deepEqual(canonicals.map(a => a.href), [url]);
    assert.equal(value('og:url'), url); assert.equal(value('og:title'), title);
    assert.equal(value('og:description'), description); assert.equal(value('og:site_name'), 'MOO Academy');
    assert.equal(value('og:type'), 'website');
    assert.equal(value('twitter:card'), 'summary_large_image');
    assert.equal(value('twitter:title'), title); assert.equal(value('twitter:description'), description);
    assert.equal(value('og:image'), origin + '/social/overview.png');
    assert.equal(value('twitter:image'), value('og:image'));
    assert.equal(value('og:image:width'), '1440'); assert.equal(value('og:image:height'), '1100');
    assert.ok(value('og:image:alt')); assert.equal(value('twitter:image:alt'), value('og:image:alt'));
    assert.ok(!meta.some(m => /robots|googlebot/.test(m.name ?? '') && /noindex|nofollow/.test(m.content)), file);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      if (!href || href.startsWith('#') || /^[a-z]+:/i.test(href)) continue;
      const target = new URL(decode(href), url);
      await access('dist' + (target.pathname.endsWith('/') ? target.pathname + 'index.html' : target.pathname));
    }
    if (file === 'index.html') {
      const schema = JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
      assert.equal(schema['@context'], 'https://schema.org'); assert.equal(schema['@type'], 'WebSite');
      assert.equal(schema.name, 'MOO Academy'); assert.equal(schema.url, url); assert.equal(schema['@id'], url + '#website');
    }
  }
});

test('sitemap lists only public canonical pages and robots allows rendering assets', async () => {
  const xml = await readFile('dist/sitemap.xml', 'utf8');
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(urls.sort(), pages.map(p => origin + (p === 'index.html' ? '/' : '/' + p)).sort());
  assert.ok(!/<lastmod>|<priority>|<changefreq>/.test(xml));
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.match(robots, /User-agent: \*/); assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/moo\.mudverse\.com\/sitemap\.xml/);
  assert.ok(!/Disallow:\s*\S/.test(robots));
});
