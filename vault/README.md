# Status

Single source of truth for where each feature stands. Read it at the start of a session; update it with every transition (drafting → building → review → shipped).

## Features

| Feature | Stage | Next action |
|---|---|---|
| [[app-shell]] (F1–F3) | building | Layer 2 merged; sign-in merged (#20, #21) |
| [[content-moderation]] (F7) | building | Text gate for plant lines; photo gate PR #24 awaiting merge |
| [[plant-voice]] | building | Gate plant lines through the text check before posting |

## Delivery (PR by PR)

| PR | Feature | Status |
|---|---|---|
| #17 | app-shell: scaffold | merged |
| #18 | app-shell: i18n and tagline | merged |
| #19 | auth: sign-in API | merged |
| #20 | auth: sign-in form | merged |
| #21 | auth: sign-in redesign | merged |
| #22 | content-moderation: text check | merged |
| #23 | content-moderation: image check | merged |
| #24 | content-moderation: photo gate | open |

## Notes
- Photo storage (F6) is blocked until #24 merges. Building it on top of #24 would stack PRs, so it waits.
