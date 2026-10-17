---
title: Jev checks (five judgment checks, first live run)
status: done
created: 2026-10-16
updated: 2026-10-16
tags: [experiment, jev, moderation, voice]
---

# Jev checks

Five quick yes/no, score and pick-one judgments, answered by Jev (TypeSafe's judgment model, `jev-1.13.0`) with the decisions and thresholds kept in code. Built as a prototype in `mockups/jev-checks/` and run live on 43 labeled examples on 2026-10-16. Related: [[content-moderation]], [[plant-voice]], the model bake-off plan (PR #11), [[tone-samples]]. Back to [[index]]

## The checks
| # | Check | Question type | Decision | Where it plugs in |
|---|---|---|---|---|
| 1 | **Kindness**: does the line insult or belittle a plant, owner or group? | yes/no | allow, hold, reject | [[content-moderation]] step 3 |
| 2 | **Conversational feel**: does the line sound like someone talking, not a caption? | score (3 levels) | pass, regenerate | After drafting, before the owner sees it ([[plant-voice]]) |
| 3 | **Invented fact**: does the line state a place, person, event or number not in the facts it was given? | yes/no | allow, hold, drop | [[plant-voice]] guardrail "no invented history" |
| 4 | **Event type**: which life event does the owner's note describe? | pick one of 9 | the event, or ask the owner | Voice triggers; text notes only |
| 5 | **Moderation categories**: sexual, violent, hateful, hurtful, spam | 5 yes/no questions in one request | allow, hold, block | [[content-moderation]] step 2 alternative |

Design follows the Jev guidance: one property per question, criteria that match the question, an `other` option on the choice, and every question about the same text in one request.

## Policy kept in code
| Check | Act when | Hold when | Allow when |
|---|---|---|---|
| Kindness | probability ≥ 0.7 and Jev sure | ≥ 0.3, or ≥ 0.7 but unsure | below 0.3 |
| Invented fact | ≥ 0.5 and sure | ≥ 0.25, or ≥ 0.5 but unsure | below 0.25 |
| Moderation | any category ≥ 0.5 and sure | any ≥ 0.2, or ≥ 0.5 but unsure | all below 0.2 |
| Conversational | score ≥ 1.25 passes | n/a | else regenerate |
| Event | confidence ≥ 0.6 gives the event | below 0.6 asks the owner | n/a |

"Sure" means Jev's confidence is at least 0.4, the floor suggested by the guidance. The numbers are first guesses.

## Result (43 examples)
| Check | Correct | Held for review | Wrong |
|---|---|---|---|
| Kindness | 8 of 8 | 0 | 0 |
| Conversational feel | 8 of 8 | 0 | 0 |
| Invented fact | 5 of 9 | 3 | 1 |
| Event type | 9 of 9 | 0 | 0 |
| Moderation | 8 of 9 | 1 | 0 |
| **Total** | **38 of 43** | **4** | **1** |

Raw answers are in `mockups/jev-checks/results.json`. Without the confidence floor the same answers scored 39 correct and 3 held; the floor turned one correct "drop" (answered at confidence 0.12) into a hold.

### What worked
- **Kindness:** blunt-but-kind lines (`Mara. You're not dying. You're thirsty. Drink something.`) and friendly rivalry passed; open insults were rejected at 0.96 to 0.98; the sarcastic jab at Lua was rejected at 0.83 (less sure, 0.66).
- **Conversational feel:** the captions ("Growth is the quiet language of patience.") scored 0; the approved conversational lines scored about 2, including the terse stoic `Mm. Water. Thanks.` The stiff `I received water today and I am grateful.` landed at 0.93, correctly below the bar.
- **Event type:** including the repotted-versus-moved pair and a question that is no event at all.
- **Moderation:** all five clear violations were blocked, and the gardening trap sentences did not trip the violence or sexual questions (the criteria name words like kill, strangle, murder and root ball).
- Speed: about 80 to 220 ms per request.

### What did not work: the invented-fact check
It caught every obvious invention (a Paris owner, a Tuscany greenhouse, a person named Anna, "four homes" when three were listed), but:
- **I7** (wrong): `Before the shop? Nothing. Total blank.` with an empty fact list was dropped at 0.79. With no facts, any talk about the past looks unsupported.
- **I2, I5** (held, should have been allowed): lines that only reuse a listed fact (`Osaka winters were softer`; `I came folded`) scored 0.42 and 0.49 at very low confidence.
- **I3** (held, should have been dropped): `Lisbon was where I learned to love the sea air.` scored 0.56 at confidence 0.12.

Likely cause: one question asks Jev to compare a whole line against a list of facts. Not yet tested fixes: split into two questions (does it name something specific? is that thing in the facts?), extract the line's claims first, and add `true`/`false` examples for lines that only reuse a fact and for empty-fact lines. Do not tune on these nine examples; collect 20 or more, with several empty-fact cases, first. Until it improves, treat this check as a **flag for review, not an automatic drop**, and keep the "only use facts given" rule in the draft prompt itself.

## Limits
- 43 examples written by one person: a smoke test, not a benchmark.
- English only. The Japanese versions are untested (see the model bake-off plan (PR #11) and the JA spot-check in [[tone-samples]]).
- Jev reads text. The event check works on the owner's note; photo detection would need a vision step that produces text first.
- Prices are not recorded. Roughly 400 tokens in and 20 out per yes/no request, and about 650 in and 90 out for the five-question moderation request.
- The code was run against Jev through the Claude session's Jev tool. The Python SDK is not installed here, so there is no SDK client yet.

## Re-run
```bash
python3 mockups/jev-checks/test_jev_checks.py                                       # 32 offline tests
python3 mockups/jev-checks/jev_checks.py report mockups/jev-checks/results.json    # score the stored live answers
```
`jev_checks.evaluate(client, check_id)` accepts any client with `judge(state, questions)`, so an SDK client can be added once the SDK is installed.

## Next steps
- [ ] Install the TypeSafe SDK and write the client (the API key is already set in the shell)
- [ ] Add 20 or more invented-fact examples, including empty facts, then revise that question
- [ ] Write Japanese examples for kindness and moderation
- [ ] Decide the real thresholds with more data; they are guesses
