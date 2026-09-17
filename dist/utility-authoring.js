import {commonManifest} from './common-packages.js';
import {utilityResults} from './utility-results.js';
// Small authoring helpers; explanations and groupings remain explicitly authored.
export const edit=(from,to,effect)=>({from,to,effect});
export function courseLesson(utility,id,title,covers,body,code,change,options={}) {
 const key=`utility-${utility}-${id}`,record=utilityResults[key];
 const objectId=commonManifest.utilities.find(u=>u.id===utility).objectId;
 const server=options.server;
 const sourceNames=server?.names??[];
 const browserCode=server?`limit = 6;\n`+sourceNames.map(name=>`player:tell("${name} source:");\nlines = {};\nfor source in (verb_code($${utility==='wiz'?'wiz':utility}_utils, ${JSON.stringify(name)}))\n  source = $string_utils:trim(source);\n  if (source)\n    lines = {@lines, source};\n  endif\nendfor\nfor line in (lines[1..min(limit, length(lines))])\n  player:tell(line);\nendfor`).join('\n'):code;
 return {id,title,body,code:browserCode,covers:covers.map(index=>`#${objectId}:${index}`),
  executionMode:server?'source-walkthrough':'browser',
  expected:record?.value,expectedOutput:record?.output,outputChoices:options.outputChoices,experimentOutputChoices:options.experimentOutputChoices,experimentDelta:options.experimentDelta,
  steps:options.steps??(server?['Run the source walkthrough and read the original argument handling.','Read the separately labeled server exercise, its prerequisites and its expected effect.']:['Run the starter and match each labeled output line to its operation.','Change the suggested input and compare the resulting output with your prediction.']),
  experiment:server?'Change <code>limit = 6;</code> to <code>limit = 12;</code> to inspect more of each definition without executing it.':change.effect,
  experimentEdit:server?{from:'limit = 6;',to:'limit = 12;'}:change,
  experimentResult:record?.experiment,
  serverExercise:server?{code,prerequisites:server.prerequisites,wizard:server.wizard,manual:server.manual,expectedEffect:server.expectedEffect,expected:record?.server?.value,expectedOutput:record?.server?.output??[],experiment:change,experimentResult:record?.serverExperiment,outputChoices:options.outputChoices}:undefined,
  warning:server?'REAL SERVER EXERCISE: Run in Code inspects source only. The exercise below requires an isolated ToastStunt server.':options.warning,
 };
}
