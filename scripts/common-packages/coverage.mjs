import {readFile,writeFile} from 'node:fs/promises';
import {utilityCourses} from '../../dist/utility-lessons.js';
import {utilityExclusions} from '../../dist/utility-expansion.js';
const root='dist/packages/common-packages/';
const catalog=JSON.parse(await readFile(root+'verbs.json','utf8'));
const lessons=Object.values(utilityCourses).flat();
const entries=catalog.filter(v=>v.utility&&v.utility!=='string').map(v=>{
 const covered=lessons.filter(l=>l.covers?.includes(v.sourceVerbId));
 const reason=utilityExclusions[v.utility]?.[Number(v.sourceVerbId.split(':')[1])];
 if(!covered.length&&!reason)throw Error('Unclassified definition '+v.sourceVerbId+' '+v.names.join(' '));
 if(covered.length&&reason)throw Error('Conflicting classification '+v.sourceVerbId);
 return {sourceVerbId:v.sourceVerbId,utility:v.utility,names:v.names,classification:reason?'reference-only':'taught',reason:reason??null,lessons:covered.map(l=>({id:l.id,mode:l.executionMode}))};
});
if(entries.length!==296)throw Error('Expected 296 remaining utility definitions');
await writeFile(root+'coverage.json',JSON.stringify({source:'Explicit lesson covers declarations and reviewed exclusions; never inferred from code text.',entries},null,2)+'\n');
console.log(`${entries.length} definitions: ${entries.filter(e=>e.classification==='taught').length} taught; ${entries.filter(e=>e.classification==='reference-only').length} internal/legacy reference-only.`);
