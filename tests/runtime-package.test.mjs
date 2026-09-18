import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { artifactManifest, installedRuntime, packageName, verifyRuntime } from '../scripts/runtime-package.mjs';

const buildScript = new URL('../scripts/build-runtime.mjs', import.meta.url);
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'academy-runtime-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, 'node_modules', packageName);
  const dependencies = { [packageName]: '0.2.5' };
  const entry = { version: '0.2.5', resolved: `https://registry.npmjs.org/${packageName}/-/moo-in-javascript-0.2.5.tgz`, integrity: 'sha512-' + Buffer.alloc(64).toString('base64') };
  await mkdir(source, { recursive: true });
  for (const [name, value] of Object.entries({ 'dist/index.js': 'export const value=1;', 'assets/test.wasm': 'fixture wasm', 'docs/guide.md': 'Documentation', LICENSE: 'Fixture license' })) {
    const path = join(source, name);
    await mkdir(join(path, '..'), { recursive: true });
    await writeFile(path, value);
  }
  await writeFile(join(source, 'package.json'), JSON.stringify({ name: packageName, version: '0.2.5' }));
  await writeFile(join(root, 'package.json'), JSON.stringify({ dependencies }));
  await writeFile(join(root, 'package-lock.json'), JSON.stringify({ packages: { '': { dependencies }, [`node_modules/${packageName}`]: entry } }));
  const build = () => execFileSync(process.execPath, [buildScript.pathname], { cwd: root, stdio: 'pipe' });
  return { root, source, build };
}

test('runtime builds are deterministic, retain old releases, and refresh only dependency copies', async t => {
  const { root, source, build } = await fixture(t);
  await mkdir(join(root, 'dist/runtime/releases/old'), { recursive: true });
  await writeFile(join(root, 'dist/index.html'), 'authored app');
  await writeFile(join(root, 'dist/runtime/releases/old/keep'), 'old tab');
  build();
  const first = await verifyRuntime(root);
  const release = join(root, 'dist/runtime/releases', first.artifactSha256, 'dist/index.js');
  const before = (await stat(release)).mtimeMs;
  build();
  assert.deepEqual(await verifyRuntime(root), first);
  assert.equal((await stat(release)).mtimeMs, before, 'immutable files were rewritten');
  assert.equal(await readFile(join(root, 'dist/index.html'), 'utf8'), 'authored app');
  assert.equal(await readFile(join(root, 'dist/runtime/releases/old/keep'), 'utf8'), 'old tab');
  await writeFile(join(source, 'docs/guide.md'), 'Updated documentation');
  await writeFile(join(root, 'dist/runtime/dist/stale.js'), 'removed upstream file');
  build();
  assert.notEqual((await verifyRuntime(root)).artifactSha256, first.artifactSha256);
  assert.equal(await readFile(release, 'utf8'), 'export const value=1;');
  await assert.rejects(stat(join(root, 'dist/runtime/dist/stale.js')), { code: 'ENOENT' });
});

test('runtime verification rejects modified assets, inventories, provenance, and release pointers', async t => {
  const { root, build } = await fixture(t);
  build();
  const provenance = await verifyRuntime(root);
  const target = join(root, 'dist/runtime');
  for (const name of ['docs/guide.md', 'LICENSE', 'assets/test.wasm']) {
    const path = join(target, name), original = await readFile(path);
    await writeFile(path, 'tampered');
    await assert.rejects(verifyRuntime(root), /inventory or contents differ/);
    await writeFile(path, original);
  }
  await writeFile(join(target, 'dist/extra.js'), 'extra');
  await assert.rejects(verifyRuntime(root), /inventory or contents differ/);
  await rm(join(target, 'dist/extra.js'));
  const path = join(target, 'provenance.json');
  await writeFile(path, JSON.stringify({ ...provenance, integrity: 'different' }));
  await assert.rejects(verifyRuntime(root), /provenance differs/);
  await writeFile(path, JSON.stringify(provenance));
  await writeFile(join(root, 'dist/runtime-version.js'), 'wrong release');
  await assert.rejects(verifyRuntime(root), /release does not match/);
  build();
  await writeFile(join(target, 'releases', provenance.artifactSha256, 'dist/index.js'), 'damaged release');
  await assert.rejects(verifyRuntime(root), /inventory or contents differ/);
  assert.throws(build, /immutable runtime release has changed/);
});

test('runtime identity rejects local dependencies and a mismatched installed package', async t => {
  const { root, source } = await fixture(t);
  await writeFile(join(root, 'package.json'), JSON.stringify({ dependencies: { [packageName]: 'file:runtime.tgz' } }));
  await assert.rejects(installedRuntime(root), /exact registry version/);
  await writeFile(join(root, 'package.json'), JSON.stringify({ dependencies: { [packageName]: '0.2.5' } }));
  await writeFile(join(source, 'package.json'), JSON.stringify({ name: packageName, version: '0.2.3' }));
  await assert.rejects(installedRuntime(root), /Installed runtime differs/);
});

test('artifact identity includes file paths and contents in stable sorted order', async t => {
  const { source } = await fixture(t);
  const original = await artifactManifest(source);
  assert.deepEqual(original.files.map(f => f.path), original.files.map(f => f.path).sort());
  await writeFile(join(source, 'dist/other.js'), await readFile(join(source, 'dist/index.js')));
  await rm(join(source, 'dist/index.js'));
  assert.notEqual((await artifactManifest(source)).artifactSha256, original.artifactSha256);
});
