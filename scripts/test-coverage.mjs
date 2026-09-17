import {spawnSync} from 'node:child_process';
import {mkdir,rm,readFile,readdir} from 'node:fs/promises';
import {resolve,basename} from 'node:path';
function run(command,args,env={}) {
 const result=spawnSync(command,args,{stdio:'inherit',env:{...process.env,...env}});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status??1);
}
await rm('coverage',{recursive:true,force:true});await mkdir('coverage/tmp',{recursive:true});
const tests=(await readdir('tests')).filter(file=>file.endsWith('.test.mjs')).map(file=>'tests/'+file);
run(process.execPath,['--test',...tests],{NODE_V8_COVERAGE:resolve('coverage/tmp')});
// test:check collects Chromium coverage during the complete browser matrix once.
run(process.execPath,['node_modules/@playwright/test/cli.js','test',...(process.argv.includes('--all-browsers')?[]:['--project=chromium'])],{MOO_COVERAGE:'1'});
run(process.execPath,['node_modules/c8/bin/c8.js','report','--all','--src=dist','--include=dist/*.js','--temp-directory=coverage/tmp','--reporter=text','--reporter=html','--reporter=lcov','--reporter=json-summary']);
const summary=JSON.parse(await readFile('coverage/coverage-summary.json','utf8'));
const content=new Set(['lessons.js','builtin-lessons.js','string-utils-coverage.js']);
const thresholds={lines:90,branches:80,functions:90};
let failed=false;
for(const file of (await readdir('dist')).filter(file=>file.endsWith('.js'))) {
 const stats=summary[resolve('dist',file)];
 if(!stats){console.error(`Missing coverage: ${file}`);failed=true;continue;}
 if(content.has(file)){console.log(`Lesson data (not included in behavioral gates): ${file}`);continue;}
 for(const [metric,min] of Object.entries(thresholds))if(stats[metric].pct<min){console.error(`${basename(file)} ${metric}: ${stats[metric].pct}% < ${min}%`);failed=true;}
}
const behavioral=Object.entries(summary).filter(([file])=>file!=='total'&&!content.has(basename(file)));
console.log('Behavioral modules (lesson data excluded):');
for(const metric of Object.keys(thresholds)) {
 const total=behavioral.reduce((n,[,stats])=>n+stats[metric].total,0);
 const covered=behavioral.reduce((n,[,stats])=>n+stats[metric].covered,0);
 console.log(`  ${metric}: ${(100*covered/total).toFixed(2)}% (${covered}/${total})`);
}
if(failed)process.exitCode=1;
