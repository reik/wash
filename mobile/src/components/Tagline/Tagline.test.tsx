import { render, screen } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';

import { createI18n } from '../../i18n';
import { Tagline } from './Tagline';

describe('Tagline', () => {
  it('should_show_japanese_tagline_when_locale_is_ja', async () => {
    await render(
      <I18nextProvider i18n={createI18n('ja')}>
        <Tagline />
      </I18nextProvider>,
    );

    expect(screen.getByText('植物にも、ものがたりがある。')).toBeTruthy();
  });

  it('should_show_english_tagline_when_locale_is_en', async () => {
    await render(
      <I18nextProvider i18n={createI18n('en')}>
        <Tagline />
      </I18nextProvider>,
    );

    expect(screen.getByText('Every plant has a story worth telling.')).toBeTruthy();
  });
});
