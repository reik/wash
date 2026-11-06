import { resolveLocale, createI18n } from './index';

describe('resolveLocale', () => {
  it('should_return_ja_when_device_language_is_japanese', () => {
    expect(resolveLocale('ja-JP')).toBe('ja');
  });

  it('should_return_en_when_device_language_is_english', () => {
    expect(resolveLocale('en-US')).toBe('en');
  });

  it('should_fall_back_to_en_when_device_language_is_unsupported', () => {
    expect(resolveLocale('fr-FR')).toBe('en');
  });
});

describe('createI18n', () => {
  it('should_translate_tagline_in_japanese_when_locale_is_ja', async () => {
    const i18n = await createI18n('ja');
    expect(i18n.t('app.tagline')).toBe('植物にも、ものがたりがある。');
  });

  it('should_translate_tagline_in_english_when_locale_is_en', async () => {
    const i18n = await createI18n('en');
    expect(i18n.t('app.tagline')).toBe('Every plant has a story worth telling.');
  });
});
