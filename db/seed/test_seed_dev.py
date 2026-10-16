"""Integrity checks for db/seed/dev against vault/data-model.md (stdlib only)."""
import copy
import json
import unittest
from collections import Counter
from pathlib import Path

SEED = Path(__file__).parent / "dev"
TZ_BANDS = {"apac", "emea", "americas"}
STAGES = {"newborn", "growing", "elder"}
CLIMATES = {"temperate", "tropical", "arid", "cold"}
ID_SOURCES = {"photo_api", "owner_pick", "owner_correction"}
LOCALES = {"en", "ja"}


def load():
    return {p.stem: json.loads(p.read_text()) for p in sorted(SEED.glob("*.json"))}


def problems(seed):
    out = []
    species = {s["id"]: s for s in seed["species"]}
    profiles = {p["id"]: p for p in seed["profiles"]}
    for table in ("species", "auth_users", "profiles", "plants"):
        ids = [r["id"] for r in seed[table]]
        if len(ids) != len(set(ids)):
            out.append(f"{table}: duplicate ids")
    if {u["id"] for u in seed["auth_users"]} != set(profiles):
        out.append("profiles.id must match auth_users.id one to one")
    if any(not u["email"].endswith("@seed.sasawis.test") for u in seed["auth_users"]):
        out.append("every dummy email must end with @seed.sasawis.test")
    if len({p["short_code"] for p in seed["plants"]}) != len(seed["plants"]):
        out.append("plants.short_code must be unique")
    for p in seed["profiles"]:
        if p["locale"] not in LOCALES or p["tz_band"] not in TZ_BANDS:
            out.append(f"profile {p['nickname']}: bad locale or tz_band")
    for pl in seed["plants"]:
        owner, sp = profiles.get(pl["owner_id"]), species.get(pl["species_id"])
        if owner is None or sp is None:
            out.append(f"plant {pl['name']}: owner or species does not exist")
            continue
        if (pl["taxon_family"], pl["taxon_order"], pl["taxon_class"]) != (sp["family"], sp["order"], sp["class"]):
            out.append(f"plant {pl['name']}: taxon differs from its species")
        if pl["tz_band"] != owner["tz_band"]:
            out.append(f"plant {pl['name']}: tz_band differs from its owner")
        if len(pl["country_code"]) != 2 or pl["stage"] not in STAGES or pl["climate_class"] not in CLIMATES:
            out.append(f"plant {pl['name']}: bad country_code, stage or climate_class")
        if pl["id_source"] not in ID_SOURCES or (pl["id_source"] == "photo_api") == (pl["id_confidence"] is None):
            out.append(f"plant {pl['name']}: id_source and id_confidence disagree")
    counts = Counter(pl["owner_id"] for pl in seed["plants"])
    out += [f"owner {profiles.get(o, {}).get('nickname', o)} has {n} plants (want 2 to 5)"
            for o, n in counts.items() if not 2 <= n <= 5]
    return out


class SeedTests(unittest.TestCase):
    def test_should_have_no_problems_in_the_dev_seed(self):
        self.assertEqual(problems(load()), [])

    def test_should_have_10_owners_and_33_plants(self):
        seed = load()
        self.assertEqual((len(seed["profiles"]), len(seed["plants"])), (10, 33))

    def test_should_report_a_plant_whose_owner_does_not_exist(self):
        seed = copy.deepcopy(load())
        seed["plants"][0]["owner_id"] = "00000000-0000-0000-0000-000000000000"
        self.assertIn("plant Mochi: owner or species does not exist", problems(seed))

    def test_should_report_a_taxon_that_differs_from_its_species(self):
        seed = copy.deepcopy(load())
        seed["plants"][0]["taxon_family"] = "Cactaceae"
        self.assertIn("plant Mochi: taxon differs from its species", problems(seed))

    def test_should_report_a_dummy_email_outside_the_seed_domain(self):
        seed = copy.deepcopy(load())
        seed["auth_users"][0]["email"] = "real@example.com"
        self.assertIn("every dummy email must end with @seed.sasawis.test", problems(seed))


if __name__ == "__main__":
    unittest.main()
