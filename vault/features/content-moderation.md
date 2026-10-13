---
title: Content moderation
status: drafting
created: 2026-10-02
updated: 2026-10-02
tags: [feature, safety, trust, ai]
serves: [sprout-day, every-plant-has-a-past]
---

# Content moderation

> **Rule (user requirement, 2026-10-02):** nothing sexual, violent, discriminatory or hurtful is ever posted. Every text and image is checked by AI moderation **before** anyone else can see it.

Serves [[sprout-day]] and [[every-plant-has-a-past]] · Related: [[plant-voice]], [[principles]] · Sources: [[competitive-landscape#Moderation APIs and app store rules]] · Back to [[index]]

## Also an app store requirement
Apple guideline 1.2 (user-generated content) requires: **a filter for objectionable material, a way to report it with a timely response, blocking of abusive users, and published contact info.** Reviewers commonly also ask for terms of use (EULA) with **zero tolerance** for objectionable content, and **action on reports within 24 hours**. Apple also bans apps used mainly for **"random or anonymous chat"**, which is one more reason owners never chat freely here. Google Play has its own UGC policy; check it at build time.

## What gets checked: everything other people can see
| Content | Written by | Checked before it's visible |
|---|---|---|
| Plant lines ([[plant-voice]]) | AI | ✔ |
| Owner edits of plant lines | Owner | ✔ |
| Plant names, owner nicknames | Owner | ✔ |
| Origin stories, past-life memories, handover notes | Owner | ✔ |
| Photos, profile icons | Owner | ✔ image moderation |
| Translations shown to readers | AI | ✔ (cached per language) |

Reactions are preset icons (☀️ 💧 🌱), so they need no check.

## What's blocked
| User's words | Category |
|---|---|
| Sexual | Any sexual content. Children may be present through Sprout Day schools. |
| Violent | Violence, graphic content, threats |
| Discriminating | Hate or discrimination based on identity |
| Hurting | Harassment, bullying, insults, **including mild unkindness** toward another plant or its owner ("your plant is ugly", "you're killing it") |

Also blocked: personal info (phone numbers, emails, addresses, links, social handles) and spam or ads. **Self-harm** content isn't just blocked; the author is shown support resources.

Standard moderation APIs don't flag mild unkindness, so "hurting" needs our own **kindness check** (step 3 below). Playful banter between plants ("Lua, that's showing off") is fine; anything mocking a plant's looks or an owner's care is not.

## Pipeline: checked before posting, and nothing posts if a check can't run
1. **Rule filter** (instant, free): links, emails, phone numbers, handles, plus English and Japanese blocklists, including Japanese slang and deliberate misspellings.
2. **AI moderation API**, text and images: sexual, violence, hate, harassment, self-harm.
3. **Kindness check:** an LLM classifier for our own rule, "is this unkind toward another plant, owner or group?"
4. **Decision:**
   - pass → published
   - fail → not published. The author sees a gentle *"This can't be shared here. Want to edit it?"* with no details that would teach evasion.
   - unsure (medium severity or low confidence) → **held for human review**, invisible until approved
5. **If any moderation service is down, hold the content.** Nothing is published unchecked.

AI-drafted plant lines go through steps 2–3 *before the owner even sees the draft*. A failing draft is regenerated once, then silently dropped.

## Plant vocabulary causes false alarms
Plant talk uses alarming words literally: *dying, dead leaves, kill, cut, chop, root rot, "I'm DYING"* (a dramatic peace lily). Generic moderation may flag these as violence or self-harm. So:
- tell the classifiers the context ("a houseplant community; words about plants dying or being cut are normal");
- include plant vocabulary in the test set (see Experiment);
- send borderline cases to human review rather than blocking them outright.

## After publishing
- A **Report** button on every line, photo and plant page (one tap, with reason chips).
- **Auto-hide** after several reports (threshold TBD), pending review.
- **Human review within 24 hours** (store requirement).
- **Block:** hide a plant or owner from all your chats.
- **Strikes:** first blocked item → gentle note; repeats → temporary posting freeze → ban (account and device).
- **Appeals** for false positives.
- Published community guidelines and contact info, and terms of use with zero tolerance, accepted at sign-up.

## Photos: privacy too
Photos should show plants. Detect faces, documents and screens with personal info → ask the owner to retake or crop, or blur faces automatically. EXIF data is always stripped ([[principles]]).

## Kids (Sprout Day schools)
Through teacher accounts only. Strictest thresholds; the teacher approves students' posts; no photos of children.

## Vendor candidates (decide at build time with a Japanese test)
| Option | Covers | Notes |
|---|---|---|
| OpenAI omni-moderation | Text + images, 13 categories | Free (per 2026 sources); improved across 40 languages, but **Japanese quality not explicitly documented → test it** |
| Azure AI Content Safety | Text + images: hate, sexual, violence, self-harm, with severity levels; custom categories; PII detection | **Japanese explicitly trained and tested**; paid |
| LLM classifier (e.g. Claude) | The custom kindness check | Choose model and cost at build time (use the claude-api skill) |

Leaning: a free API for step 2, an LLM for step 3, then benchmark both languages before launch. If Japanese results are weak, switch step 2 to Azure.

## Risks
| Risk | Mitigation |
|---|---|
| App Review sees it as "random or anonymous chat" | Owners never type freely: AI-drafted, short, moderated lines; preset reactions; no direct messages; reporting and blocking built in |
| False positives on plant vocabulary frustrate users | Context-aware prompts, plant-vocabulary test set, human review for borderline cases |
| Japanese evasion (slang, symbols) | Blocklist updates, user reports |
| Delay before a line appears | "Sending…" state; target under 2 seconds |
| Cost at scale | Rule filter first; cache translations; free API where good enough |

## Metrics
- % of submissions blocked or held
- Appeal success rate (a proxy for false positives)
- Time from report to action (must be under 24 hours)
- Reports per 1,000 posts

## Experiment
Build an English/Japanese **test set of 200+ items**: harmful examples in each category, Japanese slang, and *normal plant talk* ("my pothos is dying", "cut below the node", "root rot killed it"). Run the candidate vendors. Pass signal (tentative): ≥95% of harmful items caught, and ≤2% of normal plant talk wrongly blocked.

## Open questions
- Report threshold for auto-hide (3?).
- Who reviews: the founder at first, a moderation vendor later?
- Should reporters be told the outcome?
