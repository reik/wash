# Status

Single source of truth for where each feature stands. Read it at the start of a session; update it with every transition (drafting → building → review → shipped).

## Features

| Feature | Stage | Next action |
|---|---|---|
| [[app-shell]] (F1–F3) | building | Sign-in merged (#20, #21); report/block (F8) next |
| [[content-moderation]] (F7) | building | Photo gate (#24) and line gate (#25) merged; image and text checks merged |
| [[plant-voice]] | building | Lines gated; chat design decides who sees a line |
| [[photo-upload]] (F6) | building | Metadata stripping and storage merged (#26); upload screen (#28) in review |
| [[report-block]] (F8) | building | Reports and blocks tables with row-level security |

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
| #28 | photo-upload: upload screen | open |
| — | report-block: reports and blocks | in progress |

## Notes
- Photo storage (F6) builds on the photo gate (#24), which has merged, so it starts from `main`.
