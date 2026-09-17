import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { Parser, Language } from 'web-tree-sitter';
import { diagnostics } from '../dist/syntax.js';
import { assess } from '../dist/assessment.js';
import { lessons } from '../dist/lessons.js';
await Parser.init();
const parser = new Parser();
parser.setLanguage(await Language.load('dist/vendor/tree-sitter-moo.wasm'));
function inspect(source, fn) {
  const tree = parser.parse(source);
  try { return fn(tree.rootNode); } finally { tree.delete(); }
}
import {solutions} from './helpers/solutions.mjs';
test('all starters parse; all solutions pass without requiring return', () => {
  lessons.filter(lesson => !lesson.exploration).forEach((lesson, index) => {
    inspect(lesson.code, root => assert.deepEqual(diagnostics(root), [], lesson.id));
    inspect(solutions[lesson.id], root => {
      assert.deepEqual(diagnostics(root), [], lesson.id);
      assert.equal(assess(lesson.id, root), true, lesson.id);
    });
  });
});
test('strings and durable comments cannot substitute for exercise structure', () => {
  lessons.filter(lesson => !lesson.exploration).forEach((lesson, index) => {
    const quoted = JSON.stringify(solutions[lesson.id]);
    for (const source of [quoted + ';', 'player:tell(' + quoted + ');']) {
      inspect(source, root => {
        assert.deepEqual(diagnostics(root), []);
        assert.equal(assess(lesson.id, root), false, lesson.id);
      });
    }
  });
});
test('real diagnostics for missing tokens, delimiters, strings and block terminators', () => {
  for (const source of ['player:tell("hi")', 'player:tell("hi";', 'player:tell("hi);', 'if (this.locked) player:tell("hi");']) {
    inspect(source, root => {
      const issues = diagnostics(root);
      assert.ok(issues.length, source);
      assert.ok(issues.every(d => d.line >= 1 && d.column >= 1));
    });
  }
  inspect('player:tell("hi")', root => assert.ok(diagnostics(root).some(d => d.message.startsWith('Missing'))));
  inspect('x = "hi;', root => assert.ok(diagnostics(root).some(d => d.message === 'Unterminated string')));
});
test('checks account for structure rather than matching scattered words', () => {
  for (const [id, source] of [
    ['properties', 'this.lamp_on += 1; player:tell("The lamp clicks on.");'],
    ['lists', 'for tool in (tools) player:tell("tool"); endfor'],
    ['branching', 'if (this.locked) player:tell("You enter."); else player:tell("The door is locked."); endif'],
    ['errors', 'try value = 1; except (E_PERM) player:tell(E_PROPNF, "That property does not exist."); endtry']
  ]) inspect(source, root => assert.equal(assess(id, root), false, id));
});
test('whitespace and parenthesized expressions remain valid alternatives', () => {
  inspect('player : tell (("Color: "), (args [1]));', root => {
    assert.deepEqual(diagnostics(root), []);
    assert.equal(assess('args', root), true);
  });
});
test('pinned upstream valid corpus parses through the shipped WASM runtime', async () => {
  const directory = 'vendor/tree-sitter-moo/fixtures/valid';
  const files = (await readdir(directory, {recursive:true})).filter(f => f.endsWith('.moo'));
  assert.ok(files.length >= 446);
  for (const file of files) {
    inspect(await readFile(`${directory}/${file}`, 'utf8'), root => assert.deepEqual(diagnostics(root), [], file));
  }
  console.log(`Validated ${files.length} upstream MOO fixtures`);
});

test('comments lesson requires real, nonempty top-level comments before the greeting', () => {
  const greeting = 'player:tell("Hello from MOO!");';
  for (const source of [
    '"One"; ' + greeting,
    '"One"; "   "; ' + greeting,
    '"One"; player:tell("Two"); ' + greeting,
    greeting + ' "One"; "Two";',
    'if(0) "One"; "Two"; endif ' + greeting,
  ]) inspect(source, root => assert.equal(assess('comments', root),false,source));
  inspect('"One"; "Two"; ' + greeting, root => assert.equal(assess('comments',root),true));
  inspect('"Missing semicolon" ' + greeting, root => assert.ok(diagnostics(root).length));
});
