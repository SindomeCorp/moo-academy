import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {utilityCourses} from '../dist/utility-lessons.js';
import {utilityResults} from '../dist/utility-results.js';
import {stringCoverage} from '../dist/string-utils-coverage.js';
import {assertCurrent,fixtureProvenance,lessonHash,recordBatch,atomicWrite,observeLesson,editedSource,assertExperimentEffect} from '../scripts/common-packages/verification.mjs';

test('native observations match current exercises and fixture inputs',async()=>{
 const environment=await fixtureProvenance();
 const published=JSON.parse(await readFile(new URL('../dist/packages/common-packages/native-verification.json',import.meta.url),'utf8'));
 for(const lesson of Object.values(utilityCourses).flat())assertCurrent(lesson,published.entries.find(e=>e.id===lesson.id),environment);
 for(const lesson of Object.values(utilityCourses).flat().filter(l=>l.experimentEdit))assertCurrent(lesson,utilityResults[lesson.id],environment);
 const lesson=Object.values(utilityCourses).flat().find(l=>l.serverExercise&&!l.serverExercise.manual),record=utilityResults[lesson.id];
 assert.throws(()=>assertCurrent({...lesson,serverExercise:{...lesson.serverExercise,code:'invalid code'}},record,environment),/Stale/);
 assert.throws(()=>assertCurrent({...lesson,serverExercise:{...lesson.serverExercise,experiment:{from:'x',to:'y'}}},record,environment),/Stale/);
 assert.throws(()=>assertCurrent(lesson,record,{...environment,fixtureSha256:'changed'}),/Stale/);
});
test('a failed recording batch leaves the published observations unchanged',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'field-record-test-')),path=join(dir,'results.json');
 try{
  await atomicWrite(path,'original');
  await assert.rejects(recordBatch([{id:'one'},{id:'two'}],async l=>{if(l.id==='two')throw Error('native failure');return 'new';},result=>atomicWrite(path,JSON.stringify(result))),/native failure/);
  assert.equal(await readFile(path,'utf8'),'original');
  await recordBatch([{id:'one'}],async()=> 'verified',result=>atomicWrite(path,JSON.stringify(result)));
  assert.deepEqual(JSON.parse(await readFile(path,'utf8')),{one:'verified'});
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('native verification executes server edits and leaves manual exercises unexecuted',()=>{
 const calls=[],native=(code)=>{calls.push(code);return {value:'0',output:[]};};
 const lesson={id:'fixture',code:'start',experimentEdit:{from:'start',to:'edit'},serverExercise:{code:'server',experiment:{from:'server',to:'server edit'}}};
 const result=observeLesson(lesson,native);assert.deepEqual(calls,['start','edit','server','server edit']);assert.ok(result.serverExperiment);
 calls.length=0;observeLesson({...lesson,serverExercise:{...lesson.serverExercise,manual:true}},native);assert.deepEqual(calls,['start','edit']);
 assert.throws(()=>editedSource('code',{from:'absent',to:'new'}),/does not change/);
});
test('build-time String Utils coverage maps every definition to existing authored lessons',async()=>{
 const refs=JSON.parse(await readFile(new URL('../dist/packages/common-packages/reference.json',import.meta.url),'utf8'));
 const ids=new Set(utilityCourses['utility-string'].map(l=>l.id));
 const definitions=refs.filter(r=>r.utility==='string').map(r=>r.sourceVerbId);
 assert.deepEqual(Object.keys(stringCoverage).sort(),definitions.sort());
 for(const lessons of Object.values(stringCoverage)){assert.ok(Array.isArray(lessons));for(const id of lessons)assert.ok(ids.has(id),id);}
});

test('experiment contracts reject broad-but-wrong random values and unchanged countdowns',()=>{
 const random=utilityCourses['utility-math'].find(l=>l.id.endsWith('-random'));
 assert.throws(()=>assertExperimentEffect(random,{output:random.expectedOutput,experiment:{output:['RANDOM zero through two: 2','RANDOM minus two through zero: -1','RANDOM around ten: 10']}}),/outside authored bounds/);
 const calendar=utilityCourses['utility-time'].find(l=>l.id.endsWith('-calendar'));
 assert.throws(()=>assertExperimentEffect(calendar,{output:['UNTIL TIME noon: 10'],experiment:{output:['UNTIL TIME noon: 10']}}),/promised difference/);
 assertExperimentEffect(calendar,{output:['UNTIL TIME noon: 10'],experiment:{output:['UNTIL TIME noon: 3610']}});
});

test('new authoring specifications can be recorded but cannot publish missing observations',async()=>{
 const {courseLesson,edit}=await import('../dist/utility-authoring.js');
 const {expandedUtilities}=await import('../dist/utility-expansion.js');
 const lesson=courseLesson('math','unrecorded-test','Unrecorded',[],'<p>Example</p>','return 1;',edit('1','2','Change it'));
 assert.equal(lesson.expected,undefined);assert.equal(observeLesson(lesson,()=>({value:'1',output:[]})).value,'1');
 expandedUtilities.math.push(lesson);
 try{await assert.rejects(import('../dist/utility-lessons.js?missing-observations-test'),/Missing native observations/);}
 finally{expandedUtilities.math.pop();}
});
