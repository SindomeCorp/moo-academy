import {test,expect,ready,run,record,openWorld,failWrites,loseOwnership,saved} from './helpers.js';

test('a departing writer saves before another writer can take ownership',async({page})=>{
 await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {createWorkspaceStorage}=await import('/workspace-storage.js');const a=createWorkspaceStorage(),b=createWorkspaceStorage();
  await a.open();await b.open();a.setDraft('handoff','last edit');a.prepareToLeave();
  const early=await b.acquire();const released=await a.release();const acquired=await b.acquire();await b.read();
  const draft=b.draft('handoff');await b.release();return {early,released,acquired,draft};
 });
 expect(result).toEqual({early:false,released:true,acquired:true,draft:'last edit'});
});

test('failed departure preserves local drafts and does not advertise takeover',async({page})=>{
 await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {createWorkspaceStorage}=await import('/workspace-storage.js');const a=createWorkspaceStorage(),b=createWorkspaceStorage();await a.open();await b.open();a.setDraft('handoff','recover me');
  const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='drafts')throw Error('quota');return put.apply(this,args);};
  let released;try{released=await a.release();}finally{IDBObjectStore.prototype.put=put;}
  const early=await b.acquire(),dirty=a.hasChanges,draft=a.exportDrafts().handoff;
  await a.acquire();await a.release();await b.acquire();await b.read();const recovered=b.draft('handoff');await b.release();return {released,early,dirty,draft,recovered};
 });
 expect(result).toEqual({released:false,early:false,dirty:true,draft:'recover me',recovered:'recover me'});
});

test('saved Common Packages opens without seed download; failed resets preserve it',async({page})=>{
 await ready(page);await page.locator('#trackSelect').selectOption('utility-list');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await run(page,'this.name="Keep my world"; return this.name;','Keep my world');await saved(page);
 await page.route('**/packages/common-packages/world.json',route=>route.abort());await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:15000});
 await run(page,'return this.name;','Keep my world');await openWorld(page);
 page.once('dialog',d=>d.accept());await page.locator('#worldPanel').getByRole('button',{name:'Reset track world',exact:true}).click();
 await expect(page.locator('#workspaceProblem')).toContainText('Could not reset world');await run(page,'return this.name;','Keep my world');
 await record(page,'world',undefined,'bad snapshot');await page.reload();await expect(page.locator('#workspaceProblem')).toContainText('Saved workspace could not be loaded');await openWorld(page);await expect(page.locator('#downloadOriginal')).toBeVisible();
 const pending=page.waitForEvent('download');await page.locator('#downloadOriginal').click();const stream=await (await pending).createReadStream();let original='';for await(const chunk of stream)original+=chunk;expect(original).toBe('bad snapshot');
});

test('Tab cannot create an oversized draft and legacy oversized drafts remain available',async({page})=>{
 await ready(page);await page.getByRole('tab',{name:'Code',exact:true}).click();
 const source='"'+'x'.repeat(99997)+'";';await page.locator('#codeEditor').fill(source);await page.locator('#codeEditor').press('End');await page.locator('#codeEditor').press('Tab');
 expect((await page.locator('#codeEditor').inputValue()).length).toBe(100000);await saved(page);await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:15000});await expect(page.locator('#codeEditor')).toHaveValue(source);
 await record(page,'drafts','comments',source+'  ');await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:15000});await expect(page.locator('#codeEditor')).toHaveValue(source+'  ');
 await page.getByRole('tab',{name:'Code',exact:true}).click();await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('100,000');
});

