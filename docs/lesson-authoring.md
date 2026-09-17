# Lesson examples

Prefer short, progressive examples that show each operation with a labeled
`player:tell()` line. A learner should be able to connect a line of code to a
line of output and change one input without unpacking an anonymous result list.
Group related verbs into a lesson when comparing them helps explain their use.

```moo
text = "the tools of MOO";
player:tell("Original text: ", text);
player:tell("UPPERCASE example: ", $string_utils:uppercase(text));
player:tell("LOWERCASE example: ", $string_utils:lowercase(text));
```

- Introduce inputs in named variables. For a pipeline, compute and print each
  stage before moving to the next. Avoid dense, nested calls when intermediate
  names would help learners edit the code.
- Print strings directly. Use `toliteral()` for lists, maps, error values, or
  strings whose spaces/quoting are part of the lesson. Do not pass collections
  directly to `tell()` and expect their contents to be displayed.
- Give comparison results meaningful labels, including the verb or operation.
  For formatted tables, print a heading followed by one row per `tell()` call
  so the layout remains visible.
- Distinguish printed output from a returned value. An example with no explicit
  `return` finishes with `0`; explain that once when introducing this style.
  Keep explicit returns when the return contract itself is the lesson, or when
  an existing exercise's behavior checks require one.
- Author `expectedOutput` as the exact ordered lines, along with `expected` for
  the return value. Update prose, steps, experiments and Reference examples to
  match what the learner actually sees. Show the expected effect of the edit.
- Validate both outputs and return values. Common Packages examples must match
  the pinned native ToastCore, using the same learner `tell()` fixture; retain
  the imported utility source unchanged. Test the suggested edits too.
- Preserve lesson IDs, saved drafts, completion rules and separate worlds.
  Revised examples are loaded with Restore example, not by overwriting drafts.

This is the default style for future comparison and demonstration lessons.
The 24 String Utils lessons implement it. Other existing tracks can adopt it
as they are revised, while retaining meaningful return-value exercises.

## Utility lesson metadata

For expanded utility tracks, use `courseLesson()` with explicitly reviewed
`covers` source-definition indexes, related verbs, a concrete editable input,
and `edit(from, to, expectedEffect)`. Finish each track with a combined exercise.
Every definition must have a lesson or a reason in that track’s exclusions;
never infer coverage from code text. Preserve existing lesson IDs.

Use browser execution only for verified inputs. For a native-only path, supply
`server.names`, `server.prerequisites`, native exercise code and its experiment.
The generated browser code inspects those original definitions without running
the native exercise. Live input, recurring jobs and administrative workflows
must set `server.manual` and an explicit `expectedEffect`; they must not display
an unobserved fixed return/output as if verified. Native-comparable server
examples get separate starter/experiment observations. Declare `outputChoices`
for random/time-dependent output and explain its variation.

Regenerate the observations, coverage and Reference with the commands in
[Common Packages](common-packages.md), then check both output and return values.
Do not change original imported source to make an example pass. Verify fixture
permissions, quota provisioning and execution context before attributing a
failure to ToastCore. The supported browser inputs do not certify all paths of
a public verb.

### Native observation freshness

`node scripts/common-packages/record-utility-lessons.mjs [lesson-id-filter]` is an
explicit re-record operation for expanded utility courses. Review output changes.
It records source, fixture, database, runtime package, and native binary hashes,
and replaces the observations file atomically only after every selected lesson
passes. `node scripts/common-packages/native-check.mjs` verifies current observations
and re-executes automated starters, edits, and real-server exercises; it does not
silently refresh mismatched expected values. Routine unit tests reject stale source
or fixture hashes. Manual service exercises remain explicitly unverified by this
command. Provide `experimentOutputChoices` for narrower edited random bounds and
`experimentDelta` for a promised numeric change; avoid treating broad sample ranges
as proof that an experiment had its intended effect.
