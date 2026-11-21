import * as ImagePicker from 'expo-image-picker';

import type { MediaType } from '../../api/photos';
import type { PickedImage } from './hooks/usePhotoUpload';

const MEDIA_TYPES: Readonly<Record<string, MediaType>> = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'image/webp': 'image/webp',
};

/**
 * Opens the photo library and returns the chosen image as base64.
 * Resolves to null when the user cancels. Quality is set below 1 so large
 * photos stay under the function's size limit.
 */
export async function pickImageFromLibrary(): Promise<PickedImage | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    base64: true,
    quality: 0.8,
    allowsMultipleSelection: false,
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets[0];
  const mediaType = asset.mimeType ? MEDIA_TYPES[asset.mimeType] : undefined;
  if (mediaType === undefined || !asset.base64) {
    throw new Error('photo.failed');
  }
  return { mediaType, base64: asset.base64 };
}
