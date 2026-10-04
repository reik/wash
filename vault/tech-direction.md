---
title: Tech direction
created: 2026-10-02
updated: 2026-10-02
status: proposal   # confirm at build kickoff
---

# Tech direction

Back to [[index]] · Features: [[plant-voice]], [[daily-rhythm]], [[content-moderation]]

## Platforms (user requirement, 2026-10-02)
- **Native iPhone and Android apps from v1**, distributed through the App Store and Google Play. The daily habit ([[daily-rhythm]]) depends on push notifications, the camera (same-angle overlay) and QR scanning (handover tags).
- **Web:** landing page, Sprout Day pre-registration, and **public plant pages**, so a QR tag still opens for someone without the app. From there, deep links (iOS Universal Links / Android App Links) open the app.

## Recommended stack (proposal)
- **Mobile:** React Native with **Expo** + TypeScript. It matches the React/TS, Zod, React Query and Zustand conventions in the global rules, gives one codebase for both stores, and uses EAS Build/Submit for store builds.
- **Web:** Vite + React + Tailwind (global rules), sharing the typed `api/` layer and Zod schemas with the app in a monorepo.
- **Native capabilities needed:** camera with an overlay of the last photo, push notifications (APNs / FCM), QR scanning, photo upload with EXIF stripped, local sunrise and time-zone calculations, deep links.
- **Testing:** the global rules say Vitest + RTL, but React Native projects usually use Jest (jest-expo) + React Native Testing Library. Decide at kickoff. Device end-to-end tests: Maestro or Detox.
- **Alternatives considered:** Flutter (strong, but loses the React/TS reuse); fully native Swift + Kotlin (two codebases, too costly for a small team).

## App store requirements to plan for
- User-generated content rules (Apple 1.2, Google Play UGC) → [[content-moderation]].
- **Digital** purchases (premium) use in-app purchase on both stores. **Physical** goods (tags, kits, books) are paid outside in-app purchase (e.g. Stripe). Re-check current store rules at build time.
- The age rating reflects user-generated content; children only join through teacher accounts ([[sprout-day]]).
- Privacy labels / Google's Data safety form: photos, coarse location, push token.

## Backend (open)
It needs: auth, Plant Records with chapters, group chats, image storage, **scheduled jobs per time zone** (dayparts, digests), AI calls (plant voice, translation, moderation) and push delivery to many devices. Candidates: Supabase (Postgres + storage + edge functions) or Firebase. Decide at kickoff.
