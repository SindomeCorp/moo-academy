import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const source = 'node_modules/moo-in-javascript';
await mkdir('dist/runtime', { recursive: true });
for (const path of ['dist', 'assets', 'LICENSE', 'docs']) await cp(`${source}/${path}`, `dist/runtime/${path}`, { recursive: true });
const metadata = JSON.parse(await readFile(`${source}/package.json`, 'utf8'));
const bytes = await readFile(`vendor/packages/moo-in-javascript-${metadata.version}.tgz`);
await writeFile('dist/runtime/provenance.json', JSON.stringify({ package: metadata.name, version: metadata.version,
  dependency: JSON.parse(await readFile('package.json', 'utf8')).dependencies['moo-in-javascript'],
  tarballSha256: createHash('sha256').update(bytes).digest('hex') }, null, 2) + '\n');
// Content-addressed releases are immutable; retain old releases for open tabs.
const digest=createHash('sha256').update(bytes).digest('hex');
const release=`dist/runtime/releases/${digest}`;
await mkdir(release,{recursive:true});
for(const path of ['dist','assets','LICENSE','docs'])await cp(`${source}/${path}`,`${release}/${path}`,{recursive:true});
await writeFile('dist/runtime-version.js',`// Generated runtime release. Application modules remain uncached.\nexport const runtimeBase='./runtime/releases/${digest}';\n`);
