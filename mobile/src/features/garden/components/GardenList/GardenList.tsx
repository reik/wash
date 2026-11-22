import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useGarden } from '../../hooks/useGarden';
import { PlantCard } from '../PlantCard/PlantCard';

export function GardenList() {
  const { t } = useTranslation();
  const garden = useGarden();

  if (garden.error) {
    return <Text style={styles.error}>{t('garden.failed')}</Text>;
  }

  if (garden.data !== undefined && garden.data.length === 0) {
    return <Text style={styles.empty}>{t('garden.empty')}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Text style={styles.title}>{t('garden.title')}</Text>
      <View style={styles.cards}>
        {(garden.data ?? []).map((plant) => (
          <PlantCard key={plant.plantId} plant={plant} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 24, gap: 16, backgroundColor: '#fffdf8', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f3d2b' },
  cards: { gap: 12 },
  empty: { padding: 24, fontSize: 16, color: '#1f3d2b', textAlign: 'center' },
  error: { padding: 24, fontSize: 14, color: '#b00020', textAlign: 'center' },
});
