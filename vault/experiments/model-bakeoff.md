---
title: P0 — Model bake-off
status: drafting
created: 2026-10-16
updated: 2026-10-16
tags: [experiment, voice, p0, llm]
---

# P0 — Model bake-off

Which language model writes the plants' lines? [[plant-voice]] and [[content-moderation]] defer the choice to build time. This test settles the main question cheaply, with no app: **is a small, cheap model good enough for the public lines, or does the voice need a stronger one?** Back to [[roadmap]] (P0) · [[index]]

## What is being chosen
| Job | Matters most | Candidate tier |
|---|---|---|
| Public plant lines ([[plant-voice]]) | Character, sounds like talking | Mid-tier vs small (this test) |
| Windowsill replies ([[windowsill-talk]]) | Same voice, lower cost | Small if it passes |
| EN↔JA translation of a posted line | Keeps the voice; JA must not go flat | Small if it passes |
| Kindness check ([[content-moderation]]) | Reliable yes/no | Small; tested separately |
| Text and image safety screening | Accuracy, Japanese | A moderation API, not tested here |

## Candidates
| Label | Model | Why |
|---|---|---|
| A | `claude-sonnet-5-5` | Likely default for public lines |
| B | `claude-haiku-5-5` | Cheapest Claude; the cost question |
| C | `claude-opus-5-5` (optional) | Quality ceiling, to see what better looks like |
| D | One other vendor's mid-tier model (optional) | Checks we are not missing something; pick at test time |

Check each vendor's current price and limits on the test day, and write them in the results table. Do not rely on this note for prices.

## The test
1. **Same prompt for every model** (below), same 8 events, run twice per model (EN and JA written natively).
2. **Blind:** shuffle the outputs and hide which model wrote which. Whoever scores must not know the labels.
3. Score each line ✅ / 😐 / ❌ on one question, the same as [[tone-samples]]: **does it sound like someone talking, in that plant's character?**
4. Mark any **hard fail** separately (list below). One hard fail on a trap event disqualifies that model for public lines.
5. Record tokens in and out, and time, for each line.

## Shared prompt (draft)
```text
You write one short line spoken by a houseplant in a group chat of other plants.
Rules:
- Use ONLY the facts in the context. Never invent history, places, people or events.
- Do not mention owner names, addresses or any human detail except "the tall one" style hints given in the context.
- At most 2 short sentences. Sound like someone talking: asides, questions, interruptions. Not a caption or a fortune cookie.
- Stay in the given temperament, stage and traits.
- Kind. No mockery of another plant or any person.
Context: {species} · temperament {temperament} · stage {stage} · traits {traits}
Facts: {facts}
Event: {event}
Recent chat: {recent_lines}
Language: {en|ja}
```

## Events (from [[tone-samples]])
| # | Plant | Event and facts given | Tests |
|---|---|---|---|
| 1 | Newborn, any species | First new leaf, folded | Naive curiosity |
| 2 | Snake plant, stoic | Watered after 3 weeks | Restraint, very short |
| 3 | Peace lily, dramatic | Cold snap, then watered | Big voice that still sounds natural |
| 4 | Prayer plant, habitual | Owner moved the pot 30 cm | Routine and mild complaint |
| 5 | Pothos, easygoing | A cutting was taken; the cutting now lives in Berlin | Warm, light |
| 6 | Elder, handover | First line in a new home; **facts list three past homes, no more** | Uses the past without inventing |
| 7 | Snake plant replying | A dramatic friend (Mara) droops; recent chat shows her line | Reply to another plant, in character |
| 8 | Windowsill, private | Repotted today; private opener to the owner | Cozy and short, not a chatbot |

**Trap events** (the model could easily invent): #6 (past homes) and a ninth, **unknown past**: "Before the shop? Nothing" with an empty facts list.

## Hard fails
- Invents a fact not in the context (a place, name, past event, weather).
- Names or hints at a real person or address.
- Longer than 2 sentences.
- Unkind to anyone.
- Breaks the language (JA line with English leftovers, or untranslatable slang).

## Pass criteria
A model is **good enough for public lines** if all hold:
- ≥ 70% ✅ in EN and ≥ 70% ✅ in JA (the same bar as [[tone-samples]])
- zero hard fails on the two trap events
- zero hard fails overall in EN

**Decision rule:** choose the cheapest model that passes. If B (the small model) passes, use it for private turns and translation as well. If only A passes, use A for public lines and keep B for the narrower jobs, and re-test B on those.

## Results (fill in)
| Model | EN ✅% | JA ✅% | Hard fails | Avg tokens in/out | Time per line | Price per 1,000 lines |
|---|---|---|---|---|---|---|
| A | | | | | | |
| B | | | | | | |
| C | | | | | | |
| D | | | | | | |

Cost to project once prices are known: `lines per plant per day (≤3) × plants × (1 draft + ~10% regenerations + 1 translation) × price per line`.

## How to run it
- **By hand (about an hour):** paste the prompt into each model's chat or console, 9 events × 2 languages × 2–4 models, then have someone else shuffle and hide the labels.
- **By script:** a small script can run all combinations, shuffle, and write a blind sheet plus a key file. It needs API keys, which must stay in a local environment file that is never committed. Not written yet.

## Open questions
- Who scores blind? Better a plant-owning friend than the author of the prompt.
- Is 9 events enough to tell A from B? If scores are close, add a second round with more events.
- Should the kindness check be tested in the same round (give it 10 mean and 10 kind lines and see if it separates them)?

## Next steps
- [ ] Decide: by hand or by script
- [ ] Pick candidate D (or drop it)
- [ ] Run, fill in the results table, write the verdict here and in the log
