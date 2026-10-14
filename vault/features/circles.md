---
title: Circles
status: drafting
created: 2026-10-08
updated: 2026-10-08
tags: [feature, social, matchmaking]
serves: [every-plant-has-a-past, sprout-day]
---

# Circles

> **Hook:** Your plant doesn't need friends who own plants. It's matched with ~24 plant strangers around the world — a little society that never sleeps, because its members live in different time zones.

Serves [[every-plant-has-a-past]] (the default group while Sprout Day is parked) and later [[sprout-day]] (homerooms reuse this engine) · Related: [[plant-voice]], [[daily-rhythm]], [[windowsill-talk]], [[content-moderation]] · Back to [[index]]

## Why this is different
Social apps match **people**. Here, **plants** are matched — by plant facts only: time zone, climate, species, life stage, activity. Owners never see human profiles and can never message each other; they watch the plants talk ([[plant-voice]]). Circles replace the Sprout Day homeroom as the default grouping, and homerooms reuse this engine if [[sprout-day]] returns.

## Decisions (2026-10-08)
1. **Point-scoring matchmaking adopted** over invite-only or random assignment. Invite circles (households, real-life friends) may come later as a second path.
2. Circle size **18–30, target 24**; a circle opens when ≥12 members are active.
3. Hard rules: **≥3 time-zone bands**; ≤4 plants per country; ≤3 per species (so exactly one mirror pair is possible); 1 plant per owner per circle; opt-in + a photo within the last 14 days required; safety-flagged plants excluded.
4. **Refill, never reshuffle.** If active members stay <12 for 14 days: merge with another thin circle or top up from the queue. No periodic re-matching — bonds need time.
5. Scoring favours: under-represented time-zone bands, different climates, new species, a single mirror twin, life-stage mix, similar activity level.
6. **Never matched on:** owner age, gender, appearance, popularity, or any human ranking.

## The algorithm
### Stage 1 — hard filters (all must pass)
- Owner opted the plant in ("looking for friends")
- Recent activity: a photo within ~14 days
- Circle stays within the size / TZ / country / species caps above
- No active safety flags on plant or owner ([[content-moderation]])

### Stage 2 — soft score (highest score joins first)
| Points | Condition |
|---|---|
| +3 | Its time-zone band is under-represented in the circle |
| +2 | Climate class differs from the circle median (temperate / tropical / arid / cold) |
| +2 | New species for this circle |
| +1 | Same species present exactly once (a "mirror twin": same face, different sky) |
| +2 | Balances life stages (a room needs newborns and elders) |
| +1 | Activity band matches the circle (lively with lively) |
| −5 | Same species already at 3 |
| −4 | Its TZ band already ≥40% of the circle |
| −3 | Same owner already in the circle |

### Lifecycle
1. **Seed** a new circle with 3 plants — one per TZ band, different species.
2. **Fill** by repeatedly adding the highest-scoring queued plant until ~24.
3. **Forming** until ≥12 active, then plants may speak.
4. **Refill** on decay (merge or top up, keeping TZ spread). Leave + requeue allowed with a cooldown.

## Flavour on top
- **Mirror twin:** if two of a species land together, the system may nudge a one-line intro ("two pothos, two skies").
- **Elder spice:** when available, include ≥1 plant with a long record — depth without requiring handovers.
- **Seasonal visit (rare, optional):** 2–4 times a year, a plant may spend a week in another circle. Never forced churn.

## Risks
| Risk | Mitigation |
|---|---|
| Cold start: not enough plants to match well | Start with smaller circles and a waitlist; **never** fake plants (trust) |
| Japan-heavy launch skews TZ mix | Recruit EN-speaking regions pre-launch; temporary 2-band circles allowed at launch (open question) |
| Dead circles as members drop | Refill rule; merge thin circles |
| People game species for rare matches | Harmless — caps still apply |

## Experiment
Hand-run matchmaking in the pilot: collect sign-ups (species, city, stage) in a spreadsheet, score by hand with the table above, place plants in Discord channels. Measure: lines per member per day, reaction spread across dayparts, week-4 activity by TZ diversity.

## Open questions
- Minimum circle size at launch (12? 8?)
- Should Family members be barred from the same Circle? (lean: yes — Family has its own chat)
- Do circles get names? Could be plant-chosen ("Circle of the Third Windowsill").
- Requeue cooldown length after leaving.

## Next steps
- [ ] Species table: first 50 with climate class (shared with [[plant-voice]] temperament work)
- [ ] Hand-run one matchmaking pass with 30 dummy plants to sanity-check the scoring
- [ ] Decide launch minimum size and the JP-heavy-launch fallback
