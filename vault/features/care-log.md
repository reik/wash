---
title: Care and life-event log (F12)
status: building   # drafting → building → review → shipped
created: 2026-11-20
updated: 2026-11-27
tags: [feature, p1, plant, voice]
serves: [every-plant-has-a-past, plant-voice]
---

# Care and life-event log (F12)

> **Hook:** Log the day's watering, repotting or move in one tap, and your plant remembers it.

Serves: [[every-plant-has-a-past]], [[plant-voice]] · Roadmap: [[roadmap]] (P1, step 2: F12) · Back to [[index]]

## Why this matters
Plant lines are only allowed to talk about real events ([[plant-voice]]). Every care event the owner logs becomes a row here, and that row is what the voice later reads. Nothing is invented.

## Decisions (2026-11-20)
- **Event types are a fixed list** from [[data-model]]: `watered`, `repotted`, `moved`, `new_leaf`, `flower`, `droop`, `leaning`, `owner_away`, `photo_added`, and the milestone and weather types that later features add.
- **Owner logs, owner sees.** A row can be inserted only by the plant's owner, and only for their own plant. Nobody else reads an event until the voice or the public page uses it.
- **Events are immutable.** A wrong entry is fixed by a new event, not by editing the old one. This keeps the voice's history honest.
- **Time is recorded as given.** `occurred_at` is the time the event happened, which can be earlier than the moment it was logged.
- **The voice flag starts false.** `voice_consumed` is set by the voice pipeline later, never by the owner.

## How it works
- `plant_events`: plant, type, source, optional payload, occurred time, voice flag.
- Row-level security: owner of the plant can insert and read; nobody can update or delete.

## Risks
| Risk | Mitigation |
|---|---|
| Owner logs an event that never happened, and the voice repeats it | Voice lines are drafted for owner approval before posting ([[plant-voice]]) |
| Event types drift from the data model | Check constraint on the type list; new types need a migration |

## Next steps
- [x] Vault note, README row, kanban card
- [x] Migration: `plant_events` with type check and owner-only insert and read (#32)
- [x] Mobile log screen (#37)
