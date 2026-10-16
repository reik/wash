---
title: Feature list (detailed)
created: 2026-10-08
updated: 2026-10-08
---

# Feature list (detailed)

Companion to [[roadmap]] (priority) and [[data-model]] (tables). Each feature: what it does, acceptance criteria, data deps, priority.
Legend: **P1** = MVP (Milestone 1 "Windowsill Garden") · **P2** = Family · **P3** = Handover · **P4/P5** = parked/later.

Back to [[index]]

---

## A. Foundation

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F1 | iOS + Android apps | Expo RN + TS, one codebase, EAS Build/Submit; newest Expo SDK shipping React 19.x | Installs on both stores; camera, push, QR scan work | P1 | — |
| F2 | Auth + minimal profile | Supabase Auth (email + Apple/Google); nickname + icon only; terms + age gate at signup | No real name/bio required; terms_accepted_at stored | P1 | profiles |
| F3 | i18n EN + JA | i18next from first commit; UI strings + plant-line translation display | Full UI in both; no hardcoded strings | P1 | line_translations |
| F4 | Web: landing + public plant pages | Vite + React 19 + Tailwind; QR short-code URL opens page without app; deep links into app | `/p/{short_code}` renders plant page; Universal Links/App Links | P1 | plants, lines (page) |
| F5 | Push notifications | APNs/FCM via Expo; ≤2/day; owner TZ + quiet hours; kinds: digest, highlight, draft_waiting, handover | Cap enforced server-side; opt-out honored | P1 | notifications, profiles |
| F6 | Photo upload + EXIF strip | Client strip + server verify; storage in Supabase | No GPS/EXIF remains (tested) | P1 | photos |
| F7 | Moderation pipeline | rules → AI API → kindness LLM; fail-closed (hold when down) | Nothing publishes unchecked; plant-vocabulary test set passes | P1 | moderation_checks |
| F8 | Report / block / strikes | 1-tap report with reason chips; auto-hide threshold; admin 24h review; strikes ladder; owner block | Store UGC requirements demonstrably met | P1 | reports, strikes, owner_blocks, admin_actions |

## B. Plant record & human input

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F9 | Register plant | name, first photo → plant-ID API suggests the species (Yes / Pick another / Not sure), classification from GBIF, city/country, optional origin story, estimated birth year | Plant live in <2 min; species confirmed, or at least the family inferred when "not sure"; origin story optional | P1 | plants, species |
| F10 | Chapters | Time+place periods; auto-created at registration and handover; redactable | One open chapter per plant enforced | P1 | chapters |
| F11 | Photos + same-angle guide | Daily optional photo; camera overlays ghost of previous photo in the same angle group | Overlay aligns with last photo | P1 | photos |
| F12 | Care/life event logs | One-tap: watered, repotted, moved, owner away; each becomes a plant_event | Log → event row → may trigger draft | P1 | plant_events |
| F13 | Milestones + age counter | Auto milestones (first leaf, first flower, birthdays); age from estimated_birth_year | Age shown as "~3 years"; uncertainty okay | P1 | plant_events |
| F14 | Memorial | Owner marks plant deceased → memorial state; record and lines stay readable; Family notified via event | No guilt copy anywhere | P2 | plants.status |
| F15 | Print-at-home QR tag + short code | PDF stake/card linking to public page; short code fallback | Scan → F4 page | P2 | plants.short_code |
| F16 | Garden home ("Today in my garden") | Home screen: drafts waiting, digests, friends' photos, weather strip, coming-up | Matches [[daily-rhythm]] layout | P1 | notifications, lines, photos |

