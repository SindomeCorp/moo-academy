import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';

const root = fileURLToPath(new URL('../', import.meta.url));
// Reuse the development handler and let the OS allocate an unused loopback port.
const server = spawn('python3', ['-u', '-c', `
from runpy import run_path
from functools import partial
app = run_path('scripts/serve.py')
handler = partial(app['Handler'], directory='dist')
with app['ThreadingHTTPServer'](('127.0.0.1', 0), handler) as server:
    print(server.server_port, flush=True)
    server.serve_forever()
`], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });

let browser;
let serverErrors = '';
server.stderr.on('data', chunk => { serverErrors += chunk; });
try {
  const port = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Screenshot server startup timed out.')), 10_000);
    const finish = (error, value) => {
      clearTimeout(timeout);
      if (error) reject(error); else resolve(value);
    };
    let output = '';
    server.stdout.on('data', chunk => {
      output += chunk;
      if (/^\d+\n/.test(output)) finish(null, Number(output.split('\n')[0]));
    });
    server.once('error', error => finish(error));
    server.once('exit', code => finish(new Error(`Screenshot server exited (${code}): ${serverErrors}`)));
  });
  browser = await chromium.launch({
    ...(process.env.MOO_BROWSER_EXECUTABLE ? { executablePath: process.env.MOO_BROWSER_EXECUTABLE } : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1,
    locale: 'en-US', timezoneId: 'UTC', reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/`);
  await expect(page.locator('#runButton')).toBeEnabled({ timeout: 30_000 });
  await page.locator('[data-lesson-id="comments"]').click();
  const editor = page.locator('#codeEditor');
  await editor.fill((await editor.inputValue()).replace('player:tell(', '"Print a greeting for the learner.";\nplayer:tell('));
  await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Hello from MOO!', { timeout: 30_000 });
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#output')).toContainText('Return: 0');
  await expect(page.locator('#output')).toContainText('Objective passed');
  await expect(page.locator('#editorPanel .persistence-status')).toHaveText('Saved in this browser.');
  await expect(page.locator('#startupNotice')).not.toBeVisible();
  await expect(page.locator('#toast')).not.toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
  const directory = new URL('../docs/screenshots/', import.meta.url);
  await mkdir(directory, { recursive: true });
  const target = fileURLToPath(new URL('overview.png', directory));
  await page.screenshot({ path: target, animations: 'disabled' });
  console.log(`Saved ${target}`);
} finally {
  try { await browser?.close(); } finally { server.kill(); }
}
