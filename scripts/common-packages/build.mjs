import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {source,utilities,worldLimits} from './config.mjs';
import {convert} from './convert.mjs';
const cache=resolve('.cache/common-packages');await mkdir(cache,{recursive:true});
let graph=process.env.MOO_CODE_GRAPH_DIR;
if(!graph){
 graph=cache+'/moo-code-graph';
 try{await access(graph+'/.git');}catch{execFileSync('git',['clone','https://github.com/SindomeCorp/moo-code-graph.git',graph],{stdio:'inherit'});}
 execFileSync('git',['-C',graph,'checkout','--detach',source.graphCommit],{stdio:'inherit'});
 execFileSync('npm',['ci'],{cwd:graph,stdio:'inherit'});
 execFileSync('npx',['tsc'],{cwd:graph,stdio:'inherit'});
}
if(execFileSync('git',['-C',graph,'rev-parse','HEAD'],{encoding:'utf8'}).trim()!==source.graphCommit)throw new Error('Graph checkout must match the pinned commit');
if(execFileSync('git',['-C',graph,'status','--porcelain'],{encoding:'utf8'}).trim())throw new Error('Graph checkout has local modifications; use a clean pinned checkout');
const extractorPackage=JSON.parse(await readFile(resolve(graph,'node_modules/@sindomecorp/toaststunt-db-extractor/package.json'),'utf8'));
if(extractorPackage.version!==source.extractorVersion)throw new Error('Extractor version must match the pin');
const extractApi=await import(pathToFileURL(resolve(graph,'node_modules/@sindomecorp/toaststunt-db-extractor/dist/index.js')));
const graphApi=await import(pathToFileURL(resolve(graph,'dist/index.js')));
const dbPath=cache+'/toastcore.db';
let db;try{db=await readFile(dbPath);}catch{const response=await fetch(`${source.repository.replace('github.com','raw.githubusercontent.com')}/${source.commit}/toastcore.db`);if(!response.ok)throw new Error('Database download failed: '+response.status);db=Buffer.from(await response.arrayBuffer());await writeFile(dbPath,db);}
if(createHash('sha256').update(db).digest('hex')!==source.sha256)throw new Error('ToastCore hash mismatch');
const extractDir=cache+'/extract',graphDir=cache+'/graph',resolvedDir=cache+'/resolved';
await extractApi.extractToastStuntDb({inputPath:dbPath,outputDir:extractDir,overwrite:true,includeVerbCode:true,includePropertyValues:true,redactPasswordProperties:false,quiet:true});
const databaseValidation=await extractApi.validateToastStuntDb(dbPath);
if(!databaseValidation.valid)throw new Error(JSON.stringify(databaseValidation));
const validation=await extractApi.validateToastStuntDb(extractDir);
// Extractor 0.1.4 requires password redaction even when explicitly disabled.
// This pinned public teaching database is preserved exactly; all other failures remain fatal.
const errors=validation.errors.filter(e=>e.message!=='Password property was not redacted');
if(errors.length)throw new Error(JSON.stringify(errors));
const indexed=await graphApi.indexMooCodeGraph({extractDir,outputDir:graphDir,overwrite:true,quiet:true});
if(indexed.stats.parseErrorCount)throw new Error('Extracted source has grammar errors; inspect '+graphDir+'/code_facts/parse_errors.jsonl');
await graphApi.resolveMooCodeGraph({graphDir,extractDir,outputDir:resolvedDir,overwrite:true,quiet:true});
await convert({extractDir,graphDir,resolvedDir,outputDir:resolve('dist/packages/common-packages'),source,utilities,worldLimits});

await (await import('./reference.mjs')).buildReference({extractDir,graphDir,outputDir:resolve('dist/packages/common-packages')});
