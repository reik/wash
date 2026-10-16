---
title: Seed data fit check
status: done
created: 2026-10-16
updated: 2026-10-16
tags: [experiment, data-model, seed]
---

# Seed data fit check

Putting the 10 dummy owners and 33 plants from [[circle-simulation]] into `db/seed/dev/` as rows of the draft [[data-model]] showed where the model does not yet fit the rules decided for [[circles]]. Nothing in the model was changed; each item is a proposal added to the data-model open questions. Back to [[index]]

## What fit without changes
`species` (with GBIF class, order, family, genus), `profiles` and `plants` took every dummy value as the model describes them. The taxon columns on `plants` match their species, and the seed passes the integrity checks in `db/seed/test_seed_dev.py`.

## What does not fit yet
| # | Gap | Why it matters | Proposal |
|---|---|---|---|
| 1 | `circle_members` has no owner column, and its key is `(circle_id, plant_id)` | The rule "one plant per owner per circle" cannot be enforced by the database. The simulation relies on it: 3 dummy plants (an aloe, a calathea, a snake plant) waited because their owner already held a seat in the monocot circle | Add `owner_id` to `circle_members` with a unique `(circle_id, owner_id)` where `left_at is null`, or enforce with a trigger |
| 2 | No way to mark a guest | The 7-day guest fallback is confirmed (2026-10-16), and 2 of 33 dummy plants became guests | Add `circle_members.is_guest bool` |
| 3 | `circle_rules` lacks `guest_after_days` (7) and the possible `hold_days` | Both are tunable numbers that should live in the config row, like `min_to_open` | Add both columns |
| 4 | Dummy rows cannot be told from real ones | The dev and production plan relies on it, and the admin dashboard should be able to hide them | Convention used now: `@seed.sasawis.test` emails. Optional column `profiles.is_seed` for the dashboard |
| 5 | Temperament falls back to "the family's default", but no such default is stored anywhere | Every dummy species has `temperament = null`, and the voice cannot resolve it | Add a small `family_defaults` table, or a `temperament` column per family in a taxon table |
| 6 | Country lives on `plants`, not `profiles` | The admin dashboard's user list filters by country, and an owner can have plants in two countries | Decide how a user's country is derived (e.g. most recent plant) |
| 7 | `profiles.locale` is only `en` or `ja` | 5 of 10 dummy owners (BR, DE, AE, KR, ES) speak neither natively and were seeded as `en` | Fine for v1 by decision; admin language counts will lump them together |

## Decision needed
Items 1–3 are small additions and, if you agree, belong in `data-model.md` before any migration is written. Items 4–6 need a choice. I did not edit the model.
