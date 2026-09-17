# Common Packages

These assets are already checked in. Ordinary startup and `npm run test:check`
do not require a native ToastStunt server, the original database, or an import
rebuild. The commands below are for maintaining the imported data and lessons;
some regenerate committed files and require reviewing their diffs.

ToastStunt has eleven new utility tracks and a **Common Packages** named sandbox.
The tracks contain 134 guided lessons plus a searchable reference for all 375
utility verb definitions. Aliases share a definition. The reference includes the
original introductory documentation, command argument specifications, source,
inspection examples, guided examples where available, and explicit support labels.
A source-reference entry is not a promise that every input or server dependency
can execute in this educational runtime.

The imported utility objects are #20 (string), #55 (list), #27 (set), #26 (math),
#91 (matrix), #43 (time), #52 (object), #51 (matching), #56 (command), #59 (code),
and #24 (wizard). Corified references, including `$trig_utils`, are preserved.
The dependency closure reaches all 127 objects in this small public core.
Required system-object properties and verbs are retained; unresolved dynamic
references remain in the dependency report. #127 is the synthetic learner and
#128 the workshop. Original #7 and #42 keep their ToastCore identities.

Each utility track has an independent persistent world. Sandbox offers the basic
playground, fresh starting worlds for the existing tracks, and Common Packages.
Every named sandbox has its own world, code draft and evaluated console draft.
The basic playground retains the old sandbox storage key. Profile selections are
remembered separately; Common Packages is only offered for ToastStunt. No old
world is migrated, merged or reset. World switching uses the existing save,
ownership, confirmation and recovery mechanisms.

## String Utils progression

String Utils now has 24 lessons, with guided calls associated with 50 of its 79
source definitions (aliases share definitions). Its first three lesson IDs are
unchanged, preserving progress and saved drafts. Existing drafts still take
precedence over revised starter code; Restore example loads the revised starter.

The sequence moves from trimming, case and splitting through filtering, joining,
quoted command words, character operations, searches, matching, substitutions,
alignment, numeric text, value rendering/parsing, object-aware messages and
helpers that can yield. The final tool-report example combines these skills.
Every lesson has authored steps, labeled `player:tell()` output, an explicit
starter output and an experiment with a stated effect. Collections use
`toliteral()` and formatted rows are printed individually. Starters are compared
with the native pinned core for both output and return value, and all
24 suggested experiments are exercised in the educational runtime.

This is not yet complete String Utils coverage. Further lessons can cover
object/player matching and command parsing, advanced pronoun templates,
screen-adaptive formatting, connection-name handling and binary stripping.
Internal parser/formatting helpers and legacy no-ANSI variants remain available
in Reference without being presented as the preferred public entry points.

See [Lesson authoring](lesson-authoring.md) for the default style for future examples.

## Remaining utility tracks

The ten remaining tracks now have 110 lessons (80 more than their original
three-per-track introductions):

| Track | Lessons | Definitions |
| --- | ---: | ---: |
| List | 12 | 43 |
| Set | 6 | 8 |
| Math | 12 | 40 |
| Matrix | 10 | 28 |
| Time | 7 | 18 |
| Object | 10 | 31 |
| Matching | 6 | 8 |
| Code | 21 | 61 |
| Command | 9 | 17 |
| Wizard | 17 | 42 |

All 296 definitions have reviewed classifications in
`dist/packages/common-packages/coverage.json`: 274 are taught, and 22 internal
or legacy definitions have explicit reference-only reasons. Aliases share a
definition. `covers` declarations link lessons to original source IDs; Reference
links no longer infer coverage by searching starter text. String Utils retains
its existing reviewed associations and scope.

Each track groups related operations progressively and ends with a combined
report or interaction. All 30 original lesson IDs survive. Saved drafts continue
to take precedence; use Restore example to see revised code. Neither utility
source nor saved worlds are migrated or patched.

Source walkthrough lessons run only `verb_code()` inspection in the browser.
They separately show native exercise code, prerequisites, expected results or
effects, and an experiment. Their completion message explicitly says the server
exercise was not executed. Administration, mail, registry and cleanup workflows
require the stated disposable full-core fixtures; a walkthrough is not evidence
that those services ran in the browser. Some historical implementations also have
limitations documented in their lessons (including matrix predicates and the
wizard rename loop). No runtime services were added to hide those differences.

Random choices and clock-dependent values are labeled “Example output (varies)”
and validated with authored bounds or allowed sets instead of fixed samples.
Native direct comparisons cover every browser starter and all 110 new suggested
edits; native-only examples that can finish in emergency mode also have separate
observations. Interactive and recurring workflows use authored expected effects,
not invented deterministic transcripts.

