import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRuntime, moo} from 'moo-in-javascript';
import {createTeachingWorld} from 'moo-in-javascript/fixtures';
import {foundationLessonsForProfile} from '../dist/lessons.js';
import {displayValue} from '../dist/display.js';
for (const profile of ['toaststunt','lambdamoo']) {
  const runtime = await createRuntime({profile});
  for (const lesson of foundationLessonsForProfile(profile).filter(l => l.exploration)) {
    test(`${profile}: ${lesson.id} starter and experiments`, () => {
      for (const example of [{source:lesson.code,expected:lesson.expected,expectedOutput:lesson.expectedOutput}, ...lesson.variants]) {
        const result = runtime.run(example.source, {world:createTeachingWorld({profile}), context:{this:moo.object(42),player:moo.object(7),caller:moo.object(7),verb:lesson.id,args:[]}});
        assert.equal(result.status,'completed',JSON.stringify(result.diagnostics));
        assert.equal(displayValue(result.value),example.expected);
        assert.deepEqual(result.output.map(event => event.text),example.expectedOutput ?? []);
      }
    });
  }
}
