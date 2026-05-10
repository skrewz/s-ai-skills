---
name: yt-transcript
description: YouTube video transcript downloader — extract full transcripts and list available languages.
---

# YouTube Transcript

## Working directory

Always work inside `./.opencode/tmp/`, creating it if it doesn't exist. This keeps the working directory clean.

```bash
mkdir -p ./.opencode/tmp
```

## Core dependency

Use `uv run --with youtube-transcript-api` to run without installing anything globally.

## Extract video ID

YouTube URLs come in many formats. Always extract the 11-character video ID first.

```python
import re

def extract_video_id(url_or_id: str) -> str:
    """Extract YouTube video ID from URL or raw ID."""
    if re.match(r"^[a-zA-Z0-9_-]{11}$", url_or_id):
        return url_or_id
    pattern = r"(?:https?://)?(?:www\.)?(?:youtube\.com/(?:watch\?v=|embed/|v/)|youtu\.be/)([a-zA-Z0-9_-]{11})"
    match = re.search(pattern, url_or_id)
    if match:
        return match.group(1)
    raise ValueError(f"Invalid YouTube URL or ID: {url_or_id}")
```

## Fetch full transcript

Extract the complete transcript text from a YouTube video. Defaults to English (`en`) — pass another language code like `["ja"]` to prefer a different language. Use `extract_video_id()` from above to parse the URL.

```python
from youtube_transcript_api import YouTubeTranscriptApi

video_id = extract_video_id("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
transcript_list = YouTubeTranscriptApi().list(video_id)
transcript = transcript_list.find_transcript(["en"])
segments = transcript.fetch()
full_text = " ".join(segment.text for segment in segments)
print(full_text)
```

The transcript API may raise `NoTranscriptFound` if no transcript exists for the requested language(s). Fall back to an empty list `[]` to let the API pick the best available language.

```python
transcript = transcript_list.find_transcript([])  # auto-pick best available
```

## List available transcript languages

Show which languages have transcripts available for a video. Use `extract_video_id()` from above to parse the URL.

```python
from youtube_transcript_api import YouTubeTranscriptApi

video_id = extract_video_id("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
transcript_list = YouTubeTranscriptApi().list(video_id)

for trans in transcript_list:
    print(f"{trans.language_code}: {trans.language}")
```

## Handling unavailable transcripts

If a video has no transcript at all, `YouTubeTranscriptApi().list(video_id)` returns an empty list. Check before fetching:

```python
transcript_list = YouTubeTranscriptApi().list(video_id)
if not transcript_list:
    print("No transcript available for this video.")
else:
    transcript = transcript_list.find_transcript(["en"])
    ...
```

The API may also raise `TranscriptsDisabled` if the uploader has disabled transcripts entirely.
