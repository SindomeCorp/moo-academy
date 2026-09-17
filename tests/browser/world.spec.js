import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import { test, expect, readyBuiltins as ready, run, openWorld } from './helpers.js';
async function select(page, query) {
  await page.locator('#worldSearch').fill(query);
  await page.locator('#worldTree [data-object-id]').first().click();
}

test('tree, search, object links, properties, source and preserved selection reflect the shared world', async ({page}) => {
  await ready(page);
  await run(page, 'p=create(#3); p.name="Workshop"; add_property(p,"score",10,{player,"rw"}); c=create(p); c.name="Child"; add_property(c,"links",{p,#999},{player,"rw"}); add_verb(p,{player,"rx","greet hello"},{"this","none","this"}); set_verb_code(p,"greet",{"return this.score;"}); return c;');
  await openWorld(page);
  await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
  await expect(page.locator('.world-created')).toContainText('#43 — Workshop');
  await expect(page.locator('.world-created')).toContainText('#44 — Child');
  await select(page,'cHiLd');
  await expect(page.locator('#worldDetail h2')).toHaveText('#44 — Child');
  await expect(page.locator('#worldSearch')).toHaveValue('');
  await expect(page.locator('[data-expand-id="43"]')).toHaveAttribute('aria-expanded','true');
  const score=page.locator('[data-property="score"]');
  await expect(score).toContainText('Inherited — clear slot'); await expect(score).toContainText('10');
  await expect(score).toContainText('#43 — Workshop');
  await expect(page.locator('[data-property="links"]')).toContainText('#999 (missing)');
  await page.locator('[data-property="links"] button').filter({hasText:'#43 — Workshop'}).first().click();
  await expect(page.locator('#worldDetail h2')).toHaveText('#43 — Workshop');
  const children=page.locator('.world-field').filter({has:page.getByText('Direct children',{exact:true})});
  await children.getByRole('button',{name:'#44 — Child',exact:true}).click();
  await page.locator('[data-verb="greet hello"] summary').click();
  await expect(page.locator('[data-verb="greet hello"] pre')).toHaveText('return this.score;');
  await run(page,'#44.score=20; return #44.score;'); await openWorld(page);
  await expect(page.locator('#worldDetail h2')).toHaveText('#44 — Child');
  await expect(score).toContainText('Inherited — override'); await expect(score).toContainText('20');
  await run(page,'clear_property(#44,"score"); set_property_info(#43,"score",{player,"r","points"}); return #44.points;');
  await openWorld(page); await expect(page.locator('[data-property="score"]')).toHaveCount(0);
  await expect(page.locator('[data-property="points"]')).toContainText('Inherited — clear slot');
  await expect(page.locator('[data-property="points"]')).toContainText('10');
  await page.locator('#worldSearch').fill('no such object'); await expect(page.locator('#worldTree')).toHaveText('No matching objects.');
  await browse(page);await page.locator('[data-lesson-id="builtin-notify"]').click(); await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await expect(page.locator('#worldSearch')).toHaveValue('');
  await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
  await codeView(page);await page.locator('#inspectWorld').click(); await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
});

test('recycled selection, reset, committed errors and isolated grading', async ({page}) => {
  await ready(page); await run(page,'o=create(#3); return o;'); await openWorld(page); await select(page,'43');
  await run(page,'#43.name="Changed before error"; return 1/0;','runtime-error (committed)'); await openWorld(page);
  await expect(page.locator('#worldDetail h2')).toHaveText('#43 — Changed before error');
  await run(page,'#43.name="Changed before limit"; while(1) notify(player,"x"); endwhile','limit-exceeded (committed)');
  await openWorld(page); await expect(page.locator('#worldDetail h2')).toHaveText('#43 — Changed before limit');
  await run(page,'recycle(#43); return 0;'); await openWorld(page);
  await expect(page.locator('#worldDetail')).toContainText('Object no longer exists.');
  await expect(page.locator('#worldTree [data-object-id="43"]')).toHaveCount(0);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button',{name:/Reset (track|sandbox) world/,exact:true}).click();
  await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
  await expect(page.locator('.world-created')).toContainText('None.');
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await run(page,'create(#3); player:tell("A workshop humming with possibility.");','Objective passed');
  await openWorld(page); await expect(page.locator('.world-status')).toContainText('8 objects');
  await expect(page.locator('.world-created button')).toHaveCount(1);
  await expect(page.locator('.world-created')).toContainText('#43 — (unnamed)');
});

