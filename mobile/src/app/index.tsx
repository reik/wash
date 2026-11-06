import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Tagline } from '../components/Tagline';

export default function HomeRoute() {
  return (
    <View style={styles.container}>
      <Tagline />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
});
