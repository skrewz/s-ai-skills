# s-ai-skills

AI agent skills — self-contained instruction sets and tools that extend what the agent can do.

## Skills

| Skill | Description |
|---|---|
| **pdf-reader** | Extract text and tables from PDFs using `pdfplumber`, `pdftotext`, or `pdftoppm` |
| **screen-use** | Linux screen interaction — screenshots (`grim`/`scrot`) and input simulation (`ydotool`) |
| **web-search-and-retrieval** | Go CLI for DuckDuckGo web search and HTML-to-markdown URL fetching |
| **yt-transcript** | YouTube transcript extraction via `youtube-transcript-api` |
| **forgejo** | Raise Pull Requests against Forgejo repos — auto-detects forgejo remotes, requires `fj` CLI |

## Structure

Each skill lives in its own directory with a `SKILL.md` that the agent loads automatically. Skills may also include additional source files, scripts, or documentation as needed.
