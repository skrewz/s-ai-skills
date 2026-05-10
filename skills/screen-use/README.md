# Screen Use

ydotool keycodes for common actions:

| Action | Command |
|---|---|
| Enter | `ydotool key 36:1 36:0` |
| Escape | `ydotool key 1:1 1:0` |
| Tab | `ydotool key 23:1 23:0` |
| Ctrl+C | `ydotool key 29:1 29:0 42:1 42:0` |
| Ctrl+V | `ydotool key 29:1 29:0 47:1 47:0` |
| Ctrl+A | `ydotool key 29:1 29:0 42:1 42:0` |
| Arrow Up | `ydotool key 103:1 103:0` |
| Arrow Down | `ydotool key 108:1 108:0` |
| Arrow Left | `ydotool key 105:1 105:0` |
| Arrow Right | `ydotool key 106:1 106:0` |

Mouse button hex codes:

| Code | Button |
|---|---|
| `0xC0` | left click |
| `0x81` | right click |
| `0x82` | middle click |
| `0xC5` | forward click |
| `0xC6` | back click |

Add `:1` for press, `:0` for release. Add `0x40` for down only, `0x80` for up only.

## Full Workflow Examples

### Click a button on screen

1. Take a screenshot to find the button's position
2. `ydotool mousemove --absolute 400 250`
3. `ydotool click 0xC0`

### Type into a focused input field

1. Take a screenshot to confirm the field is focused
2. `ydotool type 'my username'`
3. `ydotool key 36:1 36:0`

### Fill a form

1. Screenshot → note field positions
2. `ydotool mousemove --absolute x y`
3. `ydotool click 0xC0`
4. `ydotool type 'value'`
5. `ydotool key 9:1 9:0` (Tab) to next field
6. Repeat
