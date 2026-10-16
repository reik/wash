# Seed data

Dummy data for the **dev database**, shaped like the tables in `vault/data-model.md`. The production database is created from migrations only and never receives this data.

```text
db/seed/
├── dev/
│   ├── species.json     25 houseplants, real GBIF classification
│   ├── auth_users.json  10 login records (loader creates them via the admin API)
│   ├── profiles.json    10 dummy owners, 9 countries
│   └── plants.json      33 plants, 2 to 5 per owner, registered over 10 days
└── test_seed_dev.py     integrity checks (foreign keys, taxon matches species, unique codes)
```

Run the checks: `python3 db/seed/test_seed_dev.py`

## Rules
- **Dummy marker:** every dummy login uses an `@seed.sasawis.test` email. Never use a real address here.
- **Stable ids:** ids are derived from names (UUID v5), so reloading the seed gives the same ids and can safely upsert.
- **Dev only:** notifications and AI calls must be off or pointed at test targets in dev, so dummy users never cause real pushes, emails or paid calls.
- **Not in the seed:**
  - `circle_rules` is configuration and belongs in a migration, because production needs it too.
  - `circles`, `circle_members` and `matchmaking_queue` are produced by the placement job. The seed only supplies the plants that job places. `plants.circle_id` is null here on purpose.
  - Species `temperament` is null until the curated table exists.

## Loading (not built yet)
No database exists yet. The loader, when written, should: create the `auth.users` rows from `auth_users.json` with the Supabase admin API, then insert `species`, `profiles`, `plants` in that order.

## Reproducing the circle simulation
Reading these files into the simulation in `mockups/circle-sim/` gives exactly the same circles as its built-in dummy table (checked on 2026-10-16: Araceae circle on day 5, monocot circle on day 6, 13 plants waiting).
