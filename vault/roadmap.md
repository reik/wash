---
title: Feature inventory & dev priority
created: 2026-10-08
updated: 2026-10-08
---

# Feature inventory & dev priority

Back to [[index]] · Principles: [[principles]] · Stack: [[tech-direction]]

## Product center of gravity (2026-10-08)
> **My plant has a life I document, a voice I edit, friends I watch, and a private windowsill when something real happens. If it ever changes homes, its life can go with it.**

| Layer | Role |
|---|---|
| **Core loop** | Plant record + photos/logs → public plant-to-plant chat → watch & react |
| **Personal warmth** | [[windowsill-talk]] |
| **Depth** | Biography, traits, age, milestones |
| **Continuity (common)** | Cuttings / Family chat |
| **Signature long-arc (uncommon)** | Handover + past-life chapters |
| **Deprioritized** | [[sprout-day]] annual event, class map, kits, schools B2B |

**Primary idea for build:** [[every-plant-has-a-past]] reframed as *plant society + biography*, with handover as destiny feature — not the daily engine.  
**[[sprout-day]]:** keep designed, status → **parked / later**. Homeroom concept may return later as optional “circles”; not required for v1.

---

## All features planned (inventory)

### A. Foundation (platform)
| ID | Feature | Notes |
|---|---|---|
| F1 | iPhone + Android apps (Expo RN) | Requirement from day one |
| F2 | Auth + minimal owner profile | Nickname/icon only; plant is protagonist |
| F3 | i18n EN + JA | First commit; machine-translate plant lines on display |
| F4 | Web landing + public plant pages | QR opens without app; deep links into app |
| F5 | Push notifications | Cap ≤2/day; no guilt copy ([[daily-rhythm]]) |
| F6 | Photo upload + EXIF strip | Privacy default |
| F7 | Content moderation pipeline | Rules + AI + kindness check; hold if down ([[content-moderation]]) |
| F8 | Report / block / strikes / 24h review ops | App store UGC |

### B. Plant record & human input
| ID | Feature | Notes |
|---|---|---|
| F9 | Register plant (name, photo-identified species, place city/country, origin story) | Core object |
| F10 | Chapters (time + place periods) | Even single-owner “life so far” |
| F11 | Photo moments + same-angle guide | Fuels voice triggers |
| F12 | Care/life event logs | Water, repot, move, travel, etc. |
| F13 | Milestones + age counter | First leaf, flower, birthday… |
| F14 | Memorial state | Plant dies; record remains |
| F15 | Print-at-home QR tag + short code | PDF; NFC later |
| F16 | Multi-plant garden home | “Today in my garden” |

### C. Plant voice — public society
| ID | Feature | Notes |
|---|---|---|
| F17 | Event → AI draft line | Real events only ([[plant-voice]]) |
| F18 | Owner Send / Edit / Keep quiet | Editor role |
| F19 | Species temperament table | ~50 common plants |
| F20 | Earned traits (rule-based) | Dramatic, Survivor, etc. |
| F21 | Voice stages | Newborn / growing / elder |
| F22 | Group: **Circle** (matchmade, [[circles]]) | Small plant group; owners read/react only |
| F23 | Group: **Family** (parent + cuttings) | Higher-base-rate continuity than handover |
| F24 | Soft reactions only | ☀️ 💧 🌱 — no free-text public comments in v1 |
| F25 | Translation per reader | Each sees own language |
| F26 | Running plot / reply-to-event lines | Less salute, more serial |
| F27 | Promote path from private → public | From [[windowsill-talk]] |

### D. Windowsill talk (private)
| ID | Feature | Notes |
|---|---|---|
| F28 | Event-triggered private opener | Plant speaks first |
| F29 | Owner short replies (≤3 turns) | Not open chatbot |
| F30 | Cooldown / daypart caps | Shared spirit with public limits |
| F31 | Check-in only with recent context | No fake banter empty state |

### E. Daily rhythm & discovery
| ID | Feature | Notes |
|---|---|---|
| F32 | Family-tree groups | Same family → order → class ([[circles]], 2026-10-15) |
| F33 | Overnight / while-away digest | Home screen |
| F34 | Friends’ photos + weather strip | Explains plant talk |
| F35 | Daypart scheduling jobs | Morning / day / evening |

### F. Continuity & long-arc (Past)
| ID | Feature | Notes |
|---|---|---|
| F36 | Create cutting → child record + Family link | Prefer over rehome for v1 continuity |
| F37 | Handover transfer code → new chapter | Signature; not retention-critical |
| F38 | Giver chooses memories that travel | Privacy |
| F39 | Past-life voice at intro + occasional recall | No invented history |
| F40 | Follow from afar (opt-in by current owner) | Previous owner milestones |
| F41 | Redact earlier chapter | Privacy after handover |
| F42 | Family tree visualisation | Explicitly **not v1** (store links only) |

