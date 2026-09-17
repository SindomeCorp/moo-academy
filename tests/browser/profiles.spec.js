import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect,run} from './helpers.js';

async function switchProfile(page,toast) {
  await page.locator('#runtimeProfileSelect').selectOption(toast?'toaststunt':'lambdamoo');
  await expect(page.locator('#runtimeProfile')).toHaveText(toast ? 'ToastStunt' : 'LambdaMOO');
  await expect(page.locator('#runButton')).toBeEnabled();
}
test('profiles change execution, filter examples, and retain independent worlds and drafts across reloads',async ({page})=>{
  await page.goto('/');
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue('toaststunt');
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await expect(page.locator('#lessonNav button')).toHaveCount(218);
  const toastCode='o = create(#3); o.name = "Toast object"; return {-5 % 3, o};';
  await run(page,toastCode,'Return: {1, #43}');
  await switchProfile(page,false);
  await expect(page.locator('#lessonNav button')).toHaveCount(119);
  const lambdaCode='o = create(#3); o.name = "Lambda object"; return {-5 % 3, o};';
  await run(page,lambdaCode,'Return: {-2, #43}');
  await switchProfile(page,true);
  await expect(page.locator('#codeEditor')).toHaveValue(toastCode);
  await run(page,'return #43.name;','Return: "Toast object"');
  await switchProfile(page,false);
  await expect(page.locator('#codeEditor')).toHaveValue(lambdaCode);
  await run(page,'return #43.name;','Return: "Lambda object"');
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue('lambdamoo');
  await expect(page.locator('#codeEditor')).toHaveValue('return #43.name;');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: "Lambda object"');
  await expect(page.locator('#runButton')).toBeEnabled();
  page.once('dialog',d=>d.accept());
  await worldManagement(page);await page.locator('#resetWorld').click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return valid(#43);','Return: 0');
  await switchProfile(page,true);
  await run(page,'return #43.name;','Return: "Toast object"');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'mapkeys()'}).click();
  await switchProfile(page,false);
  await expect(page.locator('#lessonTitle')).not.toContainText('mapkeys');
  await page.getByRole('tab',{name:'Reference',exact:true}).click();
  await expect(page.locator('#builtinReferenceStatus')).toContainText('LambdaMOO');
  await expect(page.locator('#builtinReferenceGrid details')).toHaveCount(119);
});
test('new Foundations examples run successfully in both profiles and explain falsey versus equality',async ({page})=>{
  await page.goto('/');
  await expect(page.locator('#runButton')).toBeEnabled();
  for(const toast of [true,false]) {
    await switchProfile(page,toast);
    for(const [title,result] of [['Return is optional','Return: 0'],['Truthy and falsey values','First integer: false branch'],['Falsey does not mean equal','Equality comparison: false branch']]) {
      await browse(page);await page.locator('#lessonNav button').filter({hasText:title}).click();
      await codeView(page);await page.locator('#runButton').click();
      await expect(page.locator('#output')).toContainText(result);
      if (title === 'Truthy and falsey values') {
        await expect(page.locator('#output')).toContainText('Second string: true branch');
        if (toast) await expect(page.locator('#output')).toContainText('Empty map: false branch');
        else await expect(page.locator('#codeEditor')).not.toHaveValue(/if \(\[\]\)/);
      }
      await expect(page.locator('#output')).toContainText('Example explored');
      await expect(page.locator('#runButton')).toBeEnabled();
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByLabel('About LambdaMOO and ToastStunt').click();
  await expect(page.locator('.profile-help-content')).toBeVisible();
  const bounds=await page.locator('.profile-help-content').boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x+bounds.width).toBeLessThanOrEqual(390);
});
test('a failed save keeps the active profile, draft, and world available for retry',async ({page})=>{
  await page.goto('/');
  await expect(page.locator('#runButton')).toBeEnabled();
  await page.evaluate(()=>{
    window.originalPut=IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put=function(...args){
      if(args[1]!=='writer-lease') throw new DOMException('Quota exceeded','QuotaExceededError');
      return window.originalPut.apply(this,args);
    };
  });
  await run(page,'this.name="Unsaved Toast"; return this.name;','Return: "Unsaved Toast"');
  await page.locator('#runtimeProfileSelect').selectOption('lambdamoo');
  await expect(page.locator('#runtimeProfileSelect')).toHaveValue('toaststunt');
  await expect(page.locator('#editorPanel .workspace-problem')).toContainText('pending changes');
  await expect(page.locator('#codeEditor')).toHaveValue('this.name="Unsaved Toast"; return this.name;');
  await page.evaluate(()=>{IDBObjectStore.prototype.put=window.originalPut;});
  await switchProfile(page,false);
  await switchProfile(page,true);
  await run(page,'return this.name;','Return: "Unsaved Toast"');
});
test('session-only mode retains each profile until the page closes',async ({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new Error('storage blocked');}}));
  await page.goto('/');
  await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'this.name="Session Toast"; return this.name;','Return: "Session Toast"');
  await switchProfile(page,false);
  await run(page,'return this.name;','Return: "Training Room"');
  await switchProfile(page,true);
  await expect(page.locator('#codeEditor')).toHaveValue('this.name="Session Toast"; return this.name;');
  await run(page,'return this.name;','Return: "Session Toast"');
  await expect(page.locator('#editorPanel .persistence-status')).toContainText('Session only');
});