test('world tab browses committed state during execution and Stop discards new objects', async ({page}) => {
  await ready(page);
  // Open World and stop from its own control as soon as output arrives.
  await page.evaluate(() => {
    const observer = new MutationObserver(() => {
      if (document.querySelector('#output').textContent.includes('ready to stop')) {
        observer.disconnect(); document.querySelector('#worldTab').click();
        window.worldDuringRun = document.querySelector('.world-status').textContent;
        window.createdDuringRun = document.querySelector('.world-created').textContent;
        [...document.querySelectorAll('#worldPanel button')].find(b=>b.textContent==='STOP').click();
      }
    });
    observer.observe(document.querySelector('#output'),{childList:true,subtree:true});
  });
  await codeView(page);await page.locator('#codeEditor').fill('create(#3); notify(player,"ready to stop"); while(1) endwhile');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('.world-status')).toContainText('7 objects');
  expect(await page.evaluate(()=>window.worldDuringRun)).toContain('Running');
  expect(await page.evaluate(()=>window.createdDuringRun)).toContain('None.');
  await expect(page.locator('#worldTree [data-object-id="43"]')).toHaveCount(0);
  await page.getByRole('tab',{name:'Code',exact:true}).click();
  await expect(page.locator('#output')).toContainText('cancelled (discarded)');
});

test('World uses safe text, lazy values, keyboard navigation and responsive layout', async ({page}) => {
  await ready(page);
  await run(page,'o=create(#3); o.name="<img src=x>"; add_property(o,"<b>value</b>",{#42,"safe"},{player,"rw"}); add_verb(o,{player,"rx","example"},{"this","none","this"}); set_verb_code(o,"example",{"return 42;"}); return o;');
  await page.getByRole('tab',{name:'Code',exact:true}).focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'World',exact:true})).toBeFocused();
  await select(page,'#43'); await expect(page.locator('#worldDetail h2')).toHaveText('#43 — <img src=x>');
  await expect(page.locator('#worldPanel img, #worldPanel b')).toHaveCount(0);
  const summary=page.locator('[data-verb="example"] summary');
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('[data-verb="example"] pre')).toHaveText('return 42;');
  for (const width of [390,1024,1440]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(page.locator('#worldDetail h2')).toBeVisible();
  }
  await page.screenshot({path:'test-results/world.png',fullPage:true});
  await page.getByRole('tab',{name:'World',exact:true}).focus(); await page.keyboard.press('Home');
  await expect(page.locator('#codeEditor')).toHaveValue(/o=create/);
});

test('Comments introduces standalone comments and preserves existing progress IDs', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('moo-progress-v3-executed',JSON.stringify(['objects','builtin-create'])));
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#lessonTitle')).toHaveText('Comments explain the code');
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  await codeView(page);await page.locator('#runButton').click(); await expect(page.locator('#output')).toContainText('Objective not yet met');
  await run(page,'"First explanation."; "Second explanation."; player:tell("Hello from MOO!");','Objective passed');
  await expect(page.locator('#output section').filter({has:page.getByRole('heading',{name:'Output',exact:true})})).toContainText('Hello from MOO!');
  await expect(page.locator('#progressText')).toHaveText('2 / 21 LESSONS');
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await expect(page.locator('#progressText')).toHaveText('1 / 218 EXPLORED');
  await expect(page.locator('#lessonBody')).not.toContainText('Quoted strings followed');
});

