import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { SUPABASE_URL } from '../../../../api/config';
import { createI18n } from '../../../../i18n';
import { server } from '../../../../test/server';
import { CareLogForm } from './CareLogForm';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const EVENT_ID = '44444444-4444-4444-8444-444444444444';
const ENDPOINT = `${SUPABASE_URL}/rest/v1/plant_events`;

async function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  await render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={createI18n('en')}>
        <CareLogForm plantId={PLANT_ID} />
      </I18nextProvider>
    </QueryClientProvider>,
  );
}

describe('CareLogForm', () => {
  it('should_show_confirmation_when_event_is_logged', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ id: EVENT_ID }, { status: 201 })));
    await renderForm();

    await fireEvent.press(screen.getByRole('radio', { name: 'Repotted' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Log event' }));

    expect(await screen.findByText('Event logged')).toBeTruthy();
  });

  it('should_show_failure_message_when_database_rejects_the_event', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ message: 'denied' }, { status: 403 })));
    await renderForm();

    await fireEvent.press(screen.getByRole('button', { name: 'Log event' }));

    expect(await screen.findByText('Something went wrong. Please try again.')).toBeTruthy();
  });
});
