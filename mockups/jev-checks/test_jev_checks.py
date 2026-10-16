"""Offline tests for the five Jev checks (no network, fake client)."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import jev_checks as jc  # noqa: E402


def noul(p, conf=0.9):
    return {"answer": p, "confidence": conf}


def score(s, conf=0.9):
    return {"answer": s, "confidence": conf}


def choice(label, conf=0.9):
    return {"answer": label, "confidence": conf}


class DecisionTests(unittest.TestCase):
    def test_should_reject_a_line_when_unkind_probability_is_high(self):
        self.assertEqual(jc.decide("kindness", {"unkind": noul(0.9)}), "reject")

    def test_should_hold_a_line_when_unkind_probability_is_borderline(self):
        self.assertEqual(jc.decide("kindness", {"unkind": noul(0.5)}), "hold")

    def test_should_allow_a_line_when_unkind_probability_is_low(self):
        self.assertEqual(jc.decide("kindness", {"unkind": noul(0.05)}), "allow")

    def test_should_hold_instead_of_reject_when_jev_is_unsure(self):
        self.assertEqual(jc.decide("kindness", {"unkind": noul(0.9, conf=0.2)}), "hold")

    def test_should_hold_instead_of_drop_when_jev_is_unsure(self):
        self.assertEqual(jc.decide("invented_fact", {"invents": noul(0.56, conf=0.12)}), "hold")

    def test_should_allow_a_low_probability_even_when_jev_is_unsure(self):
        self.assertEqual(jc.decide("invented_fact", {"invents": noul(0.05, conf=0.3)}), "allow")

    def test_should_block_on_a_confident_category_even_if_another_is_unsure(self):
        answers = {k: noul(0.02) for k in ("sexual", "violent", "hateful", "hurtful", "spam")}
        answers["hateful"] = noul(0.98, conf=0.96)
        answers["hurtful"] = noul(0.66, conf=0.32)
        self.assertEqual(jc.decide("moderation", answers), "block")

    def test_should_hold_when_the_only_high_category_is_unsure(self):
        answers = {k: noul(0.02) for k in ("sexual", "violent", "hateful", "hurtful", "spam")}
        answers["hurtful"] = noul(0.66, conf=0.32)
        self.assertEqual(jc.decide("moderation", answers), "hold")

    def test_should_regenerate_when_the_conversational_score_is_below_the_bar(self):
        self.assertEqual(jc.decide("conversational", {"feel": score(0.4)}), "regenerate")

    def test_should_pass_when_the_conversational_score_meets_the_bar(self):
        self.assertEqual(jc.decide("conversational", {"feel": score(1.8)}), "pass")

    def test_should_drop_when_invented_fact_probability_is_high(self):
        self.assertEqual(jc.decide("invented_fact", {"invents": noul(0.8)}), "drop")

    def test_should_allow_when_invented_fact_probability_is_low(self):
        self.assertEqual(jc.decide("invented_fact", {"invents": noul(0.05)}), "allow")

    def test_should_return_the_event_when_confidence_is_enough(self):
        self.assertEqual(jc.decide("event", {"event": choice("new_leaf", 0.9)}), "new_leaf")

    def test_should_ask_the_owner_when_event_confidence_is_low(self):
        self.assertEqual(jc.decide("event", {"event": choice("moved", 0.4)}), "ask_owner")

    def test_should_block_when_any_moderation_category_is_high(self):
        answers = {k: noul(0.02) for k in ("sexual", "violent", "hateful", "hurtful", "spam")}
        answers["spam"] = noul(0.95)
        self.assertEqual(jc.decide("moderation", answers), "block")

    def test_should_hold_when_a_moderation_category_is_borderline(self):
        answers = {k: noul(0.02) for k in ("sexual", "violent", "hateful", "hurtful", "spam")}
        answers["hurtful"] = noul(0.3)
        self.assertEqual(jc.decide("moderation", answers), "hold")

    def test_should_allow_when_all_moderation_categories_are_low(self):
        answers = {k: noul(0.02) for k in ("sexual", "violent", "hateful", "hurtful", "spam")}
        self.assertEqual(jc.decide("moderation", answers), "allow")


class OutcomeTests(unittest.TestCase):
    def test_should_count_a_match_as_correct(self):
        self.assertEqual(jc.outcome("block", "block"), "correct")

    def test_should_count_a_hold_as_held_not_wrong(self):
        self.assertEqual(jc.outcome("hold", "block"), "held")

    def test_should_count_an_ask_owner_as_held(self):
        self.assertEqual(jc.outcome("ask_owner", "moved"), "held")

    def test_should_count_a_mismatch_as_wrong(self):
        self.assertEqual(jc.outcome("allow", "block"), "wrong")


class DataShapeTests(unittest.TestCase):
    def setUp(self):
        self.checks = jc.load_checks()
        self.examples = jc.load_examples()

    def test_should_define_all_five_checks(self):
        self.assertEqual(set(self.checks), {"kindness", "conversational", "invented_fact", "event", "moderation"})

    def test_should_give_every_noul_question_true_and_false_criteria(self):
        bad = [q["id"] for c in self.checks.values() for q in c["questions"]
               if q["type"] == "noul" and set(q.get("criteria", {})) != {"true", "false"}]
        self.assertEqual(bad, [])

    def test_should_give_every_score_question_at_least_two_levels(self):
        bad = [q["id"] for c in self.checks.values() for q in c["questions"]
               if q["type"] == "score" and len(q.get("levels", [])) < 2]
        self.assertEqual(bad, [])

    def test_should_give_every_choice_question_an_other_option(self):
        bad = [q["id"] for c in self.checks.values() for q in c["questions"]
               if q["type"] == "choice" and ("other" not in q["options"] or len(q["options"]) < 2)]
        self.assertEqual(bad, [])

    def test_should_name_a_state_path_in_every_question(self):
        keys = {k: set(c["state_shape"]) for k, c in self.checks.items()}
        bad = [q["id"] for k, c in self.checks.items() for q in c["questions"]
               if not any(f"`{s}`" in q["question"] for s in keys[k])]
        self.assertEqual(bad, [])

    def test_should_label_every_example_with_a_possible_decision(self):
        bad = [e["id"] for k, exs in self.examples.items() for e in exs
               if e["expected"] not in jc.possible_decisions(self.checks, k)]
        self.assertEqual(bad, [])

    def test_should_match_example_state_keys_to_the_state_shape(self):
        bad = [e["id"] for k, exs in self.examples.items() for e in exs
               if set(e["state"]) != set(self.checks[k]["state_shape"])]
        self.assertEqual(bad, [])

    def test_should_cover_both_outcomes_in_every_check(self):
        thin = [k for k, exs in self.examples.items() if len({e["expected"] for e in exs}) < 2]
        self.assertEqual(thin, [])


class FakeClient:
    def __init__(self, answers):
        self.answers, self.calls = answers, []

    def judge(self, state, questions):
        self.calls.append((state, questions))
        return self.answers


class EvaluateTests(unittest.TestCase):
    def test_should_send_all_moderation_questions_in_one_request(self):
        checks = jc.load_checks()
        client = FakeClient({q["id"]: noul(0.01) for q in checks["moderation"]["questions"]})
        jc.evaluate(client, "moderation", [{"id": "X", "state": {"text": "hi"}, "expected": "allow"}], checks)
        self.assertEqual(len(client.calls), 1)
        self.assertEqual(len(client.calls[0][1]), 5)

    def test_should_report_the_decision_and_outcome_for_each_example(self):
        checks = jc.load_checks()
        client = FakeClient({"unkind": noul(0.95)})
        rows = jc.evaluate(client, "kindness", [{"id": "X", "state": {"line": "mean"}, "expected": "reject"}], checks)
        self.assertEqual((rows[0]["decision"], rows[0]["outcome"]), ("reject", "correct"))

    def test_should_summarize_counts_by_outcome(self):
        rows = [{"outcome": "correct"}, {"outcome": "correct"}, {"outcome": "held"}, {"outcome": "wrong"}]
        self.assertEqual(jc.summarize(rows), {"correct": 2, "held": 1, "wrong": 1, "total": 4})


if __name__ == "__main__":
    unittest.main()
