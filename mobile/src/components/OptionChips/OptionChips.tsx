import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionChipsProps<T extends string> {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function OptionChips<T extends string>({ label, options, value, onChange }: OptionChipsProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ selected }}
              onPress={() => onChange(option.value)}
              style={[styles.chip, selected ? styles.chipSelected : null]}
            >
              <Text style={[styles.chipLabel, selected ? styles.chipLabelSelected : null]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 6, color: '#1f3d2b', fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: '#c9d6cc',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  chipSelected: { backgroundColor: '#3b8660', borderColor: '#3b8660' },
  chipLabel: { fontSize: 14, color: '#1f3d2b' },
  chipLabelSelected: { color: '#ffffff', fontWeight: '600' },
});
