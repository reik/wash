"""Tests for the circle ladder from vault/features/circles.md (throwaway prototype)."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from circle_sim import Circle, Plant, Sim  # noqa: E402


def plant(owner, family="F", order="O", klass="C", tz="apac", day=1, name=None):
    return Plant(
        id=f"{owner}-{name or family}", owner=owner, name=name or family, country="XX",
        tz_band=tz, family=family, order=order, klass=klass, day=day,
    )


class LadderTests(unittest.TestCase):
    def test_should_wait_when_fewer_than_8_owners_share_a_taxon(self):
        sim = Sim()
        for i in range(7):
            sim.register(plant(f"o{i}"), day=1)
        self.assertEqual(len(sim.circles), 0)
        self.assertEqual(len(sim.queue), 7)

    def test_should_open_family_circle_when_8_distinct_owners_share_a_family(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}"), day=1)
        self.assertEqual([(c.level, c.taxon) for c in sim.circles], [("family", "F")])

    def test_should_not_count_two_plants_of_one_owner_as_two_members(self):
        sim = Sim()
        for i in range(7):
            sim.register(plant(f"o{i}"), day=1)
        sim.register(plant("o0", name="second"), day=1)
        self.assertEqual(len(sim.circles), 0)

    def test_should_open_order_circle_when_families_differ_but_order_has_8_owners(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}", family=f"F{i}"), day=1)
        self.assertEqual([(c.level, c.taxon) for c in sim.circles], [("order", "O")])

    def test_should_open_class_circle_when_only_class_has_8_owners(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}", family=f"F{i}", order=f"O{i}"), day=1)
        self.assertEqual([(c.level, c.taxon) for c in sim.circles], [("class", "C")])

    def test_should_join_existing_circle_instead_of_opening_a_new_one(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}"), day=1)
        sim.register(plant("late"), day=2)
        self.assertEqual((len(sim.circles), len(sim.circles[0].members)), (1, 9))

    def test_should_not_place_a_second_plant_of_the_same_owner_in_one_circle(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}"), day=1)
        sim.register(plant("o0", name="second"), day=2)
        self.assertEqual(len(sim.circles[0].members), 8)
        self.assertEqual(len(sim.queue), 1)

    def test_should_place_a_plant_as_guest_after_7_days_waiting(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}"), day=1)
        sim.register(plant("rare", family="X", order="Y", klass="Z"), day=1)
        sim.end_of_day(day=8)
        self.assertEqual(len(sim.circles[0].guests), 1)

    def test_should_keep_a_plant_waiting_before_7_days(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}"), day=1)
        sim.register(plant("rare", family="X", order="Y", klass="Z"), day=1)
        sim.end_of_day(day=7)
        self.assertEqual(len(sim.queue), 1)

    def test_should_prefer_the_circle_where_the_tz_band_is_least_represented(self):
        sim = Sim()
        crowded = Circle(level="family", taxon="F", members=[plant(f"a{i}", tz="apac") for i in range(5)])
        mixed = Circle(level="family", taxon="F", members=[plant(f"b{i}", tz="emea") for i in range(5)])
        sim.circles.extend([crowded, mixed])
        sim.register(plant("new", tz="apac"), day=1)
        self.assertEqual(len(mixed.members), 6)

    def test_should_not_use_the_order_level_until_the_hold_days_have_passed(self):
        sim = Sim(hold_days=3)
        for i in range(8):
            sim.register(plant(f"o{i}", family=f"F{i}"), day=1)
        self.assertEqual(len(sim.circles), 0)
        sim.end_of_day(day=4)
        self.assertEqual([c.level for c in sim.circles], ["order"])

    def test_should_let_a_family_form_while_broader_levels_are_on_hold(self):
        sim = Sim(hold_days=3)
        for i in range(4):
            sim.register(plant(f"a{i}", family="F"), day=1)
            sim.register(plant(f"b{i}", family=f"X{i}"), day=1)
        for i in range(4):
            sim.register(plant(f"c{i}", family="F", day=2), day=2)
        self.assertEqual([c.level for c in sim.circles], ["family"])

    def test_should_not_move_members_when_a_narrower_group_later_fills(self):
        sim = Sim()
        for i in range(8):
            sim.register(plant(f"o{i}", family=f"F{i}"), day=1)
        for i in range(8, 16):
            sim.register(plant(f"o{i}", family="F0"), day=2)
        self.assertEqual([c.level for c in sim.circles], ["order"])


if __name__ == "__main__":
    unittest.main()
