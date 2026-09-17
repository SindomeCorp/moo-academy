# Third-party notices

The root [MIT License](LICENSE) covers original MOO Academy code and learning
content. It does not replace the licenses or author attributions of bundled
dependencies and imported source.

This product includes software developed or owned by Caldera International, Inc.

| Material | License, notices, and provenance |
| --- | --- |
| Bundled moo-in-javascript runtime and its dependencies | [Runtime LICENSE](dist/runtime/LICENSE), [third-party notices](dist/runtime/docs/third-party-notices.md), and [package provenance](dist/runtime/provenance.json). Copies also accompany immutable runtime releases. |
| Tree-sitter MOO parser | [Parser license](dist/vendor/tree-sitter-moo.LICENSE) and [pinned revision/hash](dist/vendor/provenance.json). |
| web-tree-sitter | [Runtime loader license](dist/vendor/web-tree-sitter.LICENSE). |
| Imported ToastCore world and utility verb source | [Import manifest](dist/packages/common-packages/manifest.json), original source and embedded attributions in [verbs.json](dist/packages/common-packages/verbs.json), and [import documentation](docs/common-packages.md). |

ToastCore is imported from the upstream repository and exact commit recorded in
the manifest. Preserve original source, embedded notices, and author attribution
when copying or regenerating it. The Common Packages import documentation links
the upstream source and extraction tools and describes what is retained.

Build scripts copy dependency licenses alongside their browser assets. Keep those
files in source control and in the published static site. npm development tools
retain their own package licenses; see the lockfile and installed packages.
