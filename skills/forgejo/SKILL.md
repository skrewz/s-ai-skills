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
fj pr create \
  --repo <owner>/<repo> \
  --title "<pr-title>" \
  --body "<pr-body>" \
  --head <head-branch> \
  --base <base-branch>
```

### Required flags

| Flag | Description |
|------|-------------|
| `--repo` | Owner/repo slug |
| `--title` | PR title |
| `--body` | PR description (supports markdown) |
| `--head` | Source branch |
| `--base` | Target branch |

## Tips

- Use `git` for most repository things; `fj` only for non-git Forgejo operations
- Use `fj pr create --help` for full flag list and options.
- For draft WIP PRs, add `--draft`.
- If the repo URL is a full HTTPS/SSH URL, extract `owner/repo` from it:

> https://git.example.com/owner/repo.git → owner/repo (remove any `.git`)
