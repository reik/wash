export const SUPPORTED_LOCALES = ['en', 'ja'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const translations = {
  en: {
    app: {
      name: 'Sasawis',
      tagline: 'Every plant has a story worth telling.',
    },
  },
  ja: {
    app: {
      name: 'Sasawis',
      tagline: '植物にも、ものがたりがある。',
    },
  },
} as const satisfies Record<Locale, { app: { name: string; tagline: string } }>;
