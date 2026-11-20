-- Report and block (vault/features/report-block.md, F8).
-- Reports use fixed reason codes, not free text. A user sees only their own
-- reports and blocks. Moderators read reports through the service role until
-- an ops console exists.

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  subject_type text not null check (subject_type in ('photo', 'line', 'plant', 'profile')),
  subject_id uuid not null,
  reason text not null check (reason in ('sexual', 'violent', 'hateful', 'harassment', 'spam', 'other')),
  status text not null default 'open' check (status in ('open', 'actioned', 'dismissed')),
  created_at timestamptz not null default now(),
  -- One report per person per item.
  unique (reporter_id, subject_type, subject_id)
);

create table public.blocks (
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create index blocks_blocked_id_idx on public.blocks (blocked_id);

alter table public.reports enable row level security;
alter table public.blocks enable row level security;

create policy reports_reporter_insert on public.reports
  for insert to authenticated
  with check (reporter_id = auth.uid() and status = 'open');

create policy reports_reporter_select on public.reports
  for select to authenticated
  using (reporter_id = auth.uid());

create policy blocks_blocker_all on public.blocks
  for all to authenticated
  using (blocker_id = auth.uid())
  with check (blocker_id = auth.uid());

grant select, insert on public.reports to authenticated;
grant select, insert, delete on public.blocks to authenticated;
grant select, insert, update, delete on public.reports, public.blocks to service_role;
