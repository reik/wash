-- Stored photos (vault/features/photo-upload.md).
-- The create-photo Edge Function uploads only the metadata-free copy, after the
-- image check passes, and records its path here. The bucket is private: nothing
-- is served by public URL, and the app reads photos through signed URLs.

alter table public.photos add column storage_path text unique;

insert into storage.buckets (id, name, public)
values ('plant-photos', 'plant-photos', false)
on conflict (id) do nothing;
