import {test,expect,ready,browse} from './helpers.js';

test('desktop lesson selection preserves the page and navigation scroll, resetting only the content panes',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await ready(page);
 await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 const target=page.locator('[data-lesson-id="utility-string-parse-values"]');
 await target.evaluate(el=>el.scrollIntoView({block:'center'}));
 await page.evaluate(()=>{
  document.querySelector('.lab-pane').scrollTop=180;
  document.querySelector('#codeEditor').scrollLeft=100;
 });
 const before=await page.evaluate(()=>({page:scrollY,nav:document.querySelector('#lessonNav').scrollTop}));
 expect(before.page).toBeGreaterThan(0);
 expect(before.nav).toBeGreaterThan(0);
 await target.click();
 await expect(page.locator('#lessonTitle')).toHaveText('Parse literal text and check the result tag');
 await expect(page.locator('#runButton')).toBeEnabled();
 await expect(target).toBeInViewport();
 const after=await page.evaluate(()=>({page:scrollY,nav:document.querySelector('#lessonNav').scrollTop,lab:document.querySelector('.lab-pane').scrollTop,code:document.querySelector('#codeEditor').scrollLeft}));
 expect(after.page).toBeCloseTo(before.page,0);
 expect(after.nav).toBeCloseTo(before.nav,0);
 expect(after.lab).toBe(0);expect(after.code).toBe(0);
});

test('compact selection still closes the drawer and starts at the selected lesson',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await page.evaluate(()=>window.scrollTo(0,400));
 await browse(page);
 await page.locator('[data-lesson-id="utility-string-tool-report"]').click();
 await expect(page.locator('#lessonDrawer')).not.toBeVisible();
 await expect(page.locator('#lessonTitle')).toHaveText('Build a readable tool report');
 await expect(page.locator('#lessonTitle')).toBeInViewport();
 expect(await page.evaluate(()=>scrollY)).toBe(0);
});
