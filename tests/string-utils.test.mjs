import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as api from '@sindomecorp/moo-in-javascript';
import {installCommonPackages} from '../dist/common-packages.js';
import {utilityCourses} from '../dist/utility-lessons.js';
import {prepareCheckpoint,lessonContext} from '../dist/checkpoints.js';
import {displayValue} from '../dist/display.js';
installCommonPackages(JSON.parse(await readFile(new URL('../dist/packages/common-packages/world.json',import.meta.url),'utf8')));
const runtime=await api.createRuntime({profile:'toaststunt'});
after(()=>runtime.dispose());
// Verify the concrete effects promised by the authored suggested edits.
const edits=[
 ['trim','  hello world  ','  hello   world  ','TRIM both ends: "hello   world"'],
 ['words','hammer  saw brush','hammer','ENGLISH_LIST description: hammer'],
 ['case','text, {"the", "of"})','text, {"the", "of"}, 0)','CAPITALIZE_EACH title: the Tools of MOO'],
 ['filter','cd-34','cd-3',['STRIP_ALL_BUT keep digits: 123','STRIP_ALL_BUT_SEQ keep digit pairs: 12']],
 ['join','items, " / "','items, ""','FROM_LIST joined text: hammersawbrush'],
 ['quoted-words','red brush','blue brush','WORD_START source ranges: {{1, 4}, {6, 17}, {19, 21}}'],
 ['first-word','paint','inspect','FIRST_WORD action: inspect'],
 ['characters','from_ASCII(65)','from_ASCII(66)','FROM_ASCII character: B'],
 ['find','"broom"','"brushes"',['COMMON prefix length: 5','Shared prefix text: brush']],
 ['choices','find_prefix("brush"','find_prefix("ham"','FIND_PREFIX brush: 3'],
 ['wildcards','"hello", 1','"hello", 0','MATCH_STRING case-sensitive: 1'],
 ['replace','{{"red", "blue"}, {"blue", "green"}}','{{"blue", "green"}, {"red", "blue"}}','SUBSTITUTE parallel replacements: blue green'],
 ['boundaries','substitute_delimited(text','substitute(text','SUBSTITUTE_DELIMITED whole words: dog sdogter dog'],
 ['padding','"brush", -3','"brush", 3','LEFT truncation: brush'],
 ['columns','items, 2, 12','items, 3, 12','Row count: 2'],
 ['numeric-text','is_float("3.5")','is_float("3.5junk")','Matched end position: 3'],
 ['number-words','(21)','(12)',['ORDINAL rank: 12th','ENGLISH_NUMBER quantity: twelve','ENGLISH_ORDINAL rank: twelfth']],
 ['render-values','from_value(value)','from_value(value, 1, -1)','FROM_VALUE default depth: {"brush", {1, 2, 3}}'],
 ['parse-values','to_value("1, 2")','to_value("{1, 2}")','TO_VALUE second attempt: {1, {1, 2}}'],
 ['parse-prefix','42 brushes','7 hammers','PREFIX_TO_VALUE with remainder: {" hammers", 7}'],
 ['pronouns','$string_utils:pronoun_quote(literal)','literal','PRONOUN_SUB protected result: String Utilities keeps 100% of the tools'],
 ['object-labels','literal_object("$string_utils")','literal_object("$list_utils")','LITERAL_OBJECT corified lookup: #55'],
 ['yielding','from_value_suspended(value, 1, -1)','from_value_suspended(value, 1, 1)','FROM_VALUE_SUSPENDED full value: {"brush", {...}}'],
 ['tool-report','  HAMMER,SAW,BRUSH  ','  AXE  ','Finished report: Axe.'],
];
for(const [id,before,replacement,expected] of edits)test(`String Utils experiment: ${id}`,async()=>{
 const lesson=utilityCourses['utility-string'].find(l=>l.id==='utility-string-'+id);
 assert.ok(lesson.code.includes(before),'experiment must change the starter');
 const world=prepareCheckpoint(runtime,api,null,lesson);
 const result=await runtime.runAsync(lesson.code.replaceAll(before,replacement),{world,context:lessonContext(api,lesson),limits:{steps:1000000}});
 assert.equal(result.status,'completed',JSON.stringify(result.diagnostics));
 assert.equal(displayValue(result.value),'0');
 const output=result.output.map(event=>event.text);
 for(const line of [expected].flat())assert.ok(output.includes(line),JSON.stringify({expected:line,output}));
});
