import { Controller } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OptionChips } from '../../../../components/OptionChips/OptionChips';
import { TextField } from '../../../../components/TextField';
import { useRegisterPlantForm } from '../../hooks/useRegisterPlantForm';

interface PlantRegisterFormProps {
  ownerId: string;
}

export function PlantRegisterForm({ ownerId }: PlantRegisterFormProps) {
  const { t } = useTranslation();
  const { form, submit, register } = useRegisterPlantForm(ownerId);
  const { control, formState } = form;
  const errorFor = (message: string | undefined) => (message ? t(message) : undefined);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            label={t('plant.name')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errorFor(formState.errors.name?.message)}
          />
        )}
      />
      <Controller
        control={control}
        name="stage"
        render={({ field }) => (
          <OptionChips
            label={t('plant.stage')}
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: 'newborn', label: t('plant.stages.newborn') },
              { value: 'growing', label: t('plant.stages.growing') },
              { value: 'elder', label: t('plant.stages.elder') },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <TextField
            label={t('plant.city')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errorFor(formState.errors.city?.message)}
          />
        )}
      />
      <Controller
        control={control}
        name="countryCode"
        render={({ field }) => (
          <TextField
            label={t('plant.countryCode')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errorFor(formState.errors.countryCode?.message)}
          />
        )}
      />
      <Controller
        control={control}
        name="climateClass"
        render={({ field }) => (
          <OptionChips
            label={t('plant.climate')}
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: 'temperate', label: t('plant.climates.temperate') },
              { value: 'tropical', label: t('plant.climates.tropical') },
              { value: 'arid', label: t('plant.climates.arid') },
              { value: 'cold', label: t('plant.climates.cold') },
            ]}
          />
        )}
      />
      <Pressable accessibilityRole="button" onPress={() => void submit()} style={styles.button}>
        <Text style={styles.buttonLabel}>{t('plant.register')}</Text>
      </Pressable>
      {register.isSuccess ? (
        <Text style={styles.status}>{`${t('plant.registered')} ${register.data.shortCode}`}</Text>
      ) : null}
      {register.error ? <Text style={styles.error}>{t(register.error.message)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  button: {
    alignItems: 'center',
    minHeight: 48,
    backgroundColor: '#3b8660',
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonLabel: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  status: { marginTop: 12, fontSize: 14, color: '#1f3d2b', textAlign: 'center' },
  error: { marginTop: 12, fontSize: 14, color: '#b00020', textAlign: 'center' },
});
