# Contributing to MOO Academy

Bug reports, lesson improvements, and focused pull requests are welcome. Use
[GitHub issues](https://github.com/SindomeCorp/moo-academy/issues) to discuss a large
curriculum or runtime change before implementing it. Include the lesson and track,
runtime profile, browser, steps to reproduce, and expected versus actual results
when reporting a problem. Share a minimal example instead of personal saved work.

## Development workflow

1. Follow the [README setup](README.md#build-and-develop), including the pinned
   grammar checkout and Playwright browsers when running tests.
2. Make a focused change. The authored app lives in `dist/`; edit it directly.
   Do not remove that directory or introduce a build that overwrites authored files.
3. Run the relevant focused tests while developing, then `npm run test:check`
   before proposing the change. See [Testing](docs/testing.md).
4. Explain the problem, resulting behavior, and validation in the pull request.
   Include a screenshot when changing visible behavior and update affected docs.

There is no CI/CD workflow. Run checks locally and report their results. Test
artifacts, dependency checkouts, local databases, and caches stay out of commits.
Keep bundled assets, provenance, notices, and the pinned runtime tarball tracked.

## Lessons and compatibility

Read [Lesson authoring](docs/lesson-authoring.md) before changing examples. Prefer
progressive steps, labeled output, and an experiment with an explained effect.
Update examples, expected output, exercises, and tests together.

Keep lesson IDs and saved drafts compatible. Do not reset a learner's world during
ordinary navigation or overwrite drafts with revised starter code. Validate both
profiles where a lesson supports them. Prepared checkpoints must follow canonical
solutions, not learner code. Preserve the distinction between browser execution
and native-server walkthroughs.

For utility lessons, follow the provenance and native-verification requirements in
[Common Packages](docs/common-packages.md). Do not modify imported source just to
make an example execute. Native tools are optional for routine app development,
but required when re-recording the observations those lessons depend on.

## Dependencies and public docs

Dependency updates are deliberate: change the pin and lockfile, rebuild bundled
assets, review generated changes and notices, then run validation. Retain older
content-addressed runtime releases so already-open tabs can still fetch their
matching assets. See [Hosting](docs/hosting.md#updates-and-rollback).

Keep machine-specific paths, historical handoffs, and local deployment metadata
out of public documentation. Preserve upstream licenses and attribution. Changes
to original project code and content use the project's [MIT License](LICENSE).