### G. Sprout Day (deprioritized)
| ID | Feature | Notes |
|---|---|---|
| S1 | Annual global date + 48h window | Parked |
| S2 | Pre-registration + live country map | Parked |
| S3 | Seed track + cutting track | Parked |
| S4 | Class of year + homeroom assignment at scale | Parked (small Circles may ship without the event) |
| S5 | Weekly class photo day + monthly collage | Parked |
| S6 | Class superlatives (not leaderboards) | Parked |
| S7 | Official kits (local per country) | Parked |
| S8 | Printed yearbook | Parked |
| S9 | Teacher/school accounts + kid path | Parked |
| S10 | Company/team classes + sponsors | Parked |
| S11 | Sprout Day pilot (validation) | Only if/when idea revived |

### H. Monetization & growth (later)
| ID | Feature | Notes |
|---|---|---|
| M1 | Premium (extra plants, HD archive) | After core loop works |
| M2 | Printed plant biography book | POD |
| M3 | Physical durable tags (shop/B2B) | |
| M4 | Shop birth-certificate tags | B2B |
| M5 | Relocation partnerships | Handover-adjacent |

---

## Dev priority

### P0 — Validate before heavy build (no full app required) — **in progress 2026-10-08**
1. Tone samples: public lines + windowsill threads (feel test) → [[tone-samples]] **written**; needs owner scoring
2. Story/biography call-out (will people write plant life stories?) → [[story-callout]] **drafts ready**; needs posting
3. Hand-run plant group chat (Discord): draft → approve → react → [[circle-pilot]] **plan ready**; needs participants
4. Thin windowsill arm in the same hand-run → included in [[circle-pilot]]

### P1 — MVP build (ship a real app people use daily)
**Goal:** one plant (or a few) has a record, a voice, a small circle of plant friends, and private windowsill talk.
**Gate:** wireframes and build tickets start only after P0 is solid (user direction, 2026-10-08). Exception: the **data model + detailed feature list were drafted early by user request** — [[data-model]], [[feature-list]].

| Order | Ship | Feature IDs |
|---|---|---|
| 1 | App shell, auth, EN/JA, moderation baseline, report/block | F1–F3, F7–F8 |
| 2 | Plant register + photos + logs + milestones + garden home | F6, F9–F13, F16 |
| 3 | Public plant voice draft + Send/Edit/Keep quiet | F17–F21, F25 |
| 4 | Circles + matchmaking + soft reactions + digest home | F22, F24, F32–F35 · [[circles]] |
| 5 | Windowsill talk + optional promote | F28–F31, F27 |
| 6 | Web public plant page (basic) | F4 |
| 7 | Pushes (digest + one highlight), ≤2/day | F5 |

**MVP explicitly includes:** safety, i18n, camera photos, plant society, windowsill.  
**MVP explicitly excludes:** Sprout Day event, schools, kits, marketplace, NFC, family-tree UI, free-text public comments, open-ended chatbot.

### P2 — Continuity depth (soon after MVP)
| Order | Ship | Feature IDs |
|---|---|---|
| 1 | Cuttings → Family chat | F23, F36 |
| 2 | Richer chapters / biography presentation | F10, F13 |
| 3 | Memorial | F14 |
| 4 | Print-at-home QR + short code | F15 |
| 5 | Plotline-ish reply behavior polish | F26 |

### P3 — Signature long-arc (Past handover)
| Order | Ship | Feature IDs |
|---|---|---|
| 1 | Handover transfer + new chapter | F37–F38 |
| 2 | Past-life intro voice + recall | F39 |
| 3 | Follow from afar + redact | F40–F41 |
| 4 | Physical tags / shop pilots | M3–M4 |

Build data model ready for chapters/handover in P1 if cheap; **don’t block MVP** on adopter loops.

### P4 — Sprout Day & big social surface (later / if revived)
S1–S11, M5 as needed. Re-open only after P1 retention looks healthy and originality search is done.

### P5 — Monetization polish
M1–M2, printed books, premium tiers — after habitual use exists.

---

## Suggested milestone names
| Milestone | Meaning |
|---|---|
| **M0 Voice** | Samples + hand-run society chat pass feel/metrics |
| **M1 Windowsill Garden** | P1 MVP app: record + circle + public voice + windowsill |
| **M2 Family** | Cuttings + Family chat + biography depth |
| **M3 Handover** | Transfer, past-life, follow-from-afar |
| **M4 Sprout (optional)** | Annual event layer on the same backend |

---

## What changed vs earlier drafts
- [[sprout-day]] no longer paired as co-equal v1 idea → **deprioritized**
- Handover stays in product myth, **not** P1 engagement dependency
- [[windowsill-talk]] elevated into P1
- “Homeroom” in v1 = small **Circle** of matchmade plants ([[circles]]), not “Class of 20XX”

## Kickoff decisions (2026-10-08)
- [x] Circle membership without Sprout Day → ~~matchmaking by point scoring~~ → **grouping by plant family, then order, then class** (changed 2026-10-15, [[circles]])
- [x] Rate budgets → **separate**: public ≤3/day, windowsill ≤2/day, plus one hard global AI ceiling per plant ([[plant-voice]], [[windowsill-talk]])
- [x] Backend → **Supabase** (Postgres + Auth + Storage + Edge Functions) + a small scheduler worker picked at kickoff ([[tech-direction]])
- [x] Product name → **Sasawis** — sasawis.app domain confirmed available 2026-10-08; trademark/App Store checks still pending
