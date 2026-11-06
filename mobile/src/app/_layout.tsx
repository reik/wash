import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { getLocales } from 'expo-localization';
import { I18nextProvider } from 'react-i18next';

import { createI18n, resolveLocale } from '../i18n';

const i18n = createI18n(resolveLocale(getLocales()[0]?.languageTag ?? 'en'));
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Stack screenOptions={{ headerShown: false }} />
      </I18nextProvider>
    </QueryClientProvider>
  );
}
