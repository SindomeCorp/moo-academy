import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect,ready,run,saved,record,failWrites,openWorld} from './helpers.js';
async function path(page,id){await browse(page);await page.locator('#trackSelect').selectOption(id);await expect(page.locator('#runButton')).toBeEnabled();}
async function lesson(page,id){await browse(page);await page.locator(`[data-lesson-id="${id}"]`).click();await expect(page.locator('#runButton')).toBeEnabled();}
async function checkpoint(page,accept=true){await page.getByRole('tab',{name:'Code',exact:true}).click();if(!await page.locator('#resetLessonWorld').isVisible())await page.locator('#checkpointControls summary').click();page.once('dialog',d=>accept?d.accept():d.dismiss());await page.locator('#resetLessonWorld').click();await expect(page.locator('#runButton')).toBeEnabled();}
test('path, sandbox and profile worlds are independent and resume their saved lessons and code',async({page})=>{
 await ready(page);await run(page,'this.name="First steps"; return 0;');await saved(page);
 await path(page,'objects');await lesson(page,'objects-create');await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Return: #43');
 await lesson(page,'objects-state');await run(page,'this.workbench.stock=12; return this.workbench.stock;','Return: 12');await saved(page);
 await path(page,'collections');await run(page,'this.name="Collections"; return valid(#43);','Return: 0');await saved(page);
 await path(page,'objects');await expect(page.locator('#lessonTitle')).toHaveText('Keep changes between runs');await expect(page.locator('#codeEditor')).toHaveValue(/stock=12/);
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled();await expect(page.locator('#trackSelect')).toHaveValue('objects');
 await run(page,'return this.workbench.stock;','Return: 12');
 await page.locator('#workspaceMode').selectOption('sandbox');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return valid(#43);','Return: 0');
 await run(page,'this.name="Sandbox"; return 0;');await saved(page);
 await page.locator('#workspaceMode').selectOption('training');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.workbench.stock;','Return: 12');
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.workbench.stock;','Return: 2');
 await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.workbench.stock;','Return: 12');
 await path(page,'foundations');await run(page,'return this.name;','Return: "First steps"');
 await path(page,'collections');await run(page,'return this.name;','Return: "Collections"');
});
test('jumping ahead offers a prepared checkpoint; reset is confirmed and code stays independent',async({page})=>{
 await ready(page);await path(page,'objects');await run(page,'this.name="Keep"; return 0;');
 await lesson(page,'objects-workshop-project');await expect(page.locator('#startingRequirements')).toBeVisible();await expect(page.locator('#continueWorld')).toHaveCount(0);await expect(page.locator('#resetLessonWorld')).toBeVisible();await expect(page.locator('#startingState')).toContainText('stock set to 3');
 const draft='return this.name;';await codeView(page);await page.locator('#codeEditor').fill(draft);await saved(page);const original=await record(page);
 await checkpoint(page,false);expect(await record(page)).toBe(original);await expect(page.locator('#codeEditor')).toHaveValue(draft);
 await checkpoint(page);await expect(page.locator('#codeEditor')).toHaveValue(draft);await run(page,'return {this.name,this.workbench.stock};','Return: {"Training Room", 3}');
 await codeView(page);await page.locator('#restoreExample').click();await expect(page.locator('#codeEditor')).toHaveValue(/Read the current workbench/);
 await run(page,'b=this.workbench; b.name="Supply bench"; b.stock=5; return {b.name,b.stock};','Objective passed');
 await expect(page.locator('[data-lesson-id="objects-workshop-project"]')).toHaveClass(/complete/);
 await checkpoint(page);await expect(page.locator('[data-lesson-id="objects-workshop-project"]')).toHaveClass(/complete/);
 await run(page,'return this.workbench.stock;','Return: 3');
});
test('project checks reject a hardcoded result when the world or reusable verb is wrong',async({page})=>{
 await ready(page);await path(page,'verbs');await lesson(page,'verbs-counter-project');await checkpoint(page);
 await run(page,'return 9;','Objective not yet met');
 await expect(page.locator('[data-lesson-id="verbs-counter-project"]')).not.toHaveClass(/complete/);
 await run(page,'b=this.workbench; add_verb(b,{player,"rx","bump"},{"this","none","this"}); set_verb_code(b,"bump",{"this.stock=this.stock+args[1];","return this.stock;"}); return b:bump(4);','Objective passed');
 await run(page,'return this.workbench.stock;','Return: 9');
});
test('builtin limitations are visible and host examples run from their checkpoint',async({page})=>{
 await ready(page);await path(page,'builtins');await lesson(page,'builtin-value_bytes');await expect(page.locator('#lessonWarning')).toContainText('STUB');
 await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Return: 0');
 await lesson(page,'builtin-curl');await expect(page.locator('#lessonWarning')).toContainText('MOCKED');await checkpoint(page);await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Return: "hello"');
 await lesson(page,'builtin-file_readline');await expect(page.locator('#lessonWarning')).toContainText('SIMULATED');await checkpoint(page);await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Return: "ab"');
 await lesson(page,'builtin-sqlite_query');await checkpoint(page);await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Return: {{42}}');
 await page.getByRole('tab',{name:'Reference',exact:true}).click();await page.locator('[data-builtin="value_bytes"] summary').click();await expect(page.locator('[data-builtin="value_bytes"]')).toContainText('STUB');
});
test('failed checkpoint persistence keeps the current world and failed navigation keeps its scope',async({page})=>{
 await ready(page);await path(page,'objects');await run(page,'this.name="Kept"; return 0;');await saved(page);const before=await record(page);
 await failWrites(page);await checkpoint(page);await expect(page.locator('#workspaceProblem')).toContainText('Checkpoint was not saved');expect(await record(page)).toBe(before);
 await codeView(page);await page.locator('#codeEditor').fill('return 7;');await page.locator('#nextButton').click();await expect(page.locator('#workspaceProblem')).toContainText('Save pending changes');await expect(page.locator('#lessonTitle')).toHaveText('Read the teaching world');
 await failWrites(page,false);await openWorld(page);await page.locator('#retrySave').click();await saved(page);await run(page,'return this.name;','Return: "Kept"');
});

test('lesson search filters topics, clears on path changes and exposes real-server field notes',async({page,context})=>{
 await ready(page);await path(page,'builtins');await page.locator('#lessonSearch').fill('sqlite');await expect(page.locator('#lessonNav button')).toHaveCount(9);
 await page.locator('#lessonSearch').fill('no-such-lesson');await expect(page.locator('#lessonNav')).toContainText('No lessons match');
 await path(page,'objects');await expect(page.locator('#lessonSearch')).toHaveValue('');await expect(page.locator('#lessonNav button')).toHaveCount(9);
 const popup=context.waitForEvent('page');await page.getByRole('link',{name:'Beyond the playground'}).click();const notes=await popup;await expect(notes.locator('h1')).toHaveText('MOO programming beyond the playground');await expect(notes.locator('#tasks')).toContainText('revalidate');
});

test('course pages and warnings fit desktop and narrow screens',async({page})=>{
 await ready(page);await path(page,'verbs');await lesson(page,'verbs-counter-project');
 for(const width of [390,1024,1440]){
  await page.setViewportSize({width,height:960});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('#startingRequirements')).toBeVisible();
  if(width>=1200) await expect.poll(()=>page.evaluate(()=>{const nav=document.querySelector('#lessonNav').getBoundingClientRect(),active=document.querySelector('#lessonNav [aria-current]').getBoundingClientRect();return active.top>=nav.top-1&&active.bottom<=nav.bottom+1;})).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`test-results/course-${width}.png`,fullPage:true});
 }
 await path(page,'integrations');await lesson(page,'integrations-memory');await expect(page.locator('#lessonWarning')).toContainText('FIXED RETURN');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'test-results/course-warning-mobile.png',fullPage:true});
});

