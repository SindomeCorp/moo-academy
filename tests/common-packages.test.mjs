import {matchesUtilityOutput} from '../dist/utility-output.js';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as api from 'moo-in-javascript';
import {installCommonPackages,commonManifest,commonLoadOptions} from '../dist/common-packages.js';
import {utilityCourses} from '../dist/utility-lessons.js';
import {coursesForProfile} from '../dist/curriculum.js';
import {prepareCheckpoint,lessonContext} from '../dist/checkpoints.js';
import {matchesCourseCheck} from '../dist/course-checks.js';
import {displayValue} from '../dist/display.js';
const read=name=>readFile(new URL('../dist/packages/common-packages/'+name,import.meta.url),'utf8');
const snapshot=JSON.parse(await read('world.json')),catalog=JSON.parse(await read('verbs.json')),reference=JSON.parse(await read('reference.json'));
installCommonPackages(snapshot);
test('Common Packages preserves all 375 requested definitions, aliases and source hashes',()=>{
 assert.equal(reference.length,375);assert.equal(new Set(reference.map(v=>v.sourceVerbId)).size,375);
 for(const utility of commonManifest.utilities){
  const entries=catalog.filter(v=>v.utility===utility.id);assert.equal(entries.length,utility.verbCount);
  for(const alias of utility.aliases){const p=snapshot.objects.find(o=>o.id==='0').properties.find(p=>p.name===alias.slice(1));assert.equal(p.value.value,String(utility.objectId));}
  for(const v of entries){
   assert.equal(createHash('sha256').update(v.source).digest('hex'),v.sourceHash);
   const original=snapshot.objects.find(o=>o.id===String(v.objectId)).verbs.find(x=>x.names===v.names.join(' '));assert.equal(original.source,v.source);
   const entry=reference.find(x=>x.sourceVerbId===v.sourceVerbId);assert.ok(entry.support.label&&entry.inspectionExample&&entry.sideEffects);
  }
 }
 assert.equal(snapshot.objects.find(o=>o.id==='42').name,'Permissions Utilities');
 assert.ok(commonManifest.context.this>126&&commonManifest.context.player>126);
 assert.ok(!Object.keys(coursesForProfile('lambdamoo')).some(id=>id.startsWith('utility-')));
});
test('all guided starters execute imported code with native-confirmed results; worlds are independent',async()=>{
 const runtime=await api.createRuntime({profile:'toaststunt'});
 try{
  const native=JSON.parse(await read('native-verification.json'));
  const first=Object.values(utilityCourses)[0][0],world=prepareCheckpoint(runtime,api,null,first);
  for(const lesson of Object.values(utilityCourses).flat()){
   const result=await runtime.runAsync(lesson.code,{world:prepareCheckpoint(runtime,api,null,lesson),context:lessonContext(api,lesson),limits:{steps:1000000}});
   assert.equal(result.status,'completed',lesson.id+': '+JSON.stringify(result.diagnostics,(_,v)=>typeof v==='bigint'?String(v):v));
   assert.equal(displayValue(result.value),lesson.expected,lesson.id);
   const observed= result.output.map(event=>event.text);
   assert.ok(matchesUtilityOutput(observed,lesson.expectedOutput,lesson.executionMode==='source-walkthrough'?{}:lesson.outputChoices),lesson.id+' output: '+JSON.stringify(observed));
   const entry=native.entries.find(e=>e.id===lesson.id);
   assert.equal(entry.native,lesson.expected,lesson.id+' native');
   assert.ok(matchesUtilityOutput(entry.nativeOutput,lesson.expectedOutput,lesson.executionMode==='source-walkthrough'?{}:lesson.outputChoices),lesson.id+' native output');
  }
  world.setProperty(BigInt(commonManifest.context.this),'name',api.moo.string('Changed'));
  assert.equal(matchesCourseCheck(runtime.run('return 1;',{world}),world,{expected:'1',properties:{name:'\"Changed\"'}},BigInt(commonManifest.context.this)),true);
  const separate=prepareCheckpoint(runtime,api,null,first);
  assert.notEqual(separate.getProperty(BigInt(commonManifest.context.this),'name').value,'Changed');
  assert.equal(runtime.saveWorld(runtime.loadWorld(runtime.saveWorld(world),commonLoadOptions)),runtime.saveWorld(world));
 }finally{runtime.dispose();}
});
