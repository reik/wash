---
title: App shell (P1 step 1, part 1)
status: building   # drafting → building → review → shipped
created: 2026-11-06
updated: 2026-11-06
tags: [feature, p1, foundation]
serves: [every-plant-has-a-past]
---

# App shell (P1 step 1, part 1)

> **Hook:** Open the app and see a plant's tagline in your own language, on iPhone and Android from one codebase.

Serves: [[every-plant-has-a-past]] · Roadmap: [[roadmap]] (P1, order 1: F1–F3, F7–F8) · Back to [[index]]

## Decisions (2026-11-06)
- **Owner decision:** development starts now, before the P0 validation finishes. Recruiting and publishing are paused; the P0 experiments stay in the vault as-is.
- **Stack:** Expo SDK 58 (React Native 0.88, TypeScript strict), Expo Router for navigation, i18next + react-i18next with `expo-localization`, per [[tech-direction]] and the `mobile/AGENTS.md` guidance.
- **Location:** `mobile/` at the repo root, next to the Supabase project in `supabase/`.
- **Tests:** Jest via `jest-expo` + React Native Testing Library 14 (`await render(...)`, `screen` queries). `react-test-renderer` and `test-renderer` are peers.
- **React pinned to 19.3.1.** Expo's own packages (expo-router, log-box) request 19.3.1, while the SDK pins 19.3.0. `expo.install.exclude` lists `react` so `expo-doctor` passes; remove it when the SDK catches up.
- **Template leftovers removed:** the LICENSE and `.claude/` from the Expo template. `AGENTS.md` stays because it carries the Expo docs guidance.

## How it works (this slice)
- `mobile/src/i18n/`: `resolveLocale(tag)` maps the device language to `en` or `ja` (anything else falls back to `en`). `createI18n(locale)` builds an instance with inline resources. Strings live in `locales.ts`, checked with `satisfies`.
- `mobile/src/components/Tagline/`: the tagline in the current locale.
- `mobile/src/app/_layout.tsx`: root layout, provides i18n from the device locale.
- `mobile/src/app/index.tsx`: home route showing the tagline.

## Risks
| Risk | Mitigation |
|---|---|
| React 19.3.0 vs 19.3.1 mismatch with the SDK | Pinned to 19.3.1 and documented; revisit on the next SDK |
| RNTL 14 needs `await render` and the `test-renderer` peer | Tests use the v14 API; `react-test-renderer` stays installed |

## Experiment
None. This is build work, not validation.

## Open questions
- Auth (F2) needs a Supabase project. The project and its keys are a human step; I need the URL and anon key, or the go-ahead to create the project.
- Tailwind (from the global rules) doesn't fit React Native. This slice uses `StyleSheet`. Confirm before adding NativeWind.

## Next steps
- [x] Expo app with Expo Router, EN/JA i18n, tests (7 passing), typecheck, lint, expo-doctor
- [ ] F2 auth + minimal owner profile (needs Supabase project)
- [ ] F7 moderation baseline and F8 report/block
- [ ] Open PR, then move card to Review
