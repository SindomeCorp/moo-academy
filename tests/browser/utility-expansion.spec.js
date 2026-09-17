import {test,expect,ready,browse,run,saved} from './helpers.js';
import {utilityCourses} from '../../dist/utility-lessons.js';
test.setTimeout(90000);
test('expanded utility tracks expose grouped lessons and keep the selected draft',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page);
 for(const name of ['list','set','math','matrix','time','object','match','code','command','wiz']){
  await browse(page);await page.locator('#trackSelect').selectOption('utility-'+name);
  await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
  await expect(page.locator(`[data-lesson-id^="utility-${name}-"]`)).toHaveCount(utilityCourses['utility-'+name].length);
  await expect(page.locator('#lessonTitle')).toBeInViewport();
 }
 await run(page,'player:tell("My utility draft");','My utility draft');await saved(page);
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await page.getByRole('tab',{name:'Code',exact:true}).click();
 await expect(page.locator('#codeEditor')).toHaveValue('player:tell("My utility draft");');
});
test('source walkthrough completion does not claim server execution and remains readable',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});await ready(page);await browse(page);
 await page.locator('#trackSelect').selectOption('utility-command');await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await browse(page);await page.locator('[data-lesson-id="utility-command-input"]').click();
 await expect(page.locator('#serverExercise')).toContainText('Expected server effect');
 await expect(page.locator('#serverExercise')).toContainText('"brush"');
 const lesson=utilityCourses['utility-command'].find(l=>l.id==='utility-command-input');
 await run(page,lesson.code,'Source walkthrough explored');
 await expect(page.locator('#output')).toContainText('server exercise has not been executed here');
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});if(await page.getByRole('tab',{name:'Lesson',exact:true}).isVisible())await page.getByRole('tab',{name:'Lesson',exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('server-lesson-'+width+'.png'),fullPage:true});
 }
 await page.getByRole('tab',{name:'Reference',exact:true}).click();await page.getByText('Browse utility verbs',{exact:true}).click();
 await page.locator('#utilitySearch').fill('#56:2');
 await page.locator('.utility-results > details').first().locator('summary').click();
 await expect(page.locator('.utility-results')).toContainText('Real-server exercise');
 await expect(page.locator('.utility-results')).toContainText('Source walkthrough output');
});
test('illustrative output is labeled and reset cancellation keeps experimental state',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-math');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});await browse(page);
 await page.locator('[data-lesson-id="utility-math-random"]').click();
 await expect(page.locator('#starterResult')).toContainText('Example output (varies)');
 await run(page,'this.name="Keep experiment"; player:tell(this.name);','Keep experiment');
 await page.getByRole('tab',{name:'Lesson',exact:true}).click();page.once('dialog',d=>d.dismiss());await page.locator('#resetLessonWorld').click();
 await run(page,'return this.name;','Keep experiment');
});
