"""Load the dev seed into a LOCAL Supabase stack. Stdlib only.

Usage (after `supabase start`):
    SUPABASE_SERVICE_ROLE_KEY=<local service_role key> python3 db/seed/load_dev.py

Only loopback URLs are accepted, so dummy users can never reach a hosted project.
"""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

SEED_DIR = Path(__file__).parent / "dev"
DEFAULT_URL = "http://127.0.0.1:56321"
LOCAL_HOSTS = {"127.0.0.1", "localhost", "::1"}
TABLE_ORDER = ("species", "profiles", "plants")
TABLE_PREFER = "resolution=merge-duplicates,return=minimal"


class NotLocalError(Exception):
    """Raised when the target URL is not a loopback address."""


@dataclass(frozen=True)
class Step:
    kind: str  # "auth" or "table"
    target: str
    path: str
    body: Any
    headers: dict[str, str] = field(default_factory=dict)


def is_local_url(url: str) -> bool:
    parts = urllib.parse.urlsplit(url)
    return parts.scheme == "http" and parts.hostname in LOCAL_HOSTS


def plan(url: str, seed: dict[str, list[dict[str, Any]]]) -> list[Step]:
    if not is_local_url(url):
        raise NotLocalError(f"refusing to seed non-local URL: {url}")
    steps = [
        Step(
            kind="auth",
            target="auth_users",
            path="/auth/v1/admin/users",
            body={"id": u["id"], "email": u["email"], "email_confirm": True},
        )
        for u in seed["auth_users"]
    ]
    for table in TABLE_ORDER:
        steps.append(
            Step(
                kind="table",
                target=table,
                path=f"/rest/v1/{table}",
                body=seed[table],
                headers={"Prefer": TABLE_PREFER},
            )
        )
    return steps


def load_seed(seed_dir: Path = SEED_DIR) -> dict[str, list[dict[str, Any]]]:
    return {name: json.loads((seed_dir / f"{name}.json").read_text()) for name in ("species", "auth_users", "profiles", "plants")}


def execute(url: str, service_key: str, steps: list[Step]) -> None:
    for step in steps:
        request = urllib.request.Request(
            url + step.path,
            data=json.dumps(step.body).encode(),
            method="POST",
            headers={
                "apikey": service_key,
                "Authorization": f"Bearer {service_key}",
                "Content-Type": "application/json",
                **step.headers,
            },
        )
        try:
            with urllib.request.urlopen(request) as response:
                response.read()
        except urllib.error.HTTPError as err:
            if step.kind == "auth" and err.code == 422 and "already" in err.read().decode().lower():
                continue
            raise
        print(f"loaded {step.target}: {len(step.body) if isinstance(step.body, list) else 1} row(s)")


def main() -> int:
    url = os.environ.get("SUPABASE_URL", DEFAULT_URL)
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not service_key:
        print("set SUPABASE_SERVICE_ROLE_KEY (local key from `supabase status`)", file=sys.stderr)
        return 1
    try:
        steps = plan(url, load_seed())
    except NotLocalError as err:
        print(err, file=sys.stderr)
        return 1
    execute(url, service_key, steps)
    return 0


if __name__ == "__main__":
    sys.exit(main())
