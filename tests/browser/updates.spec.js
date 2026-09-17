import {createServer} from 'node:http';
import {test, expect} from './helpers.js';

test('updated HTML starts even when the previous unversioned app script is cached', async ({page, baseURL}) => {
  let oldScriptRequests = 0;
  const server = createServer(async (request, response) => {
    if (request.url === '/old-page') {
      response.setHeader('Content-Type', 'text/html');
      response.end('<div id="continueWorld"></div><script type="module" src="/app.js"></script>');
    } else if (request.url === '/app.js') {
      oldScriptRequests++;
      response.setHeader('Content-Type', 'text/javascript');
      response.setHeader('Cache-Control', 'max-age=3600');
      response.end('document.querySelector("#continueWorld").onclick = () => {}; window.oldAppLoaded = true;');
    } else {
      try {
        const upstream = await fetch(new URL(request.url, baseURL));
        response.writeHead(upstream.status, Object.fromEntries(upstream.headers));
        response.end(Buffer.from(await upstream.arrayBuffer()));
      } catch (error) {
        response.writeHead(500); response.end(String(error));
      }
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port;
  try {
    await page.goto(url + '/old-page');
    await expect.poll(() => page.evaluate(() => window.oldAppLoaded)).toBe(true);
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.oldAppLoaded)).toBe(true);
    expect(oldScriptRequests).toBe(1); // The browser really retained the old script.
    await page.goto(url + '/');
    await expect(page.locator('#runButton')).toBeEnabled();
    await page.locator('#trackSelect').selectOption('objects');
    await expect(page.locator('#lessonTitle')).toHaveText('Read the teaching world');
    await page.locator('#runButton').click();
    await expect(page.locator('#output')).toContainText('Return:');
    await page.reload();
    await expect(page.locator('#runButton')).toBeEnabled();
    await expect(page.locator('#trackSelect')).toHaveValue('objects');
    expect(oldScriptRequests).toBe(1);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('development server prevents stale HTML and script caching', async ({request}) => {
  for (const path of ['/', '/app.js', '/curriculum.js', '/styles.css']) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()['cache-control']).toBe('no-store');
  }
});

test('only content-addressed runtime releases receive immutable cache headers',async({request})=>{
 const manifest=await request.get('/runtime-version.js');expect(manifest.headers()['cache-control']).toBe('no-store');
 const base=(await manifest.text()).match(/runtimeBase='\.([^']+)'/)[1];
 expect(base).toMatch(/^\/runtime\/releases\/[a-f0-9]{64}$/);
 for(const file of ['/dist/worker/browser.js','/assets/tree-sitter.wasm']){
  const response=await request.get(base+file);expect(response.ok()).toBe(true);expect(response.headers()['cache-control']).toContain('immutable');
 }
});
