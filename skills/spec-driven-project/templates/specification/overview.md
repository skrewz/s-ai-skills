# Overview

The top-level specification. It states what the project is, what it is not, and
links into the per-area specification files in the sub-folders below.

## Purpose

_What does this project do, and for whom? One or two sentences._

## Scope

_In-scope behaviour, stated concretely. Each bullet should be something that can
later be turned into a test._

- _…_

## Non-goals

_Explicitly out of scope. Listing non-goals keeps the specification slim and
holds back scope creep._

- _…_

## Structure

The specification is organised into sub-folders, one per domain or feature. Add
a row (and a sub-folder) as each area is specified. References use the `§`
convention — see the `working-with-specification` skill.

| Area | Specification | Notes |
|---|---|---|
| _example: authentication_ | `§authentication/session/sessions` | _…_ |

## References

- [`../AGENTS.md`](../AGENTS.md) — working agreements; makes the
  `working-with-specification` skill mandatory.
- [`../VALUES_AND_BELIEFS.md`](../VALUES_AND_BELIEFS.md) — the values and beliefs behind the rules.
- [`README.md`](README.md) — the structure of this folder.
