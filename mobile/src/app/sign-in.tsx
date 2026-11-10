import { StyleSheet, View } from 'react-native';

import { SignInForm, SignInHeader } from '../features/auth';

export default function SignInRoute() {
  return (
    <View style={styles.container}>
      <SignInHeader />
      <SignInForm />
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
