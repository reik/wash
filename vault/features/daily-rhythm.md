---
title: Daily rhythm
status: drafting
created: 2026-10-02
updated: 2026-10-02
tags: [feature, engagement, notifications]
serves: [sprout-day, every-plant-has-a-past]
---

# Daily rhythm

> **Hook:** Your plant's friends live in other time zones, so there's always something new. You wake up to what they said overnight.

Serves [[sprout-day]] and [[every-plant-has-a-past]] · Builds on [[plant-voice]] · Back to [[index]]

## Goal (user requirement, 2026-10-02)
People open the app **every day, a couple of times a day**, to see their plant's friends' conversations, photos and updates.

**Come back for joy, not guilt** (see [[principles]]): reasons to return are *new things that happened*, never obligations. No streaks, no "your plant misses you", no penalty for being away.

## The time-zone relay (core mechanism)
Homerooms ([[sprout-day]]) and family chats ([[every-plant-has-a-past]]) mix plants from **at least 3 time-zone bands**: Asia-Pacific, Europe/Africa, the Americas. Plants speak about real *local* events (sunrise, weather, photos taken in daylight), so the conversation keeps moving around the clock. Each time you open the app, a different part of the world has been awake.

A day for an owner in Osaka:
| Local time | What's new |
|---|---|
| 07:00 | **Overnight digest:** "While you slept: snow for Bjørn in Oslo, Lua flowered in São Paulo, 14 new lines, 3 photos." |
| 12:30 | Your plant's own line (from today's photo), plus Asia-Pacific friends' new photos |
| 21:00 | Europe is waking up; friends reply to your plant's line; the goodnight round |

## When plants speak: three parts of the day
| Part of day | Real trigger |
|---|---|
| Morning | Local sunrise plus today's weather in the plant's city |
| Daytime | Photo-detected events (new leaf, flower, leaning…), owner logs |
| Evening | Replies to friends' events of the day; "folding up for the night" (prayer plants really do) |

**Rate limit (replaces the earlier "about 1 per day" in [[plant-voice]]):** at most **one line per plant per part of the day (≤3/day)**, and only when a real event exists. A single plant is often silent; the *group* never is.

**Supply check (assumption, to measure in the pilot):** 30 plants × up to 3 drafts = ≤90 drafts/day per homeroom. If around 40% are sent, that's about 35 lines spread across 24 hours, enough fresh content for 2–3 visits a day.

## Home screen: "Today in my garden"
1. **Your plants' drafts waiting:** Send / Edit / Keep quiet. A small, satisfying daily task.
2. **"While you were away" digest** for each chat: count of new lines, photos and milestones; tap to jump to the first unread.
3. **Friends' new photos**, shown as same-angle before/after comparisons.
4. **Weather strip for friends' cities** (Oslo -6°C ❄️ · São Paulo 33°C ☀️). It explains *why* the plants are saying what they say.
5. **Coming up:** birthdays, anniversaries, the Sprout Day countdown.

## Daily photo
An optional daily photo, with a prompt at good light around local midday. The weekly class photo stays the official one ([[sprout-day]]). Every photo can trigger lines (new leaf, flower), which becomes content for friends.

## Push notifications (iOS and Android)
- **At most 2 a day**, sent in the owner's local time and outside their quiet hours.
- ① the morning digest; ② one highlight (your plant has a draft waiting, or a friend's milestone that mentions your plant).
- Only a handover introduction may go over the cap.
- **Never guilt:** no "you haven't visited", no "your plant is sad".

## Metrics (targets tentative)
- Sessions per daily active user ≥ 2
- DAU/MAU ≥ 40%
- D1 / D7 / D30 retention
- Draft send-or-edit rate ([[plant-voice]])
- Notification opt-out rate. If it's high, the app is too noisy.

## Risks
| Risk | Mitigation |
|---|---|
| Too much content, so it feels noisy | Per-daypart cap; digests collapse long threads |
| A homeroom goes quiet as members drop out | Minimum active size; merge quiet homerooms; refill with new members |
| Time-zone imbalance (a Japan-heavy launch) | Assignment rule of ≥3 bands; recruit English-speaking regions before launch |
| Guilt creeping in through notifications | Hard cap; no messages about absence |
| "Silence is normal" vs. the engagement goal | Silence applies per plant; activity is measured per group |

## Experiment
In the Sprout Weekend pilot ([[sprout-day]] experiment 3), assign homerooms across ≥3 time-zone bands and post a morning digest by hand. Measure the share of members active at ≥2 different times a day (based on reaction and read timestamps) in week 2 versus week 6.

## Open questions
- A public "world feed" beyond your own chats? More content, but more moderation load ([[content-moderation]]).
- One combined digest or one per chat?
- Trigger the morning line at local sunrise or at a fixed time?
