import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { SUPABASE_URL } from '../../../../api/config';
import { createI18n } from '../../../../i18n';
import { server } from '../../../../test/server';
import { PlantRegisterForm } from './PlantRegisterForm';

const OWNER_ID = '22222222-2222-4222-8222-222222222222';
const ENDPOINT = `${SUPABASE_URL}/rest/v1/plants`;

async function renderForm() {
  server.use(http.post(`${SUPABASE_URL}/rest/v1/profiles`, () => new HttpResponse(null, { status: 201 })));
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  await render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={createI18n('en')}>
        <PlantRegisterForm ownerId={OWNER_ID} />
      </I18nextProvider>
    </QueryClientProvider>,
  );
}

async function fillAndSubmit(name: string, city: string, countryCode: string) {
  await fireEvent.changeText(screen.getByLabelText('Name'), name);
  await fireEvent.changeText(screen.getByLabelText('City'), city);
  await fireEvent.changeText(screen.getByLabelText('Country code'), countryCode);
  await fireEvent.press(screen.getByRole('button', { name: 'Register plant' }));
}

describe('PlantRegisterForm', () => {
  it('should_show_name_error_when_name_is_empty', async () => {
    await renderForm();

    await fillAndSubmit('', 'Tokyo', 'JP');

    expect(await screen.findByText('Give your plant a name')).toBeTruthy();
  });

  it('should_show_country_error_when_country_code_is_not_two_letters', async () => {
    await renderForm();

    await fillAndSubmit('Mochi', 'Tokyo', 'Japan');

    expect(await screen.findByText('Use a 2-letter country code, like JP')).toBeTruthy();
  });

  it('should_show_short_code_when_plant_is_registered', async () => {
    server.use(
      http.post(ENDPOINT, () => HttpResponse.json({ id: '11111111-1111-4111-8111-111111111111', short_code: 'abcd2345' }, { status: 201 })),
    );
    await renderForm();

    await fillAndSubmit('Mochi', 'Tokyo', 'JP');

    expect(await screen.findByText(/abcd2345/)).toBeTruthy();
  });

  it('should_show_failure_message_when_database_rejects_the_insert', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ message: 'denied' }, { status: 403 })));
    await renderForm();

    await fillAndSubmit('Mochi', 'Tokyo', 'JP');

    expect(await screen.findByText('Something went wrong. Please try again.')).toBeTruthy();
  });
});
