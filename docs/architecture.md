# Technical overview

MOO Academy is authored HTML, CSS, and browser ES modules under `dist/`. A Python
development server serves those files; production needs only static hosting.
There is no app bundling step. Build scripts copy pinned parser/runtime artifacts
and preserve their licenses and provenance.

## Execution and curriculum

The editor uses the shipped Tree-sitter MOO WASM parser for syntax diagnostics.
MOO execution happens in a dedicated worker using the pinned moo-in-javascript
runtime. The main page coordinates the active profile, lesson, saved world, and
result display. Exercise probes use separate prepared worlds so grading does not
mutate the learner's workspace.

| Modules in `dist/` | Responsibility |
| --- | --- |
| `app.js`, `workspace-controller.js` | UI orchestration, execution, and workspace transitions. |
| `curriculum.js`, `lessons.js`, `*-lessons.js` | Tracks, examples, projects, and profile-specific learning material. |
| `checkpoints.js`, `course-checks.js` | Canonical starting worlds and observable project checks. |
| `assessment.js`, `behavior.js` | Structural and scenario assessment. |
| `workspace-storage.js` | IndexedDB persistence, ownership, and recovery. |
| `world-browser.js` | Object hierarchy, containment, properties, and verbs. |
| `builtin-support.js` | Learner-facing builtin limitations. |
| `runtime-version.js`, `runtime/releases/` | Active runtime pointer and immutable dependency releases. |
| `packages/common-packages/` | Pinned imported world, reference data, and provenance. |

Each guided track has prepared checkpoints built from earlier canonical examples
and solutions. They are independent of learner drafts. Ordinary navigation keeps
the current world; loading a lesson's checkpoint is an explicit replacement with
confirmation. Builtin examples are independent prepared examples, rather than a
single long sequential project. The active world still persists between runs.

Workers stay warm for repeated execution of the current committed world. Stop or
timeout terminates unfinished work; a later run initializes again. Completed runs
and controlled runtime errors can commit changes made before completion/error.
Runs that leave the world unchanged avoid writing another world snapshot.

## Profiles and simulation

ToastStunt is the default. LambdaMOO changes execution and filters the curriculum.
Neither educational profile is a complete native MOO server. The UI and runtime
reference label mocked, simulated, limited, and fixed-return operations.

Virtual files, connection queues, listeners, logs, and checkpoints live in saved
host state. Outbound connections and operations such as curl/exec/getenv use
configured fixtures; they do not launch processes or contact external services.
SQLite executes locally with documented limits. Permissions, command dispatch,
and scheduling do not reproduce full native-server behavior. Some utility lessons
inspect original source in the browser and separately describe a real-server
exercise; inspection does not establish that the server exercise executed.

Consult the bundled [host simulation documentation](../dist/runtime/docs/host-simulation.md),
in-app Reference, [field notes](../dist/field-notes.html), and
[Common Packages](common-packages.md) for the boundaries of individual operations.

## Persistence and compatibility

The IndexedDB database remains **`moo-field-manual-workspace`, version 1**. This
legacy name and the legacy draft-export identifier intentionally survive the
MOO Academy rename. Do not rename them as repository cleanup.

Worlds and drafts use the existing `world` and `drafts` stores:

- First steps retains legacy world keys `current` (ToastStunt) and `lambdamoo`.
- Other track worlds use `path:<profile>:<path-or-sandbox>` namespaces. Named
  sandboxes extend that scoping; the basic playground retains its legacy key.
- First steps keeps legacy draft keys. Other lesson drafts use
  `path:<profile>:<path-or-sandbox>:<lesson-id>` scoping. Legacy builtin and sandbox
  drafts remain readable until replaced by scoped drafts.
- Old shared worlds are preserved under First steps; other tracks and sandboxes
  start independently. Existing completion IDs remain; progress is shared between
  profiles, while worlds and drafts are separate.

Code drafts save while editing. Eval saves when run; recovery downloads can also
include unrun local Eval text. Returning to a track restores its selection and
drafts. Revised examples never silently replace existing learner drafts.

## Ownership and recovery

A transactional writer lease fences writes from older tabs. Context switching
flushes pending writes before proceeding; a failed save blocks the switch. Handoff
waits for pending saving before releasing ownership. If a browser kills a page
before its final transaction finishes, another tab may wait for the existing
five-second lease expiry. Changes also flush when the document becomes hidden.

Storage failures can fall back to explicit session-only state. Corrupt saves are
retained for recovery/download instead of silently overwritten. Unsaved work
triggers a leave-page warning, including after write ownership is lost.

World export preserves runtime objects and properties. Import validates a
snapshot before replacing only the active world. Download drafts produces a
separate versioned JSON file containing the tab's known drafts and unrun Eval
inputs. It is for copying code back into an editor, not for world import. Both
downloads remain available after a tab loses write access.

Hosting changes must preserve assets for already-open tabs and account for
origin-scoped saves. See [Hosting](hosting.md) for deployment and rollback.
