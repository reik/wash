import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export function SignInHeader() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.mark} accessibilityElementsHidden importantForAccessibility="no">
        🌿
      </Text>
      <Text style={styles.name}>{t('app.name')}</Text>
      <Text style={styles.tagline}>{t('app.tagline')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 32 },
  mark: { fontSize: 40, marginBottom: 8 },
  name: { fontSize: 28, fontWeight: '700', color: '#1f3d2b', marginBottom: 4 },
  tagline: { fontSize: 15, color: '#5d6b61', textAlign: 'center' },
});
