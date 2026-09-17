import {test,expect,ready,run,saved} from './helpers.js';
async function evaluate(page,source,expected){
 await page.getByRole('tab',{name:'Eval',exact:true}).click();
 await page.locator('#evalEditor').fill(source);await page.locator('#evalRun').click();
 await expect(page.locator('#evalOutput')).toContainText(expected);
 await expect(page.locator('#evalRun')).toBeEnabled();
}
test('Eval shares the world, preserves lesson code and does not award progress',async({page})=>{
 await ready(page);
 const code=await page.locator('#codeEditor').inputValue(),progress=await page.locator('#progressText').textContent();
 await evaluate(page,';a=1; b=2; c=3;','Return: 3');
 await evaluate(page,';player:tell("hello"); this.name="Eval room"; return this.name;','Return: "Eval room"');
 await expect(page.locator('#evalOutput')).toContainText('hello');
 await expect(page.locator('#progressText')).toHaveText(progress);
 await page.locator('#evalInspect').click();await expect(page.locator('#worldDetail')).toContainText('Eval room');
 await page.getByRole('tab',{name:'Code',exact:true}).click();await expect(page.locator('#codeEditor')).toHaveValue(code);
 await run(page,'return this.name;','Return: "Eval room"');
 await evaluate(page,';a','Variable a has no value');
 await evaluate(page,';a = ;','Line 1, column 5: Missing identifier');
 await evaluate(page,';1 + 2','Return: 3');
 await saved(page);await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue(';1 + 2');
 await evaluate(page,';this.name','Return: "Eval room"');
});
test('Eval drafts and worlds remain separate across profiles and workspace scopes',async({page})=>{
 await ready(page);
 await evaluate(page,';this.name="Toast eval";','Return: "Toast eval"');await saved(page);
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#evalRun')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue('');
 await evaluate(page,';-5 % 3','Return: -2');
 await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#evalRun')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue(';this.name="Toast eval";');
 await page.locator('#workspaceMode').selectOption('sandbox');await expect(page.locator('#evalRun')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue('');
 await evaluate(page,';this.name="Sandbox eval";','Return: "Sandbox eval"');
 await page.locator('#workspaceMode').selectOption('training');await expect(page.locator('#evalRun')).toBeEnabled();
 await evaluate(page,';this.name','Return: "Toast eval"');
});
test('Eval Stop discards pending changes and the tabs work at compact widths',async({page})=>{
 await ready(page,'sandbox');await evaluate(page,';this.name="Before";','Return: "Before"');
 await page.locator('#evalEditor').fill(';this.name="Discard"; suspend(5); return this.name;');await page.locator('#evalRun').click();
 await expect(page.locator('#evalStop')).toBeVisible();await page.locator('#evalStop').click();
 await expect(page.locator('#evalOutput')).toContainText('discarded');await expect(page.locator('#evalRun')).toBeEnabled();
 await evaluate(page,';this.name','Return: "Before"');
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.getByRole('tab',{name:width<1200?'World':'Code',exact:true}).focus();await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'Eval',exact:true})).toBeFocused();
  await page.locator('#evalEditor').fill(';1 + 2');await page.locator('#evalEditor').press('Control+Enter');
  await expect(page.locator('#evalOutput')).toContainText('Return: 3');await expect(page.locator('#evalRun')).toBeEnabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/eval-${width}.png`,fullPage:true});
 }
});

test('Eval save failures retain changes and expose recovery before switching profiles',async({page})=>{
 await ready(page);await page.evaluate(()=>{
  window.originalPut=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(...args){
   if(args[1]!=='writer-lease')throw new DOMException('Quota exceeded','QuotaExceededError');
   return window.originalPut.apply(this,args);
  };
 });
 await evaluate(page,';this.name="Pending eval";','Return: "Pending eval"');
 await expect(page.locator('#saveNotice')).toBeVisible();
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');
 await expect(page.locator('#runtimeProfileSelect')).toHaveValue('toaststunt');
 await expect(page.locator('#evalPanel .workspace-problem')).toContainText('pending changes');
 await expect(page.locator('#evalEditor')).toHaveValue(';this.name="Pending eval";');
 await page.evaluate(()=>{IDBObjectStore.prototype.put=window.originalPut;});
 await page.locator('#recoverWorkspace').click();await page.locator('#retrySave').click();await saved(page);
 await page.reload();await expect(page.locator('#evalRun')).toBeEnabled();
 await evaluate(page,';this.name','Return: "Pending eval"');
});

test('typing in Eval does not save or shift the page; Evaluate persists the submitted input',async({page})=>{
 await page.setViewportSize({width:390,height:900});await ready(page);await saved(page);
 await page.getByRole('tab',{name:'Eval',exact:true}).click();
 await expect(page.locator('#saveNotice')).toBeHidden();
 const before=await page.locator('#evalEditor').boundingBox();
 await page.evaluate(()=>{
  window.evalTypingWrites=0;window.evalNoticeChanges=0;
  const put=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(...args){
   if(args[1]!=='writer-lease')window.evalTypingWrites++;
   return put.apply(this,args);
  };
  window.evalNoticeObserver=new MutationObserver(records=>{window.evalNoticeChanges+=records.length;});
  window.evalNoticeObserver.observe(document.querySelector('#saveNotice'),{attributes:true,attributeFilter:['hidden']});
 });
 await page.locator('#evalEditor').pressSequentially(';a=1; a+2',{delay:30});
 // Allow the former draft debounce to fire, if it is accidentally reintroduced.
 await page.evaluate(()=>new Promise(resolve=>setTimeout(resolve,300)));
 expect(await page.evaluate(()=>({writes:window.evalTypingWrites,banners:window.evalNoticeChanges}))).toEqual({writes:0,banners:0});
 expect((await page.locator('#evalEditor').boundingBox()).y).toBe(before.y);
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#evalRun')).toBeEnabled();
 await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#evalRun')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue(';a=1; a+2');
 await page.locator('#evalRun').click();await expect(page.locator('#evalOutput')).toContainText('Return: 3');await saved(page);
 await page.reload();await expect(page.locator('#evalRun')).toBeEnabled();
 await page.getByRole('tab',{name:'Eval',exact:true}).click();await expect(page.locator('#evalEditor')).toHaveValue(';a=1; a+2');
});

test('Code autosaves inline without showing the top banner or shifting the editor',async({page})=>{
 await page.setViewportSize({width:390,height:900});await ready(page);await saved(page);
 await page.getByRole('tab',{name:'Code',exact:true}).click();
 await page.locator('#codeEditor').fill('return 1;');await saved(page);
 await page.locator('#codeEditor').focus();
 const before=await page.locator('#codeEditor').boundingBox();
 await page.evaluate(()=>{
  window.shownSaveBanners=0;
  window.quietSaveObserver=new MutationObserver(()=>{
   if(!document.querySelector('#saveNotice').hidden)window.shownSaveBanners++;
  });
  window.quietSaveObserver.observe(document.querySelector('#saveNotice'),{attributes:true,attributeFilter:['hidden']});
 });
 await page.locator('#codeEditor').press('Control+End');
 await page.locator('#codeEditor').pressSequentially(' return 2;',{delay:30});await saved(page);
 expect(await page.evaluate(()=>window.shownSaveBanners)).toBe(0);
 await expect(page.locator('#saveNotice')).toBeHidden();
 expect((await page.locator('#codeEditor').boundingBox()).y).toBe(before.y);
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#codeEditor')).toHaveValue('return 1; return 2;');
});
