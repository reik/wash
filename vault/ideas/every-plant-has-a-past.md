---
title: Every plant has a past
status: drafting
created: 2026-10-02
updated: 2026-10-02
tags: [idea, plants, lineage, rehoming]
working-names: [Rootline, Heirleaf, Plant Chronicle]   # none checked for trademarks yet
---

# Every plant has a past

> **Hook:** Plants outlive the homes they live in. People move abroad, break up, close offices, pass away, and their plants get rehomed. Here, a plant's whole life story **travels with it to every new owner**, like a pet's adoption file.

Back to [[index]] · Principles: [[principles]] · Sources: [[competitive-landscape]]

## The moment
You pick up a $5 pothos from someone leaving the country. You scan the tag on its pot and discover it is **27 years old, has lived in 3 countries, and has 40 children**.
Built-in TikTok story: *"My thrift-store plant turned out to be older than me."*

## Who it's for
| Persona | Situation | What they get |
|---|---|---|
| **Keeper** | Owns an old or meaningful plant (grandma's jade, a plant from a first apartment) | A place to preserve its story and age; a "legacy" to pass on |
| **Rehomer** | Moving abroad, downsizing, breaking up, closing an office | Peace of mind that the plant goes to a good home, plus the option to follow it from afar |
| **Adopter** | Gets a secondhand plant (swap, marketplace, curb, inheritance) | Its history, care quirks, and a sense of continuing something |
| **Plant shop** (B2B) | Sells plants | A "birth certificate" tag at sale that delights customers and costs nothing extra |

## Why it's original
- No app was found (2026-10-02) that transfers a plant's history to a new owner. Existing trackers (Planta, Greg, Cheerful Plants…) are single-owner care tools.
- "Plant passport" exists only as an **EU regulatory document** for commercial trade. Avoid that term in branding to prevent confusion.
- Prōpa does local cutting-sharing and per-plant growth photos, but not owner-to-owner story transfer.
- Details and links: [[competitive-landscape#Plant history and rehoming]].

## How it works
**Core objects**
- **Plant Record**: permanent, owner-independent. Species, estimated birth year, origin story, photos, milestones, lineage links.
- **Chapter**: one owner's period with the plant, e.g. *"2019–2023 · a sunny windowsill in Osaka"*. Shows place (city or country) and time range, **never the owner's name**.
- **Tag**: QR (later NFC) stake or sticker in the pot, linked to the Plant Record. The record can also be found by a short code if the tag is lost.
- **Handoff**: the giver creates a transfer code; the receiver scans it; the current chapter closes and a new one opens.
- **Lineage**: a cutting or division creates a child record linked to its parent, forming a family tree ("40 children in 6 countries").

**Core loop**
1. Register a plant → write its origin story and backfill memories (old photos, moves).
2. Log moments over time: photos, firsts, repots, survived winters.
3. Hand the plant off when it changes homes. The new owner continues the story.
4. Previous owners receive milestone updates if the new owner allows it ("your old fiddle-leaf just flowered in Lisbon 🌸").

**The plant's voice:** at handover the plant introduces itself to its new owner from its past-life memories, and it talks with its cuttings in a *Family* group chat. See [[plant-voice]].

**The crux:** step 1–2 must be enjoyable *before* any handoff ever happens, because most plants won't change hands for years. Single-owner value is a "plant biography" and baby book: an age counter, origin story, milestones and printed books. The handoff is the payoff, not the daily driver.

**Edge cases**
- **Plant dies:** a memorial page; the record stays, and if cuttings exist, "the line lives on" through its children.
- **Owner dies:** designate a successor ahead of time ("who inherits this plant?"), or let family claim the record with the tag.
- **Previous owner's privacy:** at handoff, the giver chooses which photos stay visible; they can redact their chapter later.
- **Plant split into several:** one record becomes several child records.
- **Disputes and fakes:** stakes are low; no verification at MVP. Report and hide is enough.

## What counts as a past life
Any period of the plant's existence **before its current home**, meaning time cared for by someone else, somewhere else (defined 2026-10-02). Sources, from richest to thinnest:
1. **Previous owners' chapters** in the app; the giver chooses what to leave at handover.
2. **Inherited from its parent plant**: a cutting is a genetic clone, so it *is* the same plant continuing.
3. **An origin story the current owner knows** ("rescued from my office when it closed").
4. **A shop birth certificate** ("grown at a nursery in the Netherlands, 2025").

A plant with none of these has no past life, and that's fine. It starts as a *newborn* and builds its story from day one. Nothing is ever invented to fill the gap. Details and how this shapes the plant's voice: [[plant-voice#What counts as a past life]].

## How it combines with Sprout Day
Every plant born on [[sprout-day]] gets a Plant Record from day 1, so the Sprout Day class turns into the next generation of storied plants. The two can share one "Plant Record" backend with two entry points (open question below).

## MVP scope
1. Plant Record + chapters (with origin-story backfill)
2. Print-at-home QR tag (PDF), plus a short code fallback
3. Handoff flow (transfer code → new chapter)
4. Photo moments and milestones, with an age counter
5. Follow from afar (milestone notifications to previous owners, opt-in by the current owner)
6. English and Japanese

**Not in v1:** marketplace or commerce, NFC tags, family-tree visualisation (store the links now and show them in v2), free-text comments.

## Business model
- **Physical tags** (QR/NFC plant stakes, durable): early revenue and distribution in one, because every tag is an ad.
- **Premium:** unlimited plants, full-resolution archive, printed **"Plant Biography"** book (print-on-demand, good margin).
- **B2B, plant shops and nurseries:** branded birth-certificate tags at the point of sale; small fee per tag or a monthly plan.
- **Partnerships:** moving companies and relocation services (an expat "rehome your plants" flow).

## Growth
- Story-driven short videos: "my plant's 3rd owner", "the oldest plant in our office".
- Expat and moving communities (r/expats, city Facebook groups, international school networks).
- Plant swaps and meetups: bring tags and a laptop and register plants on the spot.
- Media: heirloom and very old houseplants already get news coverage, so pitch "the world's most-travelled houseplant".

## Risks
| Risk | Mitigation |
|---|---|
| Payoff takes years (cold start) | Backfilled origin stories; shop birth certificates; [[sprout-day]] creates new records at scale |
| Handoffs may be rare | **Unknown, so measure first** (experiment 3) |
| Tags get lost or thrown away | Short code plus photo match later; make tags durable and pretty so people keep them |
| Previous-owner privacy | Chapters show no names; redaction rights; coarse location only |
| Perceived as a marketplace | No commerce in the app; the handoff is free and only about the story |

## Riskiest assumptions & experiments
| # | Assumption | Cheap test | Pass signal (tentative) |
|---|---|---|---|
| 1 | Owners will write a plant's backstory *before* any handoff | Reddit (r/houseplants) and Instagram post: "What's the oldest plant you own and its story?" plus a landing page with a "register your plant's story" form | 100+ story submissions in 2 weeks; median story longer than 3 sentences |
| 2 | Adopters value the history | At a local plant swap, attach paper story cards with QR to half the plants | Storied plants picked first; more than 50% of adopters scan the QR |
| 3 | Rehomers want to follow their plant | Same swap: ask givers "want updates from the new home?" | More than 40% opt in |
| 4 | People pay for tags | Pre-order page for a 5-tag pack | Pre-order conversion above 3% of landing visitors |

## Metrics
- % of registered plants with an origin story
- Handoffs per month, and % of handoffs where the receiver continues posting
- Follow-from-afar opt-in rate
- Tag sales and shop partners onboarded

## Open questions
- One app with [[sprout-day]] or two separate brands? (Leaning: shared backend, decide after both validations.)
- Final name. Avoid "passport" because of the EU regulation.
- Do we show lineage publicly by default or only to the family?
- How should the plant's age be estimated when nobody knows its birth year?

## Next steps
- [ ] Run experiment 1 (story call-out) — no code needed
- [ ] Find one local plant swap event for experiments 2 and 3
- [ ] Trademark and domain check for the working names
- [ ] Draft sample handover self-introductions for 3 plants (rich past, inherited past, unknown past). See [[plant-voice]].