test('session-only storage keeps path and sandbox worlds independent until refresh',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new Error('disabled');}}));
 await ready(page);await path(page,'objects');await run(page,'this.name="Session objects"; return 0;');
 await page.locator('#workspaceMode').selectOption('sandbox');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'this.name="Session sandbox"; return 0;');
 await page.locator('#workspaceMode').selectOption('training');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.name;','Return: "Session objects"');
 await path(page,'collections');await run(page,'return this.name;','Return: "Training Room"');await path(page,'objects');await run(page,'return this.name;','Return: "Session objects"');
 await page.locator('#workspaceMode').selectOption('sandbox');await expect(page.locator('#runButton')).toBeEnabled();await run(page,'return this.name;','Return: "Session sandbox"');
 await expect(page.locator('#editorPanel .persistence-status')).toContainText('Session only');
});

test('legacy shared world and drafts are retained and restoring an imported draft stays restored',async({page})=>{
 await ready(page);await run(page,'this.name="Legacy world"; return 0;');await saved(page);
 await record(page,'drafts','builtin-curl','return "legacy draft";');
 await path(page,'builtins');await lesson(page,'builtin-curl');await expect(page.locator('#codeEditor')).toHaveValue('return "legacy draft";');
 await codeView(page);await page.locator('#restoreExample').click();await saved(page);await page.reload();await expect(page.locator('#runButton')).toBeEnabled();await expect(page.locator('#codeEditor')).toHaveValue(/return curl/);
 await path(page,'foundations');await run(page,'return this.name;','Return: "Legacy world"');
});

