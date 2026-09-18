import { test, expect, ready } from './helpers.js';

const origin = 'https://moo.mudverse.com';
const pages = ['/', '/introduction.html', '/about.html', '/resources.html', '/field-notes.html', '/contact.html'];

test.describe('static public pages', () => {
  test.use({ javaScriptEnabled: false });
  for (const width of [390, 1440]) test(`content and metadata remain accessible without JavaScript at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', origin + path);
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', origin + path);
      if (path === '/') continue;
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('main')).toContainText(/MOO/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByRole('navigation', { name: 'Site navigation' }).getByRole('link', { name: 'Learning workspace' })).toHaveAttribute('href', './');
    }
    await page.goto('/introduction.html');
    await expect(page.locator('main')).toContainText('To learn LambdaMOO');
    await expect(page.locator('main')).toContainText('To learn ToastStunt');
    const sitemap = await page.request.get('/sitemap.xml');
    const urls = await page.evaluate(xml => {
      const document = new DOMParser().parseFromString(xml, 'application/xml');
      if (document.querySelector('parsererror')) throw Error('Invalid sitemap XML');
      return [...document.querySelectorAll('loc')].map(node => node.textContent);
    }, await sitemap.text());
    expect(urls.sort()).toEqual(pages.map(path => origin + path).sort());
    const image = await page.request.get('/social/overview.png');
    expect(image.status()).toBe(200); expect(image.headers()['content-type']).toContain('image/png');
    expect((await page.request.get('/missing-seo-page.html')).status()).toBe(404);
  });
});

test('workspace and index alias retain site metadata across lesson and profile changes', async ({ page }) => {
  await ready(page);
  const title = await page.title();
  await page.locator('[data-lesson-id="objects"]').click();
  await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page).toHaveTitle(title);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', origin + '/');
  await page.goto('/index.html');
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page).toHaveTitle(title);
  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', origin + '/');
});
