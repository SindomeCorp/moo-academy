import {test as base, expect} from '@playwright/test';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {randomUUID} from 'node:crypto';

// Keep real browser services; inject failures only at the boundary being tested.
export const test = base.extend({
  expectedPageErrors: [[], {option:true}],
  observePages: [async ({context, page, expectedPageErrors, javaScriptEnabled}, use, testInfo) => {
    const errors=[], collectors=new Map();
    async function observe(p) {
      p.on('pageerror', error => errors.push(error.message));
      // Disabled-script contexts verify static HTML and cannot enable the debugger.
      if (!process.env.MOO_COVERAGE || testInfo.project.name !== 'chromium' || !javaScriptEnabled) return;
      const started=p.coverage.startJSCoverage({resetOnNavigation:false});
      let collected=false;
      const collect=async()=> {
        if(collected || p.isClosed()) return; collected=true;
        await started;
        const entries=await p.coverage.stopJSCoverage(), result=[];
        for(const entry of entries) {
          const url=new URL(entry.url || 'about:blank');
          if(!/^\/[a-z-]+\.js$/.test(url.pathname)) continue;
          const filename=resolve('dist',url.pathname.slice(1));
          // Fault-injected module replacements are not coverage of authored source.
          if(entry.source !== await readFile(filename,'utf8')) continue;
          result.push({scriptId:String(result.length),url:pathToFileURL(filename).href,functions:entry.functions});
        }
        await mkdir('coverage/tmp',{recursive:true});
        await writeFile(`coverage/tmp/browser-${randomUUID()}.json`,JSON.stringify({result}));
      };
      collectors.set(p,collect);
      const close=p.close.bind(p);
      p.close=async options=>{await collect();return close(options);};
      await started;
    }
    const pending=[];
    const onPage=p=>pending.push(observe(p));
    context.on('page',onPage);
    await observe(page);
    await use();
    context.off('page',onPage);
    await Promise.all(pending);
    for(const collect of collectors.values()) await collect();
    const allowed=[...expectedPageErrors,...testInfo.annotations.filter(a=>a.type==='expected-page-error').map(a=>a.description)];
    expect(errors.filter(message=>!allowed.some(pattern=>new RegExp(pattern).test(message)))).toEqual([]);
  },{auto:true}],
});
export {expect};
export async function ready(page, mode='training') {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  if(mode==='sandbox') {await page.locator('#workspaceMode').selectOption(mode);await expect(page.locator('#runButton')).toBeEnabled();}
}
export async function readyBuiltins(page) {
  await ready(page);
  await page.locator('#trackSelect').selectOption('builtins');
  await expect(page.locator('#runButton')).toBeEnabled();
}
export async function saved(page) {
  await expect(page.locator('#editorPanel .persistence-status')).toHaveText('Saved in this browser.');
}
export async function run(page, source, expected='Return:') {
  await page.getByRole('tab',{name:'Code',exact:true}).click();
  await page.locator('#codeEditor').fill(source); await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText(expected);
  await expect(page.locator('#runButton')).toBeEnabled();
}
export async function openWorld(page) { if (!await page.locator('#worldPanel').isVisible()) await page.getByRole('tab',{name:'World',exact:true}).click(); }
export async function failWrites(page, store=true) {
  await page.evaluate(store=>{
    window.originalPut ??= IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put=store ? function(...args){
      if(args[1]!=='writer-lease' && (store===true || this.name===store)) throw new DOMException('Quota exceeded','QuotaExceededError');
      return window.originalPut.apply(this,args);
    } : window.originalPut;
  },store);
}
export async function record(page, store='world', key, value) {
  return page.evaluate(async ({store,key,value})=>{
    if(key===undefined){const profile=document.querySelector('#runtimeProfileSelect')?.value??'toaststunt';const scope=document.querySelector('#workspaceMode')?.value==='sandbox'?(document.querySelector('#sandboxWorld')?.value&&document.querySelector('#sandboxWorld').value!=='basic'?'sandbox-'+document.querySelector('#sandboxWorld').value:'sandbox'):document.querySelector('#trackSelect')?.value??'foundations';key=scope==='foundations'?(profile==='toaststunt'?'current':'lambdamoo'):`path:${profile}:${scope}`;}
    const db=await new Promise((r,j)=>{const q=indexedDB.open('moo-field-manual-workspace',1);q.onsuccess=()=>r(q.result);q.onerror=()=>j(q.error);});
    try {return await new Promise((r,j)=>{
      const tx=db.transaction(store,value===undefined?'readonly':'readwrite');
      const request=value===undefined?tx.objectStore(store).get(key):tx.objectStore(store).put(value,key);
      tx.oncomplete=()=>r(request.result);tx.onabort=()=>j(tx.error);
    });} finally {db.close();}
  },{store,key,value});
}
export async function loseOwnership(page) {
  await record(page,'world','writer-lease',{writerId:'other-tab',expiresAt:Date.now()+30000});
  await expect(page.locator('#codeEditor')).toBeDisabled();
}

export async function browse(page) {
  if (await page.locator('#browseLessons').isVisible() && !await page.locator('#lessonDrawer').isVisible()) await page.locator('#browseLessons').click();
}
export async function codeView(page) {
  if (!await page.locator('#editorPanel').isVisible()) await page.getByRole('tab',{name:'Code',exact:true}).click();
}
export async function worldManagement(page) {
  await codeView(page);
  if (!await page.locator('#resetWorld').isVisible()) await page.locator('.world-management summary').click();
}
export async function expectProperty(page, name, expected) {
  const tab = await page.locator('.tab[aria-selected=true]').getAttribute('data-tab');
  const selection = (await page.locator('#worldDetail h2').textContent()).match(/^#(\d+)/)?.[1];
  await codeView(page); await page.locator('#inspectWorld').click();
  const field = name === 'parent' ? page.locator('#worldDetail > .world-field').filter({has:page.locator('strong', {hasText:'Parent (inheritance)'})}) : ['name','owner'].includes(name) ? page.locator('#worldDetail > .world-field').filter({has:page.locator('strong', {hasText:new RegExp('^'+name+'$')})}) : page.locator(`[data-property="${name}"] .world-field`).filter({has:page.locator('strong',{hasText:'Effective value'})});
  await expect.poll(async()=>{
    const text = await field.locator(':scope > :last-child').textContent();
    return name === 'parent' ? text.split(' — ')[0] : text;
  }).toBe(expected);
  if (selection && selection !== '42') {
    await page.locator('#worldSearch').fill('#'+selection); await page.locator('#worldTree [data-object-id]').first().click();
  }
  const prior = page.locator(`.tab[data-tab="${tab}"]`);
  if (await prior.isVisible()) await prior.click();
}
