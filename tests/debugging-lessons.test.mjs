import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '@sindomecorp/moo-in-javascript';
import * as fixtures from '@sindomecorp/moo-in-javascript/fixtures';
import {findLesson} from '../dist/curriculum.js';
import {prepareCheckpoint,lessonContext} from '../dist/checkpoints.js';
import {displayValue} from '../dist/display.js';

for (const profile of ['toaststunt','lambdamoo']) test(`${profile}: debugging alternatives match the lesson explanations`,async()=>{
 const runtime=await api.createRuntime({profile});
 try {
  const lesson=findLesson(profile,'debugging-catch-expression');
  const world=prepareCheckpoint(runtime,api,fixtures,lesson);
  const run=source=>runtime.run(source,{world,context:lessonContext(api,lesson)});
  const alternatives=lesson.experiment.filter(block=>typeof block==='object');
  const expected=['"missing"','E_PROPNF','E_DIV','"missing"'];
  alternatives.forEach((block,index)=>{
   const result=run(block.code);
   assert.equal(result.status,'completed',block.code);
   assert.equal(displayValue(result.value),expected[index]);
   assert.deepEqual(result.output.map(e=>e.text),index===3?['cleanup']:[]);
  });
  assert.equal(run(lesson.code.replace('E_PROPNF','E_TYPE')).status,'runtime-error');
  assert.equal(displayValue(run(lesson.code.replace('this.missing','this.name')).value),'"Training Room"');
  const conditional=findLesson(profile,'debugging-conditional');
  for(const source of [conditional.code,...conditional.experiment.filter(b=>typeof b==='object').map(b=>b.code)]){
   assert.equal(displayValue(run(source).value),'"missing"');
   assert.equal(displayValue(run(source.replace('#999','#42')).value),'"Training Room"');
  }

 }finally{runtime.dispose();}
});
