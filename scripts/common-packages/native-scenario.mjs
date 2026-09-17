import {spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {commonManifest} from '../../dist/common-packages.js';
const database='.cache/common-packages/toastcore.db';
let checked=false;
export function nativeScenario(code,{label='scenario',wizard=false}={}) {
 code=code.replace(/for source in \(verb_code\(([^\n]+)\)\)/g,'for source in (verb_code($1, 1, 0))');
 const binary=process.env.TOASTSTUNT_BINARY??'/home/seven/toaststunt-lisdude/moo';
 if(!checked){if(createHash('sha256').update(readFileSync(database)).digest('hex')!==commonManifest.source.sha256)throw Error('Database hash mismatch');checked=true;}
 const dir=mkdtempSync(join(tmpdir(),'utility-native-'));
 const {player,this:room}=commonManifest.context;
 try{
  const fixture=`;;p=create(#6,#-1);r=create(#3,p);p.name="Learner";r.name="Common Packages workshop";p.size_quota={100000000,0,0,0};p.ownership_quota=1000;p.wizard=1;add_verb(p,{p,"rx","tell notify"},{"this","none","this"});set_verb_code(p,"tell",{"return notify(this,tostr(@args));"});return {p,r};`;
  const command=`;;set_thread_mode(0);#${player}.wizard=${wizard?1:0};this=#${room};player=#${player};caller=#${player};set_task_perms(#${wizard?2:player});${code.replaceAll('\n',' ')}`;
  const result=spawnSync(binary,['-e','-O',database,join(dir,'unused.db')],{input:fixture+'\nwizard #'+player+'\n'+command+'\nabort\n',encoding:'utf8',timeout:15000,maxBuffer:5000000,env:{...process.env,TZ:'UTC'}});
  const log=result.stdout+'\n'+result.stderr;
  if(result.error||result.signal||!log.includes('Bye.  (NOT saving database)'))throw Error(label+': '+(result.error??log));
  const values=[...log.matchAll(/^(?:\(#\d+\): )?=> (.*)$/gm)].map(m=>m[1]);
  if(values.length!==2||values[0]!==`{#${player}, #${room}}`||values[1].startsWith('*'))throw Error(label+': '+log);
  const output=[...log.matchAll(new RegExp(`^(?:\\(#\\d+\\): )?#${player} <- (.*)$`,'gm'))].map(m=>m[1]);
  return {value:values[1],output};
 }finally{rmSync(dir,{recursive:true,force:true});}
}
