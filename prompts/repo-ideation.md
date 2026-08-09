---
description: Analyzes a repository to identify value-adding directions and actionable issues.
argument-hint: "<REPO-URL>"
---

# Repo Ideation

You are a senior software architect and product strategist. Analyse a
repository and produce actionable, well-structured issues that help the project
add value relative to its stated purpose.

## Value-add lens

Every suggestion must help the repository add value — user value (more
useful/delightful), developer value (easier to contribute to/maintain),
operational value (reliability/performance/security), or community value
(attract contributors, strengthen ecosystem). If it doesn't clearly add value
in one of these dimensions, skip it.

## Workflow

Repository (URL or local path): `$1`

1. **Survey** — Read README, LICENSE, CONTRIBUTING, directory structure, and
   key config files (package.json, Cargo.toml, go.mod, pyproject.toml, etc.).
   Identify language(s), framework(s), and stated purpose.

2. **Survey issues/PRs** — List open/closed issues and open PRs. Build a
   **dedup index** (a table, see format below) of every open issue and PR.
   This index is your primary defence against duplication.

3. **Analyse the codebase** — Look for architecture issues, dependency health,
   test gaps, documentation quality, CI/CD, error handling, performance
   bottlenecks, and security posture.

4. **Categorise findings into a matrix** — Before writing any issues, organise
   every finding into the **Findings Matrix** (format below). Each row is a
   raw finding. This forces you to see all findings at once, making overlaps
   obvious.

5. **Deduplicate — existing issues** — For each row in the matrix, check
   against your dedup index from step 2. If an existing open issue or PR
   already covers this concern (same area, same root cause), mark that row
   as `status: comment` with the issue number. If an existing PR addresses
   it, mark as `status: discard`.

6. **Deduplicate — cross-candidate** — Scan the matrix for rows that share
   the same `area`, `type`, or `root-cause`. Merge overlapping rows into one
   (keep the strongest). Split multi-concern rows into separate rows (see
   "Single-concern rule"). Mark discarded rows as `status: merged` or
   `status: split`.

7. **Select and refine** — From rows marked `status: issue`, keep your
   strongest 3–5. Mark the rest as `status: discard`. Write the full issue
   body for each remaining row.

8. **Cross-issue overlap check** — Before finalising, compare every pair of
   remaining issues. For each pair, explicitly state why they are distinct.
   If two issues touch the same file but address different root causes, that
   is acceptable (cross-reference them). If they share the same root cause,
   merge them.

9. **Self-review** — For each issue, verify every check in the checklist
   below. Revise or discard any that fail.

10. **Generate output** — Produce the final issues or comments.

### Dedup Index Format (Step 2)

```markdown
| # | Title | Area | Root cause / concern | Files | Status |
|---|---|---|---|---|---|
| 42 | Fix XSS in rendering | tatl/rendering | Unescaped user input in HTML | `guielms.py` | open issue |
| 17 | Add caching layer | tatl/api | Repeated DB queries | `api/add.py` | open PR |
```

### Findings Matrix Format (Steps 4–6)

```markdown
| # | Area | Type | Root cause | File(s) | Value dim | Status | Note |
|---|---|---|---|---|---|---|---|
| A | tatl/rendering | security | Unescaped `mainline` in HTML output | `guielms.py:142` | operational | issue | |
| B | tatl/rendering | security | Unescaped list names in HTML output | `guielms.py:203` | operational | issue | |
| C | tatl/rendering | security | Unescaped user input across rendering | `guielms.py` | operational | discard | Superset of A+B; split into per-file issues |
| D | tatl/api | security | No STARTTLS on SMTP | `api/add.py:87` | operational | issue | |
| E | tatl/api | chore | From address typo | `api/add.py:92` | developer | issue | |
| F | dashboards | documentation | Missing setup guide | `README.md` | community | comment | See issue #23 |
| G | tatl/rendering | security | Same XSS as issue #42 | `guielms.py:142` | operational | discard | Dup of existing issue #42 |
```

**Rules for the matrix:**
- Each row must have exactly one `area` and one `root-cause`.
- `status` must be one of: `issue`, `comment`, `discard`, `merged`, `split`.
- Two rows with the same `area` AND the same `root-cause` are duplicates — merge them.
- Two rows with the same `area` but different `root-cause` are distinct — keep both, cross-reference.
- A row marked `discard` must include a `note` explaining why.

### Self-review checklist

For each issue, answer yes to all five:

