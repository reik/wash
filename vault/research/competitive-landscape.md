---
title: Competitive landscape
created: 2026-10-02
updated: 2026-10-02
method: standard web searches on 2026-10-02 (US-centric results, App Store listings and articles). Not exhaustive; app details come from listings and search summaries, not hands-on testing.
---

# Competitive landscape

Back to [[index]]. Ideas: [[every-plant-has-a-past]] · [[sprout-day]] · [[parking-lot]]

## Inspiration
- **[ぬい日和 Nuibiyori](https://www.nuibiyori.com/)**: a plushie-lover SNS (iOS, freemium). Each plushie gets a profile (name, arrival date, personality), reactions are "nadenade" instead of likes, privacy is per post, and it tracks milestones and anniversaries. Japan-only as far as seen.

## Plant care apps (the "keep it alive" category)
- **Planta**: care reminders (water, fertiliser, mist), 7M+ users, made in Sweden. ([CB Insights](https://www.cbinsights.com/company/greg/alternatives-competitors))
- **Greg**: watering schedules tuned to species, location and window distance; a discover feed where the community helps diagnose problems. ([TechCrunch](https://techcrunch.com/2021/05/27/greg-an-app-for-plant-lovers-grows-5-4-million-in-seed-funding))
- **GreenSnap** (Japan): a plant photo SNS. Not researched in this session; known strong player in Japan.
- **[Cheerful Plants](https://apps.apple.com/us/app/cheerful-plants/id1592577372)**: a single-owner care log.

→ Everyone optimises *care*. Nobody owns *story*.

## Plant history and rehoming
- **No app found that transfers a plant's history to a new owner.** (Searched 2026-10-02.)
- "Plant passport" = an **EU regulatory document** for commercial plant movement ([UK gov form](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/886975/form-plant-passport-appauth.pdf)). Avoid the term in branding.
- **[Prōpa](https://technical.ly/baltimore/2021/12/08/propa-pat-may/)**: shares cuttings locally (map, wishlist), with per-plant "node" growth photos shown as a time lapse. Closest neighbour to [[every-plant-has-a-past]], but no owner-to-owner story transfer.
- **[Floragora](https://apps.apple.com/us/app/floragora/id1573887658)**: plant swaps by post, likes and comments.
- **[PlantPal](https://www.producthunt.com/p/plantpal-2/plantpal-2)**: care reminders and a photo album.

## Sprout Day — TODO
Not yet searched. Check before committing to [[sprout-day]]:
- citizen-science growing projects
- school growing programs and campaigns
- "grow along" challenges on TikTok and Instagram
- any app with a persistent cohort tied to a planting date

## Talking plant and AI personality
A plant talking **to its owner** exists, so it is not a differentiator on its own. Our angle is in [[plant-voice]].
- **[Plant.management](https://dolphinvoice.ai/en/ai-apps/plant-management-1051627)**: personality-driven emails written as if from your plant.
- **[Nature Chat](https://apps.apple.com/us/app/id6744100727)**: chat with your plant from a photo.
- **[Little Shop of Conversations](https://www.redpepper.land/blog/little-shop-of-conversations-talk-to-plants-using-ai)**: a GPT-4 plant persona with a memory (Audrey III), by redpepper.
- **[Talking Plant](https://similarweb.com/app/apple/6479337145)**: identifies plants and turns them into chatty companions that remind you about care.
- **[BotanAI](https://chrome-stats.com/d/com.plantify)** (formerly Plantify): beta "Per-Plant Voice" with **six preset personality types** (Dramatic, Stoic, Cheerful, Shy, Sassy, Scholarly), plus a growth timeline. This is why our personalities are *earned*, not picked.
- **[PlantAI](https://www.rapidnative.com/project/public/LxgspTWxaXwcZsht3ls5n)**: uses GPT-4o to identify plants and track health over a photo timeline; "remembers your plants' actual history" (for one owner).
- **PlantWhisperer**: talk to your plants through a chatbot. **Sprout** (by Keenan Pinto): an app that lets plants talk to humans. Both were mentioned [here](https://homegrown.co.in/homegrown-explore/lifestyle/budding-home-gardeners-theres-an-app-that-lets-you-talk-to-your-plants).
- **[PlantGPT](https://insights.munich-startup.de/news/feed/spelman-college-students-create-plantgpt-device-that-lets-plants-communicate-their-needs-using-ai)**: a Spelman College student device; sensor data + AI → conversations about the plant's needs.

**Not found (searched 2026-10-02):** plants talking **to each other** (group chat between plants), and a plant voice or memory that **carries over to new owners**. Every product above is one plant ↔ one owner.

## Avatars, faces, gamification (exists)
- **[Plantvatars](https://sfu.ca/siat/showcase/spring-2023-project-showcase/explore-the-projects/iat-359-plantvatars.html)**: avatars for real plants, with XP from watering (student project, aimed at kids).
- **[Planpet](https://www.yankodesign.com/2024/04/06/futuristic-indoor-pot-concept-turns-your-plant-into-a-virtual-pet/amp/)**: a concept pot whose character's expressions follow soil sensors.
- **[Lua smart planter](https://www.euronews.com/2019/07/19/the-pot-turning-houseplants-into-pets)**: a pot with a Tamagotchi-like face screen.
- **[GooglyAR](https://apps.apple.com/us/app/googlyar/id6479045481)**, **[everies](https://ai.google.dev/competition/projects/everies)**: AR eyes and faces on any object.

## AI growth prediction (exists)
- **[Wonder Plant](https://www.hunted.space/product/wonder-plant)**: growth predictions plus health checks.
- **[Pulse](https://aiindigo.com/tool/pulse)**: a 5-year growth projection for bonsai.

## Pen pals (model reference)
- **Slowly**: letters between people that arrive slowly, depending on distance ([help](https://help.slowly.app/hc/en-us/articles/115001835772-When-will-my-penpal-receive-my-letter)); 2M+ downloads, 4.7 rating ([App Store](https://apps.apple.com/app/1199811908)). This shows slow international exchange works.

## Moderation APIs and app store rules
Checked 2026-10-02 for [[content-moderation]].
- **OpenAI omni-moderation:** text + image input; per-category flags and scores ([developer info](https://cdn.openai.com/API/docs/omni_moderation_information_for_developers.pdf)). 13 categories, 6 of them checked across text and images together, improved across 40 languages ([Portkey benchmark](https://portkey.ai/blog/openai-omni-moderation-latest-benchmark/)). Still **free** in 2026 ([source](https://aipromptshub.co/safety/openai-safety-features-2026)). Japanese quality is not explicitly documented.
- **Azure AI Content Safety:** hate, sexual, violence and self-harm with severity levels ([harm categories](https://learn.microsoft.com/en-my/azure/ai-services/content-safety/concepts/harm-categories)); **Japanese explicitly trained and tested**, with automatic language detection ([language support](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/language-support)); [custom categories](https://learn.microsoft.com/el-gr/azure/ai-services/content-safety/concepts/custom-categories) (could host the kindness rule); PII filtering.
- **Apple App Review guideline 1.2 (user-generated content)** ([guidelines](https://developer.apple.com/app-store/review/guidelines/)): requires filtering objectionable material, reporting with timely response, blocking abusive users, and published contact info. Apps used mainly for "random or anonymous chat" or bullying may be removed. Rejection threads show reviewers also ask for a zero-tolerance EULA and action on reports within 24 hours ([forum](https://developer.apple.com/forums/thread/807358)).
- **Google Play UGC policy:** not checked yet.

## Other hobby categories explored (see [[parking-lot]])
- **Blind boxes:** [Blind Box Tracker](https://apps.apple.com/py/app/blind-box-tracker/id6742131820), [Bubuspace](https://apps.apple.com/vu/app/bubuspace/id6751793634) (with price tracking), [Price Scanner for Pop Mart](https://apps.apple.com/app/id6756183397), PopSwap.co. Crowded and focused on resale value.
- **Plushies:** [My Jellycat Collection](https://apps.apple.com/app/id6447453185), [SquadApp](https://apps.apple.com/us/app/-/id1623120952) (11k+ Squishmallows), [Purps](https://mwm.ai/apps/purps/6774050424), [Squishdex](https://mwm.ai/fr/apps/squishdex-squishy-collection/6772807068). Catalogues, not companion apps.
- **Sourdough trackers:** [Levain](https://apps.apple.com/app/id6780496763), [Yeasta](https://apps.apple.com/us/app/-/id6748180011), [Crust](https://mwm.ai/apps/sourdough-tracker-crust/6758654537), [BakeReady](https://apps.apple.com/app/id6785357199), [Sourdough Starter Tracker](https://mwm.ai/apps/sourdough-starter-tracker/6755709217). Crowded.
- **Sourdough lineage:** done by hand on blogs ([family tree example](https://figjamandlimecordial.com/2013/03/14/priscillas-family-tree-an-update)); [Carl Griffith's starter](https://en.wikipedia.org/wiki/Carl_Griffith%27s_sourdough_starter) has been mailed worldwide since 2000. No app found.
- **Sea glass / beachcombing:** no dedicated app found; the community uses [journals and magazines](https://www.beachcombingmagazine.com/products/beachcombing-journal-and-bookmark) and forums.
