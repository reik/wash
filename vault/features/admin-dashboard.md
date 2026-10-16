---
title: Admin dashboard
status: drafting   # drafting → building → review → shipped
created: 2026-10-16
updated: 2026-10-16
tags: [feature, ops, admin]
serves: [every-plant-has-a-past]
---

# Admin dashboard

> **Hook:** A private web console where the team sees who is using Sasawis and how: a filterable user list plus daily charts for activity and circles.

Serves [[every-plant-has-a-past]] · Principles: [[principles]] · Data: [[data-model]] · Back to [[index]]

**The moment:** Monday morning you open one page and see that Japan signed up 40 new plants over the weekend, that three circles are short of members, and that posting dipped on Sunday. You sort the users by plant count to find the most active owners to talk to.

Not user-facing. It is an operations tool, so it carries no fun or originality test. Its job is to make the pilot and launch decisions in [[circle-pilot]] and [[circles]] measurable.

## Decisions (2026-10-16)
- **It is a web app, not part of the mobile apps.** Same monorepo and typed `api/` layer as the public web ([[tech-direction]]), behind login, available only to profiles with `role = admin` (already in [[data-model]]).
- **Read-only first.** v1 shows lists and charts. Actions (suspend, freeze posting) stay in the moderation queue from [[content-moderation]] and write to `admin_actions`.
- **Admin sees only what the privacy rules allow.** Nickname, country, plant counts and activity totals. Never private windowsill messages ([[windowsill-talk]]) and never exact location ([[principles]]: city + country only).

## How it works

### 1. User list
| Column | Source |
|---|---|
| Nickname, icon | `profiles` |
| Country | the country of their plants (`plants.country_code`) |
| Region | `profiles.tz_band` (apac / emea / americas) |
| Language | `profiles.locale` |
| Plants | count of owned plants |
| Posts today / last 7 days | count of `lines` |
| Last active | needs a new `profiles.last_seen_at` |
| Strikes, status | `profiles` |
| Signed up | `profiles.created_at` |

- **Filter by:** country, region, language, status, signup date range.
- **Sort by:** number of plants, daily posts, last active, signup date, strikes.
- Click a user to see their plants and circle membership (no message text).

### 2. Charts (daily, with a 7 / 30 / 90-day range)
- Daily active owners
- New signups per day, and by country (bar)
- Plants registered per day
- Plant lines posted per day, with the share held or failed by moderation
- Reactions per day
- Windowsill threads started per day (counts only)
- **Circles:** how many exist, how full they are (size histogram), seats still open, how many plants are waiting
- Reports waiting and age of the oldest one (the 24h review rule from F8)

### 3. Data approach
Most numbers can be computed from existing tables. Two things are missing: `profiles.last_seen_at`, and a daily rollup table (`daily_stats`, one row per day and country) so charts do not scan the whole database. Both would be small additions to [[data-model]].

## Risks
| Risk | Mitigation |
|---|---|
| Admin access leaks personal data | Admin-only RLS; no message text, no exact location; every user-detail view is logged in `admin_actions` |
| It becomes a big build before the app has users | Ship a thin version first: user list plus 3 charts |
| Overlaps with product analytics tools | Keep admin to operations views; funnels and retention go to an analytics tool (open question) |

## Experiment
During the 8-week [[circle-pilot]] the same numbers are tracked by hand in a sheet. If the sheet turns out to be enough, this feature can wait until after launch.

## Open questions
- **"Region":** is the three-band `tz_band` enough, or does it need something finer such as Kanto / Kansai? The data model only stores city and country.
- Does the admin see email addresses? They live in `auth.users`, not `profiles`.
- Priority: proposed as a thin version in P1 (with the moderation baseline, since the review queue needs an admin screen anyway) and the full charts in P2. Not decided.
- Product analytics (funnels, retention): the same open question as in [[data-model]], PostHog or our own table.
- Who gets admin access besides the founder, and do moderators get a smaller view?

## Next steps
- [ ] Decide priority (P1 thin or P2)
- [ ] Add `last_seen_at` and `daily_stats` to [[data-model]]
- [ ] Sketch the user list and one chart screen (wireframes stay gated until P0 is solid)
