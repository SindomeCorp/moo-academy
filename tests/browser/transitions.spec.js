import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect,ready,run,saved,openWorld,failWrites,record,loseOwnership} from './helpers.js';
import {readFile} from 'node:fs/promises';

for(const accept of [false,true]) {
  test(`Retry after ownership loss ${accept?'confirms discarding':'preserves'} unsaved world and draft`,async({page})=>{
    await ready(page,'sandbox'); await saved(page);
    const before=await record(page);
    await failWrites(page);
    const draft='o=create(#3); o.name="Unsaved work"; return o;';
    await run(page,draft,'Return: #43');
    await failWrites(page,false); await loseOwnership(page); await openWorld(page);
    let confirmation;
    page.once('dialog',async d=>{confirmation=d.message();await (accept?d.accept():d.dismiss());});
    await page.locator('#retrySave').click();
    expect(confirmation).toContain('Unsaved world changes and drafts');
    await expect(page.locator('#codeEditor')).toHaveValue(accept?/Experiment with the world/:draft);
    await expect(page.locator('.world-status')).toContainText(accept?'7 objects':'8 objects');
    expect(await record(page)).toBe(before);
    await expect(page.locator('#runButton')).toBeDisabled();
    const download=page.waitForEvent('download'); await page.locator('#exportWorld').click();
    const exported=JSON.parse(await readFile(await (await download).path(),'utf8'));
    expect(exported.objects.some(o=>o.name==='Unsaved work')).toBe(!accept);
  });
}

for(const from of ['training','sandbox']) test(`${from}: failed save blocks mode change; retry retains the draft`,async({page})=>{
  await ready(page,from); await saved(page);
  await failWrites(page);
  const code='this.name="Keep my work"; return this.name;';
  await run(page,code,'Return: "Keep my work"');
  await page.locator('#workspaceMode').selectOption(from==='training'?'sandbox':'training');
  await expect(page.locator('#workspaceMode')).toHaveValue(from);
  await expect(page.locator('#workspaceProblem')).toContainText('pending changes');
  await expect(page.locator('#codeEditor')).toHaveValue(code);
  await failWrites(page,false); await openWorld(page); await page.locator('#retrySave').click(); await saved(page);
  await page.locator('#workspaceMode').selectOption(from==='training'?'sandbox':'training');
  await page.locator('#workspaceMode').selectOption(from);
  await expect(page.locator('#codeEditor')).toHaveValue(code);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toHaveValue(code);
});

test('failed reset preserves the working world and saved snapshot',async({page})=>{
  await ready(page,'sandbox');await run(page,'this.name="Keep me"; return create(#3);');await saved(page);
  const before=await record(page); await failWrites(page);
  page.once('dialog',d=>d.accept()); await worldManagement(page);await page.locator('#resetWorld').click();
  await expect(page.locator('#workspaceProblem')).toContainText('Reset was not saved');
  expect(await record(page)).toBe(before);
  await expect(page.locator('.world-status')).toContainText('8 objects');
  await failWrites(page,false); await run(page,'return this.name;','Return: "Keep me"');
});

