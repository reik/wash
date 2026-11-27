---
title: Report and block (F8)
status: building   # drafting → building → review → shipped
created: 2026-11-20
updated: 2026-11-27
tags: [feature, p1, safety, ugc]
serves: [every-plant-has-a-past]
---

# Report and block (F8)

> **Hook:** Anything that looks wrong can be reported in two taps, and anyone whose plants you don't want to see can be blocked.

Serves: [[every-plant-has-a-past]] · Roadmap: [[roadmap]] (P1, step 1: F8) · Gate: [[content-moderation]] · Back to [[index]]

## Why this is needed
App store user-generated-content rules require a way to report content and to block users ([[tech-direction]]). Reports and blocks are the human backstop for what the automated check misses.

## Decisions (2026-11-20)
- **Reasons are fixed options, not free text.** `sexual`, `violent`, `hateful`, `harassment`, `spam`, `other`. Free text would need its own moderation.
- **A report is about one thing:** a photo, a line, a plant, or a profile (`subject_type` + `subject_id`).
- **Blocks are one-way and private.** A block hides the blocked user's content from the blocker. The blocked user is not told.
- **Reporters see only their own reports.** Moderators read reports through the service role until an ops console exists ([[admin-dashboard]]).
- **Strikes and posting freeze are not in this step.** They need the ops review loop, which comes later.

## How it works
- `reports`: reporter, subject, reason, status (`open`, `actioned`, `dismissed`). Row-level security lets a signed-in user insert and read only their own reports.
- `blocks`: blocker and blocked. Row-level security lets a user add and remove their own blocks and read their own list.

## Risks
| Risk | Mitigation |
|---|---|
| Published photos and lines don't yet hide blocked users | Follow-up: add a block check to the public read policies when public plant pages ship (F4). Recorded in the log |
| Spam reports to bury a real owner | Rate limit and reason review, in the ops step (not in this PR) |

## Open questions
- How often a report is reviewed and by whom (ops step).

## Next steps
- [x] Vault note, README row, kanban card
- [x] Migration: `reports` and `blocks` tables with row-level security (#29)
- [ ] Mobile report and block controls (later PR, with a screenshot); needs a screen that shows other owners' content
