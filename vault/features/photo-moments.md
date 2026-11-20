---
title: Photo moments and same-angle guide (F11)
status: building   # drafting → building → review → shipped
created: 2026-11-20
updated: 2026-11-20
tags: [feature, p1, plant, photos]
serves: [every-plant-has-a-past, plant-voice]
---

# Photo moments and same-angle guide (F11)

> **Hook:** Take the same photo of your plant from the same spot every week, and watch it grow in a row.

Serves: [[every-plant-has-a-past]], [[plant-voice]] · Roadmap: [[roadmap]] (P1, step 2: F11) · Back to [[index]]

## Decisions (2026-11-20)
- **A moment is a series of photos from one angle.** Photos share an `angle_group_id`. The first photo of a new series starts the group; the owner can start a new one at any time.
- **One avatar per plant.** A photo can be marked as the plant's avatar (`is_avatar`). Setting a new avatar clears the old one.
- **Angle guide is the owner's choice.** The app shows the last photo of the group faintly over the camera; it never decides the angle.
- **Moments feed the voice.** A new photo in a group writes a `photo_added` event ([[care-log]]), which is the trigger for a line ([[plant-voice]]).
- **Visibility stays private by default**, as in [[photo-upload]].

## How it works
- `photos` gains `angle_group_id` and `is_avatar`.
- A database rule allows at most one avatar per plant.
- The owner can set the avatar and start a group through their own photos only.

## Risks
| Risk | Mitigation |
|---|---|
| Two avatars set by two requests at once | Partial unique index: one avatar per plant |
| A moment mixes unrelated photos | The owner controls grouping; the app only offers the last photo as a guide |

## Next steps
- [x] Vault note, README row, kanban card
- [ ] Migration: `angle_group_id`, `is_avatar`, one-avatar index, owner-only update
- [ ] Mobile guide overlay (later PR, with a screenshot)
