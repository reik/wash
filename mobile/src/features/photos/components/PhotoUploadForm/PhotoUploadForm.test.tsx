import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { SUPABASE_URL } from '../../../../api/config';
import { createI18n } from '../../../../i18n';
import { server } from '../../../../test/server';
import { PhotoUploadForm } from './PhotoUploadForm';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const PHOTO_ID = '33333333-3333-4333-8333-333333333333';
const ENDPOINT = `${SUPABASE_URL}/functions/v1/create-photo`;
const picked = { mediaType: 'image/jpeg' as const, base64: '/9j/2Q==' };

async function renderForm(overrides: { pickImage?: () => Promise<typeof picked | null> } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  await render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={createI18n('en')}>
        <PhotoUploadForm
          plantId={PLANT_ID}
          pickImage={overrides.pickImage ?? (() => Promise.resolve(picked))}
          getAccessToken={() => Promise.resolve('user-token')}
        />
      </I18nextProvider>
    </QueryClientProvider>,
  );
}

describe('PhotoUploadForm', () => {
  it('should_show_saved_message_when_upload_passes', async () => {
    server.use(
      http.post(ENDPOINT, () => HttpResponse.json({ id: PHOTO_ID, moderation_status: 'pass' }, { status: 201 })),
    );
    await renderForm();

    await fireEvent.press(screen.getByRole('button', { name: 'Choose photo' }));

    expect(await screen.findByText('Photo saved')).toBeTruthy();
  });

  it('should_show_flagged_message_when_image_is_flagged', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ error: 'image_flagged' }, { status: 422 })));
    await renderForm();

    await fireEvent.press(screen.getByRole('button', { name: 'Choose photo' }));

    expect(await screen.findByText("This photo can't be shared")).toBeTruthy();
  });

  it('should_not_upload_when_picker_is_cancelled', async () => {
    let requested = false;
    server.use(
      http.post(ENDPOINT, () => {
        requested = true;
        return HttpResponse.json({ id: PHOTO_ID, moderation_status: 'pass' }, { status: 201 });
      }),
    );
    await renderForm({ pickImage: () => Promise.resolve(null) });

    await fireEvent.press(screen.getByRole('button', { name: 'Choose photo' }));
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(requested).toBe(false);
  });
});
