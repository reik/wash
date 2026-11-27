# Status

Single source of truth for where each feature stands. Read it at the start of a session; update it with every transition (drafting → building → review → shipped).

## Features

| Feature | Stage | Next action |
|---|---|---|
| [[app-shell]] (F1–F3) | building | Sign-in merged (#20, #21); report and block controls (F8 mobile) next |
| [[content-moderation]] (F7) | building | Text, image, photo and line gates merged (#22–#25); plant identification merged with the register (#30) |
| [[plant-voice]] | building | Lines gated; chat design decides who sees a line |
| [[photo-upload]] (F6) | building | Storage merged (#26); upload screen (#28) merged; signed URLs to show photos next |
| [[plant-register]] (F9) | building | Database (#30), API (#31) and register screen (#35) merged; owner correction screen next |
| [[report-block]] (F8) | building | Reports and blocks tables merged (#29); mobile controls next |
| [[care-log]] (F12) | building | Events table (#32) and log screen (#37) merged |
| [[photo-moments]] (F11) | building | Angle groups and avatar merged (#33); same-angle overlay next |
| [[garden-home]] (F16) | building | Function (#34), latest moment and avatar (#36) and screen (#38) merged; decide whether `/garden` becomes home |

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
| #24 | content-moderation: photo gate | merged |
| #25 | content-moderation: line gate | merged |
| #26 | photo-upload: metadata strip, storage | merged |
| #27 | photo-upload: mobile client | merged |
| #28 | photo-upload: upload screen | merged |
| #29 | report-block: reports and blocks | merged |
| #30 | plant-register: plants and profiles, identification, corrections | merged |
| #31 | plant-register: API clients | merged |
| #32 | care-log: plant events | merged |
| #33 | photo-moments: angle groups, avatar | merged |
| #34 | garden-home: garden function | merged |
| #35 | plant-register: register screen | merged |
| #36 | garden-home: avatar and latest moment | merged |
| #37 | care-log: log screen | merged |
| #38 | garden-home: garden screen | merged |

## Notes
- Lower-layer PRs merged first each time; no stacked PRs.