test('world browser handles the object limit and large values without eagerly expanding content', async ({page}) => {
  await ready(page);
  // Construct a maximum-sized supported world to exercise the browser independently
  // of worker execution budgets. The production browser remains read-only.
  await page.evaluate(async()=> {
    const {createWorld,moo}=await import('/runtime/dist/browser/index.js');
    const {createWorldBrowser}=await import('/world-browser.js');
    const world=createWorld({profile:'toaststunt'});
    world.addObject({id:0,owner:0});
    for(let id=1;id<1000;id++) world.addObject({id,parent:0,owner:0});
    world.addProperty(42n,'large',moo.list(Array.from({length:1000},(_,i)=>moo.int(i))),0n,'r');
    world.addProperty(42n,'text',moo.string('x'.repeat(5000)),0n,'r');
    createWorldBrowser(document.querySelector('#worldPanel'),{onReset(){},onStop(){}}).update(world,{reset:true});
  });
  await openWorld(page); await expect(page.locator('.world-status')).toContainText('1000 objects');
  await expect(page.locator('#worldTree [data-object-id]')).toHaveCount(1000);
  await expect(page.locator('[data-property="large"] ol')).toHaveCount(0);
  await page.locator('[data-property="large"] summary').click();
  await expect(page.locator('[data-property="large"] li')).toHaveCount(50);
  await page.locator('[data-property="large"]').getByRole('button',{name:'Show more'}).click();
  await expect(page.locator('[data-property="large"] li')).toHaveCount(100);
  await expect(page.locator('[data-property="text"] pre')).toHaveCount(0);
  await page.locator('[data-property="text"] summary').click();
  await expect(page.locator('[data-property="text"] pre')).toHaveText('"'+'x'.repeat(5000)+'"');
});

test('World reports initialization failure and empty worlds explicitly', async ({page}) => {
  await page.route('**/runtime/**/dist/browser/index.js',route=>route.abort());
  await page.goto('/'); await openWorld(page);
  await expect(page.locator('.world-status')).toHaveText('World unavailable. Reload to retry.');
  await expect(page.locator('#worldSearch')).toBeDisabled();
  await expect(page.locator('#worldPanel').getByRole('button',{name:/Reset (track|sandbox) world/,exact:true})).toBeDisabled();
  await page.unroute('**/runtime/**/dist/browser/index.js');
  await ready(page);
  await page.evaluate(async()=> {
    const {createWorld}=await import('/runtime/dist/browser/index.js');
    const {createWorldBrowser}=await import('/world-browser.js');
    createWorldBrowser(document.querySelector('#worldPanel'),{onReset(){},onStop(){}}).update(createWorld({profile:'toaststunt'}),{reset:true});
  });
  await openWorld(page); await expect(page.locator('.world-status')).toContainText('0 objects');
  await expect(page.locator('#worldTree')).toHaveText('No objects in this world.');
});

for (const panel of ['editor', 'world']) {
  test(`${panel} Reset World requires confirmation and cancel preserves the world`, async ({page}) => {
    await ready(page);
    await run(page,'this.lamp_on=8; return create(#3);');
    const code = await page.locator('#codeEditor').inputValue();
    const progress = await page.locator('#progressText').textContent();
    if (panel === 'world') { await openWorld(page); await select(page,'43'); }
    if(panel === 'editor') await worldManagement(page);
    const reset = panel === 'world'
      ? page.locator('#worldPanel').getByRole('button',{name:/Reset (track|sandbox) world/,exact:true})
      : page.locator('#resetWorld');
    let message;
    page.once('dialog', async dialog => { message=dialog.message(); await dialog.dismiss(); });
    await reset.click();
    expect(message).toContain('removes objects you created');
    expect(message).toContain('properties, and verbs');
    expect(message).toContain('cannot be undone');
    expect(message).toContain('Editor code and lesson progress will be kept');
    await expectProperty(page, 'lamp_on', '8');
    await openWorld(page); await select(page,'43');
    await expect(page.locator('#worldDetail h2')).toHaveText('#43 — (unnamed)');
    if (panel === 'editor') await page.getByRole('tab',{name:'Code',exact:true}).click();
    page.once('dialog', dialog => dialog.accept());
    await reset.click();
    await expectProperty(page, 'lamp_on', '0');
    await expect(page.locator('#codeEditor')).toHaveValue(code);
    await expect(page.locator('#progressText')).toHaveText(progress);
    await expect(page.locator('#trackSelect')).toHaveValue('builtins');
    await openWorld(page);
    await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
    await page.locator('#worldSearch').fill('43');
    await expect(page.locator('#worldTree')).toHaveText('No matching objects.');
  });
}
