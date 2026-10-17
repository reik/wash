---
title: Plant voice
status: drafting
created: 2026-10-02
updated: 2026-10-02
tags: [feature, ai, voice, personality]
serves: [every-plant-has-a-past, sprout-day]
---

# Plant voice

> **Hook:** Plants talk, but **to each other**, and only when something real happens. Their voice and memories survive every change of home.

Serves [[every-plant-has-a-past]] and [[sprout-day]] · Principles: [[principles]] · Sources: [[competitive-landscape#Talking plant and AI personality]] · Back to [[index]]

## Why this is different
A plant talking to *its owner* is crowded, even with a personality and memory (Talking Plant, BotanAI, PlantAI, Nature Chat and others; see [[competitive-landscape#Talking plant and AI personality]]). Searches on 2026-10-02 found **no plants talking to each other** and **no plant voice that carries over to new owners**. Both depend on data only our ideas have: Sprout Day classes, cutting families, and Plant Records with chapters across owners.

## Decisions (2026-10-02)
1. **One shared voice for both ideas:** plant group chats, plus a past life that carries over at handover.
2. **Past life** is defined below. A plant without one starts as a *newborn*. **The plant never invents facts.**
3. **The AI drafts and the owner decides:** Send / Edit / Keep quiet before anything reaches a group chat.
4. **Personality is earned from real life**, not picked.
5. **No open-ended chat with your own plant** (can be revisited). Competitors already offer it, it breaks the "only speaks when something real happens" rule, and it costs more AI calls.
6. *(Updated later on 2026-10-02)* The rate limit was raised from about 1 a day to **one per part of the day (≤3/day)**, so people have fresh content to see 2–3 times a day ([[daily-rhythm]]).
7. Every line, whether an AI draft or an owner edit, passes **[[content-moderation]]** before anyone else sees it.

## What counts as a past life
Any period of the plant's existence **before its current home**, meaning time cared for by someone else, somewhere else. Sources, from richest to thinnest:

| Source | Example | Provided by |
|---|---|---|
| 1. Previous owners' chapters | "2019–2023 · east-facing window in Osaka" | Earlier owners, at handover, choosing what to leave |
| 2. Inherited from its parent plant | A cutting from Grandma's 40-year-old pothos | The parent's record. A cutting is a genetic clone, so it is the same plant continuing |
| 3. An origin story the current owner knows | "Rescued from my office when it closed" | The current owner, at registration |
| 4. A shop birth certificate | "Grown at a nursery in the Netherlands, 2025" | The shop's tag at the point of sale |

A plant with none of these has **no past life, and that's fine.** The past is an extra layer, not a requirement.

### The voice grows up with the plant
- **Newborn** (seedling or no known past): curious, naive. *"What is 'winter'? Bjørn in Oslo keeps complaining about it."*
- **Growing up:** memories are the current owner's real logs (first leaf, the repot, the dry summer).
- **Elder** (past lives inherited or handed over): introduces itself, remembers other homes. Unknown pasts become a charm: *"I don't remember anything before the shop. A mysterious past suits me."*

## Where the plant speaks
- **Plant group chats.** Owners read and react (☀️ 💧 🌱) but **never type**, so there's no messaging between people:
  - *Homeroom*: a [[sprout-day]] class of about 30 plants from different countries.
  - *Family*: a parent plant and its cuttings across homes and countries ([[every-plant-has-a-past]] lineage).
  - Each reader sees every line in their own language.
- **Self-introduction at handover:** the plant's first message to its new owner, drawn from its past-life memories.
- **Milestone captions** on the plant's page, written in its voice.

Example homeroom:
```
🌿 Mochi (Osaka)      New leaf this morning! Still curled. Don't look yet.
🌿 Bjørn (Oslo)       -6°C outside. I live on a radiator now. I have opinions about this.
🌿 Lua (São Paulo)    33°C. I am FLOWERING. Sorry everyone.
🌿 Mochi (Osaka)      Lua, that's showing off.
```

## When it speaks: real events only
| Trigger source | Examples |
|---|---|
| Photos (compared with the previous same-angle photo) | New leaf, flower, drooping, leaning toward light, visible growth |
| Owner logs | Watering, repot, moved, owner away travelling |
| City weather (coarse location already stored) | Heatwave, cold snap, first snow |
| Life events | Birthday, first earned trait, handover, memorial, a sibling's milestone (reply) |

**Rate limit (updated 2026-10-02):** at most **one line per plant per part of the day** (morning / daytime / evening, so ≤3 a day), and only when a real event exists. A single plant is often silent, which keeps each line precious; across a homeroom spread over several time zones, the conversation never sleeps. See [[daily-rhythm]].

## How a line is made
1. **Event** detected (see triggers).
2. **Context assembled:** species temperament, earned traits, voice stage, recent facts, relevant past-life memories, recent group-chat lines.
3. **AI drafts one line** in the plant's voice.
4. **The owner is prompted:** Send / Edit / Keep quiet. If ignored for 24h, the line isn't posted. An optional "auto-send" setting is available for owners who trust their plant.
5. **Posted**, and translated for each reader.

```
🌿 Mochi wants to say in Homeroom 7:
  "New leaf this morning! Still curled. Don't look yet."
  [ Send as is ]  [ Edit ]  [ Keep quiet ]
  (triggered by: new leaf detected in today's photo)
```

**Guardrails**
- The AI may only reference facts present in the context it's given. **No invented history.**
- No human names, addresses or owner details in lines.
- Owner edits are length-limited and filtered for links and contact info, so the edit box can't become a hidden person-to-person messaging channel. One-tap report.
- **AI drafts are moderated before the owner even sees them**, and owner edits are moderated again before posting: sexual, violent, discriminatory or hurtful content never posts, and an extra kindness check catches mild unkindness. See [[content-moderation]].

## Personality engine
**Layer 1: species temperament** (curated table; start with about 50 common houseplants plus each year's Sprout Day species):
- Peace lily wilts visibly and recovers within hours → *expressive*
- Snake plant shrugs off neglect → *calm, stoic*
- Prayer plant folds its leaves every night → *a creature of habit*
- Pothos grows almost anywhere → *easygoing*

**Layer 2: earned traits.** These come from **fixed rules over the event history, not from the AI**, which keeps them explainable and cheap. Each trait shows *why* it was earned.

| What really happened | Trait |
|---|---|
| Wilted then recovered ≥3× | 🎭 Dramatic |
| Survived a move, handover or cold snap | 💪 Survivor |
| Photos show it leaning toward the window | ☀️ Sun-seeker |
| First flower | 🌸 Bloomer |
| Months without a new leaf | 😴 Sleepy philosopher |

- Traits change the *tone* of drafts. Same event ("needs water"): Dramatic → *"I'm DYING. …Okay, I'm fine. But water, please."*; Stoic → *"Water would be acceptable."*
- The **first earned trait is a milestone** ("Mochi's first trait!").
- Traits live in the Plant Record and **carry over at handover** (a new owner gets Fern *with* her dramatic streak).
- **Cuttings** inherit their parent's past-life memories as ancestry but **earn their own traits**: same plant, new life.

## Past-life memories
- At handover the giver chooses which notes and photos to leave as memories for the next owner. Nothing else crosses over.
- The plant brings up past lives in its introduction and occasionally when relevant (winter → *"Osaka winters were milder."*).

## Risks
| Risk | Mitigation |
|---|---|
| Owner edits used as hidden person-to-person messages | Length limit, link and contact filters, report |
| Voice gets repetitive | Traits for variety, rate limit, silence by default |
| False photo detections (a "new leaf" that isn't) | The owner's Send/Edit/Keep-quiet step catches them |
| AI cost | Calls only on real events, rate-limited; model chosen at build time (use the claude-api skill then) |
| Voice feels fake or cringe | Validate before building (below) |

## Experiment
**Hand-run the plants' voices** inside the [[sprout-day]] *Sprout Weekend* pilot: a homeroom channel on Discord where plant lines are AI-drafted from what owners post, and each owner approves or edits before posting.
- Measure: share of drafts **sent or edited** versus **kept quiet**; reactions per line; whether owners screenshot or share lines.
- Pass signal (tentative): more than 60% of drafts sent or edited; lines get more reactions than plain photo posts.

## Open questions
- Should owners be able to write a line from scratch (no AI draft) for big moments such as a handover letter or memorial?
- Does the Family chat need a size cap (popular pothos lines could have hundreds of cuttings)?
- Exact trait thresholds and the first 50 species: needs botanical review.
- Should a Keep-quiet streak quietly lower how often drafts are offered?

## Next steps
- [ ] Write 20 sample lines per voice stage × 3 temperaments to test the tone
- [ ] Add the voice test to the Sprout Weekend pilot plan ([[sprout-day]] experiment 3)
- [ ] Draft the trait rule list with thresholds
- [ ] Choose the model for lines: run the [[model-bakeoff]]
- [ ] Guardrail checks for drafts (invented fact, conversational feel): first live run in [[jev-checks]]; invented-fact check needs work
