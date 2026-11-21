import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { SUPABASE_URL } from './config';
import { createPlant, type RegisterPlantInput } from './plants';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const ENDPOINT = `${SUPABASE_URL}/rest/v1/plants`;

const input: RegisterPlantInput = {
  ownerId: '22222222-2222-4222-8222-222222222222',
  name: 'Mochi',
  stage: 'newborn',
  city: 'Tokyo',
  countryCode: 'JP',
  tzBand: 'apac',
  climateClass: 'tropical',
};

describe('createPlant', () => {
  it('should_return_id_and_short_code_when_plant_is_created', async () => {
    server.use(
      http.post(ENDPOINT, () => HttpResponse.json({ id: PLANT_ID, short_code: 'abcd2345' }, { status: 201 })),
    );

    const plant = await createPlant(input);

    expect(plant).toEqual({ id: PLANT_ID, shortCode: 'abcd2345' });
  });

  it('should_send_snake_case_columns_to_the_database', async () => {
    let sentBody: unknown = null;
    server.use(
      http.post(ENDPOINT, async ({ request }) => {
        sentBody = await request.json();
        return HttpResponse.json({ id: PLANT_ID, short_code: 'abcd2345' }, { status: 201 });
      }),
    );

    await createPlant(input);

    expect(sentBody).toEqual(
      expect.objectContaining({
        owner_id: '22222222-2222-4222-8222-222222222222',
        name: 'Mochi',
        stage: 'newborn',
        city: 'Tokyo',
        country_code: 'JP',
        tz_band: 'apac',
        climate_class: 'tropical',
      }),
    );
  });

  it('should_throw_when_database_rejects_the_insert', async () => {
    server.use(
      http.post(ENDPOINT, () =>
        HttpResponse.json({ code: '42501', message: 'new row violates row-level security' }, { status: 403 }),
      ),
    );

    await expect(createPlant(input)).rejects.toThrow('plant.failed');
  });
});
