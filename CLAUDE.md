# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An ideation workspace for a hobby web/mobile app, before any code exists. It holds only an Obsidian vault (`vault/`), and there are no build, lint or test commands yet.

The repo is **public** at [github.com/reik/wash](https://github.com/reik/wash). Keep personal data, secrets and anything confidential out of every file and commit message.

Product constraints that every idea must meet: **genuine fun, no personal-identity pressure (the plant or object is the protagonist, not the user), international from day one (English + Japanese).** Inspiration: [ぬい日和 Nuibiyori](https://www.nuibiyori.com/).

## Vault layout

- `vault/index.md`: entry point. Read it first; it lists the ideas being incubated and their one-line hooks.
- `vault/ideas/<slug>.md`: one note per idea, made from `ideas/_template.md`. Frontmatter `status` runs `drafting → validating → building → shipped | parked`.
- `vault/features/<slug>.md`: one note per feature *of* an idea (e.g. `plant-voice.md`, which serves both ideas), made from `features/_template.md`. Frontmatter `serves:` lists the idea slugs.
- `vault/ideas/parking-lot.md`: every rejected idea and why. **Check it before proposing an idea**, because many obvious ones (AI talking plants, plant avatars, AR faces, growth prediction, cutting swaps, plant pen pals) were already rejected.
- `vault/research/competitive-landscape.md`: all competitor findings, with links and the date checked. Check it before searching again, and add new sources here, not inside idea notes.
- `vault/tech-direction.md`: platform requirement (**iPhone + Android apps from v1**, plus web for landing and public plant pages), proposed stack, app store requirements. Any build plan must include both mobile apps.
- `vault/principles.md`: design rules shared by all ideas (soft reactions, privacy defaults, i18n, no cross-border shipping of living material).
- `vault/kanban/ideas.md`: Obsidian Kanban board (Backlog / In Progress / Review / Done). Move cards when an idea's `status` changes.
- `vault/log/YYYY-MM-DD.md`: append-only session log.

Product concepts go in `ideas/`; features that belong to a concept go in `features/`.

## How to work on ideas

- A new idea needs a **one-sentence hook and "the moment"** (what makes someone react within 3 seconds), checked for originality by searching. Feature lists alone have been rejected as unoriginal.
- Every idea note has a "Riskiest assumptions & experiments" table. Prefer cheap, no-code validation (Reddit call-outs, landing pages, hand-run pilots) before proposing a build.
- Link notes with `[[wiki-links]]`. Heading links (`[[note#Heading]]`) must match a heading exactly; avoid `/` in headings.

## Checking links

```bash
python3 - <<'EOF'
import re, pathlib
root = pathlib.Path("vault"); files = {p.stem: p for p in root.rglob("*.md")}
for p in root.rglob("*.md"):
    for l in re.findall(r"\[\[([^\]]+)\]\]", p.read_text()):
        n, _, h = l.split("|")[0].partition("#")
        if n not in files or (h and f"# {h}" not in files[n].read_text()): print(f"{p.name}: [[{l}]]")
EOF
```
No output means every link resolves.
