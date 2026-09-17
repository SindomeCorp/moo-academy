import {test,expect,saved} from './helpers.js';

test('loading notice is visible before application code and stays gone during typing',async({page})=>{
 let release;
 const pending=new Promise(resolve=>release=resolve);
 await page.route('**/app.js?*',async route=>{await pending;await route.continue();});
 await page.goto('/',{waitUntil:'commit'});
 await expect(page.locator('#startupNotice')).toBeVisible();
 await expect(page.locator('#codeEditor')).toBeDisabled();
 await expect(page.locator('#runButton')).toBeDisabled();
 await expect(page.locator('.shell')).toHaveAttribute('aria-busy','true');
 release();
 await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#startupNotice')).toBeHidden();
 await expect(page.locator('.shell')).toHaveAttribute('aria-busy','false');
 await page.evaluate(()=>{
  window.startupChanges=0;
  new MutationObserver(records=>window.startupChanges+=records.length).observe(document.querySelector('#startupNotice'),{attributes:true});
 });
 await page.getByRole('tab',{name:'Code',exact:true}).click();
 await page.locator('#codeEditor').fill('return "Ready to type";');await saved(page);
 expect(await page.evaluate(()=>window.startupChanges)).toBe(0);
});

test('Common Packages explains its loading stage and enables the editor afterward',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});
 await page.addInitScript(()=>localStorage.setItem('moo-selected-track:toaststunt','utility-string'));
 let release;
 const pending=new Promise(resolve=>release=resolve);
 await page.route('**/packages/common-packages/world.json',async route=>{await pending;await route.continue();});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#startupMessage')).toContainText('Loading Common Packages');
 await expect(page.locator('#startupNotice')).toBeVisible();
 await expect(page.locator('#codeEditor')).toBeDisabled();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath('startup-390.png'),fullPage:true});
 release();
 await expect(page.locator('#codeEditor')).toBeEnabled({timeout:20000});
 await expect(page.locator('#startupNotice')).toBeHidden();
 await page.getByRole('tab',{name:'Code',exact:true}).click();
 await page.locator('#codeEditor').fill('player:tell("Input works");');
 await page.locator('#runButton').click();
 await expect(page.locator('#output')).toContainText('Input works');
 await expect(page.locator('#startupNotice')).toBeHidden();
});

test('startup failures retain an actionable reload notice',async({page})=>{
 await page.route('**/vendor/tree-sitter.js',route=>route.abort());
 await page.goto('/');
 await expect(page.locator('#startupTitle')).toHaveText('Workspace could not start');
 await expect(page.locator('#startupNotice').getByRole('link',{name:'Reload page'})).toBeVisible();
 await expect(page.locator('#codeEditor')).toBeDisabled();
 await expect(page.locator('#runButton')).toBeDisabled();
});
