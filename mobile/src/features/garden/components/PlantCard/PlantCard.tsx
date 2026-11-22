import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { GardenPlant } from '../../../../api/garden';

interface PlantCardProps {
  plant: GardenPlant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const { t } = useTranslation();
  const latest = plant.latestEventType
    ? t('garden.latest', { event: t(`garden.eventTypes.${plant.latestEventType}`) })
    : t('garden.noEvents');

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{plant.name}</Text>
      <Text style={styles.meta}>{plant.city}</Text>
      <Text style={styles.meta}>{plant.photoCount > 0 ? t('garden.photos', { count: plant.photoCount }) : t('garden.noPhotos')}</Text>
      <Text style={styles.latest}>{latest}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c9d6cc',
    backgroundColor: '#ffffff',
    gap: 4,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#1f3d2b' },
  meta: { fontSize: 14, color: '#5d6b61' },
  latest: { marginTop: 4, fontSize: 14, color: '#1f3d2b' },
});
