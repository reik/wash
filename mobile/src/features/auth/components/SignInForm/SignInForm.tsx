import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextInputInstance,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { TextField } from '../../../../components/TextField';
import { useSignInForm } from '../../hooks/useSignInForm';

export function SignInForm() {
  const { t } = useTranslation();
  const { form, submit, signIn } = useSignInForm();
  const { control, formState } = form;
  const passwordRef = useRef<TextInputInstance>(null);
  const isPending = signIn.isPending;

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
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            returnKeyType="go"
            onSubmitEditing={() => void submit()}
            inputRef={passwordRef}
            error={formState.errors.password ? t(formState.errors.password.message ?? '') : undefined}
          />
        )}
      />
      {signIn.error ? <Text style={styles.formError}>{t(signIn.error.message)}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('auth.signIn')}
        accessibilityState={{ disabled: isPending, busy: isPending }}
        disabled={isPending}
        onPress={() => void submit()}
        style={[styles.button, isPending ? styles.buttonPending : null]}
      >
        {isPending ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonLabel}>{t('auth.signIn')}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  formError: { marginBottom: 12, fontSize: 14, color: '#b00020' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    backgroundColor: '#3b8660',
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonPending: { opacity: 0.7 },
  buttonLabel: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
