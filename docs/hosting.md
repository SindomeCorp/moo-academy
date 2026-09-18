# Hosting MOO Academy

The production origin is **https://moo.mudverse.com**. Follow the
[SEO launch checklist](seo.md) for canonical redirects, public indexing checks,
and Search Console setup.

For an existing Ubuntu/Debian Apache server, use the concrete
[Apache, Route 53, and Let’s Encrypt runbook](apache-deployment.md) and the
configuration templates under `deploy/apache/`.

MOO Academy is a static site. Publish the contents of `dist/` to a web server or
static hosting service; no application backend, database service, API keys, or
build-time environment variables are required. Node, npm, and Python are local
development tools, not production services.

## Files and paths

Use `dist/` as the document root. Include all its files and subdirectories,
including `runtime/`, `vendor/`, and `packages/`. Do not publish the repository
root, dependency checkouts, tests, local backups, or `node_modules/`.

The app uses relative asset URLs. It can be served at the site root or under a
directory such as `/academy/`; redirect `/academy` to `/academy/` to retain the
correct base path. Apply the header rules below relative to that deployment
prefix. No SPA fallback is needed: `index.html`, `introduction.html`,
`about.html`, `resources.html`, `contact.html`, and `field-notes.html` are actual files. Missing assets should
return 404 rather than an HTML page with status 200.

Serve over HTTPS for a public deployment. Keep assets on the same origin as the
app. The bundled runtime, parser, and Common Packages data do not require a CDN.

## Content types and caching

Configure your host to serve `.js` as JavaScript (`text/javascript` or
`application/javascript`), `.wasm` as `application/wasm`, `.json` as
`application/json`, and HTML/CSS with their normal content types.

Match the local server's cache policy:

| Files, relative to the site root | `Cache-Control` |
| --- | --- |
| `runtime/releases/<64-character hash>/dist/**`, `assets/**`, and `docs/**` within that same release | `public, max-age=31536000, immutable` |
| Everything else, including HTML, CSS, app modules, `runtime-version.js`, parser assets, and Common Packages JSON | `no-store` |

The three immutable prefixes are all **inside the hashed release directory**;
do not apply that rule to a top-level `assets/` or `docs/` directory. If your host
cannot express the immutable rule, `no-store` for all files is a safe, slower
fallback. Avoid a host-wide rule that caches HTML or application modules.

Enable gzip or Brotli where supported, particularly for JavaScript, JSON, and
WASM. Preserve the original files and use proper `Content-Encoding` and
`Vary: Accept-Encoding` headers for compressed responses. Large Common Packages
data is loaded on demand, so test that experience as well as the first page.

## Manual deployment

1. Select the commit to publish and run the local checks described in
   [Testing](testing.md). Checked-in assets are deployable without rebuilding;
   rebuild only when intentionally refreshing their dependencies.
2. Upload the complete `dist/` tree into a new versioned deployment directory or
   your host's preview/staging deployment. Preserve filenames and relative paths.
3. Apply the content types and cache rules above. Include runtime release
   directories from the previous deployment if they are absent from the new tree.
4. Smoke-test the staged site, then activate the complete deployment atomically
   using your host's release switch or a document-root/symlink switch. Do not copy
   changed application files one at a time over the live document root.
5. Run the smoke checks again at the public URL. Record the deployed commit and
   keep the previous deployment available for rollback.

If the host only supports in-place uploads, use a maintenance window and block
access during the copy. Resume serving only after the full tree is present.

## Updates and rollback

Runtime releases are content-addressed and immutable. Keep older release
directories available: an open tab may still need the JavaScript, WASM, or other
assets belonging to the runtime it originally loaded. Do not routinely deploy
with a deletion option that removes these directories.

Rollback by switching back to the previous complete site deployment. Preserve
the union of its runtime release directories and those from the deployment being
rolled back so tabs opened during either release retain matching assets.

Browser storage belongs to an origin (scheme, hostname, and port), not to the
deployment directory. Changing the origin does not migrate saves. Ask learners
to export worlds and download drafts first. Two copies under different paths on
the same origin share the app's storage namespace; use separate origins for
independent production and preview environments. Never rename legacy storage
keys just because the repository has been renamed.

## Deployment smoke checks

- Open the workspace in a fresh browser context. Confirm the loading notice
  clears, the editor enables, a starter runs, and output appears without console
  errors or failed worker/WASM requests.
- Open Introduction, About, Resources, Contact, and the real-server field notes. Refresh each page
  directly to check paths and navigation.
- Edit a draft, run code, refresh, and confirm the saved state remains. Check
  World inspection, profile switching, and the Common Packages sandbox/reference.
- Inspect response headers for `index.html`, `runtime-version.js`, a hashed
  runtime JavaScript/WASM asset, and Common Packages JSON. Confirm content types
  and cache rules match the table above.
- Check a narrow viewport, and confirm an already-open tab can still run after
  the deployment switch. Verify an unknown asset URL returns 404.

For loading failures, first check missing files, wrong MIME types, incorrect base
paths, and stale cache headers. The local server is useful for comparison:
`python3 scripts/serve.py --port 8000` serves only `dist/` with the intended policy.
