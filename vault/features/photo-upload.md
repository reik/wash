---
title: Photo upload (F6)
status: building   # drafting → building → review → shipped
created: 2026-11-19
updated: 2026-11-19
tags: [feature, p1, privacy, photos]
serves: [every-plant-has-a-past]
---

# Photo upload (F6)

> **Hook:** Add a photo of your plant, and it is checked and stored without any location or camera details.

Serves: [[every-plant-has-a-past]] · Roadmap: [[roadmap]] (P1, step 2: F6) · Gate: [[content-moderation]] · Back to [[index]]

## Decisions (2026-11-19)
- **Gate first, store second.** The image check runs before any bytes are kept. A failed or unavailable check stores nothing ([[content-moderation]]).
- **EXIF and XMP are stripped before storage** ([[principles]]: strip EXIF/GPS from every upload). The check reads the original; only the stripped copy is stored. Metadata removed: EXIF, XMP, IPTC and text chunks in JPEG, PNG and WebP.
- **Private bucket** `plant-photos`. Nothing is served by public URL. Photos are shown only through signed URLs, once the photo row has passed.
- **Path** `<plant_id>/<photo_id>.<ext>`, with the photo id generated server-side.

## How it works
- `create-photo` (existing): signed-in owner, owns the plant, image check, then on pass: strip metadata, upload to the bucket, record the row with `storage_path`.
- `_shared/metadata-strip.ts`: pure byte-level removal for JPEG, PNG and WebP.

## Risks
| Risk | Mitigation |
|---|---|
| Upload succeeds but the row insert fails, leaving an orphan object | Object is unreachable without a row; a later cleanup job can remove orphans (not in this PR) |
| A metadata chunk type is missed | Tests cover each format's known location; unknown chunks are kept, so the list stays explicit |

## Open questions
- Image storage retention and deletion when a photo is removed (later PR).
- Signed-URL lifetime for the app (later PR).

## Next steps
- [ ] Metadata stripping for JPEG, PNG and WebP (tests first)
- [ ] `create-photo` stores the stripped copy and records `storage_path`
- [ ] Migration: `storage_path` column and private bucket
- [ ] Open PR; move card to Review
