# s-ai-skills

AI agent skills and prompt templates — self-contained instruction sets and personas that extend what the agent can do.

## Skills

| Skill | Description |
|---|---|
| **pdf-reader** | Extract text and tables from PDFs using `pdfplumber`, `pdftotext`, or `pdftoppm` |
| **screen-use** | Linux screen interaction — screenshots (`grim`/`scrot`) and input simulation (`ydotool`) |
| **spec-driven-project** | Scaffold a spec-driven project — `specification/` source of truth, Makefile-driven build, `AGENTS.md`/`VALUES_AND_BELIEFS.md`; idempotent on existing repos |
| **web-search-and-retrieval** | Go CLI for DuckDuckGo web search and HTML-to-markdown URL fetching |
| **yt-transcript** | YouTube transcript extraction via `youtube-transcript-api` |

## Prompt Templates

| Template | Description |
|---|---|
| **outcome-decomposer** | Curates the forest of implementation tickets hanging off one ideation issue — reads state from the tracker, reconciles the graph against the outcome as written, reports on the tracker |
| **pr-revisitor** | Revisits a pull request — checks ownership, answers reviewer questions, pushes fix commits, addresses CI failures, reports back with a summary |
| **issue-implementer** | Considers an issue and attempts to start a pull request for it. |
| **pr-reviewer** | Critically reviews pull requests — evaluates PR descriptions, flags drive-by changes, finds bugs and quality concerns, outputs at most five issues |
| **repo-ideation** | Analyses repositories for value-adding directions, surveys existing issues/PRs to avoid duplication, produces structured issues or comments |
| **research** | Thorough internet research — multiple searches, challenges assumptions, cross-references sources, presents balanced conclusions with links |

Note how these connect (at least, are intended to connect):

1. The `outcome-decomposer` turns a broad statement of an outcome into a forest of single-concern issues, and keeps that forest honest as the ideation progresses.
2. The `repo-ideation` prompt template spins up (and ideally curates) issues in repos.
3. The `issue-implementer` turns those into PRs.
4. The `pr-reviewer` acts as a counter-force to such implementation.
5. And in a cycle, `pr-revisitor` adjusts to the `pr-reviewer` outputs.

## Structure

### Skills

Skills live in `skills/<name>/SKILL.md` — self-contained instruction sets that the agent loads on-demand. Each may include additional source files, scripts, or documentation.

**Symlink mirrors**

- `autonomously-accessible/<name>` → `../skills/<name>` — mirrors all skills for autonomous agent access
- `human-accessible/<name>` → `../skills/<name>` — mirrors a subset of skills for human-accessible contexts

### Prompt Templates

Prompt templates live in `prompts/<name>.md` — Markdown snippets with YAML frontmatter that expand into full prompts when invoked via `/name` in the Pi editor. See the [pi prompt templates documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md) for format details.

Where a template carries rules worth arguing for, the argument lives beside it in `docs/<name>.md`. Those files are **not** prompts and are never dispatched: pi turns every `prompts/*.md` into a slash command, which is why they cannot live in `prompts/`. The contract is *cut arguments, keep rules* — change a rule and change its argument in the same commit.
