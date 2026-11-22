import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CareLogForm } from '../../features/care-log/components/CareLogForm/CareLogForm';

export default function CareLogRoute() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  return (
    <View style={styles.container}>
      <CareLogForm plantId={plantId} />
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
