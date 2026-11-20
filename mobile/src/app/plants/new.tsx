import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { queryKeys } from '../../api/queryKeys';
import { getSessionUserId } from '../../api/session';
import { PlantRegisterForm } from '../../features/plants/components/PlantRegisterForm/PlantRegisterForm';

export default function PlantNewRoute() {
  const { t } = useTranslation();
  const { data: ownerId } = useQuery({
    queryKey: queryKeys.sessionUserId,
    queryFn: getSessionUserId,
  });

  if (!ownerId) {
    return (
      <View style={styles.container}>
        <Text style={styles.notice}>{t('auth.required')}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PlantRegisterForm ownerId={ownerId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fffdf8',
    padding: 24,
  },
  notice: { fontSize: 16, color: '#1f3d2b', textAlign: 'center' },
});
