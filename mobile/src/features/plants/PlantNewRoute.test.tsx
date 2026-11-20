import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';

import { createI18n } from '../../i18n';
import PlantNewRoute from '../../app/plants/new';

describe('PlantNewRoute', () => {
  it('should_ask_for_sign_in_when_no_one_is_signed_in', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    await render(
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={createI18n('en')}>
          <PlantNewRoute />
        </I18nextProvider>
      </QueryClientProvider>,
    );

    expect(await screen.findByText('Please sign in again')).toBeTruthy();
  });
});