for(const profile of ['toaststunt','lambdamoo']) test(`${profile}: corrupt target recovery preserves the other profile and original bytes`,async({page})=>{
  await ready(page,'sandbox');
  const target=profile==='toaststunt',other=!target;
  await page.locator('#runtimeProfileSelect').selectOption(other?'toaststunt':'lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'this.name="Healthy world"; return 0;');await saved(page);
  const otherKey=other?'path:toaststunt:sandbox':'path:lambdamoo:sandbox',targetKey=target?'path:toaststunt:sandbox':'path:lambdamoo:sandbox';
  const before=await record(page,'world',otherKey);
  await record(page,'world',targetKey,'broken '+profile);
  await page.locator('#runtimeProfileSelect').selectOption(target?'toaststunt':'lambdamoo');
  await expect(page.locator('#workspaceProblem')).toContainText('could not be loaded');
  await expect(page.locator('#runButton')).toBeDisabled(); await openWorld(page);
  const download=page.waitForEvent('download');await page.locator('#downloadOriginal').click();
  expect(await readFile(await (await download).path(),'utf8')).toBe('broken '+profile);
  await page.locator('#retrySave').click();
  expect(await record(page,'world',targetKey)).toBe('broken '+profile);
  page.once('dialog',d=>d.accept());await page.locator('#worldPanel').getByRole('button',{name:/Reset (track|sandbox) world/,exact:true}).click();
  await expect(page.locator('#runButton')).toBeEnabled();await saved(page);
  expect(await record(page,'world',otherKey)).toBe(before);
  await page.locator('#runtimeProfileSelect').selectOption(other?'toaststunt':'lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return this.name;','Return: "Healthy world"');
});

test('source length limit permits 100000 characters and rejects 100001 without executing',async({page})=>{
  await ready(page,'sandbox');
  const source='"'+ 'x'.repeat(99987)+'"; return 0;';
  expect(source.length).toBe(100000);
  await run(page,source,'Return: 0');await saved(page);
  const before=await record(page);
  // The textarea caps typing; also exercise the guard against programmatic input.
  await codeView(page);await page.locator('#codeEditor').fill(source+' ');
  expect((await page.locator('#codeEditor').inputValue()).length).toBe(100000);
  await page.locator('#codeEditor').evaluate((editor,code)=>{editor.value=code;editor.dispatchEvent(new Event('input'));},source+' ');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('100,000');
  expect(await record(page)).toBe(before);
});

test('oversized import is rejected before confirmation and leaves data intact',async({page})=>{
  await ready(page);await saved(page);const before=await record(page);await openWorld(page);
  let dialogs=0;page.on('dialog',async d=>{dialogs++;await d.dismiss();});
  await page.locator('#worldFile').setInputFiles({name:'large.json',mimeType:'application/json',buffer:Buffer.alloc(32000001,32)});
  await expect(page.locator('#workspaceProblem')).toContainText('size limit');
  expect(dialogs).toBe(0);expect(await record(page)).toBe(before);
});

test('Stop during grading keeps the committed learner world and does not award progress',async({page})=>{
  // Hold only the fresh grading worker's request; the warm learner worker runs normally.
  await page.addInitScript(()=>{
    const Native=Worker;
    window.Worker=class extends Native {
      warm=false;
      postMessage(message){
        if(message.type==='warmup')this.warm=true;
        if(message.type==='execute'&&!this.warm){window.releaseGrading=()=>super.postMessage(message);return;}
        super.postMessage(message);
      }
    };
  });
  await ready(page);await browse(page);await page.locator('[data-lesson-id="objects"]').click();
  await codeView(page);await page.locator('#codeEditor').fill('create(#3); player:tell("A workshop humming with possibility.");');
  await page.locator('#runButton').click();
  await page.waitForFunction(()=>typeof window.releaseGrading==='function');
  await page.locator('#stopButton').click();await page.evaluate(()=>window.releaseGrading());
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  await expect(page.locator('#output')).toContainText('cancelled');
  expect(JSON.parse(await record(page)).objects).toHaveLength(8);
});

for(const sessionOnly of [false,true]) test(`persisted page lifecycle restores ${sessionOnly?'session-only':'saved'} work`,async({page})=>{
  if(sessionOnly)await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new Error('blocked');}}));
  await ready(page,'sandbox');await run(page,'this.name="Before suspension"; return create(#3);');
  if(!sessionOnly)await saved(page);
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
  await expect(page.locator('#codeEditor')).toBeDisabled();
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
  await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return {this.name,valid(#43)};','Return: {"Before suspension", 1}');
});

for(const kind of ['read','blocked']) test(`IndexedDB ${kind} failure is explicit and recoverable`,async({page})=>{
  if(kind==='read') {
    await ready(page,'sandbox');await run(page,'this.name="Saved safely"; return 0;');await saved(page);
  }
  await page.addInitScript(kind=>{
    if(kind==='read') {
      const get=IDBObjectStore.prototype.get;
      IDBObjectStore.prototype.get=function(key){if(this.name==='world'&&key==='path:toaststunt:sandbox')throw new Error('read unavailable');return get.call(this,key);};
      window.restoreRead=()=>IDBObjectStore.prototype.get=get;
    } else {
      const open=IDBFactory.prototype.open;
      IDBFactory.prototype.open=function(...args){const request=open.apply(this,args);queueMicrotask(()=>request.dispatchEvent(new Event('blocked')));return request;};
    }
  },kind);
  await page.goto('/');
  if(kind==='blocked') {
    await expect(page.locator('#runButton')).toBeEnabled();
    await expect(page.locator('#editorPanel .persistence-status')).toContainText('Session only');
    await run(page,'return 7;','Return: 7');
  } else {
    await expect(page.locator('#workspaceProblem')).toContainText('read unavailable');
    await expect(page.locator('#codeEditor')).toBeDisabled();
    await page.evaluate(()=>window.restoreRead());await openWorld(page);await page.locator('#retrySave').click();
    await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.name;','Return: "Saved safely"');
  }
});

