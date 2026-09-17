import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from 'moo-in-javascript';
import * as fixtures from 'moo-in-javascript/fixtures';
import {findLesson,coursesForProfile} from '../dist/curriculum.js';
import {prepareCheckpoint,lessonContext} from '../dist/checkpoints.js';
import {matchesExpectedFailure} from '../dist/course-checks.js';
import {displayValue} from '../dist/display.js';
for(const profile of ['toaststunt','lambdamoo'])test(`${profile}: task lessons exhaust, measure and replenish their authored allowance`,async()=>{
 const runtime=await api.createRuntime({profile});
 try{
  const lessons=coursesForProfile(profile).tasks;
  assert.equal(lessons.length,7);
  for(const lesson of lessons){
   const world=prepareCheckpoint(runtime,api,fixtures,lesson),before=runtime.saveWorld(world);
   const result=await runtime.runAsync(lesson.code,{world,context:lessonContext(api,lesson),limits:lesson.limits});
   if(lesson.expectedFailure){
    assert.ok(matchesExpectedFailure(result,lesson.expectedFailure));
    const caught=await runtime.runAsync('try\n'+lesson.code+'\nexcept (ANY)\nreturn 1;\nendtry',{limits:lesson.limits});
    assert.ok(matchesExpectedFailure(caught,lesson.expectedFailure));
   }else {assert.equal(result.status,'completed',lesson.id);assert.equal(displayValue(result.value),lesson.expected);}
   if(lesson.id!=='tasks-server-quotas')assert.equal(runtime.saveWorld(world),before,lesson.id+' must not require checkpoint replay');
  }
  const refill=findLesson(profile,'tasks-replenish');
  const noRefill=await runtime.runAsync(refill.code.replace('suspend(0);',''),{limits:refill.limits});
  assert.equal(displayValue(noRefill.value),'{2693, 2687, "still here"}');
  const chunks=findLesson(profile,'tasks-chunks');
  const noYield=await runtime.runAsync(chunks.code.replace(/  if \(ticks_left\(\) < 200\)[\s\S]*?  endif\n/,''),{limits:chunks.limits});
  assert.ok(matchesExpectedFailure(noYield,findLesson(profile,'tasks-exhaust').expectedFailure));
 }finally{runtime.dispose();}
});
test('only the specified controlled tick limit counts as an expected failure',()=>{
 const expected=findLesson('toaststunt','tasks-exhaust').expectedFailure;
 for(const result of [{status:'cancelled'}, {status:'completed'}, {status:'runtime-error',diagnostics:[{message:expected.message}]}, {status:'limit-exceeded',diagnostics:[{message:'Execution seconds limit exceeded'}]}])assert.equal(matchesExpectedFailure(result,expected),false);
});

test('task documentation and administrative examples match the selected server profile',()=>{
 for(const profile of ['lambdamoo','toaststunt']){
  const toast=profile==='toaststunt';
  const quota=findLesson(profile,'tasks-server-quotas');
  assert.ok(quota.expected.includes('"before"'));
  assert.ok(quota.expected.includes(toast?'"fg_ticks", 60000':'"fg_ticks", 30000'));
  assert.equal(quota.body.includes('load_server_options()'),toast);
  assert.equal(quota.experiment.some(item=>item.code?.includes('load_server_options()')),toast);
  for(const id of ['tasks-server-quotas','tasks-time']){
   const body=findLesson(profile,id).body;
   assert.ok(body.includes(toast?'lisdude/toaststunt-documentation':'sevenecks/lambda-moo-programming/blob/master/tutorials/moo-programmers-manual-updated.md'));
   assert.equal(body.includes(toast?'sevenecks/lambda-moo-programming':'lisdude/toaststunt-documentation'),false);
  }
 }
});

for(const profile of ['toaststunt','lambdamoo'])test(`${profile}: quota example initializes missing properties and preserves configured values`,async()=>{
 const runtime=await api.createRuntime({profile});
 try{
  const lesson=findLesson(profile,'tasks-server-quotas');
  const world=prepareCheckpoint(runtime,api,fixtures,lesson),context=lessonContext(api,lesson);
  const run=source=>runtime.run(source,{world,context,limits:lesson.limits});
  assert.equal(displayValue(run(lesson.code).value),lesson.expected);
  const configured=runtime.saveWorld(world);
  const fg=profile==='toaststunt'?60000:30000,bg=profile==='toaststunt'?30000:15000;
  const values=(f,b)=>`{{"fg_ticks", ${f}}, {"bg_ticks", ${b}}, {"fg_seconds", 5}, {"bg_seconds", 3}}`;
  const snapshots=(before,after)=>`{{"before", ${before}}, {"after", ${after}}}`;
  assert.equal(displayValue(run(lesson.code).value),snapshots(values(fg,bg),values(fg,bg)));
  assert.equal(runtime.saveWorld(world),configured,'rerunning must not create objects or overwrite quotas');
  assert.equal(run('$server_options.fg_ticks=80000; $server_options.bg_ticks=45000;').status,'completed');
  assert.equal(displayValue(run(lesson.code).value),snapshots(values(80000,45000),values(80000,45000)));
  assert.equal(run('delete_property($server_options,"bg_ticks");').status,'completed');
  assert.equal(displayValue(run(lesson.code).value),snapshots(values(80000,'E_PROPNF'),values(80000,bg)));
  assert.equal(run('$server_options.bg_ticks=0;').status,'completed');
  assert.ok(displayValue(run(lesson.code).value).includes('{"bg_ticks", 0}'),'existing invalid values must not be silently replaced');
  assert.equal(run('delete_property($server_options,"fg_ticks"); add_property($thing,"fg_ticks",90000,{player,"r"});').status,'completed');
  assert.ok(displayValue(run(lesson.code).value).includes('{"fg_ticks", 90000}'),'inherited settings count as existing properties');
  assert.equal(run('#0.server_options=#-1;').status,'completed');
  assert.equal(run(lesson.code).status,'runtime-error','an invalid reference must not be replaced as if missing');
 }finally{runtime.dispose();}
});
