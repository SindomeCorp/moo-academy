import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, rename, rm, writeFile, stat } from 'node:fs/promises';
import { artifactManifest, installedRuntime, runtimePointer, shippedPaths } from './runtime-package.mjs';

const { source, provenance } = await installedRuntime();
const target = 'dist/runtime';
await mkdir(`${target}/releases`, { recursive: true });
const release = `${target}/releases/${provenance.artifactSha256}`;
let exists;
try { await stat(release); exists = true; } catch (error) { if (error.code !== 'ENOENT') throw error; }
if (exists) {
  // Never rewrite an immutable release, including one with damaged contents.
  assert.deepEqual(await artifactManifest(release), {
    artifactSha256: provenance.artifactSha256, files: provenance.files,
  }, 'Existing immutable runtime release has changed');
} else {
  const temporary = await mkdtemp(`${target}/releases/.staging-`);
  try {
    for (const path of shippedPaths) await cp(`${source}/${path}`, `${temporary}/${path}`, { recursive: true });
    assert.deepEqual(await artifactManifest(temporary), {
      artifactSha256: provenance.artifactSha256, files: provenance.files,
    });
    await rename(temporary, release);
  } finally { await rm(temporary, { recursive: true, force: true }); }
}
// Replace only generated dependency copies, never the authored dist/ site.
for (const path of shippedPaths) {
  await rm(`${target}/${path}`, { recursive: true, force: true });
  await cp(`${release}/${path}`, `${target}/${path}`, { recursive: true });
}
await writeFile(`${target}/provenance.json`, JSON.stringify(provenance, null, 2) + '\n');
await writeFile('dist/runtime-version.js', runtimePointer(provenance.artifactSha256));
console.log(`Bundled ${provenance.package}@${provenance.version} (${provenance.artifactSha256}).`);
