import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { usePhotoUpload, type PickedImage } from '../../hooks/usePhotoUpload';

interface PhotoUploadFormProps {
  plantId: string;
  /** Opens the photo library. Resolves to null when the user cancels. */
  pickImage: () => Promise<PickedImage | null>;
  getAccessToken: () => Promise<string | null>;
}

export function PhotoUploadForm({ plantId, pickImage, getAccessToken }: PhotoUploadFormProps) {
  const { t } = useTranslation();
  const upload = usePhotoUpload(plantId, getAccessToken);

  async function choosePhoto() {
    const image = await pickImage();
    if (image !== null) {
      upload.mutate(image);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={() => void choosePhoto()} style={styles.button}>
        <Text style={styles.buttonLabel}>{t('photo.choose')}</Text>
      </Pressable>
      {upload.isPending ? <Text style={styles.status}>{t('photo.saving')}</Text> : null}
      {upload.isSuccess ? <Text style={styles.status}>{t('photo.saved')}</Text> : null}
      {upload.error ? <Text style={styles.error}>{t(upload.error.message)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: '100%',
    backgroundColor: '#3b8660',
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonLabel: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  status: { marginTop: 12, fontSize: 14, color: '#1f3d2b' },
  error: { marginTop: 12, fontSize: 14, color: '#b00020', textAlign: 'center' },
});
