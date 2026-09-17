import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {solutions} from '../helpers/solutions.mjs';
import { test, expect, ready, run, saved, record } from './helpers.js';
const answer = 'player:tell("A workshop humming with possibility.");';
test('browser WASM, live errors, safe rendering, keyboard and persistent progress', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#syntaxStatus')).toHaveText('No syntax errors found by Tree-sitter.');
  await codeView(page);await page.locator('#codeEditor').fill('player:tell("<img src=x onerror=alert(1)>"');
  await expect(page.locator('#syntaxStatus')).toContainText('diagnostic');
  await expect(page.locator('#output')).toContainText('Line 1, column');
  await expect(page.locator('#output img')).toHaveCount(0);
  await codeView(page);await page.locator('#codeEditor').fill(answer);
  await page.locator('#codeEditor').press('Control+Enter');
  await expect(page.locator('#output')).toContainText('Objective passed: behavior verified');
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  await page.reload();
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await page.locator('#nextButton').click();
  await expect(page.locator('#lessonTitle')).toHaveText('Properties hold state');
  await page.locator('#hintButton').click();
  await expect(page.locator('#hintBox')).toBeVisible();
  await codeView(page);await page.locator('#codeEditor').fill('');
  await page.locator('#codeEditor').press('Tab');
  await expect(page.locator('#codeEditor')).toHaveValue('  ');
  await page.getByRole('tab', {name:'Reference'}).click();
  await expect(page.locator('#referencePanel')).toBeVisible();
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#resetProgress').click();
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  expect(errors).toEqual([]);
});
for (const asset of ['tree-sitter.js', 'tree-sitter.wasm', 'tree-sitter-moo.wasm']) {
  test(`failed ${asset} blocks completion`, async ({page}, testInfo) => {
    if(asset==='tree-sitter.wasm')testInfo.annotations.push({type:'expected-page-error',description:'Aborted\\(both async and sync fetching of the wasm failed\\)'});
    await page.route(`**/vendor/${asset}`, route => route.abort());
    await page.goto('/');
    await expect(page.locator('#syntaxStatus')).toContainText('unavailable');
    await expect(page.locator('#runButton')).toBeDisabled();
    await expect(page.locator('#codeEditor')).toBeDisabled();
    await page.keyboard.press('Control+Enter');
    await expect(page.locator('#output')).toContainText('Cannot execute');
    await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  });
}
for (const storage of ['malformed', 'blocked']) {
  test(`${storage} localStorage does not break lessons`, async ({page}) => {
    await page.addInitScript(mode => {
      if (mode === 'malformed') localStorage.setItem('moo-progress-v3-executed', '{invalid');
      else Object.defineProperty(window, 'localStorage', {get() { throw new Error('blocked'); }});
    }, storage);
    await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
    await expect(page.locator('#runButton')).toBeEnabled();
    await codeView(page);await page.locator('#codeEditor').fill(answer);
    await codeView(page);await page.locator('#runButton').click();
    await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  });
}
test('mobile and medium layouts fit and navigate', async ({page}) => {
  for (const width of [390, 1024]) {
    await page.setViewportSize({width, height:844});
    await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
    await expect(page.locator('#runButton')).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await browse(page);await page.locator('#lessonNav button').last().click();
    await expect(page.locator('#lessonTitle')).toHaveText('Project: a personalized welcome');
  }
  await page.screenshot({path:'test-results/editor.png', fullPage:true});
});

for (const [id, solution] of Object.entries(solutions)) {
  test(`${id}: starter fails and reviewed solution earns completion`, async ({page}) => {
    await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
    await browse(page);await page.locator(`[data-lesson-id="${id}"]`).click();
    await codeView(page);await page.locator('#runButton').click();
    await expect(page.locator('#output')).toContainText('Objective not yet met');
    await codeView(page);await page.locator('#codeEditor').fill(solution); await codeView(page);await page.locator('#runButton').click();
    await expect(page.locator('#output')).toContainText('Objective passed');
    await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  });
}
test('hardcoded first scenario cannot award completion', async ({page}) => {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('[data-lesson-id="args"]').click();
  await codeView(page);await page.locator('#codeEditor').fill('if(0) player:tell("Color: ",args[1]); endif player:tell("Color: green");');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Objective not yet met');
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
});

