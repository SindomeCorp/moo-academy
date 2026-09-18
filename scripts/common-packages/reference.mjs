import {readFile,writeFile} from 'node:fs/promises';
import {createRuntime} from '@sindomecorp/moo-in-javascript';
import {utilityCourses} from '../../dist/utility-lessons.js';
import {stringCoverage} from '../../dist/string-utils-coverage.js';
import {utilityExclusions} from '../../dist/utility-expansion.js';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const jsonl=async path=>(await readFile(path,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
export async function buildReference({extractDir,graphDir,outputDir}){
 const manifest=await json(outputDir+'/manifest.json'),catalog=await json(outputDir+'/verbs.json');
 const metadata=await jsonl(extractDir+'/verbs.jsonl'),calls=await jsonl(graphDir+'/code_facts/function_calls.jsonl');
 const bindings=await jsonl(graphDir+'/code_facts/destructuring_bindings.jsonl');
 const assignments=await jsonl(graphDir+'/code_facts/assignments.jsonl');
 const runtime=await createRuntime({profile:'toaststunt'}),available=new Set(runtime.listBuiltins().map(b=>b.name));runtime.dispose();
 const entries=catalog.filter(v=>v.utility).map(v=>{
  const utility=manifest.utilities.find(u=>u.id===v.utility),meta=metadata.find(m=>m.id===v.sourceVerbId);
  const documentation=[];
  for(const line of v.source.split('\n')){const match=line.match(/^"((?:\\.|[^"\\])*)";$/);if(!match)break;const text=match[1].replace(/\\(.)/g,'$1');if(text)documentation.push(text);}
  const objectAlias=utility.aliases.find(a=>a.endsWith('_utils'))??'#'+v.objectId;
  const names=v.names.map(n=>n.replace('*',''));
  const examples=Object.values(utilityCourses).flat().filter(l=>l.covers?.includes(v.sourceVerbId)||stringCoverage[v.sourceVerbId]?.includes(l.id)).map(l=>({id:l.id,title:l.title,code:l.code,expected:l.expected,expectedOutput:l.expectedOutput??[],executionMode:l.executionMode??'browser',outputChoices:l.outputChoices,serverExercise:l.serverExercise}));
  const exclusion=utilityExclusions[v.utility]?.[Number(v.sourceVerbId.split(':')[1])];
  const missing=[...new Set(calls.filter(c=>c.sourceVerbId===v.sourceVerbId&&!available.has(c.function)).map(c=>c.function))];
  const regexBoundary=v.sourceVerbId==='#51:4';
  const support=v.compileDiagnostics.length?{label:'Source only',reason:v.compileDiagnostics.map(d=>d.message).join('; ')}:regexBoundary?{label:'Server regex required',reason:'Directional word boundaries in the ordinal pattern are outside the browser regex subset.'}:missing.length?{label:'Server dependencies',reason:'Some paths call builtins unavailable here: '+missing.join(', ')+'. Inspect the source; calls to these paths report a diagnostic.'}:examples.length?{label:'Guided example',reason:'The guided inputs are verified. Other branches and dependencies may need server services.'}:{label:'Source reference',reason:'Source is retained and compiles. General execution has not been certified; inspect its dependencies and argument handling.'};
  if(exclusion){support.label='Internal / legacy reference';support.reason=exclusion;}
  else if(examples.length&&examples.every(e=>e.executionMode==='source-walkthrough')){support.label='Server exercise';support.reason='Guided source walkthrough in the browser; execution instructions require the native server described in the lesson.';}
  if(['command','wiz'].includes(v.utility))support.reason+=' Task context and permissions are educational models here; this is not a live server administration environment.';
  const args=['none','any','this'];
  const argumentPatterns=[...new Set(bindings.filter(b=>b.sourceVerbId===v.sourceVerbId&&b.rightText==='args').map(b=>b.patternText+' = args;'))];
  const writes=[...new Set(assignments.filter(a=>a.sourceVerbId===v.sourceVerbId&&/[.:]/.test(a.leftText??'')).map(a=>a.leftText))];
  const directCalls=[...new Set(calls.filter(c=>c.sourceVerbId===v.sourceVerbId).map(c=>c.function))];
  const effects=directCalls.filter(name=>['notify','read','force_input','suspend','set_task_perms','create','recycle','move','chparent','add_property','delete_property','set_property_info','add_verb','delete_verb','set_verb_code','set_verb_info','set_verb_args','boot_player','set_player_flag','kill_task','queue_info','queued_tasks'].includes(name));
  return {...v,objectAlias,documentation,argumentPatterns,directCalls,args:[args[(meta.permissionsRaw>>4)&3],meta.prepositionsRaw===-1?'none':meta.prepositionsRaw===-2?'any':['with','at','in front of','in','on top of','out of','over','through','under','behind','beside','for','is','as','off'][meta.prepositionsRaw],args[(meta.permissionsRaw>>6)&3]],support,examples,inspectionExample:`return verb_code(${objectAlias}, ${JSON.stringify(v.primaryName.replace('*',''))});`,sideEffects:[writes.length?'Direct property assignments: '+writes.join(', ')+'.':'No direct property assignments identified.',effects.length?'Direct world/task/I/O calls: '+effects.join(', ')+'.':'No direct world/task/I/O calls identified.','Called verbs and dynamic references can have additional effects. Inspection with verb_code is read-only; this inventory is not a transitive purity guarantee.'].join(' ')};
 });
 if(entries.length!==375)throw new Error('Expected 375 utility definitions');
 await writeFile(outputDir+'/reference.json',JSON.stringify(entries,null,2)+'\n');
}
if(process.argv[1]?.endsWith('/reference.mjs'))await buildReference({extractDir:'.cache/common-packages/extract',graphDir:'.cache/common-packages/graph',outputDir:'dist/packages/common-packages'});