test('virtual host inspection makes zero-return side effects visible and uses safe text',async({page})=>{
 await ready(page,'sandbox');await openWorld(page);await page.locator('#hostState > summary').click();await expect(page.locator('#hostState')).toContainText('No virtual host resources yet');
 await run(page,'f=file_open("journal","w+tn"); file_writeline(f,"<img src=x>"); server_log("Recorded safely"); shutdown("Only simulated"); return 0;','Return: 0');await openWorld(page);
 await expect(page.locator('#hostState')).toContainText('/journal');await expect(page.locator('#hostState')).toContainText('Recorded safely');await expect(page.locator('#hostState')).toContainText('Only simulated');await expect(page.locator('#hostState img')).toHaveCount(0);
 await run(page,'db=sqlite_open("notes"); dump_database(); return 0;','Return: 0');await openWorld(page);await expect(page.locator('#hostState')).toContainText('notes');await expect(page.locator('#hostState')).toContainText('A database checkpoint has been saved');
 await page.locator('#workspaceMode').selectOption('training');await expect(page.locator('#runButton')).toBeEnabled();await path(page,'builtins');await lesson(page,'builtin-listeners');await checkpoint(page);await openWorld(page);await expect(page.locator('#hostState')).toContainText('8080');await expect(page.locator('#hostState')).toContainText('curl');
});

test('beginner project checks generalize across supplied inputs instead of accepting a fixed answer',async({page})=>{
 await ready(page);await lesson(page,'foundations-welcome-project');await checkpoint(page);
 await run(page,'return "Welcome back, River!";','Objective not yet met');
 await run(page,'name=args[1]; visits=toint(args[2]); if(visits>1) return "Welcome back, "+name+"!"; else return "Welcome, "+name+"!"; endif','Objective passed');
 await expect(page.locator('[data-lesson-id="foundations-welcome-project"]')).toHaveClass(/complete/);
});

test('lesson setup is optional, collapsed on navigation and absent in sandbox',async({page})=>{
 await ready(page);
 await expect(page.locator('#startingState')).toBeHidden();
 await expect(page.locator('#lessonPanel #checkpointControls')).toBeVisible();
 await expect(page.locator('#resetLessonWorld')).toBeHidden();
 await page.locator('#checkpointControls summary').click();
 await expect(page.getByRole('button',{name:'Load lesson starting world',exact:true})).toBeVisible();
 await page.locator('#nextButton').click();
 await expect(page.locator('#resetLessonWorld')).toBeHidden();
 await page.locator('#workspaceMode').selectOption('sandbox');
 await expect(page.locator('#checkpointControls')).toBeHidden();
});

