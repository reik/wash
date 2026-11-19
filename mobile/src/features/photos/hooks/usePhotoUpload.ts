import { useMutation } from '@tanstack/react-query';

import { uploadPhoto, type MediaType } from '../../../api/photos';

export interface PickedImage {
  mediaType: MediaType;
  /** Base64 image bytes, without a data: prefix. */
  base64: string;
}

export function usePhotoUpload(plantId: string, getAccessToken: () => Promise<string | null>) {
  return useMutation({
    mutationFn: async (image: PickedImage) => {
      const accessToken = await getAccessToken();
      if (accessToken === null) {
        throw new Error('auth.required');
      }
      return uploadPhoto({ accessToken, plantId, ...image });
    },
  });
}
