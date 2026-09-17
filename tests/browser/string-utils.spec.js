import {test,expect,ready,browse,run} from './helpers.js';
import {utilityCourses} from '../../dist/utility-lessons.js';
const lessons=utilityCourses['utility-string'];
test('String Utils progresses through grouped examples and keeps drafts and completion',async({page},info)=>{
 test.setTimeout(60000);
 await page.setViewportSize({width:390,height:844});
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('utility-string');
 await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await expect(page.locator('[data-lesson-id^="utility-string-"]')).toHaveCount(lessons.length);
 for(const id of ['trim','quoted-words','numeric-text','parse-values','tool-report']){
  const lesson=lessons.find(l=>l.id==='utility-string-'+id);
  await browse(page);await page.locator(`[data-lesson-id="${lesson.id}"]`).click();
  await expect(page.locator('#lessonTitle')).toBeInViewport();
  await expect(page.locator('#lessonBody code').first()).toBeVisible();
  for(const line of lesson.expectedOutput)await expect(page.locator('#starterResult')).toContainText(line);
  await run(page,lesson.code,lesson.expectedOutput[0]);
  for(const line of lesson.expectedOutput)await expect(page.locator('#output')).toContainText(line);
  await expect(page.locator('#output h3').first()).toHaveText('Output');
  await expect(page.locator('#output')).toContainText('Example explored');
  await expect(page.locator(`[data-lesson-id="${lesson.id}"]`)).toHaveClass(/complete/);
 }
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('string-results-'+width+'.png'),fullPage:true});
 }
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled({timeout:20000});
 await page.getByRole('tab',{name:'Code',exact:true}).click();
 await expect(page.locator('#codeEditor')).toHaveValue(lessons.at(-1).code);
 await expect(page.locator('[data-lesson-id="utility-string-trim"]')).toHaveClass(/complete/);
 await page.getByRole('tab',{name:'Reference',exact:true}).click();
 await page.getByText('Browse utility verbs',{exact:true}).click();
 await page.locator('#utilitySearch').fill('prefix_to_value');
 await page.locator('.utility-results > details').first().locator('summary').click();
 await expect(page.locator('.utility-results')).toContainText('Read one value and keep the remaining text');
 await expect(page.locator('.utility-results')).toContainText('Starter output');
 await expect(page.locator('.utility-results')).toContainText('PREFIX_TO_VALUE with remainder:');
});
