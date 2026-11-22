import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { supabase } from '../../api/supabase';
import { PhotoUploadForm, pickImageFromLibrary } from '../../features/photos';

async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export default function PhotoUploadRoute() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  return (
    <View style={styles.container}>
      <PhotoUploadForm plantId={plantId} pickImage={pickImageFromLibrary} getAccessToken={getAccessToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fffdf8',
    padding: 24,
  },
});
