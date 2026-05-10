---
name: screen-use
description: "Use this skill whenever the user needs to interact with their screen — take screenshots to see what's displayed, or use ydotool to simulate mouse clicks, keyboard input, and cursor movement. This is a 'screen use' skill: the model can both read the screen and interact with it."
---

# Screen Use

## Overview

This skill gives you full screen interaction capabilities on Linux (Wayland and X11). You can:

1. **See the screen** — capture screenshots using `grim` (Wayland) or `scrot` (X11)
2. **Interact with the screen** — simulate mouse clicks, keyboard input, and cursor movement using `ydotool`

**CRITICAL: You can interact with the user's screen. Take screenshots and use ydotool to accomplish tasks that require GUI interaction.**

## Prerequisites

- **Wayland**: `grim` installed
- **X11**: `scrot` installed
- **ydotool**: installed, with `ydotoold` daemon running (`systemctl --user status ydotoold`)

## Screenshot

```bash
# Wayland
grim -c - | base64 -w0

# X11
scrot -c /tmp/screenshot.png && base64 -w0 /tmp/screenshot.png
```

The output is a base64-encoded PNG image. Read it directly to see what's on screen.

## ydotool

Simulates keyboard and mouse input via `/dev/uinput`. Works on both X11 and Wayland.

### Mouse

```bash
ydotool mousemove --absolute <x> <y>   # absolute position
ydotool click 0xC0                      # left click (0x81=right, 0x82=middle)
ydotool click -r 2 0xC0                 # double-click
```

### Keyboard

```bash
ydotool type 'Hello world!'             # type text
ydotool key <code>:1 <code>:0           # press then release (e.g. 36:1 36:0 = Enter)
```

Keycodes are `KEY_*` definitions in `/usr/include/linux/input-event-codes.h`. For full docs and hex button codes, run `ydotool <cmd> --help`.

Reference tables (keycodes, button codes, workflow examples) are in `README.md` in this directory.

## Workflow

1. Take a screenshot to see what's on screen
2. Use ydotool to click, type, or navigate
3. Take another screenshot to verify the result
