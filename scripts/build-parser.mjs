import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const revision = '5e42672ffa1a4e955fe6a04da534396282522242';
const source = 'vendor/tree-sitter-moo';
if (execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], {encoding:'utf8'}).trim() !== revision) {
  throw new Error(`Check out grammar revision ${revision} before building.`);
}
await mkdir('dist/vendor', {recursive:true});
for (const name of ['tree-sitter.js', 'tree-sitter.wasm']) {
  await copyFile(`node_modules/web-tree-sitter/${name}`, `dist/vendor/${name}`);
}
await copyFile('node_modules/web-tree-sitter/LICENSE', 'dist/vendor/web-tree-sitter.LICENSE');
await copyFile(`${source}/dist/tree-sitter-moo.wasm`, 'dist/vendor/tree-sitter-moo.wasm');
await copyFile(`${source}/LICENSE`, 'dist/vendor/tree-sitter-moo.LICENSE');
const wasm = await readFile('dist/vendor/tree-sitter-moo.wasm');
await writeFile('dist/vendor/provenance.json', JSON.stringify({
  grammar: 'https://github.com/SindomeCorp/tree-sitter-moo', revision,
  runtime: 'web-tree-sitter@0.25.10',
  artifact: 'Upstream checked-in dist/tree-sitter-moo.wasm',
  sha256: createHash('sha256').update(wasm).digest('hex')
}, null, 2) + '\n');
