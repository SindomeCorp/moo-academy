import {verifyRuntime} from './runtime-package.mjs';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const hash=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
async function same(a,b) {assert.equal(await hash(a),await hash(b),`Asset differs: ${a} / ${b}`);}
await verifyRuntime();
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