## C. Plant voice — public

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F17 | Event → AI draft | Context = species temperament + traits + stage + recent events + memories + recent chat; one line; moderation before owner sees | No invented facts (tested with planted-fact evals) | P1 | plant_events, lines |
| F18 | Send / Edit / Keep quiet | 24h expiry; edits length-limited, link/contact-filtered, re-moderated; optional auto-send setting | Expired drafts disappear silently | P1 | lines.status |
| F19 | Species temperament table | ~50 curated species with temperament + climate class | Botanical review sign-off | P1 | species |
| F20 | Earned traits | Fixed rules over event history (wilt-recover ×3 → Dramatic…); each trait shows evidence | Traits explainable; first trait = milestone | P1 | traits |
| F21 | Voice stages | newborn / growing / elder prompts; elder reads past-life memories | Samples pass [[tone-samples]] bar | P1 | plants.stage |
| F22 | Circle chat | ~24-plant group feed; owners read + react only, never type | Owners have no text input in circle UI | P1 | circles, lines |
| F23 | Family chat | Parent + cuttings across homes; same rules as circle | Cutting birth creates family link | P2 | families, lines |
| F24 | Soft reactions | ☀️ 💧 🌱 only, on lines and photos; one per type per owner | No free-text public comments | P1 | reactions |
| F25 | Translation | EN↔JA machine translation, cached per line per locale; moderated | Reader always sees own locale | P1 | line_translations |
| F26 | Running plots | reply_to_line threading; "this week's story" emerges from events | Consecutive-day arcs occur naturally | P2 | lines.reply_to |
| F27 | Promote from private | Windowsill line → suggested public rephrase → Send/Edit/Quiet → full moderation | Promoted line links thread | P1 | lines.promoted_from |

## D. Windowsill talk (private)

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F28 | Private opener | Event-triggered, ≤2/day separate budget, plant speaks first; check-in allowed only with fresh context (<48h) | No opener without real trigger | P1 | windowsill_threads |
| F29 | Owner replies | ≤3 owner turns per thread; short text; closes warm or by cap/24h idle | No infinite threads | P1 | windowsill_messages |
| F30 | Cooldown + global ceiling | One hard AI-generation ceiling per plant per day across public+private | Cost bounded by config | P1 | jobs_log |
| F31 | No guilt, no assistant | Never scolds absence; refuses general-assistant tasks in-character | Prompt tests in CI | P1 | — |

## E. Daily rhythm & discovery

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F32 | Family-tree grouping | Circles by same family → order → class, per the ladder in [[circles]]; levels and sizes in `circle_rules` | Every placement follows the ladder; changing the rule needs no app release | P1 | circle_rules, matchmaking_queue |
| F33 | Overnight digest | Per-circle summary on home; tap → first unread | Digest by owner's morning | P1 | notifications |
| F34 | Friends' photos + weather strip | Before/after same-angle thumbs; city weather explains the talk | Weather for all member cities | P1 | photos |
| F35 | Daypart scheduler | Worker runs morning/day/evening per tz band; matchmaking + weather scans | jobs_log shows on-time runs | P1 | jobs_log |

## F. Continuity & long-arc

| ID | Feature | Detail | Acceptance criteria | Pri | Data |
|---|---|---|---|---|---|
| F36 | Cutting → child record | Register cutting with parent link → joins Family; inherits memories as ancestry, earns own traits | Parent sees cutting's milestones | P2 | plants.parent/family |
| F37 | Handover flow | Transfer code → receiver scans → chapter closes/opens → self-intro draft | Atomic claim; giver picks memories | P3 | handovers |
| F38 | Memory selection at handover | Giver checks which photos/notes travel; rest stays private | Only chosen memories visible after | P3 | past_life_memories |
| F39 | Past-life voice | Intro + occasional recall from visible memories only | Zero invented history (evals) | P3 | lines |
| F40 | Follow from afar | Previous owners get milestone pings if current owner allows | Opt-in respected both sides | P3 | plant_followers |
| F41 | Redact chapter | Previous owner can hide their chapter later | Redaction propagates to memories | P3 | chapters.redacted |
| F42 | Family tree visualization | Render lineage graph | — | P4 | families |

## G. Sprout Day — parked (S1–S11)
Annual event, pre-registration map, seed/cutting tracks, class-at-scale, class photos, superlatives, kits, yearbook, teacher accounts, sponsors, pilot. **All deferred**; homeroom needs are covered by Circles (F22/F32). See [[sprout-day]].

## H. Monetization — later (M1–M5)
Premium tier, printed biography book, physical tags, B2B shop tags, relocation partnerships. **P5** — only after retention is proven. No pricing decided yet (open).

## Cross-cutting acceptance for v1
- [ ] Nothing publishes without moderation pass; pipeline down = hold
- [ ] ≤2 pushes/day; no guilt copy anywhere
- [ ] No public follower/like counts; no free-text public comments
- [ ] Location shown at city/country only; EXIF stripped (tested)
- [ ] EN + JA parity on every shipped screen and plant line
