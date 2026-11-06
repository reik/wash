import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export function Tagline() {
  const { t } = useTranslation();

  return <Text style={styles.text}>{t('app.tagline')}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1f3d2b',
  },
});
