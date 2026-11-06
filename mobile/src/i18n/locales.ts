export const SUPPORTED_LOCALES = ['en', 'ja'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface Dictionary {
  [key: string]: string | Dictionary;
}

export const translations = {
  en: {
    app: {
      name: 'Sasawis',
      tagline: 'Every plant has a story worth telling.',
    },
    auth: {
      email: 'Email',
      password: 'Password',
      signIn: 'Sign in',
      invalidCredentials: 'Email or password is incorrect',
    },
    validation: {
      emailInvalid: 'Enter a valid email address',
      passwordTooShort: 'Use at least 8 characters',
    },
  },
  ja: {
    app: {
      name: 'Sasawis',
      tagline: '植物にも、ものがたりがある。',
    },
    auth: {
      email: 'メールアドレス',
      password: 'パスワード',
      signIn: 'サインイン',
      invalidCredentials: 'メールアドレスまたはパスワードが違います',
    },
    validation: {
      emailInvalid: '有効なメールアドレスを入力してください',
      passwordTooShort: '8文字以上で入力してください',
    },
  },
} as const satisfies Record<Locale, Dictionary>;