test('final lesson continues to the first lesson of the next track and preserves saved work',async({page})=>{
 await ready(page);
 await path(page,'collections');await lesson(page,'collections-report-project');
 await path(page,'foundations');await lesson(page,'foundations-welcome-project');
 const source='this.name="Kept welcome world"; return 0;';
 await run(page,source);await saved(page);
 const before=await record(page);
 await expect(page.locator('#nextButton')).toHaveText('Continue to Collections and text');
 page.once('dialog',async dialog=>{
   expect(dialog.type()).toBe('confirm');
   expect(dialog.message()).toContain('21 unfinished lessons');
   expect(dialog.message()).toContain('recommend completing all lessons');
   expect(dialog.message()).toContain('Continue to Collections and text anyway?');
   await dialog.dismiss();
 });
 await page.locator('#nextButton').click();
 await expect(page.locator('#trackSelect')).toHaveValue('foundations');
 await expect(page.locator('#codeEditor')).toHaveValue(source);
 expect(await record(page)).toBe(before);
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('#nextButton').click();
 await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#trackSelect')).toHaveValue('collections');
 await expect(page.locator('#lessonTitle')).toHaveText('Keep related values in a list');
 await expect(page.locator('#nextButton')).toHaveText('NEXT LESSON →');
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#trackSelect')).toHaveValue('collections');
 await expect(page.locator('#lessonTitle')).toHaveText('Keep related values in a list');
 await path(page,'foundations');
 await expect(page.locator('#codeEditor')).toHaveValue(source);
 expect(await record(page)).toBe(before);
 await path(page,'builtins');await browse(page);await page.locator('#lessonNav button').last().click();
 await expect(page.locator('#nextButton')).toHaveText('Continue to String utilities');
 await path(page,'utility-wiz');await browse(page);await page.locator('#lessonNav button').last().click();
 await expect(page.locator('#nextButton')).toBeDisabled();
});

test('completed tracks continue without a confirmation',async({page})=>{
 await ready(page);
 await page.evaluate(async()=>{
   const {coursesForProfile}=await import('/curriculum.js');
   localStorage.setItem('moo-progress-v3-executed',JSON.stringify(coursesForProfile('toaststunt').foundations.map(lesson=>lesson.id)));
 });
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await lesson(page,'foundations-welcome-project');
 const dialogs=[];
 page.on('dialog',async dialog=>{dialogs.push(dialog.message());await dialog.dismiss();});
 await page.locator('#nextButton').click();
 await expect(page.locator('#trackSelect')).toHaveValue('collections');
 await expect(page.locator('#lessonTitle')).toHaveText('Keep related values in a list');
 expect(dialogs).toEqual([]);
});

test('builtin mentions have a distinct style without coloring ordinary terminology',async({page})=>{
 await ready(page);await path(page,'collections');await lesson(page,'collections-list');
 const builtin=page.locator('#lessonBody .builtin-name');
 await expect(builtin).toHaveText('length');
 await expect(builtin).toHaveAttribute('title','MOO builtin');
 await expect(builtin).toHaveCSS('color','rgb(115, 200, 242)');
 await path(page,'objects');await lesson(page,'objects-inspect');
 await expect(page.locator('#lessonBody .builtin-name')).toHaveCount(0);
 await path(page,'foundations');await lesson(page,'foundations-welcome-project');
 await expect(page.locator('#lessonBody code .builtin-name')).toHaveText('toint');
 await path(page,'builtins');await lesson(page,'builtin-file_read');
 await expect(page.locator('#lessonBody .builtin-name')).toHaveText('file_read');
});

test('skipped object creation explains missing state and lesson setup prepares the workbench',async({page})=>{
 await ready(page);await path(page,'objects');await lesson(page,'objects-properties');
 await run(page,await page.locator('#codeEditor').inputValue(),'E_INVARG');
 await expect(page.locator('#output')).toContainText('Load lesson starting world');
 await expect(page.locator('#resetLessonWorld')).toBeVisible();
 await expect(page.locator('#resetWorld')).toHaveText('Reset track world');
 page.once('dialog',async dialog=>{
   expect(dialog.message()).toContain('beginning, not the current lesson');
   await dialog.accept();
 });
 await page.locator('.world-management summary').click();await worldManagement(page);await page.locator('#resetWorld').click();await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#output')).toContainText('beginning of the track');
 await codeView(page);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('E_INVARG');
 const draft=await page.locator('#codeEditor').inputValue();
 await checkpoint(page);
 await expect(page.locator('#codeEditor')).toHaveValue(draft);
 await codeView(page);await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('Return: "blue"');
 await expect(page.locator('#output')).toContainText('Example explored');
});
