import {test,expect,ready,run,saved,openWorld,failWrites,record} from './helpers.js';
import {readFile} from 'node:fs/promises';

test('editing, profiles and Sandbox drafts survive refresh with separate worlds',async({page})=>{
  await ready(page);await page.locator('#trackSelect').selectOption('builtins');
  await page.locator('[data-lesson-id="builtin-create"]').click();
  await run(page,'o=create(#3); o.name="Toast room"; return o;','Return: #43');await saved(page);
  await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toBeEditable();
  await expect(page.locator('#lessonTitle')).toHaveText('create()');
  await page.locator('#workspaceMode').selectOption('sandbox');
  await run(page,'return valid(#43);','Return: 0');await saved(page);
  await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return {valid(#43),-5 % 3};','Return: {0, -2}');await saved(page);
  await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#workspaceMode')).toHaveValue('sandbox');
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue('lambdamoo');
  await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toHaveValue('return valid(#43);');
  await page.locator('#workspaceMode').selectOption('training');
  await expect(page.locator('#lessonTitle')).toHaveText('create()');
  await expect(page.locator('#codeEditor')).toHaveValue(/Toast room/);
});

test('writer handoff restores the latest draft and world without Web Locks',async({page,context})=>{
  await context.addInitScript(()=>Object.defineProperty(navigator,'locks',{value:undefined}));
  await ready(page,'sandbox');await run(page,'this.name="Handed over"; return 7;');await saved(page);
  const other=await context.newPage();await other.goto('/');
  await expect(other.locator('#editorPanel .persistence-status')).toContainText('Open in another tab');
  await expect(other.locator('#codeEditor')).toBeDisabled();
  await page.close();await expect(other.locator('#runButton')).toBeEnabled({timeout:10000});
  await expect(other.locator('#codeEditor')).toHaveValue('this.name="Handed over"; return 7;');
  await run(other,'return this.name;','Return: "Handed over"');
});

test('unavailable storage allows session editing and profile switching',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new Error('blocked');}}));
  await ready(page,'sandbox');await expect(page.locator('#editorPanel .persistence-status')).toContainText('Session only');
  await run(page,'this.name="Session"; return this.name;','Return: "Session"');
  await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return this.name;','Return: "Training Room"');
  await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return this.name;','Return: "Session"');
});

test('failed saves can retry; export, corrupt-save recovery, import and reset preserve contracts',async({page})=>{
  await ready(page,'sandbox');await saved(page);const original=await record(page);
  await failWrites(page);await run(page,'o=create(#3); o.name="Portable"; return o;','Return: #43');
  await expect(page.locator('#editorPanel .persistence-status')).toContainText('Not saved');
  expect(await record(page)).toBe(original);
  await failWrites(page,false);await openWorld(page);await page.locator('#retrySave').click();await saved(page);
  const downloading=page.waitForEvent('download');await page.locator('#exportWorld').click();
  const exported=await readFile(await (await downloading).path(),'utf8');
  await record(page,'world',undefined,'broken snapshot');await page.reload();
  await expect(page.locator('#workspaceProblem')).toContainText('could not be loaded');await openWorld(page);
  await expect(page.locator('#codeEditor')).toBeDisabled();
  const originalDownload=page.waitForEvent('download');await page.locator('#downloadOriginal').click();
  expect(await readFile(await (await originalDownload).path(),'utf8')).toBe('broken snapshot');
  page.once('dialog',d=>d.accept());
  await page.locator('#worldFile').setInputFiles({name:'world.json',mimeType:'application/json',buffer:Buffer.from(exported)});
  await expect(page.locator('#runButton')).toBeEnabled();await saved(page);
  page.once('dialog',d=>d.dismiss());await page.locator('#worldPanel').getByRole('button',{name:/Reset (track|sandbox) world/,exact:true}).click();
  expect(JSON.parse(await record(page)).objects.some(o=>o.name==='Portable')).toBe(true);
  page.once('dialog',d=>d.accept());await page.locator('#worldPanel').getByRole('button',{name:/Reset (track|sandbox) world/,exact:true}).click();await saved(page);
  expect(JSON.parse(await record(page)).objects).toHaveLength(7);
});

test('reference and World remain keyboard accessible across the Sandbox breakpoint',async({page})=>{
  await page.setViewportSize({width:390,height:844});await ready(page,'sandbox');
  await page.getByRole('tab',{name:'Code',exact:true}).focus();await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'World',exact:true})).toBeFocused();
  await page.locator('#worldSearch').fill('#7');await page.locator('[data-object-id="7"]').press('Enter');
  await expect(page.locator('#worldDetail h2')).toBeFocused();
  await page.getByRole('tab',{name:'World',exact:true}).focus();await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'Eval',exact:true})).toBeFocused();await page.keyboard.press('ArrowRight');
  await page.locator('[data-builtin="notify"] summary').focus();await page.keyboard.press('Enter');
  await expect(page.locator('[data-builtin="notify"] .builtin-details')).toBeVisible();
  for(const width of [1099,1100,1440]) {
    await page.setViewportSize({width,height:900});
    await expect(page.locator('#referencePanel')).toBeVisible();
    await expect(page.locator('#worldPanel')).toBeVisible({visible:width>=1200});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});

test('lesson starting world survives a confirmation longer than the writer lease',async({page})=>{
  await ready(page);
  await page.locator('#trackSelect').selectOption('objects');
  await page.locator('[data-lesson-id="objects-properties"]').click();
  const draft=await page.locator('#codeEditor').inputValue();
  page.once('dialog',async dialog=>{
    await new Promise(resolve=>setTimeout(resolve,6500));
    await dialog.accept();
  });
  await page.locator('#resetLessonWorld').click();
  await expect(page.locator('#output')).toContainText('Prepared lesson world loaded',{timeout:12000});
  await expect(page.locator('#codeEditor')).toHaveValue(draft);
  await saved(page);
  await run(page,draft,'Return: "blue"');
});

test('bounded suspend waits five seconds at most, stays responsive, and Stop preserves the saved world',async({page})=>{
 await ready(page,'sandbox');
 await page.locator('#codeEditor').fill('player:tell("before"); suspend(90); return "after";');
 const started=Date.now();await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('before');
 await expect(page.locator('#stopButton')).toBeVisible();
 // This evaluation must finish while the MOO task is waiting.
 expect(await page.evaluate(()=>document.readyState)).toBe('complete');
 await expect(page.locator('#output')).toContainText('Return: "after"',{timeout:10000});
 expect(Date.now()-started).toBeGreaterThanOrEqual(4900);
 expect(Date.now()-started).toBeLessThan(10000);
 await expect(page.locator('#runButton')).toBeEnabled();
 await page.locator('#codeEditor').fill('this.lamp_on=1; player:tell("waiting"); suspend(5); this.lamp_on=2;');
 await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('waiting');
 await page.locator('#stopButton').click();await expect(page.locator('#runButton')).toBeEnabled();
 await run(page,'return this.lamp_on;','Return: 0');
});

test('Eval evaluates command-line statements with keyboard submission in both profiles',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page);
 for(const profile of ['toaststunt','lambdamoo']){
  await page.locator('#runtimeProfileSelect').selectOption(profile);await expect(page.locator('#evalRun')).toBeEnabled();
  await page.getByRole('tab',{name:'Eval',exact:true}).click();
  await page.locator('#evalEditor').fill(';a=1; b=2; c=3;');await page.locator('#evalEditor').press('Control+Enter');
  await expect(page.locator('#evalOutput')).toContainText('Return: 3');await expect(page.locator('#evalRun')).toBeEnabled();
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
 }
});
