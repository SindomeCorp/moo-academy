import {test,expect,ready,run,saved,browse} from './helpers.js';
test.setTimeout(90000);
test('Common Packages sandboxes preserve independent worlds and profile selections',async({page},info)=>{
 await ready(page,'sandbox');
 await page.locator('#sandboxWorld').selectOption('common-packages');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(page.locator('#executionContext')).toContainText('this #128 · player #127');
 await run(page,'this.name="My packages"; return $math_utils:factorial(5);','Return: 120');await saved(page);
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await run(page,'return this.name;','"My packages"');
 await page.locator('#sandboxWorld').selectOption('basic');await expect(page.locator('#runButton')).toBeEnabled();
 await run(page,'return this.name;','"Training Room"');
 await page.locator('#sandboxWorld').selectOption('common-packages');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await run(page,'return this.name;','"My packages"');
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#sandboxWorld option[value="common-packages"]')).toHaveCount(0);
 await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(page.locator('#sandboxWorld')).toHaveValue('common-packages');await run(page,'return this.name;','"My packages"');
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('common-sandbox-'+width+'.png'),fullPage:true});
 }
});
test('utility tracks, source reference and unsupported source recovery work',async({page})=>{
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await run(page,'return $string_utils:trim("  hello  ");','"hello"');
 await run(page,'return $wiz_utils:boot_idlers();','unsupported-feature');
 await expect(page.locator('#output')).toContainText('discarded');
 await page.getByRole('tab',{name:'Reference',exact:true}).click();
 await page.getByText('Browse utility verbs',{exact:true}).click();
 await expect(page.locator('#utilityReference [role="status"]')).toHaveText('375 definitions');
 await page.locator('#utilitySearch').fill('factorial');
 await page.locator('.utility-results > details').first().locator('summary').click();
 await expect(page.locator('.utility-results')).toContainText('Original source');
 await expect(page.locator('.utility-results')).toContainText('$math_utils:factorial');
 await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');await expect(page.locator('#runButton')).toBeEnabled();
 await expect(page.locator('#trackSelect')).toHaveValue('foundations');
 await page.locator('#runtimeProfileSelect').selectOption('toaststunt');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(page.locator('#trackSelect')).toHaveValue('utility-string');
});
test('Common Packages fits compact layouts and reset cancellation preserves state',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});await ready(page);await browse(page);
 await page.locator('#trackSelect').selectOption('utility-list');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(page.locator('#lessonDrawer')).not.toBeVisible();
 await expect(page.locator('#lessonTitle')).toBeInViewport();
 await page.locator('#openCode').click();await run(page,'this.name="Keep me";return $list_utils:flatten({1,{2}});','{1, 2}');
 await page.getByRole('tab',{name:'Lesson',exact:true}).click();
 page.once('dialog',d=>d.dismiss());await page.locator('#resetLessonWorld').click();
 await run(page,'return this.name;','"Keep me"');
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.getByRole('tab',{name:'World',exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('common-world-'+width+'.png'),fullPage:true});
 }
});
