---
name: forgejo
description: "Raise Pull Requests against Forgejo repos"
---

# Forgejo Pull Request (fj)

## Prerequisites

`fj` (Forgejo CLI) **must be installed**. Fail immediately if it's not found:

```bash
command -v fj >/dev/null || { echo "ERROR: fj CLI not found. Install it before raising PRs."; exit 1; }
```

## When to use

Inspect the git remote URL. If it contains `forgejo`, use this skill. Otherwise, skip.

```bash
git remote get-url origin | grep -qi "forgejo" && echo "Forgejo detected — use fj skill"
```

## Raise a PR

```bash
cd <repo-dir>
git checkout -b <branch-name>
# ... make changes ...
git add .
git commit -m "<commit message>"
git push -u origin <branch-name>

fj pr create --repo <owner>/<repo> "<title>" --body "<body>" --head <branch-name> --base <base-branch>
```

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format for all commits:

```
<type>(<scope>): <description>

[optional body]
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Examples:
- `feat(readme): add usage instructions`
- `fix(auth): handle expired tokens gracefully`
- `docs: update API endpoint list`

The PR title should also follow Conventional Commits format.

### Required flags

| Flag | Description |
|------|-------------|
| `--repo` | Owner/repo slug |
| `--body` | The text body of the PR (supports markdown) |
| `--head` | Source branch |
| `--base` | Target branch |

The PR title is a positional argument, not a flag.

## Updating an existing PR

Before pushing changes to an open PR, check whether it has received activity (comments, reviews) from humans or bots:

- **If there is activity:** push new commits normally. Do not force-push — it would erase the conversation history.
- **If there is no activity:** you may force-push squashed updates to keep the commit history clean.

To check for activity, look at the PR's comments, review status, or last-activity timestamp via the Forgejo API or web UI.

## Tips

- Use `git` for most repository things; `fj` only for non-git Forgejo operations
- Use `fj pr create --help` for full flag list and options.
- For draft WIP PRs, prefix the title with `"WIP: "`.
- If the repo URL is a full HTTPS/SSH URL, extract `owner/repo` from it:

> https://git.example.com/owner/repo.git → owner/repo (remove any `.git`)
