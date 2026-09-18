import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRuntime} from '@sindomecorp/moo-in-javascript';
const jsonl=async path=>(await readFile(path,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const id=value=>String(value).replace(/^#/,'');
const hash=text=>createHash('sha256').update(text).digest('hex');
const errorNames=['E_NONE','E_TYPE','E_DIV','E_PERM','E_PROPNF','E_VERBNF','E_VARNF','E_INVIND','E_RECMOVE','E_MAXREC','E_RANGE','E_ARGS','E_NACC','E_INVARG','E_QUOTA','E_FLOAT','E_FILE','E_EXEC','E_INTRPT'];
const bits=(raw,chars)=>chars.map(([mask,char])=>raw&mask?char:'').join('');
function encode(v){
 if(v.truncated||v.redacted)throw new Error('Incomplete imported value');
 if(v.type==='clear')return null;
 if(v.type==='object')return {type:'object',value:id(v.object)};
 if(v.type==='list')return {type:'list',value:v.items.map(encode)};
 if(v.type==='map')return {type:'map',value:v.entries.map(e=>[encode(e.key),encode(e.value)])};
 // Native reads the low 32-bit enum from a 64-bit union slot. ToastCore's
 // error_list contains stale high bits; preserve its native interpreted value.
 if(v.type==='error'||(v.type==='unknown'&&v.rawType===3)){
  const code=Number(BigInt.asUintN(32,BigInt(v.raw??v.code)));
  if(!errorNames[code])throw new Error('Unknown native error '+code);
  return {type:'error',value:errorNames[code]};
 }
 if(v.type==='int')return {type:'int',value:String(v.value)};
 if(v.type==='string'||v.type==='float')return {type:v.type,value:v.value};
 throw new Error('Unsupported property representation '+v.type);
}
export async function convert({extractDir,graphDir,resolvedDir,outputDir,source,utilities,worldLimits}){
 const objects=await jsonl(extractDir+'/objects.jsonl'),verbs=await jsonl(extractDir+'/verbs.jsonl'),props=await jsonl(extractDir+'/properties.jsonl'),values=await jsonl(extractDir+'/property_values.jsonl'),aliases=await jsonl(extractDir+'/core_candidates.jsonl');
 const byId=new Map(objects.map(o=>[o.objectId,o]));
 const edges=(await Promise.all(['verb_call_candidate','system_object','literal_object','property_candidate','root_property','root_verb_call'].map(n=>jsonl(resolvedDir+'/edges/'+n+'_edges.jsonl')))).flat();
 const selected=new Set(utilities.map(u=>u.objectId)),reasons=new Map([...selected].map(i=>[i,['requested utility']]));
 const rootProperties=new Set(),rootVerbs=new Set();
 const include=(ref,why)=>{const n=Number(id(ref));if(n<0||!byId.has(n))return;if(!selected.has(n)){selected.add(n);reasons.set(n,[why]);}};
 include(0,'system aliases');include(1,'root');include(2,'source owner');include(3,'teaching room parent');include(6,'teaching player parent');
 let size=-1;
 while(size!==selected.size+rootProperties.size+rootVerbs.size){
  size=selected.size+rootProperties.size+rootVerbs.size;
  for(const n of [...selected]){
   const o=byId.get(n);for(const ref of [...o.parents,o.owner,o.location,...o.contents])include(ref,`structure of #${n}`);
   for(const e of edges.filter(e=>e.sourceObject==='#'+n && (n!==0||rootVerbs.has(e.sourceVerbId)))){
    include(e.targetObject,'code reference '+e.sourceVerbId);
    if(e.targetObject==='#0'&&e.property)rootProperties.add(e.property);
    if(e.targetObject==='#0'&&e.targetVerbId)rootVerbs.add(e.targetVerbId);
    if(e.symbol)rootProperties.add(e.symbol.slice(1));
   }
   for(const p of values.filter(p=>p.objectId===n&&(n!==0||p.nameConfidence!=='direct'||rootProperties.has(p.name)))){
    include(p.owner,`property owner #${n}.${p.name}`);
    for(const ref of p.value.objectRefs??[])include(ref,`property #${n}.${p.name}`);
   }
  }
  for(const a of aliases)if(a.target&&selected.has(Number(id(a.target))))rootProperties.add(a.property);
 }
 function origin(n,name){const own=props.some(p=>p.objectId===n&&p.name.toLowerCase()===name.toLowerCase());if(own)return String(n);const parent=byId.get(n).parents[0];if(!parent||parent==='#-1')throw new Error('Missing definition '+n+'.'+name);return origin(Number(id(parent)),name);}
 const imported=[];const catalog=[];const r=await createRuntime({profile:'toaststunt'});
 try{
 for(const n of [...selected].sort((a,b)=>a-b)){
  const o=byId.get(n);if(o.parents.length>1)throw new Error('Multiple inheritance: '+o.id);
  const vdata=[];
  for(const v of verbs.filter(v=>v.objectId===n&&(n!==0||rootVerbs.has(v.id)))){
   const code=v.hasProgram?await readFile(extractDir+'/'+v.sourcePath,'utf8'):'';
   if(v.hasProgram && 'sha256:'+hash(code)!==v.codeHash)throw new Error('Source hash mismatch '+v.id);
   const args=['none','any','this'];const prep=v.prepositionsRaw===-1?'none':v.prepositionsRaw===-2?'any':['with','at','in front of','in','on top of','out of','over','through','under','behind','beside','for','is','as','off'][v.prepositionsRaw];
   vdata.push({names:v.namesRaw,owner:id(v.owner),perms:bits(v.permissionsRaw,[[1,'r'],[2,'w'],[4,'x'],[8,'d']]),args:[args[(v.permissionsRaw>>4)&3],prep,args[(v.permissionsRaw>>6)&3]],source:code});
   const compiled=r.compile(code);
   catalog.push({sourceVerbId:v.id,objectId:n,names:v.names,primaryName:v.primaryName,source:code,sourceHash:hash(code),sourcePath:v.sourcePath,compileDiagnostics:compiled.ok?[]:compiled.diagnostics,utility:utilities.find(u=>u.objectId===n)?.id??null});
  }
  imported.push({id:String(n),name:o.name,parent:id(o.parents[0]??'#-1'),owner:id(o.owner),player:Boolean(o.flagsRaw&1),location:id(o.location),contents:o.contents.map(id),
   // Decode native Format 17 bit positions, not extractor's display labels.
   flags:{programmer:+!!(o.flagsRaw&2),wizard:+!!(o.flagsRaw&4),r:+!!(o.flagsRaw&16),w:+!!(o.flagsRaw&32),f:+!!(o.flagsRaw&128)},
   properties:values.filter(p=>p.objectId===n&&(n!==0||p.nameConfidence!=='direct'||rootProperties.has(p.name))).map(p=>({name:p.name,origin:origin(n,p.name),owner:id(p.owner??o.owner),perms:bits(p.permissionsRaw??0,[[1,'r'],[2,'w'],[4,'c']]),value:encode(p.value)})),verbs:vdata});
 }
 const next=Math.max(...objects.map(o=>o.objectId))+1;
 const snapshot={version:1,profile:'toaststunt',nextId:String(next),objects:imported};
 const world=r.loadWorld(snapshot,{worldLimits,unsupportedSourcePolicy:'retain'});
 world.addObject({id:next,parent:6,owner:next,name:'Learner'});
 world.addObject({id:next+1,parent:3,owner:next,name:'Common Packages workshop'});
 world.addVerb(BigInt(next),{names:'tell notify',owner:BigInt(next),perms:'rx',args:['this','none','this'],source:'return notify(this,tostr(@args));'});
 const saved=r.saveWorld(world);
 const serialized=JSON.stringify(JSON.parse(saved),null,2)+'\n';
 const manifest={id:'common-packages',name:'Common Packages',profile:'toaststunt',source,context:{this:next+1,player:next,caller:next},worldLimits,unsupportedSourcePolicy:'retain',utilities:utilities.map(u=>({...u,aliases:aliases.filter(a=>a.target==='#'+u.objectId).map(a=>a.symbol),verbCount:catalog.filter(v=>v.objectId===u.objectId).length})),objects:[...selected].sort((a,b)=>a-b).map(n=>({id:n,name:byId.get(n).name,reasons:reasons.get(n)})),snapshotSha256:hash(serialized),sourceVerbCount:catalog.length,conversionNotes:['Native Format 17 object flags, property permissions and zero-based preposition IDs are decoded from raw numeric fields; extractor display labels are not used.','Error values use the native 32-bit enum in the low bits of the stored 64-bit union. ToastCore #59.error_list has unused high bits; its raw representation remains in the pinned source database.','Extractor 0.1.4 reports 0.1.0 inside its extraction manifest. The installed package version is verified separately.','Public seed property values are retained without redaction; no learner or external server data is imported.','Root verbs and properties are limited to resolved dependencies and aliases. Dynamic unresolved references are recorded separately.']};
 await mkdir(outputDir,{recursive:true});
 await writeFile(outputDir+'/metadata.js','// Generated by build:common-packages.\nexport const commonManifest='+JSON.stringify(manifest)+';\n');
 for(const [file,data] of [['world.json',JSON.parse(saved)],['manifest.json',manifest],['verbs.json',catalog]])await writeFile(outputDir+'/'+file,JSON.stringify(data,null,2)+'\n');
 const unresolved=await jsonl(resolvedDir+'/edges/unresolved_refs.jsonl');
 await writeFile(outputDir+'/dependencies.json',JSON.stringify({edges:edges.filter(e=>selected.has(Number(id(e.sourceObject)))),unresolved:unresolved.filter(e=>selected.has(Number(id(e.sourceObject))))},null,2)+'\n');
 console.log(`Common Packages: ${selected.size} source objects, ${catalog.length} source verbs, ${catalog.filter(v=>v.utility).length} utility definitions`);
 }finally{r.dispose();}
}