test('failed profile initialization keeps the current runtime, world and draft',async({page})=>{
  // Wrap the public factory at its module boundary; all successful calls stay real.
  await page.route('**/runtime/**/dist/browser/index.js',async route=>{
    const url=route.request().url();
    await route.fulfill({contentType:'text/javascript',body:`export * from '${url}?actual'; import {createRuntime as real} from '${url}?actual'; export async function createRuntime(options){if(options.profile==='lambdamoo')throw new Error('profile initialization failed');return real(options);}`});
  });
  await ready(page,'sandbox');await run(page,'this.name="Current"; return this.name;','Return: "Current"');await saved(page);
  const before=await record(page);await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');
  await expect(page.locator('#workspaceProblem')).toContainText('Profile switch failed');
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue('toaststunt');
  await expect(page.locator('#codeEditor')).toHaveValue('this.name="Current"; return this.name;');
  expect(await record(page)).toBe(before);await run(page,'return this.name;','Return: "Current"');
});

test('ownership loss stops an active worker and retains the committed world',async({page})=>{
  await ready(page,'sandbox');await saved(page);const before=await record(page);
  await codeView(page);await page.locator('#codeEditor').fill('create(#3); notify(player,"working"); suspend(5); return 0;');await saved(page);await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#stopButton')).toBeEnabled();
  await record(page,'world','writer-lease',{writerId:'other-tab',expiresAt:Date.now()+30000});
  await expect(page.locator('#output')).toContainText('cancelled');
  expect(await record(page)).toBe(before);await expect(page.locator('#codeEditor')).toBeDisabled();
  await expect(page.locator('.world-status')).toContainText('7 objects');
});

for(const profile of ['toaststunt','lambdamoo']) test(`${profile}: import replaces only its world and keeps both profiles' drafts`,async({page})=>{
 await ready(page,'sandbox');
 await run(page,'this.name="Toast"; return 0;');await saved(page);
 const toastDraft=await page.locator('#codeEditor').inputValue();
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
 await run(page,'this.name="Lambda"; return 0;');await saved(page);
 const lambdaDraft=await page.locator('#codeEditor').inputValue();
 const target=profile==='toaststunt',key=target?'path:toaststunt:sandbox':'path:lambdamoo:sandbox',otherKey=target?'path:lambdamoo:sandbox':'path:toaststunt:sandbox';
 await page.locator('#runtimeProfileSelect').selectOption(target?'toaststunt':'lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
 const imported=JSON.parse(await record(page,'world',key));imported.objects.find(o=>o.id==='42').name='Imported '+profile;
 const before=await record(page,'world',otherKey);await openWorld(page);page.once('dialog',d=>d.accept());
 await page.locator('#worldFile').setInputFiles({name:'world.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(imported))});
 await expect(page.locator('#runButton')).toBeEnabled();await saved(page);
 expect(await record(page,'world',otherKey)).toBe(before);
 await expect(page.locator('#codeEditor')).toHaveValue(target?toastDraft:lambdaDraft);
 await page.locator('#runtimeProfileSelect').selectOption(!target?'toaststunt':'lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#codeEditor')).toHaveValue(target?lambdaDraft:toastDraft);
});

test('ownership lost while preparing another profile leaves the original workspace selected',async({page})=>{
 await page.route('**/runtime/**/dist/browser/index.js',async route=>{
   const url=route.request().url();
   await route.fulfill({contentType:'text/javascript',body:`export * from '${url}?actual'; import {createRuntime as real} from '${url}?actual'; export async function createRuntime(options){const runtime=await real(options);if(options.profile==='lambdamoo')await new Promise(resolve=>{window.finishProfileSwitch=resolve;});return runtime;}`});
 });
 await ready(page,'sandbox');await run(page,'this.name="Original"; return 7;');await saved(page);
 const original=await record(page);await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');
 await page.waitForFunction(()=>typeof window.finishProfileSwitch==='function');
 await record(page,'world','writer-lease',{writerId:'new-owner',expiresAt:Date.now()+30000});
 await expect(page.locator('#editorPanel .persistence-status')).toContainText('Open in another tab');
 await page.evaluate(()=>window.finishProfileSwitch());
 await expect(page.locator('#runtimeProfileSelect')).toHaveValue('toaststunt');
 await expect(page.locator('#codeEditor')).toHaveValue('this.name="Original"; return 7;');
 expect(await record(page)).toBe(original);expect(await record(page,'world','path:lambdamoo:sandbox')).toBeUndefined();
});
