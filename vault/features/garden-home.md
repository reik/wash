---
title: Multi-plant garden home (F16)
status: building   # drafting → building → review → shipped
created: 2026-11-20
updated: 2026-11-20
tags: [feature, p1, home, plant]
serves: [every-plant-has-a-past]
---

# Multi-plant garden home (F16)

> **Hook:** Open the app and see your whole garden: each plant, its latest moment, and what happened today.

Serves: [[every-plant-has-a-past]] · Roadmap: [[roadmap]] (P1, step 2: F16) · Back to [[index]]

## Decisions (2026-11-20)
- **One query for the home screen.** A single function returns the signed-in owner's plants, each with its avatar path, its latest event and its photo count. This keeps the home screen to one round trip.
- **Only the signed-in owner's plants.** The function filters on the caller's id. It doesn't rely on plant read policies, so it works regardless of the plant rules in other PRs.
- **No ranking, no streaks.** Plants are listed by name. No counter says a plant is neglected ([[principles]]: come back for joy, not guilt).
- **Age comes from `estimated_birth_year`** when it's known; unknown is allowed ([[data-model]]).

## How it works
- `garden_for_owner()`: owner's plants with name, stage, avatar path, latest event type and time, and photo count.

## Risks
| Risk | Mitigation |
|---|---|
| A large garden makes the query slow | Index on plant owner and on event time (events already have a plant and time index) |
| The home shows a moment that isn't visible to others | This is the owner's own view, so private data is fine here; public views are separate (F4) |

## Next steps
- [x] Vault note, README row, kanban card
- [ ] Migration: `garden_for_owner()` function
- [ ] Mobile home screen (later PR, with a screenshot)
