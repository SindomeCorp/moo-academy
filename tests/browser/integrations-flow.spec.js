import {test,expect,ready,run,saved,browse} from './helpers.js';

test('integration sequences preserve queues, files and SQLite rows across navigation and refresh',async({page})=>{
 await ready(page);await browse(page);await page.locator('#trackSelect').selectOption('integrations');
 const ids=['connection','connection-empty','connection-reply','connection-queue','json','json-encode','json-validate','files','files-reopen','files-append','files-read-all','sql','sql-read','sql-filter','sql-update'];
 for(const id of ids){
  await browse(page);await page.locator(`[data-lesson-id="integrations-${id}"]`).click();
  const lesson=await page.evaluate(async id=>(await import('/curriculum.js')).findLesson('toaststunt','integrations-'+id),id);
  await run(page,lesson.code,'Return: '+lesson.expected);await saved(page);
 }
 await page.reload();await expect(page.locator('#runButton')).toBeEnabled();
 await browse(page);await page.locator('[data-lesson-id="integrations-sql-read"]').click();
 await run(page,await page.locator('#codeEditor').inputValue(),'Return: {"brush", 5}');
 await browse(page);await page.locator('[data-lesson-id="integrations-files-read-all"]').click();
 await run(page,await page.locator('#codeEditor').inputValue(),'Return: {"Workshop opened", "Stock checked"}');
});
