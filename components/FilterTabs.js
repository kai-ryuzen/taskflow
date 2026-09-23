import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterTabs({ filters, active, counts, onChange }) {
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isActive = filter.key === active;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(filter.key)}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {filter.label}
            </Text>
            <View style={[styles.badge, isActive && styles.badgeActive]}>
              <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                {counts[filter.key]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#3B5BDB',
    borderColor: '#3B5BDB',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  labelActive: {
    color: '#FFFFFF',
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 6,
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  badgeTextActive: {
    color: '#FFFFFF',
  },
});
