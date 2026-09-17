import {runtimeBase} from '../dist/runtime-version.js';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const hash=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
async function same(a,b) {assert.equal(await hash(a),await hash(b),`Asset differs: ${a} / ${b}`);}
const pkg=await json('package.json'), runtime=await json('node_modules/moo-in-javascript/package.json');
const provenance=await json('dist/runtime/provenance.json');
assert.equal(provenance.package,runtime.name);assert.equal(provenance.version,runtime.version);
assert.equal(provenance.dependency,pkg.dependencies['moo-in-javascript']);
assert.equal(provenance.tarballSha256,await hash(provenance.dependency.replace(/^file:/,'')));
assert.equal(runtimeBase,'./runtime/releases/'+provenance.tarballSha256);
const release='dist/'+runtimeBase.slice(2);
for(const dir of ['dist','assets']) {
 const source=`node_modules/moo-in-javascript/${dir}`,target=`dist/runtime/${dir}`;
 const files=async root=>(await readdir(root,{recursive:true,withFileTypes:true})).filter(e=>e.isFile()).map(e=>`${e.parentPath}/${e.name}`.slice(root.length+1)).sort();
 const names=await files(source);assert.deepEqual(await files(target),names,`Unexpected or missing runtime ${dir} files`);
 assert.deepEqual(await files(`${release}/${dir}`),names,`Release inventory mismatch: ${dir}`);
 for(const name of names){await same(`${source}/${name}`,`${target}/${name}`);await same(`${source}/${name}`,`${release}/${dir}/${name}`);}
}
await same('node_modules/moo-in-javascript/LICENSE','dist/runtime/LICENSE');
const grammar=await json('dist/vendor/provenance.json');
assert.equal(grammar.sha256,await hash('dist/vendor/tree-sitter-moo.wasm'));
assert.equal(execFileSync('git',['-C','vendor/tree-sitter-moo','rev-parse','HEAD'],{encoding:'utf8'}).trim(),grammar.revision);
assert.equal(grammar.runtime,'web-tree-sitter@'+(await json('node_modules/web-tree-sitter/package.json')).version);
for(const name of ['tree-sitter.js','tree-sitter.wasm'])await same(`node_modules/web-tree-sitter/${name}`,`dist/vendor/${name}`);
await same('vendor/tree-sitter-moo/dist/tree-sitter-moo.wasm','dist/vendor/tree-sitter-moo.wasm');
await same('vendor/tree-sitter-moo/LICENSE','dist/vendor/tree-sitter-moo.LICENSE');
await same('node_modules/web-tree-sitter/LICENSE','dist/vendor/web-tree-sitter.LICENSE');
console.log('Runtime and parser assets, file inventories, provenance and licenses match installed dependencies.');

const common=await json('dist/packages/common-packages/manifest.json');
assert.equal(common.snapshotSha256,await hash('dist/packages/common-packages/world.json'));
const refs=await json('dist/packages/common-packages/reference.json');
assert.equal(refs.length,375);
for(const entry of refs)assert.equal(createHash('sha256').update(entry.source).digest('hex'),entry.sourceHash);
console.log('Common Packages world and all 375 utility source hashes match provenance.');
