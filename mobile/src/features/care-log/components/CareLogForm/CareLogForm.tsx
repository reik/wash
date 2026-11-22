import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OptionChips } from '../../../../components/OptionChips';
import { OWNER_EVENT_TYPES, type OwnerEventType } from '../../../../api/events';
import { useLogEvent } from '../../hooks/useLogEvent';

interface CareLogFormProps {
  plantId: string;
}

export function CareLogForm({ plantId }: CareLogFormProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<OwnerEventType>('watered');
  const log = useLogEvent(plantId);

  const options = OWNER_EVENT_TYPES.map((value) => ({ value, label: t(`event.types.${value}`) }));

  return (
    <View style={styles.container}>
      <OptionChips label={t('event.label')} value={type} onChange={setType} options={options} />
      <Pressable accessibilityRole="button" onPress={() => log.mutate(type)} style={styles.button}>
        <Text style={styles.buttonLabel}>{t('event.log')}</Text>
      </Pressable>
      {log.isSuccess ? <Text style={styles.status}>{t('event.logged')}</Text> : null}
      {log.error ? <Text style={styles.error}>{t(log.error.message)}</Text> : null}
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
