import {readFile} from 'node:fs/promises';
import * as api from 'moo-in-javascript';
import {nativeScenario} from './native-scenario.mjs';
import {utilityResults} from '../../dist/utility-results.js';
import {installCommonPackages,commonWorld,commonManifest} from '../../dist/common-packages.js';
import {displayValue} from '../../dist/display.js';
import {matchesUtilityOutput} from '../../dist/utility-output.js';
import {expandedUtilities} from '../../dist/utility-expansion.js';
import {atomicWrite,recordBatch,observeLesson,lessonHash,fixtureProvenance,editedSource,hash} from './verification.mjs';
export const expandedCourses=expandedUtilities;
if(process.argv[1]?.endsWith('/record-utility-lessons.mjs')){
 installCommonPackages(JSON.parse(await readFile('dist/packages/common-packages/world.json','utf8')));
 const runtime=await api.createRuntime({profile:'toaststunt'});
 const environment={...await fixtureProvenance(),binarySha256:hash(await readFile(process.env.TOASTSTUNT_BINARY??'/home/seven/toaststunt-lisdude/moo'))};
 const context={this:api.moo.object(commonManifest.context.this),player:api.moo.object(commonManifest.context.player),caller:api.moo.object(commonManifest.context.caller)};
 const lessons=Object.entries(expandedCourses).flatMap(([utility,list])=>list.map(l=>({...l,id:`utility-${utility}-${l.id}`}))).filter(l=>!process.argv[2]||l.id.includes(process.argv[2]));
 if(!lessons.length)throw Error('No matching lessons');
 try {
  await recordBatch(lessons,async lesson=>{
   const result=observeLesson(lesson,nativeScenario);
   for(const [code,expected] of [[lesson.code,result],[editedSource(lesson.code,lesson.experimentEdit),result.experiment]]){
    const actual=await runtime.runAsync(code,{world:commonWorld(runtime),context,limits:{steps:1000000}});
    if(actual.status!=='completed')throw Error(JSON.stringify(actual.diagnostics,(_,v)=>typeof v==='bigint'?String(v):v));
    if(displayValue(actual.value)!==expected.value||!matchesUtilityOutput(actual.output.map(e=>e.text),expected.output,lesson.executionMode==='browser'?(expected===result.experiment?lesson.experimentOutputChoices??lesson.outputChoices:lesson.outputChoices):{}))throw Error('Browser/native mismatch: '+lesson.id);
   }
   result.provenance={...environment,lessonSha256:lessonHash(lesson)};
   console.log('PASS',lesson.id);return result;
  },results=>atomicWrite('dist/utility-results.js','// Native observations bound to lesson source and fixture provenance. Re-record deliberately and review changes.\nexport const utilityResults = '+JSON.stringify({...utilityResults,...results},null,2)+';\n'));
 }finally{runtime.dispose();}
}
