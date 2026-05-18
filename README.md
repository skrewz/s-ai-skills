# s-ai-skills

AI agent skills and agent definitions — self-contained instruction sets and personas that extend what the agent can do.

## Skills

| Skill | Description |
|---|---|
| **pdf-reader** | Extract text and tables from PDFs using `pdfplumber`, `pdftotext`, or `pdftoppm` |
| **screen-use** | Linux screen interaction — screenshots (`grim`/`scrot`) and input simulation (`ydotool`) |
| **web-search-and-retrieval** | Go CLI for DuckDuckGo web search and HTML-to-markdown URL fetching |
| **yt-transcript** | YouTube transcript extraction via `youtube-transcript-api` |
| **forgejo** | Raise Pull Requests against Forgejo repos — auto-detects forgejo remotes, requires `fj` CLI |

## Agents

| Agent | Description |
|---|---|
| **pr-reviewer** | Critically reviews pull requests — evaluates PR descriptions, flags drive-by changes, finds bugs and quality concerns, outputs at most five issues |
| **repo-ideation** | Analyses repositories for value-adding directions, surveys existing issues/PRs to avoid duplication, produces structured issues or comments |

## Structure

**Skills** live in `skills/<name>/SKILL.md` — self-contained instruction sets that the agent loads on-demand. Each may include additional source files, scripts, or documentation.

**Agents** live in `agents/<name>/agent.md` — persona definitions with YAML frontmatter specifying permissions and workflow instructions. Each includes a `README.md` with usage guidance.
