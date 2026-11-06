"""Tests for db/seed/load_dev.py: local-only guard, load order, upsert shape (stdlib only)."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import load_dev  # noqa: E402

LOCAL = "http://127.0.0.1:54321"
SEED = {
    "species": [{"id": "s1", "slug": "pothos"}],
    "auth_users": [{"id": "u1", "email": "aiko@seed.sasawis.test"}],
    "profiles": [{"id": "u1", "nickname": "Aiko"}],
    "plants": [{"id": "p1", "owner_id": "u1", "species_id": "s1"}],
}


class LocalGuardTests(unittest.TestCase):
    def test_should_accept_loopback_urls(self):
        self.assertTrue(load_dev.is_local_url(LOCAL))

    def test_should_accept_localhost_name(self):
        self.assertTrue(load_dev.is_local_url("http://localhost:54321"))

    def test_should_reject_hosted_project_url(self):
        self.assertFalse(load_dev.is_local_url("https://abcd1234.supabase.co"))

    def test_should_reject_lookalike_host(self):
        self.assertFalse(load_dev.is_local_url("http://127.0.0.1.evil.example"))

    def test_should_refuse_to_plan_against_non_local_url(self):
        with self.assertRaises(load_dev.NotLocalError):
            load_dev.plan("https://abcd1234.supabase.co", SEED)


class PlanTests(unittest.TestCase):
    def test_should_create_auth_users_before_any_table_rows(self):
        steps = load_dev.plan(LOCAL, SEED)
        first_table = next(i for i, s in enumerate(steps) if s.kind == "table")
        last_auth = max(i for i, s in enumerate(steps) if s.kind == "auth")
        self.assertLess(last_auth, first_table)

    def test_should_insert_tables_in_foreign_key_order(self):
        steps = load_dev.plan(LOCAL, SEED)
        tables = [s.target for s in steps if s.kind == "table"]
        self.assertEqual(tables, ["species", "profiles", "plants"])

    def test_should_send_one_auth_request_per_dummy_user(self):
        steps = load_dev.plan(LOCAL, SEED)
        self.assertEqual(sum(1 for s in steps if s.kind == "auth"), 1)

    def test_should_mark_auth_user_as_confirmed_with_seed_id(self):
        step = next(s for s in load_dev.plan(LOCAL, SEED) if s.kind == "auth")
        self.assertEqual(step.body, {"id": "u1", "email": "aiko@seed.sasawis.test", "email_confirm": True})

    def test_should_upsert_table_rows_so_reloads_are_safe(self):
        step = next(s for s in load_dev.plan(LOCAL, SEED) if s.kind == "table")
        self.assertIn("resolution=merge-duplicates", step.headers["Prefer"])

    def test_should_post_table_rows_to_rest_endpoint(self):
        step = next(s for s in load_dev.plan(LOCAL, SEED) if s.target == "species")
        self.assertEqual(step.path, "/rest/v1/species")

    def test_should_send_every_row_in_the_table_step(self):
        step = next(s for s in load_dev.plan(LOCAL, SEED) if s.target == "plants")
        self.assertEqual(step.body, SEED["plants"])


if __name__ == "__main__":
    unittest.main()
