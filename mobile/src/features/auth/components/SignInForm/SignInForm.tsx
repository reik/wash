import { Controller } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TextField } from '../../../../components/TextField';
import { useSignInForm } from '../../hooks/useSignInForm';

export function SignInForm() {
  const { t } = useTranslation();
  const { form, submit, signIn } = useSignInForm();
  const { control, formState } = form;

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            label={t('auth.email')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            keyboardType="email-address"
            error={formState.errors.email ? t(formState.errors.email.message ?? '') : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            label={t('auth.password')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            secureTextEntry
            error={formState.errors.password ? t(formState.errors.password.message ?? '') : undefined}
          />
        )}
      />
      {signIn.error ? <Text style={styles.formError}>{t(signIn.error.message)}</Text> : null}
      <Pressable accessibilityRole="button" onPress={() => void submit()} style={styles.button}>
        <Text style={styles.buttonLabel}>{t('auth.signIn')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  formError: { marginBottom: 12, fontSize: 14, color: '#b00020' },
  button: {
    alignItems: 'center',
    backgroundColor: '#1f3d2b',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
