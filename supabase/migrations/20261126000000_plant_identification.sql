-- Plant identification from photos (vault/features/plant-register.md).
-- Adds the category the model returns. The taxon columns, id_source and
-- id_confidence already exist (dev seed migration); the existing check ties a
-- photo identification to a confidence value.

alter table public.plants
  add column category text check (category in (
    'foliage', 'flowering', 'succulent', 'cactus', 'fern', 'herb', 'tree', 'other'
  ));
