import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {utilityCourses} from '../../dist/utility-lessons.js';
import {utilityResults} from '../../dist/utility-results.js';
import {commonManifest} from '../../dist/common-packages.js';
import {nativeScenario} from './native-scenario.mjs';
import {matchesUtilityOutput} from '../../dist/utility-output.js';
import {atomicWrite,observeLesson,assertCurrent,fixtureProvenance,hash,lessonHash} from './verification.mjs';
const binary=process.env.TOASTSTUNT_BINARY??'/home/seven/toaststunt-lisdude/moo';
const environment={...await fixtureProvenance(),binarySha256:hash(await readFile(binary))};
const entries=[];
function compare(actual,expected,choices,label){
 if(actual.value!==expected.value||!matchesUtilityOutput(actual.output,expected.output,choices))throw Error('Native mismatch: '+label+' '+JSON.stringify({actual,expected}));
}
for(const lesson of Object.values(utilityCourses).flat()){
 const prior=utilityResults[lesson.id];
 if(lesson.experimentEdit)assertCurrent(lesson,prior,environment);
 const observed=observeLesson(lesson,nativeScenario);
 const choices=lesson.executionMode==='source-walkthrough'?{}:lesson.outputChoices;
 compare(observed,{value:lesson.expected,output:lesson.expectedOutput},choices,lesson.id);
 if(observed.experiment)compare(observed.experiment,prior.experiment,lesson.experimentOutputChoices??choices,lesson.id+' experiment');
 if(observed.server){
  compare(observed.server,prior.server,lesson.serverExercise.outputChoices,lesson.id+' server');
  compare(observed.serverExperiment,prior.serverExperiment,lesson.serverExercise.outputChoices,lesson.id+' server experiment');
 }
 entries.push({id:lesson.id,native:observed.value,expected:lesson.expected,nativeOutput:observed.output,expectedOutput:lesson.expectedOutput,equal:true,mode:lesson.executionMode??'browser',experiment:observed.experiment,serverExercise:lesson.serverExercise?.manual?'Requires running server fixtures; expected effect is authored':observed.server,serverExperiment:observed.serverExperiment,provenance:{...environment,lessonSha256:lessonHash(lesson)}});
 console.log('PASS',lesson.id);
}
const version=spawnSync(binary,['--version'],{encoding:'utf8'});
// ToastStunt prints its version and exits 1 for --version. Validate the output.
const serverVersion=(version.stdout+version.stderr).trim();
if(version.error||!/^ToastStunt version [\w.]+$/.test(serverVersion))throw Error('Could not read native server version');
await atomicWrite('dist/packages/common-packages/native-verification.json',JSON.stringify({database:commonManifest.source,serverVersion,binarySha256:environment.binarySha256,fixture:'Fresh database per scenario; learner #127, workshop #128. Automated starter, experiment and non-manual server exercises executed on this run. Manual server exercises remain unverified.',entries},null,2)+'\n');
