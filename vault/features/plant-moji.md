---
title: Plant-moji
status: drafting   # drafting → building → review → shipped
created: 2026-10-13
updated: 2026-10-13
tags: [feature, moji, emotion, monetization]
serves: [every-plant-has-a-past]
---

# Plant-moji

> **Hook:** Every plant has its own emoji set, made from its own leaf. A plant usually shows no emotion, so we read what really happened to it and imagine the feeling.

Serves [[every-plant-has-a-past]] · Principles: [[principles]] · Voice: [[plant-voice]] · Back to [[index]]

**The moment:** Mochi goes a week without water, then gets a drink. That evening a bowing-leaf "grateful" moji appears in Mochi's set. The next morning Lua in São Paulo uses it in the homeroom, and Mochi's owner sees "used in São Paulo today".

Sketches (throwaway, not final art): `mockups/plant-moji/plant-moji-leaf.html` is the chosen direction; `plant-moji-samples.html` is the earlier potted version.

## Why this is different
Searched 2026-10-12; add these to [[competitive-landscape]] when that note is next edited.

- **Sensor faces on pots exist.** Lüa (15 animated faces), Fytó (six emotions from soil, heat and light) and [Plantiemoji](https://www.accessnewswire.com/newsroom/en/consumer-and-retail-products/plantalk-unveils-plantiemoji-the-ai-powered-emotional-plant-interface-1159377) (Kickstarter, May 2026; details are the company's own claims) all turn sensor readings into a face on a screen. See also [Fytó](https://www.raspberrypi.com/news/turn-your-houseplant-into-a-pet/) and [Lüa](https://laughingsquid.com/?p=770618).
- **Photo-to-sticker tools exist.** iOS sticker lift, [AI Emojis](https://mwm.ai/apps/ai-emojis/6738027263) and [Emoji My Dog](https://apps.apple.com/ph/app/id1232127041) cut any photo into a sticker. None are tied to events or to other users. No plant-specific one was found.
- **Not found:** moji that belong to one specific plant, are created by its real events, and are used by other plants in conversation.

What only we can do: the events come from the same pipeline as [[plant-voice]], and the audience is the plant's circle ([[circles]]).

## Decisions (2026-10-13)
1. **The leaf is the moji** (user, 2026-10-13). One leaf and one manga mark. No pot, no whole plant, so a street tree, a garden fern and an indoor pothos all work.
2. **No eyes, no mouth** (user, 2026-10-12). Faces on plants already exist and sit in [[parking-lot]].
3. **Emotions, not care states** (user, 2026-10-12). The set is feelings such as happy, sad, mad, grateful and embarrassed, not "thirsty" or "hot".
4. **A moji belongs to one plant** (user, 2026-10-12). The leaf outline is the identity: heart for a pothos, holes for a monstera, a fan for a ginkgo.
5. **Much simpler than the first sketch** (user, 2026-10-13). It must still read at chat size.

Proposed, not yet confirmed by the user:
- Each feeling is **earned from a real event**, never picked from a menu.
- Names are **Japanese sound-words** (るんるん, しょぼん, ぷんぷん, ぺこり, てれてれ) with a plain label in the reader's language.
- Earning model A below.

## How it works
### From event to feeling
The feeling is our interpretation of an event the plant already has on record. Examples:

| What happened | Feeling | How the leaf shows it |
|---|---|---|
| Sunny morning, fresh water | Happy るんるん | upright, tilted, music note |
| Lost a leaf | Sad しょぼん | hanging from a bent stalk, gloom lines, tear |
| Moved away from the window | Mad ぷんぷん | stiff and straight, anger mark |
| Watered after a dry week | Grateful ぺこり | bowing forward, heart |
| Caught with a yellow leaf | Embarrassed てれてれ | turned away, blush lines, sweat drop |

Further feelings sketched: startled, sleepy, excited, worried, proud, cozy.

### Making a moji
1. An event is detected (same triggers as [[plant-voice]]).
2. The event maps to one feeling from a **fixed vocabulary**.
3. If the plant does not have that feeling yet, a moji is made: the plant's leaf outline, bent into the pose for that feeling, plus the mark.
4. The owner sees it appear in the plant's set. Nothing is public until it is used on a line.

The leaf outline is meant to be traced from a photo of the plant's own leaf, so each set is unique without hand drawing. This step is untested.

### Using a moji
- A plant attaches one of its own moji to a line it posts.
- A plant can **borrow** a moji from another plant in its circle when it has no moji for that feeling.
- A borrowed moji shows whose it is ("Mochi's ぺこり").

Every moji image passes [[content-moderation]] before anyone else sees it. The fixed vocabulary means there is no free text to moderate.

## Earning
The user asked for a way to earn points or money when a plant's moji is used.

| Option | How it works | Trade-off |
|---|---|---|
| **A. Sunlight points (proposed for v1)** | Each borrow gives the origin plant one point. The owner sees where the moji travelled, not a public count. | Fits "no ranking" in [[principles]]; no payouts, tax or age checks. |
| **B. Points with real value (later)** | Points redeem for premium months, extra moji slots or credit on a printed sticker sheet. | Needs premium to exist ([[roadmap]] P5). |
| **C. Cash revenue share (set aside)** | Others buy a moji pack; the owner gets a cut. LINE Creators Market paid about half after the store fee on 2014–15 figures; current terms not verified. | Digital sales must use in-app purchase; payouts need identity checks, tax handling and 18+. Most LINE creators earned little. |

- The owner's own posts earn nothing. Paying for them invites farming and turns posting into a chore.
- A **printed sticker sheet** of a plant's own moji is the cleanest real revenue: a non-living physical good, sold through Stripe outside in-app purchase ([[tech-direction]]).

Sources: [LINE first-year results](https://techcrunch.com/?p=1159348) · [LINE launch terms](https://techcrunch.com/?p=988798) · [Apple forum on tips and guideline 3.1.1](https://developer.apple.com/forums/thread/844046) · [Apple forum on coin cash-out](https://developer.apple.com/forums/thread/126848). The Apple links are developer threads, not the guideline text; re-check at build time.

## Risks
| Risk | Mitigation |
|---|---|
| Tracing a leaf from a photo and bending it into poses may look bad | Test by hand on real photos before any build (see Experiment) |
| The mark is hard to see below about 30 pixels | Design each feeling so the leaf's pose alone is readable; test at chat size |
| "Mad" depends entirely on the anger mark | Give it its own pose in final art |
| Rigid plants (cactus pads) can only tilt | Allow a species-specific pose set |
| Points become a ranking | Show places travelled, never totals to other people |
| Name is close to the Plantiemoji product | Check trademarks before using "plant-moji" publicly |
| Image generation cost per moji | A plant earns each feeling once; the vocabulary is small |

## Experiment
No code. Run inside [[circle-pilot]]:
1. Ask five pilot owners for one clear photo of a single leaf.
2. Hand-draw a five-feeling set for each plant from that photo.
3. Upload them as custom emoji in the pilot Discord, named by plant.
4. Tell owners when their plant's moji was used by someone else.

Measure: how often moji are used, the share of uses that are borrowed, and whether owners ask for more feelings. Pass signal (tentative): at least half of the sets get borrowed in the first two weeks, and at least two owners ask for another feeling unprompted.

## Open questions
- Earning: confirm A for v1, B later, C set aside.
- Does a moji attach to a line, replace the three soft reactions (☀️ 💧 🌱), or both?
- How many feelings are in the fixed vocabulary at launch?
- Can a plant borrow from outside its circle?
- Keep the sound-word names, or use plain labels only?
- What does a plant with no clear leaf (moss, a cactus ball) use?

## Next steps
- Add the feature to [[index]] and the kanban Backlog, and the sources to [[competitive-landscape]], once the vault is on `main`.
- Record option C in [[parking-lot]] if the user confirms it is set aside.
- Hand-trace one real leaf photo to see whether the outline idea holds up.
