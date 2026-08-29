# specification/

This folder is the **source of truth** for the project. The implementation
follows the specification, never the reverse.

## Structure

- `overview.md` — the top-level specification: purpose, scope, non-goals, and a
  table of contents that links into the sub-folders below.
- **Sub-folders** — one per domain or feature (for example `authentication/`,
  `billing/`). Each sub-folder holds one or more specification files for that
  area. Create a sub-folder when a distinct area of behaviour emerges.

Keep the specification **slim**: it should describe *what* is required and
*why*, not *how* the code is organised. Trim it when it drifts.

## How to work with it

How to reference the specification (the `§` convention), the source-of-truth
rules, and the spec-first, red-then-green TDD workflow are defined by the
mandatory [`working-with-specification` skill](../.agents/skills/working-with-specification/SKILL.md).
