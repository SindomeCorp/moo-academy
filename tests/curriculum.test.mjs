import {readFile} from 'node:fs/promises';
import {installCommonPackages} from '../dist/common-packages.js';
installCommonPackages(JSON.parse(await readFile(new URL('../dist/packages/common-packages/world.json',import.meta.url),'utf8')));
import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from 'moo-in-javascript';
import * as fixtures from 'moo-in-javascript/fixtures';
import {coursesForProfile,pathDefinitions,findLesson} from '../dist/curriculum.js';
import {createCheckpoint,prepareCheckpoint,lessonContext} from '../dist/checkpoints.js';
import {matchesCourseCheck} from '../dist/course-checks.js';
import {displayValue} from '../dist/display.js';
import {builtinSupport} from '../dist/builtin-support.js';
for(const profile of ['toaststunt','lambdamoo'])test(`${profile}: course checkpoints, continuous progression and project solutions`,async t=>{
 const runtime=await api.createRuntime({profile});
 try{
  const paths=coursesForProfile(profile);assert.deepEqual(Object.keys(paths),pathDefinitions.filter(p=>!p.profiles||p.profiles.includes(profile)).map(p=>p.id));
  const ids=Object.values(paths).flat().map(l=>l.id);assert.equal(new Set(ids).size,ids.length);
  for(const [path,lessons] of Object.entries(paths)){
   if(path==='builtins'||path.startsWith('utility-'))continue; // Utility coverage lives in common-packages.test.mjs.
   await t.test(path,async()=>{
    let continuing=prepareCheckpoint(runtime,api,fixtures,lessons[0]);
    for(const lesson of lessons){
     const checkpoint=prepareCheckpoint(runtime,api,fixtures,lesson);
     assert.equal(runtime.saveWorld(checkpoint),runtime.saveWorld(continuing),lesson.id+' checkpoint must equal previous completed lesson state');
     if(lesson.expected){
      const example=await runtime.runAsync(lesson.code,{world:checkpoint,context:lessonContext(api,lesson),limits:lesson.limits});
      assert.equal(example.status,'completed',lesson.id+': '+example.diagnostics.map(d=>d.message));
      assert.equal(displayValue(example.value),lesson.expected,lesson.id);
      assert.deepEqual(example.output.map(e=>e.text),lesson.expectedOutput??[],lesson.id);
     }
     if(lesson.checks){
      for(const check of lesson.checks){
       const world=prepareCheckpoint(runtime,api,fixtures,lesson);
       const wrong=runtime.run('return 0;',{world,context:lessonContext(api,lesson)});assert.equal(matchesCourseCheck(wrong,world,check),false);
       const solved=runtime.run(lesson.solution,{world,context:lessonContext(api,lesson,check.args)});assert.ok(matchesCourseCheck(solved,world,check),lesson.id);
       if(check.probe){const probe=runtime.run(check.probe,{world,context:lessonContext(api,lesson)});assert.equal(probe.status,'completed');assert.equal(displayValue(probe.value),check.probeExpected,lesson.id);}
      }
     }
     const completed=await runtime.runAsync(lesson.checkpointSource??lesson.solution??lesson.code,{world:continuing,context:lessonContext(api,lesson,lesson.args??(lesson.id==='args'?['blue']:[])),limits:lesson.limits});
     assert.equal(completed.status,'completed',lesson.id+' must run after the preceding lesson');
     assert.ok(lesson.body&&(lesson.steps||lesson.challenge)&&lesson.hint);
    }
   });
  }
  for(const name of ['value_bytes','object_bytes','reseed_random','sqlite_interrupt','curl','exec','getenv','spellcheck','open_network_connection','file_open','sqlite_query','shutdown','server_version']){
   const lesson=findLesson(profile,'builtin-'+name);if(lesson)assert.ok(lesson.warning,name+' must disclose limitations');
  }
 }finally{runtime.dispose();}
});
test('checkpoint failures are explicit and behavior checks reject missing state and wrong output',async()=>{
 const runtime=await api.createRuntime({profile:'toaststunt'});try{
  assert.throws(()=>prepareCheckpoint(runtime,api,fixtures,{setup:'raise(E_INVARG);'}),/checkpoint could not/);
  const world=createCheckpoint(api,fixtures,'toaststunt');const result=runtime.run('return 1;',{world});
  assert.equal(matchesCourseCheck(result,world,{expected:'1',output:['missing']}),false);
  assert.equal(matchesCourseCheck(result,world,{expected:'1',properties:{missing:'1'}}),false);
  assert.equal(matchesCourseCheck(result,world,{expected:'1',properties:{name:'"wrong"'}}),false);
  assert.equal(matchesCourseCheck({status:'runtime-error'},world,{expected:'1'}),false);
  assert.equal(findLesson('toaststunt','missing'),undefined);
  assert.equal(builtinSupport('length'),undefined);
 }finally{runtime.dispose();}
});
