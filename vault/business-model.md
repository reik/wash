---
title: Business model, marketing plan and revenue forecast (first pass)
created: 2026-10-17
updated: 2026-10-17
status: drafting
---

# Business model, marketing plan and revenue forecast

Back to [[index]]. Feeds [[roadmap]] section H (M1–M5) and phase P5. Serves [[every-plant-has-a-past]] (primary); the [[sprout-day]] ideas are parked.

> **Every number below is a placeholder assumption, not a measurement.** Nothing is validated yet (P0 is still running). The point of this note is to name the assumptions so the P0/P1 pilots can confirm or kill them. Replace values as real data arrives.

## 1. Who pays for what

Today's notes list M1–M5 without saying who pays. Proposed split:

| Segment | Pays for | Why they would | Phase |
|---|---|---|---|
| Keeper (individual, the core user) | Premium subscription; printed Plant Biography book; durable tags | Wants to keep and show the plant's story (anniversaries, archive) | P5 |
| Shop / nursery (B2B) | Branded birth-certificate tags at point of sale | Gives customers a reason to return; tag is the shop's own marketing | after P5 |
| Relocation / moving services | Referral or partnership fee | "Rehome your plants" flow for expats | after P3 |
| Sponsors (Sprout Day) | Presenting-sponsor fee | Parked with the idea | P4, only if revived |

**Principle check ([[principles]]):** no streak loss, no guilt, no paywalled kindness. Premium may only add *capacity and keepsakes* (more plants, full-resolution archive, books), never gate the plant society or make the plant "sad" for non-payers.

## 2. Pricing hypotheses (to test, not decided)

| Item | Hypothesis | Basis |
|---|---|---|
| Free tier | 3 plants, standard-resolution archive, full society + windowsill within the rate budgets | Keeps the core loop free so circles stay populated |
| Premium ("Keeper") | US$3.99/mo or US$29.99/yr (about ¥3,800/yr, to be priced locally per store) | Typical hobby-app range; annual-first |
| Plant Biography book | US$39 retail, about US$22 COGS + shipping via print on demand | About US$17 margin per book |
| Tag pack (3 durable QR tags) | US$9 | About US$5 margin after unit cost and fulfilment |
| B2B shop tags | Per-tag fee or monthly plan; not modelled | Needs shop interviews first |

Store fees: assume 15% (Apple/Google small-business rates) on subscriptions, so net is about US$24 per paying user-year on a blend of annual and monthly plans. Physical goods sold through the web (Stripe) avoid the store cut.

## 3. Revenue forecast (3 scenarios, years after the P1 MVP launch)

Method: revenue = average paying users × US$24 net, plus books at 1% of average MAU per year × US$17, plus tag packs at 3% of average MAU per year × US$5. Paid conversion of MAU is 2% (conservative), 3% (base), 4% (optimistic). Average over a year is the mean of start and end of year.

| | Conservative | Base | Optimistic |
|---|---|---|---|
| MAU at end of Y1 / Y2 / Y3 | 3k / 8k / 15k | 10k / 30k / 70k | 40k / 120k / 300k |
| Paying users at end of Y1 / Y2 / Y3 | 60 / 160 / 300 | 300 / 900 / 2,100 | 1,600 / 4,800 / 12,000 |
| Subscription net, Y1 / Y2 / Y3 | $720 / $2.6k / $5.5k | $3.6k / $14.4k / $36k | $19k / $77k / $202k |
| Books + tags margin, Y1 / Y2 / Y3 | $480 / $1.8k / $3.7k | $1.6k / $6.4k / $16k | $6.4k / $26k / $67k |
| **Total net, Y1 / Y2 / Y3** | **$1.2k / $4.4k / $9.2k** | **$5.2k / $20.8k / $52k** | **$26k / $102k / $269k** |

Excluded: B2B shop tags, relocation partnerships, sponsors, and any one-off press spike.

### The finding that matters: AI cost can sink the base case

Plants talk on every circle and windowsill turn ([[plant-voice]], [[windowsill-talk]]), so each active plant has a variable LLM cost that most hobby apps don't have. Total net per average MAU in the base case is only about US$1.04 per year in Y3 (US$52k over about 50k average MAU), or about US$0.09 per month.

| AI + infra cost per MAU per month | Base Y3 cost (50k avg MAU) | vs. base Y3 revenue ($52k) |
|---|---|---|
| $0.02 | $12k | profitable |
| $0.05 | $30k | thin margin before any salary |
| $0.10 | $60k | **loss** |

So the number to measure early is **AI cost per MAU per month**. It comes from the P0 circle pilot ([[circle-pilot]]) and the model bake-off, using real lines-per-plant-per-day. If it lands above roughly US$0.05, the answer is not marketing: cut lines per day, use a cheaper model for most turns, cache and batch, or raise conversion. The one global AI ceiling per plant already in [[roadmap]] is the right lever. Moderation is cheap: OpenAI omni-moderation is free as of 2026 ([[competitive-landscape]]).

Fixed costs not modelled: Supabase, Apple (US$99/yr) and Google (US$25 once) accounts, translation, domain, legal/trademark.

## 4. Marketing plan

Positioning: **a plant's story and its friends, not another care-reminder app.** Planta and Greg own care ([[competitive-landscape]]); nobody owns story. Win on the 3-second moment ([[story-callout]]), not on features.

| Phase (see [[roadmap]]) | Goal | Actions | Success signal (placeholder) |
|---|---|---|---|
| P0 Validate | Prove the hook reacts | Story call-outs in EN + JA ([[story-callout]]); hand-run Discord circle ([[circle-pilot]]); landing page at sasawis.app with waitlist | Waitlist signups from call-outs; 8-week retention in the pilot |
| P1 MVP launch | First 1,000 daily users | Waitlist converts first; short story videos ("my plant's 3rd owner"); JA launch via X, Instagram, GreenSnap-style communities (home-market advantage) | Day-7 and Day-28 retention; MAU vs. the scenario table |
| P2–P3 Depth | Organic and press | Pitch "the world's most-travelled houseplant"; expat and moving communities; plant swaps and meetups with tags | Share of installs from referral links and public plant pages |
| P5 Monetize | Turn habit into revenue | Fake-door premium test first (see below); tags double as ads; shop partnerships | Paid conversion and AI cost per MAU vs. section 3 |

**SEO:** public plant pages are the web's long tail. Use the `marketing-seo` field list (meta, Open Graph, schema.org) when building them.

**Guardrails:** no ads inside the society, no dark patterns, no selling user photos, no cross-border shipping of living material ([[principles]]).

## 5. Cheap validation before building any billing

Per the "no-code validation first" rule, test willingness to pay before P5 exists:

1. On the waitlist landing page, show the premium and book prices and measure click-through on a fake "Reserve" button. Target: place the result against the 2–4% conversion assumption.
2. In the Discord pilot, offer a hand-made PDF "biography" of one plant for a nominal price, or free in exchange for an interview. Measure how many ask.
3. Interview 5 plant shops about birth-certificate tags: would they pay, and how much per tag?
4. Log lines per plant per day and token cost during the pilot to get a real AI cost per MAU.

## 6. Open questions

- Premium: subscription vs. one-time purchase for a hobby audience? Subscriptions are standard but this audience may prefer one-time keepsakes.
- Is Japan the first revenue market (home advantage, English + Japanese from day one per [[principles]]) or is EN first?
- Is B2B worth chasing before consumer retention is proven? Current stance: no.
- Kit sales and sponsors only matter if [[sprout-day]] is revived; keep them out of this model until then.
