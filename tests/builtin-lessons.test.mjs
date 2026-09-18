import * as api from '@sindomecorp/moo-in-javascript';
import * as fixtures from '@sindomecorp/moo-in-javascript/fixtures';
import {prepareCheckpoint} from '../dist/checkpoints.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRuntime, listBuiltins, moo } from '@sindomecorp/moo-in-javascript';
import { createTeachingWorld } from '@sindomecorp/moo-in-javascript/fixtures';
import { builtinLessons } from '../dist/builtin-lessons.js';
import { displayValue } from '../dist/display.js';
for (const profile of ['toaststunt', 'lambdamoo']) {
const runtime = await createRuntime({profile});
const available = builtinLessons.filter(l => !l.profiles || l.profiles.includes(profile));
test('builtin track covers the complete runtime catalog once', () => {
  assert.deepEqual(available.map(l => l.builtin).sort(), listBuiltins({profile}).map(b => b.name).sort());
  assert.equal(new Set(builtinLessons.map(l => l.id)).size, builtinLessons.length);
});
for (const raw of available) {
 const lesson={...raw,...raw.profileOverrides?.[profile]};
  test(`${profile} ${lesson.builtin}: starter and suggested experiment execute with documented results`, async () => {
    assert.match(lesson.code, /^"[^\n]+";/);
    if(lesson.edit)assert.ok(lesson.code.includes(lesson.edit.find));
    const variant = lesson.edit && lesson.code.replace(lesson.edit.find, lesson.edit.replace);
    if(lesson.edit)assert.ok(lesson.expected !== lesson.edit.expected || lesson.edit.output, "Experiment must change a visible result");
    for (const [source, expected, output] of [[lesson.code,lesson.expected,lesson.expectedOutput],...(lesson.edit?[[variant,lesson.edit.expected,lesson.edit.output ?? lesson.expectedOutput]]:[])]) {
      const result = await runtime[lesson.builtin === 'suspend' ? 'runAsync' : 'run'](source, {
        world: prepareCheckpoint(runtime,api,fixtures,lesson),
        context: {this:moo.object(42),player:moo.object(7),caller:moo.object(7),verb:'explore_'+lesson.builtin,args:[]},
      });
      assert.equal(result.status, 'completed', JSON.stringify(result.diagnostics));
      if(!lesson.dynamic)assert.equal(displayValue(result.value), expected);
      else assert.ok(["int","float","string"].includes(result.value.type));
      assert.deepEqual(result.output.map(event => event.text), output);
    }
  });
}

}
