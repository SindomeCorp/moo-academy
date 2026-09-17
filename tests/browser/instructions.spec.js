import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect} from './helpers.js';

test('objectives and hints preserve code blocks and wrap within the lesson at narrow widths',async({page})=> {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Make decisions'}).click();
  const decision='if (this.locked)\n  player:tell("The door is locked.");\nelse\n  player:tell("You enter.");\nendif';
  expect(await page.locator('#challengeText pre code').textContent()).toBe(decision);
  await expect(page.locator('#challengeText pre')).toHaveCSS('white-space','pre-wrap');
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const box=await page.locator('#challengeText pre').boundingBox();
    const card=await page.locator('.task-card').boundingBox();
    expect(box.width).toBeLessThan(card.width);
  }
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Work with lists'}).click();
  await page.locator('#hintButton').click();
  expect(await page.locator('#hintBox pre code').textContent()).toContain('\n  player:tell(tool);\n');
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await browse(page);await page.locator('[data-lesson-id="builtin-max_object"]').click();
  const blocks=await page.locator('#experiment pre code').allTextContents();
  expect(blocks).toContain('room = create(#3);\nother = create(#3);');
  await expect(page.locator('#experiment p').filter({hasText:'With:'})).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/objective-mobile.png',fullPage:true});
});

test('instruction prose and code are rendered as text',async({page})=> {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await page.evaluate(async()=>{
    const {renderInstructions}=await import('/instructions.js');
    renderInstructions(document.querySelector('#challengeText'),['<img src=x>',{code:'if (1)\n  player:tell("<b>text</b>");\nendif'}]);
  });
  await expect(page.locator('#challengeText img, #challengeText b')).toHaveCount(0);
  await expect(page.locator('#challengeText p')).toHaveText('<img src=x>');
  expect(await page.locator('#challengeText pre code').textContent()).toContain('\n  player:tell("<b>text</b>");\n');
});

test('inline source is explicit, safe, and distinct from prose and block code', async ({page}) => {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await page.evaluate(async () => {
    const {renderInstructions} = await import('/instructions.js');
    renderInstructions(document.querySelector('#challengeText'), [
      'Use <code>return b:bump(4);</code> then compare <code>x &lt; 4 &amp;&amp; x &gt; 0</code>.',
      '<img src=x> <code>&lt;img src=x&gt;</code>',
      {code:'return "<code>literal</code>";'}
    ]);
  });
  await expect(page.locator('#challengeText p code').first()).toHaveText('return b:bump(4);');
  await expect(page.locator('#challengeText p code').nth(1)).toHaveText('x < 4 && x > 0');
  await expect(page.locator('#challengeText img')).toHaveCount(0);
  await expect(page.locator('#challengeText pre code')).toHaveText('return "<code>literal</code>";');
  const colors=await page.locator('#challengeText p').first().evaluate(p=>[getComputedStyle(p).color,getComputedStyle(p.querySelector('code')).color]);
  expect(colors[0]).not.toBe(colors[1]);
  await browse(page); await page.locator('#trackSelect').selectOption('verbs');
  await browse(page); await page.locator('[data-lesson-id="verbs-counter-project"]').click();
  await expect(page.locator('#experiment code').filter({hasText:'return b:bump(4);'})).toHaveCount(1);
  await expect(page.locator('#startingState code').first()).toHaveText('this.workbench');
  for(const width of [390,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`test-results/inline-code-${width}.png`,fullPage:true});
  }
  await browse(page); await page.locator('#trackSelect').selectOption('debugging');
  await browse(page); await page.locator('[data-lesson-id="debugging-inspect"]').click();
  await expect(page.locator('#lessonBody a')).toHaveAttribute('href',/toaststunt-programmers-manual/);
  await expect(page.locator('#lessonBody')).toContainText('accepts any value');
  await expect(page.locator('#experiment pre code')).toContainText('typeof(value) == MAP');
});

test('debugging explanations distinguish runnable alternatives and bounded scheduling',async({page})=>{
 await page.goto('/');await expect(page.locator('#runButton')).toBeEnabled();
 await browse(page);await page.locator('#trackSelect').selectOption('debugging');
 for(const [id,phrase] of [['budgets','Tasks, ticks and suspension'],['catch-expression','error-code list or ANY are still required'],['conditional','ternary conditional expression']]){
  await browse(page);await page.locator(`[data-lesson-id="debugging-${id}"]`).click();
  await expect(page.locator('#lessonBody')).toContainText(phrase);
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:900});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.screenshot({path:`test-results/debugging-${id}-${width}.png`,fullPage:true});
  }
 }
});