test('live output, Stop, runtime errors, output limits and persistent attempts', async ({ page }) => {
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click(); await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#codeEditor').fill('this.lamp_on=9; player:tell("before stop"); while(1) endwhile');
  await page.evaluate(() => {
    const observer = new MutationObserver(() => {
      if (document.querySelector('#output').textContent.includes('before stop')) {
        observer.disconnect(); document.querySelector('#stopButton').click();
      }
    });
    observer.observe(document.querySelector('#output'), { childList: true, subtree: true });
  });
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('before stop');
  await expect(page.locator('#output')).toContainText('cancelled (discarded)');
  await expectProperty(page, 'lamp_on', '0');
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  await codeView(page);await page.locator('#codeEditor').fill('this.lamp_on=2; player:tell("<img src=x>"); return 1/0;');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('E_DIV');
  await expect(page.locator('#output')).toContainText('runtime-error (committed)');
  await expect(page.locator('#output img')).toHaveCount(0);
  await expectProperty(page, 'lamp_on', '2');
  await codeView(page);await page.locator('#codeEditor').fill('player:tell(this.lamp_on); while(1) player:tell("x"); endwhile');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('limit-exceeded (committed)');
  expect((await page.locator('#output section').filter({has:page.getByRole('heading',{name:'Output',exact:true})}).locator('div').textContent()).startsWith('2\n')).toBe(true);
  await codeView(page);await page.locator('#codeEditor').fill(answer);
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Objective passed');
});

test('missing execution worker cannot award completion', async ({ page }) => {
  await page.route('**/runtime/**/dist/worker/browser.js', route => route.abort());
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click(); await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#codeEditor').fill(answer); await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Host error');
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
});

test('builtin reference is supplied by the installed runtime catalog', async ({ page }) => {
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click(); await expect(page.locator('#runButton')).toBeEnabled();
  await page.getByRole('tab', { name: 'Reference' }).click();
  await expect(page.locator('#builtinReferenceStatus')).toHaveText('Available builtins — ToastStunt');
  await expect(page.locator('#builtinReferenceGrid .ref-card')).toHaveCount(218);
  const notify = page.locator('[data-builtin="notify"]');
  await expect(notify.locator('strong')).toHaveText('notify(recipient: OBJ, text: STR)');
  await expect(page.locator('#builtinReferenceGrid details[open]')).toHaveCount(0);
  await expect(notify.locator('.builtin-details')).toBeHidden();
  await notify.locator('summary').hover();
  await expect(notify).toHaveCSS('border-top-color', 'rgb(124, 242, 160)');
  await notify.locator('summary').click();
  await expect(notify.locator('.builtin-details')).toBeVisible();
  await expect(notify).toContainText('Returns: INT');
  await expect(notify).toContainText('Returns 1 after emitting an output event.');
  await notify.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(notify.locator('.builtin-details')).toBeHidden();
  await expect(page.locator('[data-builtin="index"]')).toContainText('[offset: INT]');
  await expect(page.locator('[data-builtin="tostr"]')).toContainText('...values: any');
  await expect(page.locator('[data-builtin="raise"]')).toContainText('Returns: never');
  await expect(page.locator('[data-builtin="pass"]')).toHaveCount(1);
  await expect(page.locator('[data-builtin="function_info"]')).toHaveCount(1);
  await expect(page.locator('[data-builtin="tell"]')).toHaveCount(0);
  await expect(page.locator('#referenceGrid')).toContainText('unsupported here');
  const actual = await page.locator('#builtinReferenceGrid .ref-card').evaluateAll(cards => cards.map(card => card.dataset.builtin));
  const expected = await page.evaluate(async () => (await import('/runtime/dist/browser/index.js')).listBuiltins({ profile: 'toaststunt' }).map(info => info.name));
  expect(actual).toEqual(expected);
  await page.getByRole('tab', { name: 'Code' }).click();
  await codeView(page);await page.locator('#codeEditor').fill('return function_info("notify");');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: {"notify", 2, 2, {1, 2}}');
});

