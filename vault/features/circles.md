---
title: Circles
status: drafting
created: 2026-10-08
updated: 2026-10-16
tags: [feature, social, matchmaking]
serves: [every-plant-has-a-past, sprout-day]
---

# Circles

> **Hook:** Your plant joins its relatives. Every aroid in the world has a group chat, and so does every cactus.

Serves [[every-plant-has-a-past]] (the default group while Sprout Day is parked) and later [[sprout-day]] (homerooms reuse this engine) · Related: [[plant-voice]], [[daily-rhythm]], [[windowsill-talk]], [[content-moderation]] · Back to [[index]]

**The moment:** you register your pothos, and it lands in a circle with a monstera in São Paulo, a ZZ plant in Berlin and a peace lily in Osaka. "Who are these?" "Family. All aroids."

## Why this is different
Social apps match **people**. Here **plants** are grouped, and only by what they are: their place in the plant family tree. Owners never see human profiles and never message each other; they watch the plants talk ([[plant-voice]]). Grouping by botanical family also gives the plants something real to talk about: relatives share habits, so a monstera and a pothos can compare aerial roots.

## Decisions
**2026-10-15 (user):**
1. **Group by taxonomy, not by score.** A circle is made of plants from the same **family**. If there aren't enough plants of that family yet, use the same **order**, then the same **class**.
2. **Simple, and changeable without a code change.** The ladder of levels and the size numbers live in one config row (`circle_rules`), so the rule can be tuned or extended later.
3. **Identify the plant from its first photo.** At registration the app sends the first photo to a plant-identification API to get the scientific name and its classification.

**2026-10-16 (user):**
4. **A circle opens at 8 plants** (was 12). `min_to_open = 8`.
5. **Guest fallback confirmed:** a plant that can't fill a circle at any level of the ladder joins any open circle after 7 days waiting, as a guest from another branch of the tree.
6. **Time-zone tie-breaker confirmed:** when several circles at a level qualify, prefer the one where the plant's time-zone band is least represented.

Superseded: the point-scoring matchmaker of 2026-10-08 (time zones, climate, species caps, life-stage mix). It is replaced by the ladder below.

**Kept from 2026-10-08:** circle size 18–30, target 24 (opens at 8 since 2026-10-16); refill, never reshuffle; never matched on owner age, gender, appearance, popularity or any human ranking.

## The rule
```text
circle_rules (one config row, editable without an app release)
  levels      = [family, order, class]
  min_to_open = 8       # plants needed to open a new circle (was 12 until 2026-10-16)
  target_size = 24
  max_size    = 30

place(plant):
  for level in levels:
    taxon = plant's family / order / class
    if an open circle at this level for this taxon has room:
      join it                       # several? prefer the one where this plant's tz_band is
                                    # least represented, then the one with the fewest members
      return
    if waiting plants with this taxon (including this one) >= min_to_open:
      open a new circle at this level with them
      return
  wait in the queue                 # re-run daily and whenever a plant registers
```

Hard rules that still apply:
- The owner opted the plant in ("looking for friends").
- One plant per owner per circle.
- No active safety flags on the plant or owner ([[content-moderation]]).

### What the levels mean in practice
Checked against GBIF's taxonomy on 2026-10-15:

| Plant | Family | Order | Class |
|---|---|---|---|
| Pothos (*Epipremnum aureum*) | Araceae | Alismatales | Liliopsida |
| Monstera | Araceae | Alismatales | Liliopsida |
| Cactus (e.g. *Opuntia*) | Cactaceae | Caryophyllales | Magnoliopsida |
| Ginkgo | Ginkgoaceae | Ginkgoales | Ginkgoopsida |

- **Family** is the natural "relatives" level and the one we want most circles at. Popular houseplant families (aroids, cacti, succulents, ferns) should fill quickly.
- **Order** groups related families, e.g. cacti with carnations and ice plants.
- **Class** is very broad. Almost every flowering houseplant is either Liliopsida (monocots: aroids, orchids, palms, snake plants) or Magnoliopsida (most others). So a class circle is effectively "monocots" or "the rest".
- Rare plants (a lone ginkgo) may not fill even a class circle at launch. Confirmed 2026-10-16: after 7 days waiting, they join any open circle, as a "guest from another branch of the tree".

