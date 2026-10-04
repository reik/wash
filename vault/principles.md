---
title: Shared design principles
created: 2026-10-02
---

# Shared design principles

Applies to [[every-plant-has-a-past]] and [[sprout-day]]. Back to [[index]].

## No identity pressure
- **The plant is the protagonist.** User profiles stay minimal: nickname, optional icon, no selfies, no bio required.
- **Soft reactions instead of likes**, e.g. ☀️ sunshine · 💧 water drop · 🌱 grow! Icons work in any language.
- **No public follower or like counts.** Nothing to rank yourself against.
- **No free-text comments at launch.** Preset reactions only; this also makes multilingual moderation almost unnecessary. Revisit once there is a safety pipeline.

## Privacy by default
- Strip EXIF/GPS from every uploaded photo.
- Location is shown at city or country level only, never coordinates.
- Visibility is set per post (public / followers of this plant / private).
- Photos taken at home reveal a lot: show a gentle hint the first time ("windows and mail can show where you live").
- Age gate 13+ (16+ where GDPR requires it). Kids join only through a teacher or parent account (relevant to [[sprout-day]] school classes).

## Come back for joy, not guilt
- Goal: people open the app **a couple of times a day** to see their plant's friends' conversations, photos and updates (user requirement, 2026-10-02).
- Reasons to return are *new things that happened* (the time-zone relay, digests), never obligations. No streaks, no "your plant misses you", at most 2 push notifications a day. See [[daily-rhythm]].

## Safe and kind by default
- **Everything other people can see**, text and images, AI-written or owner-written, is checked by AI moderation **before** it's posted. Sexual, violent, discriminatory and hurtful content never appears. If a check can't run, nothing is published. See [[content-moderation]].

## Native mobile first
- **iPhone and Android apps from v1**; the web covers landing pages, pre-registration and public plant pages. See [[tech-direction]].

## Celebrate time
- Anniversaries, ages, firsts and milestones are the core reward. Waiting is part of the joy; never punish absence with guilt or streak loss.
- Death is handled with a memorial, never shame.

## International from day one
- i18n in the first commit (e.g. i18next); launch languages **English + Japanese** (home-market advantage).
- Content is mostly photos and icons, so the language barrier stays low; any short text is machine-translated on display.
- Billing via App Store / Google Play (global pricing and tax handled); Stripe for the web.
- Compliance: GDPR, app store privacy labels, COPPA if any under-13 path exists.
- Cross-border seeds and plants are regulated (biosecurity / phytosanitary rules), so **never ship living material across borders**. Physical products are sourced locally or are non-living (tags, books).
