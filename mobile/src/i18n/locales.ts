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
      required: 'Please sign in again',
    },
    photo: {
      choose: 'Choose photo',
      saving: 'Saving…',
      saved: 'Photo saved',
      flagged: "This photo can't be shared",
      unavailable: 'We cannot check photos right now. Try again later.',
      failed: 'Something went wrong. Please try again.',
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
      required: 'もう一度サインインしてください',
    },
    photo: {
      choose: '写真を選ぶ',
      saving: '保存しています…',
      saved: '写真を保存しました',
      flagged: 'この写真は公開できません',
      unavailable: '今は写真を確認できません。しばらくしてからもう一度お試しください。',
      failed: 'うまくいきませんでした。もう一度お試しください。',
    },
    validation: {
      emailInvalid: '有効なメールアドレスを入力してください',
      passwordTooShort: '8文字以上で入力してください',
    },
  },
} as const satisfies Record<Locale, Dictionary>;