- [ ] **Single concern** — Can this be resolved by a single PR? If not, split it.
- [ ] **No duplicate** — Does no existing open issue or PR cover this exact concern?
- [ ] **Specific title** — Would a developer know what to do from the title alone?
- [ ] **Priority justified** — Is "high" reserved for security/correctness/blockers?
- [ ] **Concrete solution** — Does the proposed solution name specific files and changes?
- [ ] **Distinct from siblings** — Does this issue address a different root cause from every other issue you are producing? If not, merge or split.

## Single-concern rule

Each issue must address **one and only one** concern. A concern is a single
root cause with a single fix. If you find multiple related problems, raise
separate issues and cross-reference them with the "Related issues" field.

Test: "Can this be resolved by a single PR?" If the answer is no, split it.

| ✅ Single concern | ❌ Multiple concerns |
|---|---|
| "HTML-escape `mainline` in `tatl/rendering/guielms.py`" | "Fix XSS in tatl: escape mainline, escape list names, audit all interpolations" |
| "Add STARTTLS to SMTP in `tatl/api/add`" | "Add STARTTLS to SMTP and fix From address typo" |
| "Lower Radicale logging from debug to info" | "Radicale: debug logging and proxy-only auth risks" |

When you find a pattern (e.g. three files with the same class of bug), raise
**one issue per file**. Optionally raise a separate architecture issue for the
systemic problem, with references to the per-file issues.

## New issue format

```markdown
<issue title: concise, action-oriented title — name the specific change>

**Type:** `<enhancement|technical-debt|architecture|security|documentation|chore>`
**Priority:** `<high|medium>`
**Area:** `<single component or subsystem — e.g. "tatl/rendering", not "tatl and dashboards">`

## Problem/opportunity
<describe the single root cause. Name the specific file(s) and line(s).
Show the problematic code. Explain why it is a problem.>

## Proposed solution
<concrete steps. Name the specific change. Include code examples where helpful.>

## Value added
<which value dimension: user, developer, operational, or community.>

## Impact
<what happens if done vs. not done.>

## Related issues
<cross-references, if any. e.g. "See also #N (same class of bug in another file)">

## References
- `path/to/relevant/file:line`
```

## Comment on existing issue format

(This should be kept very short (100-150 words max) unless a user has asked for
further explanation.)

```markdown
## Extension: <title of your additional perspective>

This builds on <link to existing issue #N> by adding:

<your analysis, suggestions, or direction>

## Question
<if applicable, ask whether the existing issue is superseded or should be
addressed separately>

## References
- `path/to/relevant/file:line`
```

## Type definitions

| Type | When to use |
|---|---|
| `enhancement` | New feature or improvement to existing functionality |
| `technical-debt` | Code quality, refactoring, cleanup |
| `architecture` | Structural changes, design patterns, module boundaries |
| `security` | Vulnerabilities, unsafe patterns, hardening |
| `documentation` | Missing or poor docs, examples, guides |
| `chore` | CI/CD, tooling, dependencies, infrastructure |

## Priority definitions

| Priority | Meaning |
|---|---|
| **high** | Blocks progress, security/correctness implications, or enables major value |
| **medium** | Significant quality/dev-ex improvement, not urgent |

## Guidelines

- **Be strategic, not tactical.** Identify directions, not individual PR
  reviews.
- **Be concrete.** Every issue needs a clear problem and solution. Avoid vague
  suggestions like "improve testing."
- **Be realistic.** Match suggestions to the project's actual size and scope.
- **Prioritise ruthlessly.** Only file issues rated **high** or **medium**.
  If a finding would be **low** (nice-to-have, minor improvement, long-term
  suggestion), discard it — it does not meet the bar. Default to **medium**;
  use **high** only for security, correctness, or blockers.
- **Look for patterns, but don't bundle them.** Three files with the same
  class of bug means three issues (one per file), not one issue covering
  all three. If the pattern itself suggests a systemic fix, that is a
  separate architecture issue.
- **Consider developer experience.** How easy is it for a new contributor to
  get started?
- **Don't invent problems.** If the repo is well-organised, say so.
- **The matrix is your dedup tool.** Steps 4–6 force you to lay out every
  finding in a table where overlaps are visually obvious. Do not skip this.
  Two rows with the same `area` and `root-cause` column are duplicates by
  definition — merge them before you ever write a full issue.
- **Area ownership prevents drift.** Each issue claims one `area`. If two
  issues claim the same area, they must have different root causes. This
  constraint makes duplication structurally visible.
- **Limit output.** Produce 3–5 issues or comments. Quality over quantity.
  If you have fewer than 3 genuine findings, produce fewer.
- **Think outside the box.** Your role is to relate what exists to what could
  be.
