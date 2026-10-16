"""Throwaway simulation of the circle ladder in vault/features/circles.md.

Rules simulated: family -> order -> class ladder, a circle opens at `min_to_open`
distinct owners, one plant per owner per circle, refill-never-reshuffle,
7-day guest fallback, time-zone tie-breaker. Not production code.
"""
from collections import Counter
from dataclasses import dataclass, field

LEVELS = ("family", "order", "class")


@dataclass
class Plant:
    id: str
    owner: str
    name: str
    country: str
    tz_band: str
    family: str
    order: str
    klass: str
    day: int

    def taxon(self, level):
        return {"family": self.family, "order": self.order, "class": self.klass}[level]


@dataclass
class Circle:
    level: str
    taxon: str
    members: list = field(default_factory=list)
    guests: list = field(default_factory=list)
    opened_day: int = 0

    def everyone(self):
        return self.members + self.guests

    def owners(self):
        return {p.owner for p in self.everyone()}


class Sim:
    def __init__(self, min_to_open=8, target_size=24, max_size=30, guest_after_days=7, hold_days=0):
        self.hold_days = hold_days  # candidate rule: wait hold_days per level before using a broader one
        self.min_to_open = min_to_open
        self.target_size = target_size
        self.max_size = max_size
        self.guest_after_days = guest_after_days
        self.circles = []
        self.queue = []
        self.log = []

    def register(self, plant, day):
        self.queue.append(plant)
        self._settle(day)

    def end_of_day(self, day):
        self._settle(day)
        for plant in list(self.queue):
            if day - plant.day >= self.guest_after_days:
                self._place_as_guest(plant, day)

    def _settle(self, day):
        progress = True
        while progress:
            progress = False
            for plant in list(self.queue):
                if plant in self.queue and self._place(plant, day):
                    progress = True

    def _place(self, plant, day):
        for rank, level in enumerate(LEVELS):
            if day - plant.day < rank * self.hold_days:
                break
            taxon = plant.taxon(level)
            room =[c for c in self.circles if c.level == level and c.taxon == taxon
                    and len(c.everyone()) < self.max_size and plant.owner not in c.owners()]
            if room:
                self._join(self._best(room, plant), plant, day)
                return True
            if self._open_from_queue(level, taxon, day):
                return True
        return False

    def _best(self, circles, plant):
        return min(circles, key=lambda c: (
            sum(1 for p in c.everyone() if p.tz_band == plant.tz_band), len(c.everyone())))

    def _join(self, circle, plant, day, guest=False):
        self.queue.remove(plant)
        (circle.guests if guest else circle.members).append(plant)
        self.log.append((day, plant, circle, "guest" if guest else "joined"))

    def _open_from_queue(self, level, taxon, day):
        first_per_owner = {}
        for p in self.queue:
            if p.taxon(level) == taxon:
                first_per_owner.setdefault(p.owner, p)
        if len(first_per_owner) < self.min_to_open:
            return False
        circle = Circle(level=level, taxon=taxon, opened_day=day)
        self.circles.append(circle)
        for p in list(first_per_owner.values())[: self.target_size]:
            self._join(circle, p, day)
            self.log[-1] = (day, p, circle, "opened")
        return True

    def _place_as_guest(self, plant, day):
        room = [c for c in self.circles
                if len(c.everyone()) < self.max_size and plant.owner not in c.owners()]
        if room:
            self._join(self._best(room, plant), plant, day, guest=True)


def tz_mix(circle):
    return dict(Counter(p.tz_band for p in circle.everyone()))
