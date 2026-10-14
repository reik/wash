---
title: Translate on tap
status: drafting   # drafting → building → review → shipped
created: 2026-10-14
updated: 2026-10-14
tags: [feature, i18n, translation]
serves: [every-plant-has-a-past, sprout-day]
---

# Translate on tap

> **Hook:** Plants from other countries speak in their own words. Tap **Translate** when you want to understand them.

Serves [[every-plant-has-a-past]] and [[sprout-day]] · Principles: [[principles]] · Voice: [[plant-voice]] · Safety: [[content-moderation]] · Back to [[index]]

**The moment:** Mochi's line arrives in Japanese, 「新しい葉っぱ、まだ見ないで」. It looks charming even unread. Tap Translate and it becomes "New leaf. Don't look yet." Tap again to see the Japanese.

## Why this changes the earlier plan
Until now the plan translated every line automatically for every reader ([[plant-voice]] step 5, [[principles]] "machine-translated on display"). The user asked on 2026-10-14 for translation **only when Translate is tapped**. Reasons it is better:
- **The world stays visible.** Seeing Japanese, Portuguese and Norwegian side by side is part of the international feel; auto-translation hides it.
- **Cost.** Translating only tapped lines, cached per language, costs a fraction of translating every line into every reader's language.
- **Trust.** The reader always knows what the plant really said and what is a machine's reading of it.

## Decisions (2026-10-14)
1. **Original first** (user, 2026-10-14). Text written in another language than the reader's app language shows as written, with a **Translate** button.
2. Proposed, not yet confirmed: an optional setting **"Always translate [language]"**, offered after the reader has tapped Translate on that language a few times. Off by default.

## How it works
### What gets a Translate button
| Text | Button? | Why |
|---|---|---|
| Plant lines in circles and family chats | Yes | The main case |
| Lines an owner edited before sending | Yes | Same as plant lines |
| Plant page: biography, past-life chapters, handover letter | Yes | Long-arc stories cross owners and countries |
| Public web plant page | Yes | Visitors may have no app |
| Windowsill talk (private 1:1) | No | Always in the owner's own language |
| App text, buttons, reactions, plant-moji labels | No | Already localised (EN + JA) |

The button only appears when the text's language differs from the reader's app language.

### Tapping
1. Tap **Translate**. The line swaps in place to the reader's language, with a small label: "Translated from Japanese · Show original".
2. Tap **Show original** to swap back. The choice holds for that line while the chat is open.
3. While waiting, the line shows a soft shimmer. Target: under 1.5 seconds.
4. If translation fails or is blocked, the original stays and a small note says "Couldn't translate right now".

### Behind the tap
1. Every line stores its **source language** when it is written (the plant drafts in its owner's language; owner edits are detected).
2. On tap, look up the cache for (line, reader's language).
3. On a cache miss, translate the line, keeping the plant's tone, so a grumpy cactus still sounds grumpy in English.
4. Run the translation through [[content-moderation]] before showing it, as already required for translations shown to readers.
5. Store it in the cache, shared by every reader of that language.

Lines are not edited after posting (deleted instead), so a cached translation never goes stale. Deleting a line deletes its translations.

### Data
Extends the translations planned in `data-model.md` (not yet on `main`): translations are created **lazily on the first tap**, not when the line is posted.
- `lines.source_lang`
- `line_translations`: line, target language, text, model used, moderation status, created; one row per line and language.

## Risks
| Risk | Mitigation |
|---|---|
| Readers tap Translate on almost every line, so it is just friction | Measure taps per shown line by language pair; offer "Always translate" |
| Machine translation flattens the plant's personality | Translate with a short tone hint from the plant's traits; spot-check JA ↔ EN in [[tone-samples]] |
| Slow translation breaks the flow | Cache, prefetch nothing by default, show a shimmer |
| Translation produces something harmful the original was not | Moderate the translated text too; fall back to the original |
| Text sent to a translation vendor | Say so in the privacy policy; send only the line, never names or locations beyond what is public |

## Experiment
No code. Run inside [[circle-pilot]]:
1. Post plant lines only in the owner's language.
2. Members react with 🌐 on any line they want translated; the organiser replies in a thread with the translation.
3. Over two weeks, measure the share of lines that get 🌐, by language pair, and ask members whether seeing the original felt charming or annoying.

Pass signal (tentative): fewer than half of foreign-language lines get 🌐, and most members say the originals add to the feel. If nearly every line gets 🌐, make "Always translate" the default instead.

## Open questions
- Confirm the "Always translate [language]" setting and when to offer it.
- Translate with a general machine translation API or an LLM with a tone hint? Trade-off: cost versus keeping the plant's voice.
- Should the plant's first line in a new circle be auto-translated once, as an introduction?
- Long biographies: translate whole chapters on tap, or paragraph by paragraph?

## Next steps
- Update [[plant-voice]] step 5 and the i18n line in [[principles]] to "original first, translate on tap" once the 8–9 Oct vault work is on `main`.
- Add the card to the kanban Backlog and the row to [[index]] at the same time.
