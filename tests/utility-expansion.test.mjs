import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as api from 'moo-in-javascript';
import {expandedUtilities} from '../dist/utility-expansion.js';
import {utilityResults} from '../dist/utility-results.js';
import {utilityCourses} from '../dist/utility-lessons.js';
import {assertExperimentEffect} from '../scripts/common-packages/verification.mjs';
import {matchesUtilityOutput} from '../dist/utility-output.js';
import {commonWorld,commonManifest,installCommonPackages} from '../dist/common-packages.js';
import {displayValue} from '../dist/display.js';
const load=async n=>JSON.parse(await readFile(new URL('../dist/packages/common-packages/'+n,import.meta.url),'utf8'));
const coverage=await load('coverage.json');installCommonPackages(await load('world.json'));
test('every remaining utility definition has an explicit reviewed classification',()=>{
 assert.equal(Object.keys(expandedUtilities).length,10);assert.equal(coverage.entries.length,296);
 assert.equal(new Set(coverage.entries.map(e=>e.sourceVerbId)).size,296);
 const lessons=Object.values(utilityCourses).flat();
 for(const e of coverage.entries){
  if(e.classification==='reference-only'){assert.ok(e.reason?.length>25);assert.equal(e.lessons.length,0);}
  else {assert.ok(e.lessons.length);for(const link of e.lessons)assert.ok(lessons.find(l=>l.id===link.id)?.covers.includes(e.sourceVerbId));}
 }
 for(const [utility,list] of Object.entries(expandedUtilities)){
  assert.ok(list.length>3,utility);assert.equal(list.at(-1).covers.length,0,utility+' capstone');
  for(const l of list){assert.ok(l.code.includes('player:tell('));assert.ok(utilityResults[`utility-${utility}-${l.id}`]);assert.ok(l.expectedOutput.length);if(l.serverExercise){assert.equal(l.executionMode,'source-walkthrough');assert.ok(l.serverExercise.prerequisites);assert.ok(l.serverExercise.expectedEffect||l.serverExercise.expectedOutput.length);}}
 }
 const old={list:['range','assoc','flatten'],set:['combine','difference','equal'],math:['factorial','divmod','gcd'],matrix:['identity','transpose','dot'],time:['duration','seconds','weekday'],object:['property','inheritance','definition'],match:['ordinal','possessive','candidates'],code:['references','types','errors'],command:['budget','input','task'],wiz:['identity','advertised','permission']};
 for(const[u,ids]of Object.entries(old))for(const id of ids)assert.ok(lessons.find(l=>l.id===`utility-${u}-${id}`));
 assert.equal(utilityCourses['utility-string'].length,24);
});
test('every suggested utility edit executes independently with native-confirmed output',async()=>{
 const runtime=await api.createRuntime({profile:'toaststunt'});
 const context={this:api.moo.object(commonManifest.context.this),player:api.moo.object(commonManifest.context.player),caller:api.moo.object(commonManifest.context.caller)};
 try{for(const[u,list]of Object.entries(expandedUtilities))for(const l of list){
  const id=`utility-${u}-${l.id}`,expected=utilityResults[id].experiment;
  const code=l.code.replaceAll(l.experimentEdit.from,l.experimentEdit.to);assert.notEqual(code,l.code,id);
  const result=await runtime.runAsync(code,{world:commonWorld(runtime),context,limits:{steps:1000000}});
  assert.equal(result.status,'completed',id);assert.equal(displayValue(result.value),expected.value,id);
  if(l.experimentDelta){const starter=await runtime.runAsync(l.code,{world:commonWorld(runtime),context,limits:{steps:1000000}});assertExperimentEffect(l,{output:starter.output.map(e=>e.text),experiment:{output:result.output.map(e=>e.text)}});}
  assert.ok(matchesUtilityOutput(result.output.map(e=>e.text),expected.output,l.executionMode==='source-walkthrough'?{}:l.experimentOutputChoices??l.outputChoices),id);
 }}finally{runtime.dispose();}
});
test('illustrative outputs reject out-of-range values and missing lines',()=>{
 const rule={'RANDOM: ':['1','2']};assert.ok(matchesUtilityOutput(['RANDOM: 2'],['RANDOM: 1'],rule));assert.ok(!matchesUtilityOutput(['RANDOM: 3'],['RANDOM: 1'],rule));assert.ok(!matchesUtilityOutput([],['RANDOM: 1'],rule));
});
