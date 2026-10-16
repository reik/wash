---
title: P0 — Circle pilot
status: drafting
created: 2026-10-08
updated: 2026-10-16
tags: [experiment, validation, p0, discord]
---

# P0 — Circle pilot

Hand-run the core loop with zero app: **photos in, AI-drafted plant lines out, owners approve, everyone watches.** Tests [[plant-voice]], [[windowsill-talk]], [[circles]] and [[daily-rhythm]] in one container. (This is the Sprout Day pilot's engine, run without the event while [[sprout-day]] is parked.)

**Terms:** a **Circle** is one small group of plants (8 or more in the pilot, target ~24 in the real app) grouped by plant family, then order, then class, and mixed across countries and time zones — see [[circles]]. In this pilot, one Discord channel = one Circle. Owners never chat in it; only plants "speak" (via us, with owner approval).

Back to [[roadmap]] (P0) · [[index]]

## Setup (1 evening)
- Discord server, free
- Channels: `#start-here` · one channel per circle, named after its group (e.g. `#circle-aroids`) · `#photos` · `#windowsill` · `#announcements`
- Target: **20–30 participants**, ideally ≥5 countries and 3 time-zone bands
- Each participant registers **one plant** through the sign-up form below (answers land in a shared sheet)
- **Match by hand** with the [[circles]] ladder: identify each photo, look up its family, group by family, then order, then class, with a circle opening at 8 plants. Expect 2–3 circles from 20–30 plants, mostly order or class level at this size.
- Guest rule (7 days waiting) and time-zone tie-breaker apply as in [[circles]]; with so few plants, apply them by eye.

## Sign-up form (Google Form / Tally, EN + JA)
One form per participant; the answers feed the matching and the opening lines.

| # | Field | Why |
|---|---|---|
| 1 | Plant's name (or a nickname we can call it) | Identity of the plant; no human names needed |
| 2 | A photo of the plant (upload) | Identification by hand; EXIF is stripped by us before it is shared |
| 3 | What do you think it is? (optional) | Cross-check for the identification |
| 4 | City and country | Coarse location only; gives the time zone and weather |
| 5 | Stage: newborn / growing / elder | Voice stage ([[plant-voice]]) |
| 6 | Language: English / 日本語 | Which version of the lines the owner reads |
| 7 | One-line backstory: where did it come from? (optional) | Fuel for opening lines; link to [[story-callout]] if they sent a story |
| 8 | Discord username | Where draft lines are sent for approval |
| 9 | Windowsill arm: would you try private plant talk too? (yes / no) | Recruit the ~8 volunteers |
| 10 | Consent (required): lines will be posted as your plant in a group visible to other participants; you can leave any time | Moderation and privacy ([[principles]]) |

How the answers are used: the photo and field 3 give the plant's family, order and class (Pl@ntNet free app, then GBIF); field 4 gives the time-zone band; fields 5 and 7 give the opening line for day 1.

## The daily machine (run by us, 15 min × 2/day)
1. **Morning (per region):** post a digest in each circle — "While you slept: …" (hand-written from the sheet + channels)
2. **On real events** (a member posts a photo or a log: watered, repotted, flowered): draft 1 line in that plant's voice, DM it to the owner:
   > 🌿 Mochi wants to say in Circle A: "New leaf. Still curled. Don't look yet." — reply ✅ to post, ✏️ to edit, 🤫 to keep quiet.
3. Post approved lines into the circle channel as the plant (bot account or manual with plant-name prefix).
4. **Windowsill arm (volunteers only, ~8 people):** after their plant's event, also send a private opener and allow up to 3 replies; ask if any line is worth promoting to the circle.
5. **Reactions only** in circle channels: ☀️ 💧 🌱. No free text between owners (moderation rule from [[content-moderation]]).

## Weekly rhythm (8 weeks)
| Day | What |
|---|---|
| Sun | Photo day — same-angle photo in `#photos` |
| Wed | Weather-triggered lines (check members' cities) |
| Sat | Weekly highlight: best line, mirror-twin moment, milestone |

## Metrics sheet (per week, per circle)
- Drafts offered / sent / edited / kept quiet → **pass: >60% sent or edited**
- Reactions per line (vs reactions per plain photo post)
- Active members (posted or reacted) at week 2 / 4 / 8 → **pass: >30% at wk4, >15% at wk8**
- Share of members active at ≥2 different times of day ([[daily-rhythm]] assumption)
- Windowsill arm: openers replied to (**target ≥40%**), promotes (≥10%), and whether public send-rate drops vs non-windowsill members (substitution alarm)
- Screenshots shared outside Discord (organic, count when mentioned)

## Kill criteria (be honest)
- <40% drafts sent/edited after week 2 despite voice tuning → voice isn't landing; rework before any build
- Circle chat dies without daily operator effort → the loop isn't self-sustaining yet
- Owners start treating it as a chatroom for humans → concept drifts; revisit "owners never type"

## Exit interview (5 questions, week 8)
1. Which plant do you remember best — that isn't yours?
2. Did you ever open Discord just to check the circle? Why that moment?
3. Did your plant feel like a character? When did it click?
4. Windowsill arm only: did private talk make the public lines better or redundant?
5. Would you pay ¥600/$4 for a printed "year one" book of your plant's lines and photos?

## Next steps
- [x] Decisions locked 2026-10-16: circle opens at 8, guest fallback and time-zone tie-breaker confirmed ([[circles]])
- [x] Me: sign-up form drafted (above)
- [ ] You: create Discord + the form from the table above (30 min)
- [ ] You: recruit from [[story-callout]] responders + plant communities (aim 30)
- [ ] Me: hand-match circles from the sheet ([[circles]] ladder, by hand)
- [ ] Me: pre-write 30 opening lines from registration data so day 1 isn't silent
- [ ] Both: run 8 weeks, fill the metrics sheet, verdict into [[2026-10-08|log]]