test('builtin reference renders metadata as text and reports loading failure', async ({ page }) => {
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click(); await expect(page.locator('#runButton')).toBeEnabled();
  await page.getByRole('tab', { name: 'Reference' }).click();
  await page.evaluate(async () => {
    const { renderBuiltinReference } = await import('/builtin-reference.js');
    const { getBuiltinInfo } = await import('/runtime/dist/browser/index.js');
    const info = getBuiltinInfo('notify', { profile: 'toaststunt' });
    renderBuiltinReference(document.querySelector('#builtinReferenceGrid'), [{ ...info, summary: '<img src=x onerror=alert(1)>' }]);
  });
  await page.locator('#builtinReferenceGrid summary').click();
  await expect(page.locator('#builtinReferenceGrid')).toContainText('<img src=x onerror=alert(1)>');
  await expect(page.locator('#builtinReferenceGrid img')).toHaveCount(0);
  await page.route('**/runtime/**/dist/browser/index.js', route => route.abort());
  await page.reload();
  await page.getByRole('tab', { name: 'Reference' }).click();
  await expect(page.locator('#builtinReferenceStatus')).toContainText('unavailable');
  await expect(page.locator('#builtinReferenceGrid .ref-card')).toHaveCount(0);
});

test('builtin track runs every example, supports experiments, and keeps separate progress', async ({page}) => {
  test.setTimeout(240000);
  const { builtinLessons } = await import('../../dist/builtin-lessons.js');
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#codeEditor').fill(answer);
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await expect(page.locator('#progressText')).toHaveText('0 / 218 EXPLORED');
  await expect(page.locator('#taskLabel')).toHaveText('RUN AND EXPERIMENT');
  for (const [index, lesson] of builtinLessons.filter(l=>!l.profiles||l.profiles.includes("toaststunt")).entries()) {
    await browse(page);await page.locator(`[data-lesson-id="${lesson.id}"]`).click();
    await expect(page.locator('#codeEditor')).toHaveValue(lesson.code);
    page.once('dialog', dialog => dialog.accept());
    if (!await page.locator('#resetLessonWorld').isVisible()) await page.locator('#checkpointControls summary').click();
    await page.locator('#resetLessonWorld').click();
    await codeView(page);await page.locator('#runButton').click();
    await expect(page.locator('#output')).toContainText('Example explored: execution completed.');
    if(!lesson.dynamic)await expect(page.locator('#output')).toContainText('Return: ' + lesson.expected);
    await expect(page.locator('#progressText')).toHaveText(`${index + 1} / 218 EXPLORED`);
  }
  await browse(page);await page.locator('[data-lesson-id="builtin-notify"]').click();
  const notify = builtinLessons.find(lesson => lesson.builtin === 'notify');
  await codeView(page);await page.locator('#codeEditor').fill(notify.code.replace(notify.edit.find, notify.edit.replace));
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Welcome to MOO!');
  await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#restoreExample').click();
  await expect(page.locator('#codeEditor')).toHaveValue(notify.code);
  await page.reload();
  await expect(page.locator('#trackSelect')).toHaveValue('builtins');
  await expect(page.locator('#lessonTitle')).toHaveText('notify()');
  await expect(page.locator('#lessonNav button')).toHaveCount(218);
  await expect(page.locator('#progressText')).toHaveText('218 / 218 EXPLORED');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#resetProgress').click();
  await expect(page.locator('#progressText')).toHaveText('0 / 218 EXPLORED');
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  await expect(page.locator('#restoreExample')).toBeVisible();
});

