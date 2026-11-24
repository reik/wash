import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { SUPABASE_URL } from './config';
import { logPlantEvent } from './events';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const EVENT_ID = '44444444-4444-4444-8444-444444444444';
const ENDPOINT = `${SUPABASE_URL}/rest/v1/plant_events`;

describe('logPlantEvent', () => {
  it('should_return_event_id_when_event_is_logged', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ id: EVENT_ID }, { status: 201 })));

    const event = await logPlantEvent({ plantId: PLANT_ID, type: 'watered' });

    expect(event).toEqual({ id: EVENT_ID });
  });

  it('should_send_owner_log_source_and_type_to_the_database', async () => {
    let sentBody: unknown = null;
    server.use(
      http.post(ENDPOINT, async ({ request }) => {
        sentBody = await request.json();
        return HttpResponse.json({ id: EVENT_ID }, { status: 201 });
      }),
    );

    await logPlantEvent({ plantId: PLANT_ID, type: 'repotted' });

    expect(sentBody).toEqual(expect.objectContaining({ plant_id: PLANT_ID, type: 'repotted', source: 'owner_log' }));
  });

  it('should_throw_when_database_rejects_the_insert', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ message: 'denied' }, { status: 403 })));

    await expect(logPlantEvent({ plantId: PLANT_ID, type: 'watered' })).rejects.toThrow('event.failed');
  });
});
