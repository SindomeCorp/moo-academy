import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, lstat } from 'node:fs/promises';
import { join } from 'node:path';

export const packageName = '@sindomecorp/moo-in-javascript';
export const shippedPaths = ['dist', 'assets', 'LICENSE', 'docs'];
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

// Paths and bytes, rather than mtimes or archive packaging, define a release.
export async function artifactManifest(directory) {
  const paths = [];
  async function visit(relative) {
    const path = join(directory, relative);
    const stat = await lstat(path);
    if (stat.isDirectory()) {
      for (const name of (await readdir(path)).sort()) await visit(`${relative}/${name}`);
    } else {
      assert.ok(stat.isFile(), `Runtime artifacts must be regular files: ${path}`);
      paths.push(relative);
    }
  }
  for (const path of shippedPaths) await visit(path);
  const files = [];
  for (const path of paths.sort()) files.push({ path, sha256: hash(await readFile(join(directory, path))) });
  return { artifactSha256: hash(JSON.stringify(files)), files };
}

export async function installedRuntime(root = '.') {
  const source = join(root, 'node_modules', packageName);
  const [project, lock, metadata] = await Promise.all([
    json(join(root, 'package.json')), json(join(root, 'package-lock.json')),
    json(join(source, 'package.json')),
  ]);
  const dependency = project.dependencies[packageName];
  const entry = lock.packages[`node_modules/${packageName}`];
  assert.equal(metadata.name, packageName);
  assert.match(dependency, /^\d+\.\d+\.\d+$/, 'Runtime must use an exact registry version');
  assert.equal(metadata.version, dependency, 'Installed runtime differs from the dependency pin');
  assert.equal(entry.version, dependency, 'Lockfile runtime differs from the dependency pin');
  assert.equal(lock.packages[''].dependencies[packageName], dependency);
  assert.equal(entry.resolved, `https://registry.npmjs.org/${packageName}/-/moo-in-javascript-${dependency}.tgz`);
  assert.match(entry.integrity, /^sha512-[A-Za-z0-9+/]+={0,2}$/);
  assert.ok(!project.dependencies['moo-in-javascript'] && !lock.packages['node_modules/moo-in-javascript'], 'Remove the legacy runtime dependency');
  return {
    source,
    provenance: {
      package: packageName, version: metadata.version, dependency,
      resolved: entry.resolved, integrity: entry.integrity,
      ...await artifactManifest(source),
    },
  };
}

export async function verifyRuntime(root = '.') {
  const { provenance } = await installedRuntime(root);
  const target = join(root, 'dist/runtime');
  assert.deepEqual(await json(join(target, 'provenance.json')), provenance, 'Runtime provenance differs from installed package/lockfile');
  for (const directory of [target, join(target, 'releases', provenance.artifactSha256)]) {
    assert.deepEqual(await artifactManifest(directory), {
      artifactSha256: provenance.artifactSha256, files: provenance.files,
    }, `Runtime file inventory or contents differ: ${directory}`);
  }
  const pointer = await readFile(join(root, 'dist/runtime-version.js'), 'utf8');
  assert.equal(pointer, runtimePointer(provenance.artifactSha256), 'Active runtime release does not match provenance');
  return provenance;
}

export function runtimePointer(digest) {
  return `// Generated runtime release. Application modules remain uncached.\nexport const runtimeBase='./runtime/releases/${digest}';\n`;
}
