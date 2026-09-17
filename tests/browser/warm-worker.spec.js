import {test,expect,ready,browse,run,saved,codeView} from './helpers.js';
test('utility runs reuse a warm worker, skip unchanged world saves and restart safely after Stop',async({page})=>{
 test.setTimeout(60000);
 await page.addInitScript(()=>{
  window.warmed=0;window.workerStarts=0;window.worldWrites=0;
  const Native=Worker;
  window.Worker=class extends Native{
   constructor(...args){super(...args);window.workerStarts++;this.addEventListener('message',e=>{if(e.data.type==='warmed')window.warmed++;});}
  };
  const put=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(value,key){if(this.name==='world'&&String(key).startsWith('path:'))window.worldWrites++;return put.call(this,value,key);};
 });
 await ready(page);await page.waitForFunction(()=>window.warmed===1);
 await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});await page.waitForFunction(()=>window.warmed===2);await saved(page);
 const baseline=await page.evaluate(()=>({workers:workerStarts,writes:worldWrites}));
 await run(page,'return $string_utils:trim("  hello  ");','"hello"');
 await run(page,'return $string_utils:trim("***hello***","*");','"hello"');
 expect(await page.evaluate(()=>({workers:workerStarts,writes:worldWrites}))).toEqual(baseline);
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await page.locator('#evalEditor').fill(';$math_utils:factorial(5)');await page.locator('#evalRun').click();
 await expect(page.locator('#evalOutput')).toContainText('120');expect(await page.evaluate(()=>workerStarts)).toBe(baseline.workers);
 await codeView(page);await page.locator('#codeEditor').fill('this.name="discard";notify(player,"waiting");suspend(5);');await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('waiting');await page.locator('#stopButton').click();await expect(page.locator('#runButton')).toBeEnabled();
 await run(page,'return this.name;','"Common Packages workshop"');expect(await page.evaluate(()=>workerStarts)).toBe(baseline.workers+1);
 await run(page,'this.name="Saved change";return this.name;','"Saved change"');await saved(page);
 expect(await page.evaluate(()=>worldWrites)).toBeGreaterThan(baseline.writes);
});
