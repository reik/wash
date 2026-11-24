import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { SUPABASE_URL } from './config';
import { fetchGarden } from './garden';

const ENDPOINT = `${SUPABASE_URL}/rest/v1/rpc/garden_for_owner`;
const PLANT_ID = '11111111-1111-4111-8111-111111111111';

describe('fetchGarden', () => {
  it('should_return_owner_plants_with_latest_moment_when_request_succeeds', async () => {
    server.use(
      http.post(ENDPOINT, () =>
        HttpResponse.json([
          {
            plant_id: PLANT_ID,
            name: 'Mochi',
            stage: 'growing',
            city: 'Tokyo',
            country_code: 'JP',
            photo_count: 3,
            last_photo_at: '2026-11-20T09:00:00Z',
            avatar_path: '11111111/avatar.jpg',
            latest_event_type: 'watered',
            latest_event_at: '2026-11-21T08:00:00Z',
          },
        ]),
      ),
    );

    const plants = await fetchGarden();

    expect(plants).toEqual([
      expect.objectContaining({
        plantId: PLANT_ID,
        name: 'Mochi',
        photoCount: 3,
        avatarPath: '11111111/avatar.jpg',
        latestEventType: 'watered',
      }),
    ]);
  });

  it('should_return_empty_list_when_owner_has_no_plants', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json([])));

    await expect(fetchGarden()).resolves.toEqual([]);
  });

  it('should_return_nulls_for_plants_without_photos_or_events', async () => {
    server.use(
      http.post(ENDPOINT, () =>
        HttpResponse.json([
          {
            plant_id: PLANT_ID,
            name: 'New fern',
            stage: 'newborn',
            city: 'Paris',
            country_code: 'FR',
            photo_count: 0,
            last_photo_at: null,
            avatar_path: null,
            latest_event_type: null,
            latest_event_at: null,
          },
        ]),
      ),
    );

    const [plant] = await fetchGarden();

    expect(plant).toEqual(expect.objectContaining({ avatarPath: null, latestEventType: null, photoCount: 0 }));
  });

  it('should_throw_when_request_fails', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ message: 'boom' }, { status: 500 })));

    await expect(fetchGarden()).rejects.toThrow('garden.failed');
  });
});
