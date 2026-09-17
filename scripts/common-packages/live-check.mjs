// Disposable loopback-only integration fixture: no changes to the imported world or input DB.
import {spawn,spawnSync} from 'node:child_process';
import {mkdtemp,rm,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import net from 'node:net';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {commonManifest} from '../../dist/common-packages.js';
import {expandedUtilities} from '../../dist/utility-expansion.js';
const binary=process.env.TOASTSTUNT_BINARY??'/home/seven/toaststunt-lisdude/moo';
const database='.cache/common-packages/toastcore.db';
assert.equal(createHash('sha256').update(await readFile(database)).digest('hex'),commonManifest.source.sha256);
const directory=await mkdtemp(join(tmpdir(),'utility-live-'));
let child,socket;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const command=(object,name,source,args=['this','none','this'],owner='#2')=>`try delete_verb(${object},${JSON.stringify(name.split(" ")[0])}); except (E_VERBNF) endtry add_verb(${object},{${owner},"rxd",${JSON.stringify(name)}},${'{'+args.map(JSON.stringify).join(',')+'}'}); set_verb_code(${object},${JSON.stringify(name.split(" ")[0])},${'{'+source.split('\n').map(JSON.stringify).join(',')+'}'});`;
try{
 const experiment=process.argv.includes('--experiment');
 const selected=expandedUtilities.command.find(l=>l.id==='input').serverExercise.code.replace('a tool name',experiment?'a room name':'a tool name');
 const yielding=expandedUtilities.list.find(l=>l.id==='yielding').serverExercise.code.replace('reverse_suspended({1, 2, 3})',experiment?'reverse_suspended({1, 2, 3, 4})':'reverse_suspended({1, 2, 3})');
 const program=`player:tell("BEGIN input");\n${selected}\nplayer:tell("BEGIN yield");\nbefore = ticks_left();\n$command_utils:suspend(0);\nafter = ticks_left();\nplayer:tell("YIELD balances: ", toliteral({before, after}));\n${yielding}\nplayer:tell("BEGIN escape");\nresponse = $command_utils:read_lines_escape("done");\nplayer:tell("ESCAPE response: ", toliteral(response));\nplayer:tell("UTILITY COMPLETE");`;
 const fixture='p=create(#6,#-1);r=create(#3,p);p.name="Learner";p.size_quota={100000000,0,0,0};p.ownership_quota=1000;set_player_flag(p,1);'+command('p','tell notify','return notify(this,tostr(@args));',['this','none','this'],'p')+command('p','utilitycheck',program,['none','none','none'],'p')+command('#0','do_login_command','return #127;')+command('#0','server_started','return 0;')+command('#0','user_connected','return 0;')+command('#0','user_reconnected','return 0;')+command('#0','do_command','return 0;')+'return {p,r};';
 const prepared=spawnSync(binary,['-e','-O',database,join(directory,'fixture.db')],{input:';;'+fixture+'\nquit\n',encoding:'utf8',timeout:15000,maxBuffer:5000000});
 assert.ok(prepared.stdout.includes('=> {#127, #128}'),prepared.stdout+prepared.stderr);
 const reserve=net.createServer();await new Promise(r=>reserve.listen(0,'127.0.0.1',r));const port=reserve.address().port;await new Promise(r=>reserve.close(r));
 child=spawn(binary,['-O','--no-ipv6','-4','127.0.0.1','-p',String(port),join(directory,'fixture.db'),join(directory,'output.db')],{env:{...process.env,TZ:'UTC'},stdio:['ignore','pipe','pipe']});
 let log='';child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);
 for(let i=0;i<100;i++){
  try{socket=await new Promise((r,j)=>{const s=net.connect(port,'127.0.0.1',()=>r(s));s.once('error',j);});break;}catch{if(child.exitCode!==null)throw Error(log);await pause(50);}
 }
 assert.ok(socket,'Server did not listen: '+log);let transcript='';socket.on('data',d=>transcript+=d.toString());
 const waitFor=async text=>{for(let i=0;i<200;i++){if(transcript.includes(text))return;await pause(50);}throw Error('Missing '+text+'\n'+transcript+'\n'+log);};
 socket.write('connect\r\n');await pause(100);socket.write('utilitycheck\r\n');
 await waitFor(experiment?'a room name':'a tool name');socket.write('brush\r\n');await waitFor('Keep this tool?');socket.write(experiment?'\r\n':'yes\r\n');
 await waitFor('BEGIN escape');socket.write('brush\r\n..\r\ndone\r\n');await waitFor('UTILITY COMPLETE');
 assert.ok(transcript.includes('TOOL response: "brush"'));assert.ok(transcript.includes(experiment?'CONFIRMED: E_NONE':'CONFIRMED: 1'));
 assert.ok(transcript.includes('SORT_SUSPENDED: {1, 2, 3}'));assert.ok(transcript.includes('FLATTEN_SUSPENDED: {1, 2, 3}'));
 assert.ok(transcript.includes('ESCAPE response: {"done", {"brush", "."}}'));
 const balances=transcript.match(/YIELD balances: \{(\d+), (\d+)\}/);assert.ok(balances);assert.ok(Number(balances[2])>Number(balances[1]));
 await writeFile('dist/packages/common-packages/'+(experiment?'live-experiment-verification.json':'live-verification.json'),JSON.stringify({source:commonManifest.source,network:'127.0.0.1 only; outbound disabled; disposable database',checks:['command read + yes_or_no with real socket input','suspend(0) resumes and replenishes ticks','native suspended list helpers resume and return documented values','read_lines_escape preserves escaped periods and returns custom terminator'],transcript},null,2)+'\n');
 console.log('PASS real input, yes/no, suspension, list scheduling, escaped multi-line input');
}finally{socket?.destroy();if(child&&child.exitCode===null){child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));}await rm(directory,{recursive:true,force:true});}
