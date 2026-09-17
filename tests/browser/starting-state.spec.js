import {test,expect,ready,browse} from './helpers.js';

test('Starting State defaults open and remembers keyboard toggles across lessons, tracks and reloads',async({page})=>{
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 const box=page.locator('#startingRequirements'),summary=box.locator('summary');
 await expect(summary).toHaveText('Starting State');
 await expect(box).toHaveAttribute('open','');
 await expect(box.locator('#resetLessonWorld')).toBeVisible();
 await summary.focus();await page.keyboard.press('Space');
 await expect(box).not.toHaveAttribute('open','');
 await expect(box.locator('#resetLessonWorld')).not.toBeVisible();
 await browse(page);await page.locator('[data-lesson-id="utility-string-case"]').click();
 await expect(page.locator('#lessonTitle')).toHaveText('Change letter case');
 await expect(box).not.toHaveAttribute('open','');
 await browse(page);await page.locator('#trackSelect').selectOption('utility-list');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(box).not.toHaveAttribute('open','');
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(box).not.toHaveAttribute('open','');
 await summary.focus();await page.keyboard.press('Enter');
 await expect(box).toHaveAttribute('open','');
 page.once('dialog',dialog=>dialog.dismiss());
 await box.locator('#resetLessonWorld').click();
 await expect(box).toHaveAttribute('open','');
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(box).toHaveAttribute('open','');
});

test('Starting State stays collapsed during the session when preference storage is unavailable',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.addInitScript(()=>{
  const set=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,...rest){
   if(key==='moo-starting-state-expanded')throw new DOMException('Blocked','SecurityError');
   return set.call(this,key,...rest);
  };
 });
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 const box=page.locator('#startingRequirements');
 await box.locator('summary').click();
 await expect(box).not.toHaveAttribute('open','');
 await browse(page);await page.locator('[data-lesson-id="utility-string-words"]').click();
 await expect(box).not.toHaveAttribute('open','');
 await expect(box.locator('summary')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
