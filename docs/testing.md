# Testing and validation

Run commands from the repository root. Use Node 24, npm, Python 3 (`python3`), and
Git. First run `npm ci` and install the exact grammar checkout documented in the
[README](../README.md#build-and-develop). The upstream fixture test and asset
verification require that checkout even when the bundled app already runs.

```sh
npx playwright install chromium firefox webkit
# Linux hosts may also need system libraries; this can require sudo:
npx playwright install-deps chromium firefox webkit
npm run test:check
```

## Choosing a check

| Command | Purpose |
| --- | --- |
| `npm test` | All Node tests. |
| `npm run test:seo` | Canonicals, metadata, sharing assets, sitemap, and robots policy for all six public pages. |
| `npm run test:assets` | Runtime/parser inventories, hashes, pins, licenses, and Common Packages hashes. |
| `npm run test:browser` | Full Chromium suite and the configured Firefox/WebKit subset. |
| `npm run test:coverage` | Node plus Chromium coverage and per-module gates. |
| `npm run test:check` | Asset verification followed by Node and the complete configured browser matrix with coverage. |

`test:check` already runs the other suites it needs; you do not need to run every
row in sequence. It covers examples, canonical solutions, prepared checkpoints,
grammar acceptance, grading, workspace ownership and recovery, persistence,
profile/world isolation, navigation, and responsive layouts. Passing upstream
grammar fixtures demonstrates syntax acceptance, not complete native-server
semantic compatibility. The runtime has its own upstream contract tests.

Focused development runs:

```sh
node --test tests/workspace-controller.test.mjs
npm run test:browser -- --project=chromium tests/browser/smoke.spec.js
npm run test:browser -- --project=firefox tests/browser/startup.spec.js
```

Playwright starts its own Python server on `127.0.0.1:8017` and refuses to reuse
an existing server. Leave that port free. Its configured default is four workers.
Use `--workers=1` on a constrained machine for a focused browser run.

To select an installed Chromium executable:

```sh
MOO_BROWSER_EXECUTABLE=/path/to/chromium npm run test:browser -- --project=chromium
```

This override does not provide Firefox or WebKit. Install their matching
Playwright binaries for the configured cross-browser checks.

## Coverage and artifacts

The coverage runner combines Node V8 coverage with actual Chromium application
execution. Firefox and WebKit add compatibility checks, not Chromium coverage.
Behavioral modules must each reach **90% lines**, **90% functions**, and **80%
branches**. Designated authored-data modules are reported separately; see
`scripts/test-coverage.mjs` for the exact classification.

Coverage output is in `coverage/`, with an HTML report at `coverage/index.html`.
The coverage runner replaces the previous coverage directory. Browser failures
retain traces and screenshots under `test-results/`; open a trace with:

```sh
npx playwright show-trace /path/to/trace.zip
```

These outputs are ignored. Do not commit them or lower coverage gates to hide a
failure. A `playwright-report/` directory is also ignored if you select the HTML
reporter yourself.

## Reproduce the README screenshot

```sh
npx playwright install chromium
npm run docs:screenshot
```

The capture command starts a temporary loopback server on an available port,
opens a fresh Chromium context at 1440 × 1100, adds the comment requested by the
introductory lesson, waits for a passing objective and saving, and writes
`docs/screenshots/overview.png`. It closes its browser and server afterward.
It supports `MOO_BROWSER_EXECUTABLE` just like the browser tests. Review the PNG
before committing it; screenshot capture is a documentation task, not a test
that rewrites the image during routine validation.

## Troubleshooting and advanced maintenance

- A missing `vendor/tree-sitter-moo/fixtures/valid` or revision error means the
  pinned grammar setup is incomplete. Check out the README's exact commit.
- Asset mismatches can indicate stale copies or a changed dependency. Confirm
  pins, run `npm ci` and `npm run build`, then inspect the changes and retry.
  Never delete `dist/` to fix a build.
- Browser-launch errors usually identify an absent Playwright binary or system
  library. Install the matching browsers and their system dependencies.
- A server startup error may mean port 8017 is occupied or `python3` is missing.
- Reproduce a flaky failure using its individual file and browser project. Read
  the trace and browser errors before retrying the entire suite.

Common Packages regeneration and native ToastStunt comparisons are separate
maintenance tasks. They can download source/database dependencies, start isolated
native processes, and update committed observations. They are not part of the
ordinary test setup; follow [Common Packages](common-packages.md) when changing
that material.

SEO checks also run within `npm test`. Browser SEO scenarios check informational
content without JavaScript, mobile layout, and stable workspace canonicals.
Runtime-package tests reject changed files, provenance, release pointers, and
local dependency replacements, and check deterministic immutable releases.
