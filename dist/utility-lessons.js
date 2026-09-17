import {commonManifest} from './common-packages.js';
import {expandedUtilities} from './utility-expansion.js';
import {stringUtilsLessons} from './string-utils-lessons.js';
// Authored examples call the imported core; no replacement utility implementations.
const examples={string:stringUtilsLessons};
export const utilityPaths=commonManifest.utilities.map(u=>({id:'utility-'+u.id,title:u.title,level:'Intermediate · ToastStunt',description:`Learn ${u.aliases.join(', ')} from authentic ToastCore source.`,prerequisites:'Collections, objects, verbs and debugging.',profiles:['toaststunt']}));
export const utilityCourses=Object.fromEntries(commonManifest.utilities.map(u=>['utility-'+u.id,(expandedUtilities[u.id]??examples[u.id]).map(entry=>{
 const {id,title,body,code,expected,expectedOutput,experiment,steps,...extra}=entry;
 if(typeof expected!=='string'||!Array.isArray(expectedOutput))throw new Error('Missing native observations for utility-'+u.id+'-'+id+'; record the lesson before publishing.');
 return ({
 id:`utility-${u.id}-${id}`,group:u.title,title,verb:`#${commonManifest.context.this}:${id}`,worldSeed:'common-packages',profiles:['toaststunt'],exploration:true,
 ...extra,
 body,
 code,expected,expectedOutput,steps,experiment:[experiment],
 hint:'The Common Packages starting world already contains these utilities. Each utility track and named sandbox has its own saved copy.',
 startingState:'The prepared Common Packages world contains the ToastCore utilities and their corified references.',
 warning:extra.warning??(['command','wiz'].includes(u.id)?'MODELED: Task, connection and permission behavior is educational. Use the original source and a real ToastStunt server to study server administration.':undefined),
 checkpointSteps:[],
});})]));
