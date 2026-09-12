---
name: spec-driven-project
description: >-
  Establish a spec-driven project: a specification/ source of truth, a
  Makefile-driven build, and AGENTS.md / VALUES_AND_BELIEFS.md working
  agreements. Use when starting a greenfield project, or when bringing an
  existing repository under spec-first, red-then-green TDD development.
---

# Spec-driven project

Scaffold (or top up) a repository so that development is driven from a written
specification, is Makefile-driven, and follows a spec-first, red-then-green TDD
workflow. The skill is **idempotent**: it only adds what is missing and never
clobbers files that already exist, so it works on both greenfield and existing
(brown-field) repos.

## When to use

- Starting a new (greenfield) project that should be spec-driven from day one.
- Adopting an existing (brown-field) repository under spec-first development
  without destroying what is already there.

## Step 1 — Resolve the project's answers (ask the user)

Before writing any scaffolding you **must** have answers to all four of these.
Where an answer is obvious from an existing repo (e.g. the language, from its
code and manifests), infer it and confirm; otherwise ask. Do not assume.

1. **Language of implementation** — e.g. Go, Python, Node/TypeScript, Rust.
2. **E2E mechanism** — is an end-to-end (browser) test mechanism called for, and
   if so which: **Playwright** or **Puppeteer**? (Or none.)
   - Puppeteer is a Node library, so it pairs with a Node/TypeScript project
     (run via a test framework such as Jest/Vitest/Mocha).
   - For other languages, Playwright offers native bindings and is the usual
     choice.
3. **CI/CD or Makefile-only** — will the repo need CI/CD, or just local
   Makefile targets? If CI/CD is needed, which platform (default: GitHub
   Actions)?
4. **Containerfile** — will the payload application be built as a container
   image? Assume **yes** unless the user says otherwise. If yes, discuss the
   deployment considerations that stem from it (base image and runtime
   dependencies, exposed ports, non-root user, multi-arch, and where the image
   is pushed) and fold them into the `Containerfile` and its Makefile targets.

Record the answers; they drive the Makefile, the `Containerfile`, and
(optionally) the CI workflow.

## Step 2 — Choose the language version (greenfield)

In a greenfield project there is no reason not to target the **most recent
stable** version of the chosen language. But before you recommend it — or write
it into `go.mod`, `pyproject.toml`, `package.json`, `rust-toolchain.toml`, or
the `Containerfile` base image — **validate that there is no minefield ahead**:
check for breaking changes, known release issues, and whether the ecosystem and
tooling you depend on (frameworks, linters, the e2e runner, the container base
image) already support it. If the newest stable release is a minefield, step
back to the most recent version that is safe, and tell the user why. Use web
search to check current release status; do not rely on memory. In a brown-field
project the version is already chosen — skip this step.

## Step 3 — Handle any existing specification scheme (brown-field)

Before scaffolding, look for a specification scheme that already exists in the
repo — for example a `specification/`, `spec/`, or `docs/` folder, a `SPEC.md`,
`*.spec.md` files, or OpenAPI/AsyncAPI documents. If you find one, **do not
silently reorganise or overwrite it.** Instead, prompt the user how they want to
bring it in line with this project's scheme, and offer at least these options:

- **Adopt / migrate** — move and reorganise the existing spec into
  `specification/`, adding the `§` cross-references and the
  `working-with-specification` skill.
- **Keep in place, point at it** — leave the existing scheme where it is and
  adapt the scaffolding (the skill's `specification/` references and the
  `AGENTS.md` pointer) to that location instead.
- **Start fresh** — create `specification/` from the templates and treat the
  existing documents as separate (e.g. reference them from `overview.md`).

Record the user's decision and apply it in Step 4. If no existing scheme is
found (green-field), skip this step.

## Step 4 — Apply the scaffolding idempotently

Work at the target repo root (default: the current working directory; confirm
with the user if it is not obvious). The templates live in `templates/` next to
this `SKILL.md`. For **each** artefact below, check whether it already exists:

- **Absent** → create it from the template, adapting it to the answers and
  decisions gathered in the earlier steps.
- **Present** → **do not overwrite it.** If a required statement or section is
  missing, propose adding it and wait for approval rather than rewriting the
  file.

| Artefact | Template | Purpose |
|---|---|---|
| `specification/` | `templates/specification/` (copy `README.md` + `overview.md`) | The source of truth, organised into sub-folders per domain/feature. |
| `Makefile` | `templates/Makefile.<lang>` | Makefile-driven build/test/lint (and conditional `e2e`). See "Adapting the Makefile". |
| `AGENTS.md` | `templates/AGENTS.md` | Working agreements; makes the `working-with-specification` skill mandatory. |
| `.agents/skills/working-with-specification/SKILL.md` | `templates/.agents/skills/working-with-specification/SKILL.md` | How to work with the spec: source of truth, `§` convention, spec-first red-then-green TDD. |
| `VALUES_AND_BELIEFS.md` | `templates/VALUES_AND_BELIEFS.md` | The values and beliefs behind the rules. |
| `Containerfile` *(only if a container is required — assume yes)* | `templates/Containerfile` | Builds the payload application as an image; used via the `image*` Makefile targets. |
| CI workflow *(only if CI/CD is needed)* | `templates/ci/github-actions.yml` | A thin pipeline that calls the Makefile targets. |

