---
title: P0 — Story call-out
status: drafting
created: 2026-10-08
updated: 2026-10-19
tags: [experiment, validation, p0]
---

# P0 — Story call-out

Tests whether **owners will write a plant's life story at all**: the raw material for the plant record, biography and plant voice ([[plant-voice]] lines come from real events and history). This is the biography layer of the current build focus ([[every-plant-has-a-past]], reframed 2026-10-08 as plant society + biography). Handover is only a side read (form Q6), not the thing being tested. No code, only posts and a form.

Back to [[roadmap]] (P0) · [[index]]

## Plan change (2026-10-19)
**Round 1 is Japanese-only: X + note.com.** Reddit and Instagram move to round 2 (see [[#Round 2 (EN)]]). Reason: JA is the home market, the owner can judge the copy directly, and there is no moderator-approval step.

## Round 1 posts (JA)

Register follows the translation rules in [[tone-samples]]: spoken, warm, no marketing voice. Both posts say plainly that this is a hobby project, so nobody feels tricked.

### X (short post + reply with the form link)
> **いちばん長く育てている植物の「ものがたり」を聞かせてください🌿**
> 育て方のコツじゃなくて、物語の方。どこから来た子？何を乗り越えた？誰からもらった？
> 3文以上、写真もぜひ。リプでもフォームでも大丈夫です。
> #観葉植物 #植物のある暮らし

Reply to own post:
> 趣味で、植物の一生を残すアプリを考えていて、その前にみなさんの話を聞きたくて。フォーム→ [FORM URL]（紹介する時は必ず許可を取ります）

### note.com (long post)
**Title:** あなたの植物の「ものがたり」を聞かせてください

**Body:**
> 観葉植物って、うちに来る前にも、来てからも、いろんな時間を過ごしていますよね。
> 誰かのお店から来て、引っ越しを何回も越えて、一度は枯れかけて、それでも新しい葉を出して。
>
> 私は趣味で、植物の「これまで」を残せるアプリを考えています。でも作る前に、本当にみなさんがそういう話を書きたいのか、知りたいです。
>
> **お願いしたいこと**
> いちばん長く一緒にいる植物について、3文以上で教えてください。
> - どこから来ましたか（お店・もらった・挿し木・拾った・受け継いだ）
> - 何を乗り越えましたか
> - 忘れられない思い出はありますか
>
> 育て方のコツではなく、物語の方を聞きたいです。写真も大歓迎です。
>
> **フォーム：** [FORM URL]
>
> **取り扱いについて**
> 集めた内容はこの調査にだけ使います。ご紹介したい時は、必ず先に連絡して許可をいただきます。メールアドレスは任意で、削除したい時は [連絡先] までご連絡ください。

## Form (Google Form / Tally, JA first, EN copy ready)

**Intro text (JA):**
> 植物の「ものがたり」を集めています。趣味のアプリづくりの準備です。回答は調査にだけ使い、第三者には渡しません。引用・紹介する時は事前に許可を取ります。削除したい時は [連絡先] まで。

**Intro text (EN):**
> I'm collecting plant life stories for a hobby app. Answers are used only for this study and not shared. I will ask before quoting you. To delete your answer, contact [CONTACT].

| # | JA | EN | Type |
|---|---|---|---|
| 1 | 植物の種類（わからなければ予想でOK） | Plant species (best guess is fine) | short text |
| 2 | どのくらい一緒にいますか？ | How long has it been with you? | choice: <1y / 1–3y / 3–10y / 10y+ |
| 3 | どこから来ましたか？ | Where did it come from? | choice: shop / gift / rescue / cutting / inherited / found |
| 4 | この子の「ものがたり」を教えてください（3文以上） | Tell its story (3+ sentences) | long text |
| 5 | この子が持っている思い出をひとつ | One memory it holds | short text |
| 6 | （おまけの質問）もしこの子が新しい家に行くなら、ものがたりも一緒に渡したいですか？ | If this plant got a new home, should its story go with it? | choice: yes / no / depends |
| 7 | 引用・紹介してもいいですか？ | May we quote you? | choice: yes / anonymous / no |
| 8 | 続報を受け取るメールアドレス（任意） | Email for updates (optional) | short text |
| 9 | 同意：上の取り扱いに同意します | Consent: I agree to the handling above | required checkbox |

Notes: Q9 is new and required. Q2 became a choice so answers are easy to tally. Keep the form under 5 minutes.

## Where to post (round 1)
| Channel | Language | Note |
|---|---|---|
| X | JA | #観葉植物 #植物のある暮らし; post at evening (plant-owner activity peaks after work) |
| note.com | JA | Long post; tag 観葉植物, 植物のある暮らし |

## Pass signals (revised 2026-10-19)
| Result | Reading |
|---|---|
| **100+ stories in 2 weeks** | Clear pass |
| **40–99 stories** | Promising: owners will write; reach is the limit, so run round 2 before judging |
| **<40, or a median story under 2 sentences** | Warning: rethink the biography feature before building |
| Median story ≥3 sentences | Needed alongside any count above |

Watch (informational only, not pass/fail): % answering "story should travel with the plant" = yes, an informal read on the long-arc handover feature ([[roadmap]] P3).

**Bias caveat:** people who answer a story call-out like writing. Q6 will read optimistic, so treat it as directional only.

## Tracking sheet (columns)
date · channel · submissions · median length · longest story · "travels with plant" yes% · quotable gems · email opt-ins · consent withdrawn

## Timeline
- Day 0: both JA posts live (you publish; I can't post for you)
- Day 7: mid check. If <15 submissions, add a second JA channel (LINE plant community or an Instagram JA post), not more copy
- Day 14: tally, write verdict into this note + the log

## Round 2 (EN)
Only after round 1 data exists. Add Instagram (feed + story) and Reddit (r/houseplants, r/plants).
- Reddit: read each subreddit's rules first; if unclear, message the mods ("hobby project collecting plant stories, OK to post a discussion question?")
- Post as a plain discussion question with no link; stories arrive as comments; form link only as an optional "want to be featured" line once mods agree
- EN text: "What's the oldest plant you own, and what's its story? Not care tips. Where it came from, what it survived, who gave it to you."

## Verdict (fill in on day 14)
_Pending._

## Next steps
- [x] Me: JA posts, form (JA + EN), consent line, revised pass bar (2026-10-19)
- [ ] You: check the JA posts read naturally, as with the tone lines
- [ ] You: create the form (10 min) and fill in [FORM URL] and [連絡先]
- [ ] You: publish on X and note.com, then log the date here
- [ ] Me: summarize results + verdict when data lands