Regenerate and verify curriculum metadata after edits:

```sh
# First complete the import setup under Rebuilding and updating below.
# Use your locally built native ToastStunt executable, not a live server:
export TOASTSTUNT_BINARY=/absolute/path/to/toaststunt/moo
node scripts/common-packages/record-utility-lessons.mjs
node scripts/common-packages/coverage.mjs
node scripts/common-packages/reference.mjs
node scripts/common-packages/native-check.mjs
node scripts/common-packages/live-check.mjs
node scripts/common-packages/live-check.mjs --experiment
```

The recorder accepts an optional lesson-ID substring for a focused recheck.
It compares both returned values and ordered output, and uses a fresh world for
each starter/experiment. The live checker makes a temporary database, binds only
to loopback with outbound networking disabled, connects a synthetic test player,
and verifies actual input, yes/no responses, suspension/tick replenishment,
suspended list operations and escaped multi-line input. It destroys the process
and fixture afterward. It does not run mail delivery or production maintenance.
`live-verification.json` and `live-experiment-verification.json` preserve those
specific transcripts; they do not certify every server branch.

## Rebuilding and updating

Run `npm run build:common-packages`. The build bootstraps the pinned
`moo-code-graph` checkout, installs its lockfile dependencies, downloads and
hash-checks the pinned public database, extracts its source and values, validates,
indexes and resolves dependencies, converts the world and builds the reference.
For an existing clean checkout at the exact pin, set `MOO_CODE_GRAPH_DIR`.
That override skips bootstrapping: first run `npm ci` and `npx tsc` inside the
graph checkout so its dependencies and built API are available.
The extractor version is checked separately because its internal manifest version
is stale. Cache files live under `.cache/common-packages`; the browser uses only
committed assets in `dist/packages/common-packages` and fetches the large world
only when selected.

Pins are in `scripts/common-packages/config.mjs`. Updates are deliberate: change
the commit/hash, rebuild, inspect source and dependency changes, run the unit and
browser suites, then repeat native comparisons. `manifest.json` records source
pins, object inclusion reasons, native decoding notes, world hash, limits and
execution identity. `verbs.json` records a SHA-256 for every imported definition.
The source itself is not rewritten to make it execute.

Native Format 17 numeric permission/preposition fields are decoded directly;
the extractor's human labels are not authoritative. Error values use the native
32-bit enum stored inside a 64-bit union slot. The pinned core's error list has
stale upper bits; decoding preserves the value interpreted by the native server.
No unknown/truncated/redacted imported value is silently replaced.

## Verification and limits

Run `npm test`, `npm run test:assets`, and `npm run test:browser`.
Set `TOASTSTUNT_BINARY` and run `node scripts/common-packages/native-check.mjs`
to compare the guided starters with an isolated native emergency-mode process.
It disables outbound connections, never continues server startup, aborts without
saving, and records the database hash, binary hash and server version alongside
all results. The native database must be present from the import build.

The browser retains unsupported verb source for inspection/export. Calls into
unsupported syntax discard that run and identify the verb. Missing host builtins
still report their existing runtime diagnostic. Regex directional boundaries,
real queued tasks, forked work, networking and complete permission enforcement
are not added by importing a core. The matching and command tracks distinguish
source inspection from a native-server call. The browser's existing five-second
`suspend` cap and other educational limits still apply.

ToastCore source and embedded author attributions come from
https://github.com/lisdude/toastcore at the commit recorded in the manifest.
The import pipeline is based on https://github.com/SindomeCorp/moo-code-graph
and its `@sindomecorp/toaststunt-db-extractor` dependency. See the pinned repository
and original verb comments for upstream provenance.

## Runner performance

The active workspace keeps a single warm worker shared by Code and Eval. Loading
a world starts background parser/verb validation; subsequent runs reuse that
runtime and its source cache. Leaving the workspace disposes it. Each run still
uses fresh task locals and budgets, and synchronizes with the current committed
world. Stop and timeout kill the worker; a later run starts over safely. Runs that
leave the world unchanged do not write another world snapshot to IndexedDB.

The runtime build also emits a content-addressed release directory and
`runtime-version.js`. Only assets under those release directories get immutable
HTTP caching. HTML, lesson data and application modules remain `no-store`.
Old runtime releases remain available so open tabs can finish with matching code
and WASM assets. This trades some idle worker memory and retained release disk
space for faster repeated execution; a cold load still initializes once.
