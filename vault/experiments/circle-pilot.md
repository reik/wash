---
title: P0 — Circle pilot
status: drafting
created: 2026-10-08
updated: 2026-10-19
tags: [experiment, validation, p0, discord]
---

# P0 — Circle pilot

Hand-run the core loop with zero app: **photos in, AI-drafted plant lines out, owners approve, everyone watches.** Tests [[plant-voice]], [[windowsill-talk]], [[circles]] and [[daily-rhythm]] in one container. (This is the Sprout Day pilot's engine, run without the event while [[sprout-day]] is parked.)

**Terms:** a **Circle** is one small group of plants (8 or more in the pilot, target ~24 in the real app) grouped by plant family, then order, then class, and mixed across countries and time zones — see [[circles]]. In this pilot, one Discord channel = one Circle. Owners never chat in it; only plants "speak" (via us, with owner approval).

Back to [[roadmap]] (P0) · [[index]]

## Decisions (2026-10-19)
- **Mixed JA + EN from the start** (owner's choice). The owner recruits EN friends in addition to JA call-out responders ([[story-callout]], round 1 is JA-only), so the time-zone claim in [[daily-rhythm]] can be tested.
- **Every line is posted bilingually** (JA + EN together). This also tests per-reader translation (F25) for real, using the rules pinned in [[tone-samples]].
- Lines are **AI-drafted and the owner approves**; participants are told so up front (see Consent).


## Setup (1 evening)
- Discord server, free
- Channels: `#start-here` · one channel per circle, named after its group (e.g. `#circle-aroids`) · `#photos` · `#windowsill` · `#announcements`
- Target: **20–30 participants**: ≥12 JA and ≥8 EN, **at least 3 time-zone bands** (e.g. Japan, Europe, Americas). If the EN friends all share one zone, count it and say so in the verdict. Every circle should contain both languages where the plant groups allow.
- Each participant registers **one plant** through the sign-up form below (answers land in a shared sheet)
- **Match by hand** with the [[circles]] ladder: identify each photo, look up its family, group by family, then order, then class, with a circle opening at 8 plants. Expect 2–3 circles from 20–30 plants, mostly order or class level at this size.
- Guest rule (7 days waiting) and time-zone tie-breaker apply as in [[circles]]; with so few plants, apply them by eye.

## Consent (post in `#start-here`, JA + EN)
- Plant lines are drafted by AI from your photos and logs; **nothing is posted without your ✅**
- Photos and logs stay inside this server and are used only for this pilot; no third-party sharing
- Leave any time; ask the operator to delete your data
- Owners don't type in circle channels; only reactions (☀️ 💧 🌱)

Full text is in [[#Start-here post]]. The required consent field in the sign-up form below is the matching opt-in. Placeholders to fill: `[CONTACT]`, `[SHEET URL]`, `[START DATE]`.

## Start-here post

**Pinned message, JA first, EN directly below.** Registration in the sheet counts as consent; say so explicitly.

### JA
> **ようこそ🌿 植物たちがおしゃべりする、小さな実験へ**
>
> ここでは、みなさんの植物が、ほかの国の植物たちとおしゃべりします。話すのは植物だけ。みなさんは見て、スタンプ（☀️ 💧 🌱）で反応するだけです。
>
> **しくみ**
> 1. 下のシートに、植物を1つ登録してください：[SHEET URL]
> 2. 写真や、水やり・植え替えなどのできごとを、`#photos` に投稿
> 3. その植物の「ひとこと」を、AIが下書きして、あなただけにDMで届けます
> 4. ✅ でそのまま投稿、✏️ で直す、🤫 で今回はだまる。**あなたが✅するまで、何も公開されません**
> 5. 承認された言葉は、日本語と英語の両方で、サークルに流れます
>
> **お約束**
> - 「最近来ていませんね」のような、罪悪感をあおる通知は送りません
> - 写真と記録は、このサーバーの中だけで使います。第三者には渡しません
> - 期間は [START DATE] から8週間。いつでも抜けられます
> - 削除したい時は [CONTACT] までひとこと。すぐ消します
>
> **ご注意**
> 植物のセリフは、AIが下書きして、みなさんが承認したものです。植物が本当にしゃべっているわけではありません（そう見えたらうれしいです）。
> サークルの中で、人どうしの会話はしません。スタンプだけでお願いします。
>
> 登録＝上のことに同意、ということにさせてください。質問は [CONTACT] へ。

### EN
> **Welcome 🌿 to a small experiment where plants talk**
>
> Here, your plant chats with plants from other countries. Only the plants speak. You watch and react with a stamp (☀️ 💧 🌱).
>
> **How it works**
> 1. Register one plant in the sheet: [SHEET URL]
> 2. Post photos and real events (watered, repotted…) in `#photos`
> 3. An AI drafts a line for your plant and sends it to you in a DM
> 4. ✅ to post as written, ✏️ to edit, 🤫 to stay quiet this time. **Nothing is shown until you ✅ it**
> 5. Approved lines appear in your circle in both Japanese and English
>
> **Our promises**
> - No guilt notifications, like "we haven't seen you lately"
> - Your photos and logs stay in this server and are never shared with third parties
> - It runs for 8 weeks from [START DATE]. Leave any time
> - To delete your data, message [CONTACT] and we'll remove it right away
>
> **Good to know**
> Your plant's lines are drafted by AI and approved by you. Your plant isn't literally talking (we hope it feels like it is).
> People don't chat with each other inside the circles. Reactions only, please.
>
> Registering means you agree to the above. Questions: [CONTACT].

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

## The daily machine (batched, ~20 min/day)
Replaces "15 min × 2/day". One batch per day keeps the operator load low and makes drafting efficient:
1. **Collect** the day's events (photos, logs) from the sheet and `#photos`.
2. **Draft** (paste the batch into a Claude session): for every event, one line per plant in the plant's voice, written **in JA and EN**, following [[tone-samples]] style and the translation rules.
3. **DM each owner** their draft, in the owner's language:
   > 🌿 Mochi wants to say in Circle A: "New leaf. Still curled. Don't look yet." — reply ✅ to post, ✏️ to edit, 🤫 to keep quiet.
4. **Post approved lines** into the circle channel as the plant (bot account, or manual with plant-name prefix), JA + EN together.
5. **Morning digest** per time-zone band: "While you slept: …" (hand-written from the sheet + channels).
6. **Windowsill arm (volunteers only, ~8 people):** after their plant's event, also send a private opener and allow up to 3 replies; ask if any line is worth promoting to the circle.
7. **Reactions only** in circle channels: ☀️ 💧 🌱. No free text between owners ([[content-moderation]]).

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
- **Cross-language reactions:** reactions on lines written in a language other than the reader's native one (does translation carry the charm?)
- **Translation edits:** how often an owner edits a JA/EN pair because the translation is off (target <15%)
- **AI cost log** (feeds business model draft (not yet merged)): per plant per day, drafts generated, drafts sent, and approximate tokens or cost. Output: AI cost per active user per month vs the ~US$0.05/month break-even flagged in the business model.

## Checkpoints and kill criteria (be honest)
- **Week 2 hard check:** if <40% of drafts are sent or edited despite voice tuning → voice isn't landing; stop and rework before week 3
- Circle chat dies without daily operator effort → the loop isn't self-sustaining yet
- Owners start treating it as a chatroom for humans → concept drifts; revisit "owners never type"
- AI cost per active user clearly above break-even with no obvious fix → pricing and caps need redesign before building (business model draft (not yet merged))

## Exit interview (5 questions, week 8)
1. Which plant do you remember best — that isn't yours?
2. Did you ever open Discord just to check the circle? Why that moment?
3. Did your plant feel like a character? When did it click?
4. Windowsill arm only: did private talk make the public lines better or redundant?
5. Would you pay ¥600/$4 for a printed "year one" book of your plant's lines and photos?

## Next steps
- [x] Decisions locked 2026-10-16: circle opens at 8, guest fallback and time-zone tie-breaker confirmed ([[circles]])
- [x] Me: sign-up form drafted (above)
- [ ] You: create Discord + the form from the table above (30 min); post the consent text in `#start-here`
- [x] Me: consent text (JA + EN) and `#start-here` welcome post (2026-10-19)
- [ ] You: fill `[CONTACT]`, `[SHEET URL]`, `[START DATE]` in the post (JA wording passed 2026-10-19)
- [ ] You: recruit: JA from [[story-callout]] responders and plant communities (aim 15), EN from friends (aim ≥8, from at least 2 time-zone bands beyond Japan)
- [ ] Me: hand-match circles from the sheet ([[circles]] ladder, by hand)
- [ ] Me: pre-write 30 opening lines from registration data so day 1 isn't silent
- [ ] Both: run 8 weeks with the week-2 check, fill the metrics sheet, verdict into the log
