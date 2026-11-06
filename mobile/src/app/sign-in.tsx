import { StyleSheet, View } from 'react-native';

import { SignInForm } from '../features/auth';

export default function SignInRoute() {
  return (
    <View style={styles.container}>
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
});
