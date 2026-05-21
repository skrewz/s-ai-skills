# s-ai-skills

AI agent skills and prompt templates — self-contained instruction sets and personas that extend what the agent can do.

## Skills

| Skill | Description |
|---|---|
| **pdf-reader** | Extract text and tables from PDFs using `pdfplumber`, `pdftotext`, or `pdftoppm` |
| **screen-use** | Linux screen interaction — screenshots (`grim`/`scrot`) and input simulation (`ydotool`) |
| **web-search-and-retrieval** | Go CLI for DuckDuckGo web search and HTML-to-markdown URL fetching |
| **yt-transcript** | YouTube transcript extraction via `youtube-transcript-api` |
| **forgejo** | Raise Pull Requests against Forgejo repos — auto-detects forgejo remotes, requires `fj` CLI |

## Prompt Templates

| Template | Description |
|---|---|
| **pr-reviewer** | Critically reviews pull requests — evaluates PR descriptions, flags drive-by changes, finds bugs and quality concerns, outputs at most five issues |
| **repo-ideation** | Analyses repositories for value-adding directions, surveys existing issues/PRs to avoid duplication, produces structured issues or comments |

## Structure

### Skills

Skills live in `skills/<name>/SKILL.md` — self-contained instruction sets that the agent loads on-demand. Each may include additional source files, scripts, or documentation.

**Symlink mirrors**

- `autonomously-accessible/<name>` → `../skills/<name>` — mirrors all skills for autonomous agent access
- `human-accessible/<name>` → `../skills/<name>` — mirrors a subset of skills for human-accessible contexts

### Prompt Templates

Prompt templates live in `prompts/<name>.md` — Markdown snippets with YAML frontmatter that expand into full prompts when invoked via `/name` in the Pi editor. See the [pi prompt templates documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md) for format details.
