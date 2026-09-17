import {createHash} from 'node:crypto';
import {readFile,writeFile,rename,rm} from 'node:fs/promises';
import {matchesUtilityOutput} from '../../dist/utility-output.js';
import {commonManifest} from '../../dist/common-packages.js';
export const hash = value => createHash('sha256').update(value).digest('hex');
export function lessonHash(lesson) {
 return hash(JSON.stringify({code:lesson.code,edit:lesson.experimentEdit,choices:lesson.outputChoices,experimentChoices:lesson.experimentOutputChoices,experimentDelta:lesson.experimentDelta,server:lesson.serverExercise && {code:lesson.serverExercise.code,experiment:lesson.serverExercise.experiment,manual:lesson.serverExercise.manual,wizard:lesson.serverExercise.wizard,prerequisites:lesson.serverExercise.prerequisites,choices:lesson.serverExercise.outputChoices}}));
}
export async function fixtureProvenance() {
 const fixture=await readFile(new URL('./native-scenario.mjs',import.meta.url));
 const runtime=JSON.parse(await readFile(new URL('../../dist/runtime/provenance.json',import.meta.url),'utf8'));
 return {databaseSha256:commonManifest.source.sha256,fixtureSha256:hash(fixture),runtimeSha256:runtime.tarballSha256};
}
export function assertCurrent(lesson,record,environment) {
 if(!record?.provenance || record.provenance.lessonSha256!==lessonHash(lesson) || Object.entries(environment).some(([key,value])=>record.provenance[key]!==value))throw Error('Stale or missing native observations for '+lesson.id+'; deliberately re-record and review the results.');
}
export function editedSource(code,edit) {
 if(!edit || !edit.from || !code.includes(edit.from))throw Error('Experiment does not change its source');
 const changed=code.replaceAll(edit.from,edit.to);
 if(changed===code)throw Error('Experiment does not change its source');
 return changed;
}
export async function atomicWrite(path,contents) {
 const temporary=path+'.tmp-'+process.pid;
 try {await writeFile(temporary,contents);await rename(temporary,path);}
 finally {await rm(temporary,{force:true});}
}
// Publish nothing when any selected observation fails. Existing files stay intact.
export async function recordBatch(items,observe,publish) {
 const results={};
 for(const item of items) results[item.id]=await observe(item);
 await publish(results);
}
export function observeLesson(lesson,native) {
 const result=native(lesson.code,{label:lesson.id});
 if(lesson.experimentEdit)result.experiment=native(editedSource(lesson.code,lesson.experimentEdit),{label:lesson.id+' experiment'});
 const server=lesson.serverExercise;
 if(server&&!server.manual){
  result.server=native(server.code,{label:lesson.id+' server',wizard:server.wizard});
  result.serverExperiment=native(editedSource(server.code,server.experiment),{label:lesson.id+' server experiment',wizard:server.wizard});
 }
 assertExperimentEffect(lesson,result);
 return result;
}

export function assertExperimentEffect(lesson,result) {
 if(lesson.experimentOutputChoices && !matchesUtilityOutput(result.experiment.output,result.output,lesson.experimentOutputChoices))throw Error('Experiment output outside authored bounds: '+lesson.id);
 const rule=lesson.experimentDelta;
 if(rule){
  const value=output=>Number(output.find(line=>line.startsWith(rule.prefix))?.slice(rule.prefix.length));
  const delta=value(result.experiment.output)-value(result.output);
  if(!Number.isFinite(delta)||Math.abs(delta-rule.delta)>rule.tolerance)throw Error('Experiment did not produce the promised difference: '+lesson.id);
 }
}
