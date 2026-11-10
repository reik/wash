import { render, screen } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';

import { createI18n } from '../../../../i18n';
import { SignInHeader } from './SignInHeader';

describe('SignInHeader', () => {
  it('should_show_app_name_when_rendered', async () => {
    await render(
      <I18nextProvider i18n={createI18n('en')}>
        <SignInHeader />
      </I18nextProvider>,
    );

    expect(screen.getByText('Sasawis')).toBeTruthy();
  });

  it('should_show_japanese_tagline_when_locale_is_ja', async () => {
    await render(
      <I18nextProvider i18n={createI18n('ja')}>
        <SignInHeader />
      </I18nextProvider>,
    );

    expect(screen.getByText('植物にも、ものがたりがある。')).toBeTruthy();
  });
});