### Lifecycle
1. **Open** when `min_to_open` plants share a taxon at the current level.
2. **Fill** with new arrivals until `target_size`; never above `max_size`.
3. **Forming** until `min_to_open` (8) are active, then plants may speak. (Assumed to follow the new minimum; say if the speaking threshold should differ.)
4. **Refill, never reshuffle.** If active members stay below `min_to_open` for 14 days, top up from the queue at the same level, or merge with another thin circle at the same level.
5. **No promotion moves.** When a family later has enough plants for its own circle, new arrivals open it; plants already in an order or class circle stay where their friends are.

A circle is named after its taxon: "Araceae circle · the aroids". Plants may later give it a nickname.

## Identifying the plant
On the first photo at registration ([[feature-list]] F9):
1. Strip EXIF and location, then send the photo to a plant-identification API.
2. Show the best guess with its common name in the owner's language: "Looks like a golden pothos (*Epipremnum aureum*)". Buttons: **Yes** · **Pick another** (top 3 candidates) · **Not sure**.
3. Look the confirmed name up in **GBIF** (free) to store one consistent classification: class, order, family, genus, species and GBIF's id.
4. **Not sure, or low confidence:** keep the deepest rank the top candidates agree on. Three different aroids still give family Araceae, so circle placement works even when the species is uncertain.
5. Owners can correct the species later. This does not move the plant out of its circle.

| Service | What it gives | Cost | Notes |
|---|---|---|---|
| [Pl@ntNet API](https://my.plantnet.org/pricing) | Most likely species with confidence | Free up to 500 identifications a day; paid beyond with a signed agreement | Exact response fields and commercial pricing need confirming with Pl@ntNet ([quotas](https://my.plantnet.org/doc/api/quota), [terms](https://my.plantnet.org/terms_of_use)) |
| [Kindwise plant.id](https://www.kindwise.com/plant-id) | Species plus a taxonomy block: class, order, family, genus ([handbook](https://kindwise.com/handbook)) | Not published; ask | Common names per language |
| [GBIF species match](https://api.gbif.org/v1/species/match?name=Epipremnum%20aureum) | Normalises a scientific name to one classification | Free | Verified 2026-10-15 for *Epipremnum aureum* |

Recommendation: an identification API for the photo, and GBIF as the single source of the classification, so circles don't change if we switch vendors.

## Risks
| Risk | Mitigation |
|---|---|
| Wrong identification puts a plant in the wrong circle | Owner confirms; family level is robust to species mistakes; corrections allowed |
| Cold start: too few plants to open family circles | The ladder falls back to order and class; `min_to_open` is already 8 at launch; lower further if needed |
| Circles of one family may cluster in one country, so fewer time zones and quieter nights ([[daily-rhythm]]) | Confirmed 2026-10-16: when several circles qualify, prefer the one where the plant's time-zone band is least represented. Measure before adding more rules |
| Identification API cost at scale | One call per plant at registration only; cache by GBIF id |
| Taxonomy names change over time | Store GBIF's id, not only the name; refresh names occasionally |

## Experiment
Hand-run in [[circle-pilot]]: ask sign-ups for a photo, identify by hand with Pl@ntNet's free app, look up the family in GBIF, and place plants in Discord channels by the ladder. Measure: how many circles open at family level versus order or class, lines per member per day, and whether plants with relatives in the circle talk more.

## Open questions
- Should Family (cutting lineage) members be barred from the same circle? (lean: no need; Family has its own chat and they'd share a taxon anyway)
- Requeue cooldown length after leaving.

## Next steps
- [ ] Confirm Pl@ntNet's response fields and commercial terms; get Kindwise pricing.
- [ ] Run 30 real houseplant names through GBIF to see how they spread across families, orders and classes.
- [x] Decide `min_to_open` for launch: 8 (2026-10-16).
