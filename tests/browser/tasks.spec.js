import {test,expect,ready,run,browse,saved} from './helpers.js';

test('tasks track teaches expected exhaustion and replenishment without resetting other tracks',async({page})=>{
 await ready(page);
 await run(page,'this.name="Original track"; return this.name;','Return: "Original track"');await saved(page);
 await browse(page);await page.locator('#trackSelect').selectOption('tasks');
 await browse(page);await page.locator('[data-lesson-id="tasks-exhaust"]').click();
 await expect(page.locator('#starterResult')).toContainText('Execution steps limit exceeded (expected)');
 await page.locator('#openCode').click();await expect(page.locator('#executionContext')).toContainText('3,000 ticks per slice');
 await page.locator('#runButton').click();await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#output')).toContainText('Expected tick exhaustion observed');
 await expect(page.locator('#output')).not.toContainText('execution completed');
 await saved(page);await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#lessonTitle')).toHaveText('Run a verb out of ticks');
 for(const id of ['remaining','replenish','chunks']){
  await browse(page);await page.locator(`[data-lesson-id="tasks-${id}"]`).click();
  const lesson=await page.evaluate(async id=>(await import('/curriculum.js')).findLesson('toaststunt','tasks-'+id),id);
  await run(page,lesson.code,'Return: '+lesson.expected);
 }
 await browse(page);await page.locator('[data-lesson-id="tasks-server-quotas"]').click();
 await expect(page.locator('#lessonBody')).toContainText('60,000');
 await expect(page.locator('#lessonBody')).toContainText('load_server_options()');
 await expect(page.locator('#lessonBody a').first()).toHaveAttribute('href',/controlling-the-execution-of-tasks/);
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  if(width<1200)await page.getByRole('tab',{name:'Lesson',exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/tasks-${width}.png`,fullPage:true});
 }
 // Loading a later checkpoint must skip prior deliberate errors and waits.
 page.on('dialog',dialog=>dialog.accept());
 await page.locator('#checkpointControls summary').click();
 await page.locator('#resetLessonWorld').click();
 await expect(page.locator('#runButton')).toBeEnabled();
 await browse(page);await page.locator('#trackSelect').selectOption('foundations');
 await run(page,'return this.name;','Return: "Original track"');
});

test('profile dropdown switches task manuals and quotas and persists across refresh',async({page})=>{
 await ready(page);
 await browse(page);await page.locator('#trackSelect').selectOption('tasks');
 await browse(page);await page.locator('[data-lesson-id="tasks-server-quotas"]').click();
 for(const toast of [false,true]){
  await page.getByRole('combobox',{name:'PROFILE',exact:true}).selectOption(toast?'toaststunt':'lambdamoo');
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue(toast?'toaststunt':'lambdamoo');
  await expect(page.locator('#lessonBody')).toContainText(`The ${toast?'ToastStunt':'LambdaMOO'} manual`);
  await expect(page.locator('#lessonBody a').first()).toHaveAttribute('href',toast?/lisdude\/toaststunt-documentation/:/sevenecks\/lambda-moo-programming\/blob\/master\/tutorials\/moo-programmers-manual-updated.md#controlling-the-execution-of-tasks/);
  if(!toast)await expect(page.locator('#lessonBody')).not.toContainText('load_server_options');
  const lesson=await page.evaluate(async profile=>(await import('/curriculum.js')).findLesson(profile,'tasks-server-quotas'),toast?'toaststunt':'lambdamoo');
  await run(page,lesson.code,'Return: '+lesson.expected);
  await saved(page);await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue(toast?'toaststunt':'lambdamoo');
 }
 await page.setViewportSize({width:390,height:900});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('.profile-help summary').click();
 await expect(page.locator('.profile-help-content')).toBeVisible();
 await page.screenshot({path:'test-results/profile-select-390.png'});
});