test('builtin experiments report errors without progress and survive recycling the inspected room', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await codeView(page);await page.locator('#codeEditor').fill('return 1 / 0;');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Execution: runtime-error');
  await expect(page.locator('#progressText')).toHaveText('0 / 218 EXPLORED');
  await codeView(page);await page.locator('#codeEditor').fill('recycle(this); return valid(this);');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: 0');
  await expect(page.locator('#worldDetail')).toContainText('Object no longer exists.');
  await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#restoreExample').click();
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: "Score: 3"');
  await expect(page.locator('#worldDetail')).toContainText('Object no longer exists.');
  page.once('dialog', dialog => dialog.accept());
  await worldManagement(page);await page.locator('#resetWorld').click();
  await expect(page.locator('#worldDetail h2')).toHaveText('#42 — Training Room');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('world persists across runs and lessons, with separate tracks; reset clears world without clearing code or progress', async ({page}) => {
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await browse(page);await page.locator('[data-lesson-id="builtin-create"]').click();
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Example explored');
  await browse(page);await page.locator('#lessonNav button').filter({hasText: 'children()'}).click();
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: {#42, #43}');
  await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#restoreExample').click();
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: {#42, #43}');
  await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  // A passing Foundations submission also creates an object. Its grading runs
  // must not allocate additional objects in the learner's world.
  await codeView(page);await page.locator('#codeEditor').fill('create(#3); ' + answer);
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Objective passed');
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await codeView(page);await page.locator('#codeEditor').fill('return children(#3);');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: {#42, #43}');
  await expect(page.locator('#runButton')).toBeEnabled();
  const progress = await page.locator('#progressText').textContent();
  page.once('dialog', dialog => dialog.accept());
  await worldManagement(page);await page.locator('#resetWorld').click();
  await expect(page.locator('#codeEditor')).toHaveValue('return children(#3);');
  await expect(page.locator('#progressText')).toHaveText(progress);
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Return: {#42}');
});

test('property state survives grading, navigation and Stop, and reload restores the saved world', async ({page}) => {
  await page.goto('/');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await codeView(page);await page.locator('#codeEditor').fill('this.lamp_on=5; this.locked=0; ' + answer);
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Objective passed');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Make decisions'}).click();
  await expectProperty(page, 'lamp_on', '5');
  await codeView(page);await page.locator('#codeEditor').fill('if(this.locked) player:tell("The door is locked."); else player:tell("You enter."); endif');
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('Objective passed');
  expect((await page.locator('#output section').filter({has:page.getByRole('heading',{name:'Output',exact:true})}).locator('div').textContent()).startsWith('You enter.\n')).toBe(true);
  await expectProperty(page, 'locked', '0');
  await codeView(page);await page.locator('#codeEditor').fill('this.lamp_on=99; player:tell("cancel this change"); while(1) endwhile');
  await page.evaluate(() => {
    const observer = new MutationObserver(() => {
      if (document.querySelector('#output').textContent.includes('cancel this change')) {
        observer.disconnect(); document.querySelector('#stopButton').click();
      }
    });
    observer.observe(document.querySelector('#output'), {childList:true,subtree:true});
  });
  await codeView(page);await page.locator('#runButton').click();
  await expect(page.locator('#output')).toContainText('cancelled (discarded)');
  await expectProperty(page, 'lamp_on', '5');
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '5');
});


test('track selection survives reload and overrides stale browser form restoration', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#trackSelect')).toHaveValue('builtins');
  await expect(page.locator('#lessonTitle')).toHaveText('tostr()');
  await expect(page.locator('#progressText')).toHaveText('0 / 218 EXPLORED');
  await expect(page.locator('#lessonNav button')).toHaveCount(218);
  await page.evaluate(() => {
    document.querySelector('#trackSelect').value = 'foundations';
    window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true}));
  });
  await expect(page.locator('#trackSelect')).toHaveValue('builtins');
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await page.reload();
  await expect(page.locator('#trackSelect')).toHaveValue('foundations');
  await expect(page.locator('#lessonTitle')).toHaveText('Comments explain the code');
  await expect(page.locator('#lessonNav button')).toHaveCount(21);
});

