import { createInstance, type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, translations, type Locale } from './locales';

export type { Locale } from './locales';
export { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './locales';

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(languageTag: string): Locale {
  const primary = languageTag.split('-')[0]?.toLowerCase() ?? '';
  return isLocale(primary) ? primary : DEFAULT_LOCALE;
}

export function createI18n(locale: Locale): I18nInstance {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    initAsync: false,
    resources: {
      en: { translation: translations.en },
      ja: { translation: translations.ja },
    },
    interpolation: { escapeValue: false },
  });
  return instance;
}
