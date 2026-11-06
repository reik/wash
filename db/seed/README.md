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

## Loading into the local stack
The schema for these tables lives in `supabase/migrations/20261103000000_dev_seed_tables.sql`. The loader only talks to a loopback URL and refuses anything else.

```bash
supabase start                      # local stack (API on http://127.0.0.1:56321)
supabase db reset                   # apply migrations; clears auth users
SUPABASE_SERVICE_ROLE_KEY="$(supabase status -o env | grep '^SERVICE_ROLE_KEY' | cut -d'"' -f2)" \
  python3 db/seed/load_dev.py
```

The loader creates the 10 auth users through the admin API with their fixed ids, then upserts `species`, `profiles`, `plants` in that order. Running it again is safe. Tests: `python3 db/seed/test_load_dev.py`.

## Reproducing the circle simulation
Reading these files into the simulation in `mockups/circle-sim/` gives exactly the same circles as its built-in dummy table (checked on 2026-10-16: Araceae circle on day 5, monocot circle on day 6, 13 plants waiting).
