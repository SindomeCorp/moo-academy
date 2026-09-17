import {test,expect,ready,run,record} from './helpers.js';

for (const width of [390,768,1024,1440]) test(`learning flow and screenshots at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900}); await ready(page);
 const compact=width<1200;
 const browse=async()=>{if(compact)await page.locator('#browseLessons').click();};
 await expect(page.locator('#lessonTitle')).toBeVisible();
 expect((await page.locator('#lessonTitle').boundingBox()).y).toBeLessThan(500);
 await browse(); await page.locator('[data-lesson-id="objects"]').click();
 if(compact)await expect(page.locator('#lessonDrawer')).not.toBeVisible();
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/flow-${width}-lesson.png`,fullPage:true});
 await page.locator('#openCode').click();
 await page.locator('#codeEditor').fill('this.name="Kept"; return this.name;');await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('Return: "Kept"');
 await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#output h3')).toContainText(['Returned value','Exercise result','World changes']);
 await page.locator('#inspectWorld').click();await expect(page.locator('#worldDetail')).toContainText('Kept');
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/flow-${width}-world.png`,fullPage:true});
 await page.getByRole('tab',{name:'Code',exact:true}).click();await expect(page.locator('#codeEditor')).toHaveValue(/Kept/);
 await browse();await page.locator('#trackSelect').selectOption('collections');
 await expect(page.locator('#starterResult')).toContainText('{"hammer", 3}');
 await expect(page.locator('#experiment .code-card')).toContainText('tools =');
 await expect(page.locator('#experiment .result-card')).toContainText('{"hammer", 4}');
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/flow-${width}-list.png`,fullPage:true});
 await browse();await page.locator('[data-lesson-id="collections-slices"]').click();
 await expect(page.locator('#starterResult')).toContainText('{{"saw", "drill"}, "work"}');
 await expect(page.locator('#experiment .result-card')).toContainText('{{"hammer", "saw"}, "shop"}');
 await browse();await page.locator('#trackSelect').selectOption('integrations');
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/flow-${width}-warning.png`,fullPage:true});
 await page.locator('#workspaceMode').selectOption('sandbox');
 await expect(page.locator('#checkpointControls')).not.toBeVisible();
 await expect(page.locator('#trainingNote')).not.toBeVisible();
 await expect(page.locator('#runButton')).toBeEnabled();
 const lab=await page.locator('.lab-pane').boundingBox();
 if(compact){
  const tabs=await page.locator('.panel-tabs').boundingBox(),toolbar=await page.locator('#editorPanel .runbar').boundingBox();
  expect(Math.abs(toolbar.y-(tabs.y+tabs.height))).toBeLessThan(2);
 }else expect(Math.abs((await page.locator('#worldPanel').boundingBox()).y-lab.y)).toBeLessThan(2);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/flow-${width}-sandbox.png`,fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('compact drawer, keyboard tabs and skipped workbench recovery preserve state',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page);
 await page.locator('#browseLessons').click();await expect(page.locator('#trackSelect')).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.locator('#browseLessons')).toBeFocused();
 await page.getByRole('tab',{name:'Lesson',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#editorPanel')).toBeVisible();
 await page.locator('#browseLessons').click();await page.locator('#trackSelect').selectOption('objects');
 await page.locator('#browseLessons').click();await page.locator('[data-lesson-id="objects-properties"]').click();
 await expect(page.locator('#startingRequirements #resetLessonWorld')).toBeVisible();
 const before=await record(page);
 page.once('dialog',d=>d.dismiss());await page.locator('#resetLessonWorld').click();expect(await record(page)).toBe(before);
 await page.locator('#openCode').click();await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('E_INVARG');
 const source=await page.locator('#codeEditor').inputValue();
 page.once('dialog',d=>d.accept());await page.locator('#output').getByRole('button',{name:'Load lesson starting world'}).click();
 await expect(page.locator('#codeEditor')).toHaveValue(source);await page.locator('#runButton').click();await expect(page.locator('#output')).toContainText('Example explored');
});

test('zoom, long code and output stay contained; drawer traps focus',async({page})=>{
 await page.setViewportSize({width:768,height:900});await ready(page);
 await page.evaluate(()=>document.body.style.zoom='2');
 await page.locator('#browseLessons').click();
 await page.locator('#closeDrawer').focus();await page.keyboard.press('Shift+Tab');
 expect(await page.evaluate(()=>document.querySelector('#lessonDrawer').contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await expect(page.locator('#browseLessons')).toBeFocused();
 await page.locator('#openCode').click();
 await page.locator('#codeEditor').fill('player:tell("'+'x'.repeat(2000)+'"); return 42;');await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('Return: 42');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:'test-results/flow-zoom.png',fullPage:true});
});