test('lost ownership retains downloadable drafts, unrun Eval, and an unload warning',async({page})=>{
 await ready(page);await page.getByRole('tab',{name:'Eval',exact:true}).click();await page.locator('#evalEditor').fill(';return "unrun eval";');
 await page.getByRole('tab',{name:'Code',exact:true}).click();await failWrites(page);await page.locator('#codeEditor').fill('return "unsaved code";');await expect(page.locator('#saveNotice')).toContainText('Not saved');await loseOwnership(page);await openWorld(page);
 const downloading=page.waitForEvent('download');await page.locator('#exportDrafts').click();const download=await downloading;const stream=await download.createReadStream();let text='';for await(const chunk of stream)text+=chunk;const backup=JSON.parse(text);
 expect(backup.version).toBe(1);expect(backup.currentCode).toContain('unsaved code');expect(backup.currentEval).toContain('unrun eval');expect(Object.values(backup.drafts)).toContain('return "unsaved code";');
 const prevented=await page.evaluate(()=>{const e=new Event('beforeunload',{cancelable:true});window.dispatchEvent(e);return e.defaultPrevented;});expect(prevented).toBe(true);
 page.once('dialog',d=>d.dismiss());await page.locator('#retrySave').click();await expect(page.locator('#codeEditor')).toHaveValue('return "unsaved code";');
});

test('reference fetch failure can retry and display source-only and server entries',async({page})=>{
 await ready(page);await page.getByRole('tab',{name:'Reference',exact:true}).click();await page.route('**/packages/common-packages/reference.json',r=>r.abort());
 const summary=page.getByText('Browse utility verbs',{exact:true});await summary.click();await expect(page.locator('#utilityReference [role="status"]')).toContainText('retry');
 await page.unroute('**/packages/common-packages/reference.json');await summary.click();await summary.click();await expect(page.locator('#utilityReference [role="status"]')).toHaveText('375 definitions');
 await page.locator('#utilityReference select').selectOption('command');await page.locator('#utilitySearch').fill('yes_or_no');await page.locator('.utility-results > details').first().locator('summary').click();await expect(page.locator('.utility-results')).toContainText('Real-server exercise');
});

test('an idle clean page permits immediate refresh, while a pending run retains its lease',async({page})=>{
 await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {createWorkspaceStorage}=await import('/workspace-storage.js');const a=createWorkspaceStorage(),b=createWorkspaceStorage();await a.open();await b.open();
  a.prepareToLeave({pendingRun:true});const duringRun=await b.acquire();await a.acquire();a.prepareToLeave();const clean=await b.acquire();await a.release();await b.release();return {duringRun,clean};
 });
 expect(result).toEqual({duringRun:false,clean:true});
});

test('oversized new writes fail visibly and keep a recoverable draft',async({page})=>{
 await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {createWorkspaceStorage}=await import('/workspace-storage.js');const messages=[],s=createWorkspaceStorage(m=>messages.push(m));await s.open();s.setDraft('long','original');await s.flush();s.setDraft('long','x'.repeat(100001));const saved=await s.flush(),dirty=s.hasChanges,exported=s.exportDrafts().long.length,error=messages.at(-1);s.setDraft('long','shortened');await s.release();return {saved,dirty,exported,error};
 });
 expect(result).toMatchObject({saved:false,dirty:true,exported:100001});expect(result.error).toContain('100,000');expect(result.error).toContain('download drafts');
});

test('reference distinguishes missing documentation, variable examples and native results',async({page})=>{
 await ready(page);await page.getByRole('tab',{name:'Reference',exact:true}).click();await page.getByText('Browse utility verbs',{exact:true}).click();await expect(page.locator('#utilityReference [role="status"]')).toHaveText('375 definitions');
 for(const [id,text]of [['#20:29','no introductory documentation'],['#20:7','See the original documentation'],['#26:14','Example output (varies)'],['#24:7','Expected server output']]){
  const entry=page.locator('[data-source-verb-id="'+id+'"]');await entry.locator('summary').click();await expect(entry).toContainText(text);await entry.locator('summary').click();await entry.locator('summary').click();await expect(entry).toContainText(text);
 }
});


test('startup errors leave tabs reachable at every layout width',async({page},info)=>{
 await page.route('**/runtime/**/dist/browser/index.js',route=>route.abort());
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/');await expect(page.locator('#startupTitle')).toHaveText('Workspace could not start');
  await page.getByRole('tab',{name:'World',exact:true}).click();await expect(page.locator('.world-status')).toHaveText('World unavailable. Reload to retry.');
  await page.getByRole('tab',{name:'Code',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#worldTab')).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('startup-error-'+width+'.png'),fullPage:true});
 }
});
