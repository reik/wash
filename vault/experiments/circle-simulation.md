---
title: Circle simulation (dummy users)
status: done
created: 2026-10-16
updated: 2026-10-16
tags: [experiment, simulation, circles]
---

# Circle simulation (dummy users)

Runs the grouping rule from [[circles]] on made-up users, without waiting for real recruits from [[circle-pilot]]. It tests **grouping only** (who ends up in which circle), not whether the chat is fun. Code: `mockups/circle-sim/`. Back to [[index]]

## Setup
- **10 dummy owners** in 9 countries (JP x2, US, BR, DE, AE, AU, KR, ES, CA) across the three time-zone bands, each with **2–5 plants** (33 plants in total), registered over 10 days.
- Each plant is a real species. Family, order and class come from GBIF's species match (all 26 species matched exactly).
- Rules as confirmed on 2026-10-16: ladder family → order → class; a circle opens at **8 different owners**; one plant per owner per circle; refill, never reshuffle; 7-day guest fallback; time-zone tie-breaker.
- The Discord server was **not** created (needs the owner's account). The circle names below are what the channels would be called.

## Result 1: the 10 dummy users
| Day | What happened |
|---|---|
| 5 | **Araceae circle (the aroids)** opens: 8 owners with a pothos, monstera, philodendron, peace lily or anthurium |
| 6 | **Liliopsida circle (monocots)** opens from those same owners' *second* plants (another monstera, a ZZ plant, a spider plant, an orchid…). Jack's ZZ plant joins the Araceae circle |
| 8 | Farah's areca palm joins the monocot circle |
| 10 | Farah's prickly pear joins the Araceae circle as a **guest** (7 days waiting) |
| 12 | Hana's boston fern joins the monocot circle as a guest |
| 14 | **13 of 33 plants are still waiting** |

Final: Araceae circle 9 members + 1 guest; monocot circle 9 members + 1 guest. Both have 4 plants in apac, 3 in americas and 3 in emea.

What this shows:
- **A family circle can form**, here because 8 of the 10 owners had an aroid.
- **Nothing else reached 8 owners.** Cacti, succulents, ferns and the dicots all stayed small, so those plants wait. Seven different owners had a "most other flowering plants" (Magnoliopsida) plant, one short of 8.
- **Owners with several plants wait on themselves.** Aiko's snake plant and Carla's calathea and aloe are monocots, but their owners already hold a seat in the monocot circle, and a circle takes one plant per owner. That explains 3 of the 13 waiting plants (the other 10 wait because their group never reaches 8 owners).

## Result 2: a flaw in the rule as written
In a 30-owner run (one plant each), a monocot circle opened on day 3 and took everyone: 25 members, no aroid circle at all, even though 16 of the 30 plants were aroids. Cause: a new plant checks "family, then order, then class", and **joins any broad circle that is already open before a family has time to reach 8.** Once a class circle exists, a family circle can hardly ever form.

Checked over 50 random sign-up sets each (aroid-heavy, so on the generous side for family circles):

| Owners (1 plant each) | Runs with a family circle | Plants in a family circle |
|---|---|---|
| 30 | **0 of 50** | 0% |
| 100 | **3 of 50** | 2% |

This works against the hook in [[circles]]: "every aroid in the world has a group chat."

## Result 3: a possible fix, tested
A plant must wait before it may use a broader level: `hold_days` per step (family at once, order after N days, class after 2N). The 7-day guest fallback is unchanged.

| Owners | hold_days | Runs with a family circle | Plants in a family circle | Plants still waiting at day 14 |
|---|---|---|---|---|
| 30 | 0 (today) | 0 of 50 | 0% | 3.5 |
| 30 | 2 | 13 of 50 | 11% | 8.6 |
| 30 | 3 | 27 of 50 | 30% | 9.3 |
| 100 | 0 (today) | 3 of 50 | 2% | 5.2 |
| 100 | 3 | 50 of 50 | 45% | 18.3 |

The trade-off is plain: the longer the hold, the more family circles, but the more plants wait a few days before their first circle. The 7-day guest fallback bounds the wait.

## Limits
- Dummy users, and made-up popularity weights (aroids about a third of sign-ups). Real houseplant communities may differ.
- 14-day window, random registration days. No chat behaviour, only placement.
- One shared hold value was tried; other designs (higher minimum for broad levels, opening broad circles only as a last resort) were not.

## Decision needed
Add a hold before broader levels (e.g. 3 days per step), or keep the rule as is? Recorded in [[circles]] open questions. I did not change the rule.

## Re-run
```bash
python3 mockups/circle-sim/test_circle_sim.py      # 13 tests
python3 mockups/circle-sim/run.py dummy            # the 10 users, day by day
python3 mockups/circle-sim/run.py sweep 30 3       # 50 random sets, 30 owners, hold 3 days
```
