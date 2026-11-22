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
    garden: {
      title: 'Today in my garden',
      empty: 'No plants yet. Register one to start.',
      noPhotos: 'No photos yet',
      photos: '{{count}} photos',
      latest: 'Last: {{event}}',
      noEvents: 'Nothing logged yet',
      failed: 'Something went wrong. Please try again.',
      eventTypes: {
        watered: 'Watered',
        repotted: 'Repotted',
        moved: 'Moved',
        new_leaf: 'New leaf',
        flower: 'Flowering',
        droop: 'Drooping',
        leaning: 'Leaning',
        owner_away: 'I was away',
      },
    },
    validation: {
      emailInvalid: 'Enter a valid email address',
      passwordTooShort: 'Use at least 8 characters',
      nameRequired: 'Give your plant a name',
      nameTooLong: 'Keep the name under 40 characters',
      cityRequired: 'Enter the city',
      countryInvalid: 'Use a 2-letter country code, like JP',
    },
    plant: {
      register: 'Register plant',
      name: 'Name',
      city: 'City',
      countryCode: 'Country code',
      stage: 'Stage',
      climate: 'Climate',
      registered: 'Plant registered. Code:',
      failed: 'Something went wrong. Please try again.',
      stages: { newborn: 'New', growing: 'Growing', elder: 'Elder' },
      climates: { temperate: 'Temperate', tropical: 'Tropical', arid: 'Arid', cold: 'Cold' },
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
    garden: {
      title: '今日のお庭',
      empty: 'まだ植物がありません。登録して始めましょう。',
      noPhotos: 'まだ写真がありません',
      photos: '写真 {{count}} 枚',
      latest: '最近：{{event}}',
      noEvents: 'まだ記録がありません',
      failed: 'うまくいきませんでした。もう一度お試しください。',
      eventTypes: {
        watered: '水やり',
        repotted: '植え替え',
        moved: '引っ越し',
        new_leaf: '新芽',
        flower: '開花',
        droop: 'しおれ',
        leaning: '傾き',
        owner_away: '留守にした',
      },
    },
    validation: {
      emailInvalid: '有効なメールアドレスを入力してください',
      passwordTooShort: '8文字以上で入力してください',
      nameRequired: '植物に名前をつけてください',
      nameTooLong: '名前は40文字以内で入力してください',
      cityRequired: '市を入力してください',
      countryInvalid: '国コードを2文字で入力してください（例：JP）',
    },
    plant: {
      register: '植物を登録する',
      name: '名前',
      city: '市',
      countryCode: '国コード',
      stage: '成長段階',
      climate: '気候',
      registered: '登録しました。コード：',
      failed: 'うまくいきませんでした。もう一度お試しください。',
      stages: { newborn: 'はじめて', growing: '成長中', elder: 'ベテラン' },
      climates: { temperate: '温帯', tropical: '熱帯', arid: '乾燥', cold: '寒冷' },
    },
  },
} as const satisfies Record<Locale, Dictionary>;