for (const mode of ['invalid', 'blocked']) {
  test(`${mode} track storage falls back to a synchronized Foundations view`, async ({page}) => {
    await page.addInitScript(mode => {
      if (mode === 'invalid') {localStorage.setItem('moo-selected-track', '__proto__');localStorage.setItem('moo-selected-track:toaststunt', '__proto__');}
      else Object.defineProperty(window, 'localStorage', {get(){throw new Error('blocked');}});
    }, mode);
    await page.goto('/');
    await expect(page.locator('#runButton')).toBeEnabled();
    await expect(page.locator('#trackSelect')).toHaveValue('foundations');
    await expect(page.locator('#lessonTitle')).toHaveText('Comments explain the code');
    await browse(page);await page.locator('#trackSelect').selectOption('builtins');
    await expect(page.locator('#lessonTitle')).toHaveText('tostr()');
    await page.reload();
    await expect(page.locator('#trackSelect')).toHaveValue('foundations');
    await expect(page.locator('#lessonNav button')).toHaveCount(21);
  });
}


test('refresh restores the selected lesson by ID within the selected track', async ({page}) => {
  await page.goto('/'); await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await browse(page);await page.locator('[data-lesson-id="builtin-create"]').click();
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#trackSelect')).toHaveValue('builtins');
  await expect(page.locator('#lessonTitle')).toHaveText('create()');
  await expect(page.locator('#lessonNav button.active')).toContainText('create()');
  await expect(page.locator('#codeEditor')).toHaveValue(/room = create/);
  await page.locator('#nextButton').click();
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled(); await expect(page.locator('#lessonTitle')).toHaveText('max_object()');
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Make decisions'}).click();
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled(); await expect(page.locator('#lessonTitle')).toHaveText('Make decisions');
  await expect(page.locator('#trackSelect')).toHaveValue('foundations');
  await page.locator('#prevButton').click();
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled(); await expect(page.locator('#lessonTitle')).toHaveText('Arguments enter through args');
  await page.evaluate(()=>{localStorage.setItem('moo-selected-lesson','builtin-create');localStorage.setItem('moo-lesson:toaststunt:foundations','builtin-create');});
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled(); await expect(page.locator('#lessonTitle')).toHaveText('Comments explain the code');
  await page.evaluate(()=>{localStorage.setItem('moo-selected-lesson','removed-lesson');localStorage.setItem('moo-lesson:toaststunt:foundations','removed-lesson');});
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled(); await expect(page.locator('#lessonTitle')).toHaveText('Comments explain the code');
});

test('reset progress explains its scope and supports cancelling without losing saved work', async ({page}) => {
  await ready(page);
  await page.evaluate(() => localStorage.setItem('moo-progress-v3-executed', JSON.stringify(['objects', 'builtin-create'])));
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled();
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  const code = '#42.name = "Keep my room"; return #42.name;';
  await run(page, code);
  await saved(page);
  const world = await record(page);
  const title = await page.locator('#lessonTitle').textContent();
  const progress = () => page.evaluate(() => JSON.parse(localStorage.getItem('moo-progress-v3-executed')));
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('First steps');
    expect(dialog.message()).toContain('completion and explored markers');
    expect(dialog.message()).toContain('shared between LambdaMOO and ToastStunt');
    expect(dialog.message()).toContain('saved worlds, your code, and your selected lesson will be kept');
    await dialog.dismiss();
  });
  await page.locator('#resetProgress').click();
  expect(await progress()).toEqual(['objects', 'builtin-create']);
  await expect(page.locator('#progressText')).toHaveText('1 / 21 LESSONS');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#resetProgress').click();
  expect(await progress()).toEqual(['builtin-create']);
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#progressText')).toHaveText('0 / 21 LESSONS');
  await expect(page.locator('#lessonTitle')).toHaveText(title);
  await expect(page.locator('#codeEditor')).toHaveValue(code);
  expect(await record(page)).toEqual(world);
  expect(await progress()).toEqual(['builtin-create']);
});
