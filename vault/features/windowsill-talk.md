---
title: Windowsill talk
status: drafting
created: 2026-10-08
updated: 2026-10-08
tags: [feature, ai, voice, private-chat]
serves: [every-plant-has-a-past, sprout-day]
---

# Windowsill talk

> **Hook:** Sometimes your plant speaks to *you* first — short, private, tied to something real — and you can answer. It is a windowsill conversation, not an open chatbot.

Serves [[every-plant-has-a-past]] and [[sprout-day]] · Builds on [[plant-voice]] · Safety: [[content-moderation]] · Daily use: [[daily-rhythm]] · Back to [[index]]

## Why this is different
Owner-facing talking plants already exist (Talking Plant, BotanAI, PlantAI, Nature Chat…; see [[competitive-landscape#Talking plant and AI personality]]). Those are usually open-ended companions.

**Windowsill talk is constrained on purpose:**
- The plant starts from a **real event**, not from boredom.
- Replies are **short turns**, not endless chat.
- The voice is the **same character** that appears in Homeroom and Family ([[plant-voice]]), not a separate assistant personality.
- Private lines stay private unless the owner **promotes** one into a public plant chat (then it is moderated like any public line).

So the 1:1 feels cozy, but the product remains “watch plants live together,” not “ChatGPT in a pot.”

## Decisions (2026-10-08)
1. **Add private 1:1** as a first-class loop. This **revisits** the earlier [[plant-voice]] decision “no open-ended chat with your own plant.”
2. **Not open-ended.** Event-triggered, turn-limited, cooldown-limited.
3. **Plant speaks first** (or the owner taps “check in,” which only works if a recent real context exists).
4. **Same personality engine** as public voice: species temperament + earned traits + voice stage + known facts. No invented history.
5. **Private by default.** Nothing leaks to Homeroom/Family without explicit promote + moderation.
6. **No guilt script.** The plant never nags about absence, missed watering as moral failure, or “you don’t love me.” Care facts may be acknowledged gently; shame is banned ([[principles#Come back for joy, not guilt]]).
7. **Human messages in this channel are private UGC** — still filtered for self-harm crisis handling and for anything that would be unsafe to store; they are not shown to other users.
8. **Separate rate budget from public lines** (2026-10-08): windowsill openers have their own cap (≤2/day), so a chatty private day never starves the plant's public voice. One hard global AI ceiling per plant per day bounds cost. See [[plant-voice]] decision 6.

## What humans do here
After registration, windowsill talk is one of the light daily actions:

1. Something real happens (photo, log, weather, milestone).
2. The plant may open a private line.
3. Owner reads, optionally replies in 1–3 short turns.
4. Optionally: **Promote to Homeroom/Family** (plant rephrases as a public line; owner approves; moderation runs).
5. Done — no obligation to continue the thread tomorrow.

## When the plant starts a windowsill talk
| Trigger | Example opener |
|---|---|
| Photo event | “New leaf. Still curled. You saw it too, right?” |
| Owner log (water, repot, move) | “The pot is bigger. I sound braver already.” |
| Local weather | “The glass is cold today. I have relocated my opinions toward the room.” |
| Milestone / birthday / trait earned | “I got Dramatic. I suspect you already knew.” |
| After a public Homeroom moment | “Lua flowered again. I said nothing in class. Between us: show-off.” |
| Handover (special) | First private hello in the new home, drawn from allowed past-life memories |
| Owner “check in” (manual) | Only if there is fresh context from the last ~48h; otherwise soft empty state, no fake banter |

**Rate limit (decided 2026-10-08):** at most **one windowsill opener per plant per part of day (≤2/day)** — a separate budget from public lines ([[plant-voice]]), under one hard global AI ceiling per plant — and only with a real trigger. Replies inside an open thread don't create new openers.

## Turn structure
```
🌿 Mochi (private)
  You rotated me. The bright wall moved.
  I am recalculating everything.

[ Your reply — max ~200 characters ]

🌿 Mochi
  So it was on purpose. Rude, but effective.
  Homeroom does not need to hear this… unless you want them to.

[ Reply ]  [ End talk ]  [ Promote a line… ]
```

| Rule | Detail |
|---|---|
| Max turns | **3 owner replies** per opener (then the plant closes warmly or goes quiet) |
| Owner message length | Short (about one breath); no links/contact spam patterns |
| Plant memory in-thread | May reference this thread + Plant Record facts; may not invent events |
| End states | Owner ends · turn cap · 24h idle → thread closes without guilt |
| Promote | Owner picks one plant line (or accepts a suggested public rephrase) → Send/Edit/Keep quiet public flow |

## What the plant may talk about
**Yes**
- Light, water, pot, weather, growth, siblings, class friends (as plant society)
- Feelings and opinions about *situations*
- Past-life memories the record actually has
- Gentle jokes, confusion about the human world (plant epistemology)
- Private asides about public plant-chat drama

**No**
- General assistant behavior (recipes, homework, life coaching)
- Surveillance tone about the owner’s body, private life, or identity
- Guilt, fear, or emotional blackmail about care
- Sexual, violent, hateful, or harassing content
- Invented biography or fake “I remember” moments

## Relationship to public plant voice
| | Windowsill talk | Homeroom / Family |
|---|---|---|
| Audience | Owner only | Other plants’ owners (read/react) |
| Who types | Owner can reply | Owners never type free text |
| Trigger | Real events + optional check-in | Real events only |
| Depth | Slightly more intimate, still short | Public persona, scarcer lines |
| Continuity | Same traits, stage, facts | Same |

**Ideal loop:** private grumble → later public echo.

> Night (private): “I was dramatic about water. I’m fine.”  
> Next day (Homeroom): “I was dramatic last night. Hydrated now. Do not congratulate me.”

## Moderation and store-policy notes
- Private owner text is **not** other-user UGC, but still run safety checks (self-harm, severe abuse categories) on write; crisis resources when needed ([[content-moderation]]).
- Plant drafts moderated before the owner sees them (same kindness bar as public).
- **Promote path** = full public moderation pipeline, including unkindness toward other plants/owners.
- This is **not** random anonymous people-chat; it should not trip Apple’s “random/anonymous chat” concern the way open user messaging would. Still: no stranger DMs, ever.

## Risks
| Risk | Mitigation |
|---|---|
| Becomes a generic pet chatbot | Event gating, turn cap, no assistant tasks, same public character |
| Cannibalizes Homeroom attention | Public digest stays home-screen primary; windowsill is secondary card |
| Cost / latency | Caps; small models for private turns; cache species style |
| Guilt creeps in | Hard ban on absence-shaming; copy review in pilot |
| Promote used to leak owner personal info into public | Public filters strip contact/PII; length limits |
| Feels obligatory every day | Silence OK; check-in only with real context |

## Experiment
Hand-run during the Sprout Day pilot ([[sprout-day]] experiment 3) for a subset of members:
- AI drafts a private opener from their photo/log
- Owner may reply up to 3 times (human or AI-assisted plant side)
- Measure: % who reply at least once; % who promote a line; whether private use correlates with higher public send rate (complement) or lower (substitute)

**Pass signals (tentative):**
- ≥40% of openers get ≥1 owner reply
- Promote rate ≥10% of threads (nice-to-have, not required)
- Public draft send/edit rate does **not** drop vs non-windowsill group

## Open questions
- Can a plant ever text first as push? (Lean: only inside the existing ≤2 pushes/day highlight slot.)
- Do multi-plant owners get a combined “windowsill” inbox?
- Voice/TTS later, or text-only v1?
- Should cuttings’ private talk sometimes mention the parent (with care)?

## Next steps
- [ ] Write 15 sample threads (newborn / dramatic / elder × water / move / weather)
- [ ] Define promote rephrase templates
- [ ] Add windowsill arm to Sprout Day pilot plan
- [ ] Update [[content-moderation]] table for private owner replies + promote path