After applying, report exactly what you created and what you left in place.

## Step 5 — Agree the initial specification with the user

The `specification/overview.md` you create is a **proposal**, not a finished
document. Draft its Purpose, Scope, and Non-goals from what the user has told
you the project is, then **present it to the user and ask whether anything
needs rectifying** before any implementation begins. Spec-driven development
requires the human to actively participate in the specification — do not treat
the first draft as settled.

- **Hold the user's hand; don't stamp a file.** Presenting the spec is a live
  conversation, not writing a file marked `status: proposal` and moving on.
  Walk through it together and revise until you are both ready to commit.
- The ongoing per-change loop (specify → agree with the human → implement) is
  defined by the `working-with-specification` skill.

### Specifying a whole project (or any multi-change effort)

The overview is the agreed frame of the project. If the user also wants the
specification for the **whole project** — or any other effort spanning several
specification changes — laid out now, do **not** write it all into
`specification/`: the specification must never be ahead of the implementation,
and at this point the implementation is (still) empty. Instead, follow the
*proposed specification changes* workflow defined by the
`working-with-specification` skill:

1. Draft the **proposed specification changes** — one per coherent slice of
   behaviour, each stating the exact specification text that will land in
   `specification/` and what the implementation must do to satisfy it.
2. Detail a **plan** — the ordered sequence in which the proposed changes will
   be implemented, with the dependencies and reasoning behind the order.
3. **Present the plan and the proposed changes to the user** and revise them
   together until both are agreed.
4. **Give the user the choice** of how the proposed changes are carried:
   - **Chained issues (preferred)** — one issue per proposed change, raised in
     order and chained so the sequence can be followed; the issue body is the
     authoritative ask. Optionally label the issues for agentic auto-merge (for
     example the `agentic-auto-merge` label) so the chain can be driven
     autonomously.
     - **End-state issue** — the chain ends in an issue that is blocked by
       **all** of the previous issues. Raise it **first**, and have it describe
       the state the project should have arrived at once the chain is resolved.
       Every other issue in the chain references that end-state issue in its
       body — beyond blocking it, issue-wise.
   - **A separate folder** — for example `specification-proposed/`, outside
     `specification/`, clearly marked as not yet authoritative.

Either way, a proposed change enters `specification/` only in the same change
that implements it — never before.

## Adapting the Makefile

There is one concrete Makefile per supported language: `templates/Makefile.go`,
`Makefile.python`, `Makefile.node`, `Makefile.rust`. Each already exposes the
standard targets — `all`, `build`, `test`, `lint`, `clean` — plus an `e2e`
target and the container targets (`image`, `image-run`, `image-clean`).

- **Green-field (no Makefile):** copy the Makefile for the chosen language to
  `Makefile`. If no e2e mechanism is called for, delete the `e2e` target; if a
  specific mechanism is chosen, set its command to match (see the comment in the
  file).
- **Brown-field (a Makefile already exists):** do **not** copy over it.
  **Merge** instead — keep the repo's existing targets and behaviour, and make
  sure the Makefile exposes the same standard targets this project relies on
  (`build`, `test`, `lint`, `clean`, `e2e` if called for, and the `image*`
  targets if a container is required). Add any that are missing, using the
  language Makefile as a reference for the command. If an
  existing target does something different from what is outlined here, flag it
  and ask rather than changing it.

For an unsupported language, take the closest language Makefile as a model,
choose the idiomatic build/test/lint/clean commands, and keep the same target
names.

## Containerfile

If a container is required (assume it is — see Step 1), create `Containerfile`
from `templates/Containerfile`, adapting it to the chosen language, the version
you validated in Step 2, and the deployment considerations you discussed with
the user (base image, runtime dependencies, exposed ports, non-root user,
multi-arch, push registry). The Makefile exposes targets for it: `make image`
(build), `make image-run` (run), and `make image-clean` (remove). Keep the build
podman-centric. If the user decides no container is needed, omit the
`Containerfile` and drop the `image*` targets.

## CI/CD

If CI/CD is needed, create the workflow from `templates/ci/github-actions.yml`
(GitHub Actions by default; adapt to the user's platform). Keep it **thin**:
install the toolchain, then call the Makefile targets (`make build`, `make test`,
`make lint`, and `make e2e` if present). The Makefile stays the single source of
build/test logic — do not duplicate it in the pipeline. If CI/CD is *not*
needed, create no workflow; the Makefile targets are the whole story.

## The `§` reference convention

The specification cross-references itself (and is referenced from `AGENTS.md`,
commits, and code) with:

    §<relative-path>/<heading-or-anchor-slug>

The `<relative-path>` is the file's path relative to `specification/` without
its `.md` extension — it may contain `/` to reach sub-folders, so the convention
supports a tiered specification. The final `/` separates the path from the
heading slug (which never contains `/`). The full convention, with examples,
lives in the `working-with-specification` skill and is copied into the project
at `.agents/skills/working-with-specification/SKILL.md`.
