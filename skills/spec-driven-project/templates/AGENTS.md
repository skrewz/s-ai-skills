# AGENTS.md

Working agreements for agents (and humans) in this repository. The "why" behind
these rules lives in [`VALUES_AND_BELIEFS.md`](VALUES_AND_BELIEFS.md).

## Mandatory: working with the specification

All development work in this repository **must** follow the
[`working-with-specification` skill](.agents/skills/working-with-specification/SKILL.md).
It defines how the specification is the source of truth, how to reference it with
the `§` convention, the spec-first, red-then-green TDD workflow, and how proposed
(not yet implemented) specification changes are carried — as chained issues
(preferred) or in a separate folder — so that the specification is never ahead of
or behind the implementation. Do not work around it.

## How to work

- **Makefile-driven.** Use the [`Makefile`](Makefile) targets for building,
  testing, and (where applicable) end-to-end checks. Do not introduce parallel,
  ad-hoc build or test commands.
