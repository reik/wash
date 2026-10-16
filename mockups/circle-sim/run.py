"""Run the circle ladder on dummy data. Usage: python3 run.py [dummy|pilot]"""
import json
import random
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from circle_sim import Plant, Sim, tz_mix  # noqa: E402

GBIF = json.loads((Path(__file__).parent / "gbif.json").read_text())

# owner: (country, tz_band, [(species, plant nickname, registration day), ...])
DUMMY_OWNERS = {
    "Aiko": ("JP", "apac", [("golden pothos", "Mochi", 1), ("monstera", "Kumo", 1), ("snake plant", "Tora", 4), ("echeveria", "Pon", 6)]),
    "Ben": ("US", "americas", [("monstera", "Gus", 1), ("ZZ plant", "Zed", 2), ("fiddle-leaf fig", "Fig", 3)]),
    "Carla": ("BR", "americas", [("philodendron", "Lua", 2), ("golden pothos", "Sol", 2), ("calathea", "Mia", 5), ("rubber plant", "Borracha", 5), ("aloe", "Babosa", 9)]),
    "Dmitri": ("DE", "emea", [("peace lily", "Lily", 2), ("spider plant", "Spinne", 3)]),
    "Emi": ("JP", "apac", [("phalaenopsis orchid", "Hime", 3), ("anthurium", "Ruby", 3), ("begonia", "Bibi", 7)]),
    "Farah": ("AE", "emea", [("prickly pear", "Sabr", 3), ("mammillaria", "Dot", 4), ("jade plant", "Jade", 4), ("areca palm", "Nakhla", 8)]),
    "Gus": ("AU", "apac", [("monstera", "Mon", 4), ("syngonium", "Sync", 4), ("basil", "Basil", 6)]),
    "Hana": ("KR", "apac", [("golden pothos", "Hanip", 4), ("boston fern", "Bori", 5)]),
    "Ines": ("ES", "emea", [("philodendron", "Selva", 5), ("golden pothos", "Oro", 5), ("ginkgo bonsai", "Gingko", 6), ("african violet", "Violeta", 10)]),
    "Jack": ("CA", "americas", [("monstera", "Big Jim", 6), ("ZZ plant", "Zee", 6), ("maidenhair fern", "Maiden", 7)]),
}

PILOT_COUNTRIES = [("JP", "apac"), ("KR", "apac"), ("AU", "apac"), ("US", "americas"), ("BR", "americas"),
                   ("CA", "americas"), ("DE", "emea"), ("ES", "emea"), ("GB", "emea"), ("AE", "emea")]
# rough popularity weights for a plant-community sign-up (aroids dominate)
PILOT_WEIGHTS = {
    "golden pothos": 9, "monstera": 9, "philodendron": 4, "ZZ plant": 4, "peace lily": 3, "anthurium": 1,
    "snake plant": 5, "spider plant": 3, "aloe": 3, "phalaenopsis orchid": 3, "areca palm": 1, "calathea": 2,
    "boston fern": 2, "jade plant": 3, "echeveria": 2, "prickly pear": 1, "mammillaria": 1, "fiddle-leaf fig": 3,
    "rubber plant": 3, "begonia": 1, "african violet": 1, "basil": 2, "rosemary": 1, "ginkgo bonsai": 1,
    "maidenhair fern": 1,
}


def make_plant(owner, country, tz, species, name, day):
    g = GBIF[species]
    return Plant(id=f"{owner}-{name}", owner=owner, name=f"{name} ({species})", country=country, tz_band=tz,
                 family=g["family"], order=g["order"], klass=g["class"], day=day)


def dummy_plants():
    return [make_plant(o, c, tz, s, n, d) for o, (c, tz, ps) in DUMMY_OWNERS.items() for s, n, d in ps]


def pilot_plants(owners=30, seed=7):
    rng = random.Random(seed)
    species = list(PILOT_WEIGHTS)
    out = []
    for i in range(owners):
        country, tz = rng.choice(PILOT_COUNTRIES)
        s = rng.choices(species, weights=[PILOT_WEIGHTS[k] for k in species])[0]
        out.append(make_plant(f"P{i + 1:02d}", country, tz, s, f"plant{i + 1}", rng.randint(1, 14)))
    return out


def simulate(plants, days=14, quiet=False, hold_days=0):
    sim = Sim(hold_days=hold_days)
    for day in range(1, days + 1):
        for p in [p for p in plants if p.day == day]:
            before = len(sim.log)
            sim.register(p, day)
            if not quiet:
                for _, who, circle, how in sim.log[before:]:
                    print(f"day {day:2}: {who.owner:7} {who.name:28} -> {how:6} {circle.level} circle '{circle.taxon}'")
        before = len(sim.log)
        sim.end_of_day(day)
        if not quiet:
            for _, who, circle, how in sim.log[before:]:
                print(f"day {day:2}: {who.owner:7} {who.name:28} -> {how:6} {circle.level} circle '{circle.taxon}' (after 7 days waiting)")
    return sim


def report(sim, plants):
    print(f"\n{len(plants)} plants, {len({p.owner for p in plants})} owners, {len(sim.circles)} circle(s) formed")
    for c in sim.circles:
        print(f"  {c.level:6} '{c.taxon}' opened day {c.opened_day}: {len(c.members)} members + {len(c.guests)} guests, "
              f"{len(c.owners())} owners, tz {tz_mix(c)}")
    print(f"  still waiting: {len(sim.queue)} -> {sorted({p.name for p in sim.queue})}")


def sweep(owners=30, seeds=50, hold_days=0):
    """How often does each level of the ladder form, over many random sign-up sets?"""
    levels, family_share, waiting = Counter(), [], []
    for seed in range(1, seeds + 1):
        plants = pilot_plants(owners, seed)
        sim = simulate(plants, quiet=True, hold_days=hold_days)
        levels.update(c.level for c in sim.circles)
        in_family = sum(len(c.everyone()) for c in sim.circles if c.level == "family")
        family_share.append(in_family / len(plants))
        waiting.append(len(sim.queue))
    print(f"{seeds} random sign-up sets of {owners} owners x 1 plant, hold_days={hold_days}")
    print(f"  circles formed by level (total over all runs): {dict(levels)}")
    print(f"  runs with at least one family circle: {sum(s > 0 for s in family_share)} of {seeds}")
    print(f"  average share of plants in a family circle: {sum(family_share) / seeds:.0%}")
    print(f"  average plants still waiting at day 14: {sum(waiting) / seeds:.1f}")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "dummy"
    if mode == "sweep":
        sweep(int(sys.argv[2]) if len(sys.argv) > 2 else 30, hold_days=int(sys.argv[3]) if len(sys.argv) > 3 else 0)
    else:
        plants = dummy_plants() if mode == "dummy" else pilot_plants()
        report(simulate(plants, quiet=(mode != "dummy")), plants)
