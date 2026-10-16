"""Five Jev judgment checks for the plant app (prototype).

Jev answers; this code owns the policy (thresholds) and the scoring.
A client is any object with judge(state, questions) -> {question_id: {"answer", "confidence"}}.
Usage: python3 jev_checks.py report results.json
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).parent
HOLDS = {"hold", "ask_owner"}
MODERATION_CATEGORIES = ("sexual", "violent", "hateful", "hurtful", "spam")
FIXED_DECISIONS = {
    "kindness": {"allow", "hold", "reject"},
    "conversational": {"pass", "regenerate"},
    "invented_fact": {"allow", "hold", "drop"},
    "moderation": {"allow", "hold", "block"},
}


def load_checks():
    return json.loads((HERE / "checks.json").read_text())


def load_examples():
    return json.loads((HERE / "examples.json").read_text())


def possible_decisions(checks, check_id):
    if check_id == "event":
        return set(checks["event"]["questions"][0]["options"]) | {"ask_owner"}
    return FIXED_DECISIONS[check_id]


def _level(answer, high, low, floor):
    """high only when Jev is sure enough; an unsure high answer is a hold, never an action."""
    p, confidence = answer["answer"], answer["confidence"]
    if p >= high and confidence >= floor:
        return "high"
    return "hold" if p >= low else "low"


def decide(check_id, answers, checks=None):
    policy = (checks or load_checks())[check_id]["policy"]
    if check_id == "kindness":
        return {"high": "reject", "hold": "hold", "low": "allow"}[
            _level(answers["unkind"], policy["reject_at"], policy["hold_at"], policy["min_confidence"])]
    if check_id == "invented_fact":
        return {"high": "drop", "hold": "hold", "low": "allow"}[
            _level(answers["invents"], policy["drop_at"], policy["hold_at"], policy["min_confidence"])]
    if check_id == "conversational":
        return "pass" if answers["feel"]["answer"] >= policy["pass_at"] else "regenerate"
    if check_id == "event":
        a = answers["event"]
        return a["answer"] if a["confidence"] >= policy["min_confidence"] else "ask_owner"
    levels = {_level(answers[c], policy["block_at"], policy["hold_at"], policy["min_confidence"]) for c in MODERATION_CATEGORIES}
    return "block" if "high" in levels else "hold" if "hold" in levels else "allow"


def outcome(decision, expected):
    if decision == expected:
        return "correct"
    return "held" if decision in HOLDS else "wrong"


def rows_from_answers(check_id, answers_by_id, examples=None, checks=None):
    checks = checks or load_checks()
    examples = examples if examples is not None else load_examples()[check_id]
    rows = []
    for ex in examples:
        answers = answers_by_id[ex["id"]]
        decision = decide(check_id, answers, checks)
        rows.append({"id": ex["id"], "expected": ex["expected"], "decision": decision,
                     "outcome": outcome(decision, ex["expected"]), "answers": answers})
    return rows


def evaluate(client, check_id, examples=None, checks=None):
    checks = checks or load_checks()
    examples = examples if examples is not None else load_examples()[check_id]
    questions = checks[check_id]["questions"]  # fan-out: every question in one request
    answers_by_id = {ex["id"]: client.judge(ex["state"], questions) for ex in examples}
    return rows_from_answers(check_id, answers_by_id, examples, checks)


def summarize(rows):
    counts = {"correct": 0, "held": 0, "wrong": 0}
    for r in rows:
        counts[r["outcome"]] += 1
    return {**counts, "total": len(rows)}


def _fmt(answers):
    return ", ".join(f"{k}={v['answer']:.2f}" if isinstance(v["answer"], (int, float))
                     else f"{k}={v['answer']}({v['confidence']:.2f})" for k, v in answers.items())


def report(results_path):
    results = json.loads(Path(results_path).read_text())
    for check_id, answers_by_id in results.items():
        rows = rows_from_answers(check_id, answers_by_id, [e for e in load_examples()[check_id] if e["id"] in answers_by_id])
        s = summarize(rows)
        print(f"\n{check_id}: {s['correct']}/{s['total']} correct, {s['held']} held, {s['wrong']} wrong")
        for r in rows:
            mark = {"correct": "ok  ", "held": "HOLD", "wrong": "MISS"}[r["outcome"]]
            print(f"  {mark} {r['id']:3} expected={r['expected']:<10} got={r['decision']:<10} {_fmt(r['answers'])}")


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "report":
        report(sys.argv[2])
    else:
        print(__doc__)
