import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { delay, http, HttpResponse } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { SUPABASE_URL } from '../../../../api/config';
import { createI18n } from '../../../../i18n';
import { server } from '../../../../test/server';
import { SignInForm } from './SignInForm';

async function renderSignInForm() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  await render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={createI18n('en')}>
        <SignInForm />
      </I18nextProvider>
    </QueryClientProvider>,
  );
}

async function fillAndSubmit(email: string, password: string) {
  await fireEvent.changeText(screen.getByLabelText('Email'), email);
  await fireEvent.changeText(screen.getByLabelText('Password'), password);
  await fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));
}

describe('SignInForm', () => {
  it('should_show_email_error_when_email_is_not_valid', async () => {
    await renderSignInForm();

    await fillAndSubmit('not-an-email', 'long-enough-pass');

    expect(await screen.findByText('Enter a valid email address')).toBeTruthy();
  });

  it('should_show_credentials_error_when_server_rejects_sign_in', async () => {
    server.use(
      http.post(`${SUPABASE_URL}/auth/v1/token`, () =>
        HttpResponse.json(
          { error: 'invalid_grant', error_description: 'Invalid login credentials' },
          { status: 400 },
        ),
      ),
    );
    await renderSignInForm();

    await fillAndSubmit('plant@example.com', 'wrong-password');

    expect(await screen.findByText('Email or password is incorrect')).toBeTruthy();
  });

  it('should_disable_sign_in_button_while_request_is_in_flight', async () => {
    server.use(
      http.post(`${SUPABASE_URL}/auth/v1/token`, async () => {
        await delay(200);
        return HttpResponse.json({ error: 'invalid_grant' }, { status: 400 });
      }),
    );
    await renderSignInForm();

    await fillAndSubmit('plant@example.com', 'wrong-password');

    expect(screen.getByRole('button', { name: 'Sign in' }).props.accessibilityState?.disabled).toBe(true);
    expect(await screen.findByText('Email or password is incorrect')).toBeTruthy();
  });

  it('should_submit_form_when_return_is_pressed_in_password_field', async () => {
    await renderSignInForm();
    await fireEvent.changeText(screen.getByLabelText('Email'), 'not-an-email');

    await fireEvent(screen.getByLabelText('Password'), 'submitEditing');

    expect(await screen.findByText('Enter a valid email address')).toBeTruthy();
  });
});
