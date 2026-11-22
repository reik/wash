import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { SUPABASE_URL } from '../../../../api/config';
import { createI18n } from '../../../../i18n';
import { server } from '../../../../test/server';
import { GardenList } from './GardenList';

const ENDPOINT = `${SUPABASE_URL}/rest/v1/rpc/garden_for_owner`;

async function renderGarden() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  await render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={createI18n('en')}>
        <GardenList />
      </I18nextProvider>
    </QueryClientProvider>,
  );
}

describe('GardenList', () => {
  it('should_show_each_plant_with_its_latest_moment', async () => {
    server.use(
      http.post(ENDPOINT, () =>
        HttpResponse.json([
          {
            plant_id: '11111111-1111-4111-8111-111111111111',
            name: 'Mochi',
            stage: 'growing',
            city: 'Tokyo',
            country_code: 'JP',
            photo_count: 2,
            last_photo_at: null,
            avatar_path: null,
            latest_event_type: 'watered',
            latest_event_at: '2026-11-21T08:00:00Z',
          },
        ]),
      ),
    );
    await renderGarden();

    expect(await screen.findByText('Mochi')).toBeTruthy();
    expect(screen.getByText('Last: Watered')).toBeTruthy();
  });

  it('should_show_empty_message_when_owner_has_no_plants', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json([])));
    await renderGarden();

    expect(await screen.findByText('No plants yet. Register one to start.')).toBeTruthy();
  });
});
