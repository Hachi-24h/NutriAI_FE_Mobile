import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../Custom/Color';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  color: string;
  progress?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, unit, color: barColor, progress }) => {
  return (
    <LinearGradient
      colors={['#F5F9FF', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: barColor }]}>
        {value} <Text style={styles.unit}>{unit}</Text>
      </Text>
      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: barColor }]} />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    margin: 6,
    elevation: 2,
  },
  label: {
    color: color.GRAY,
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EEEEEE',
    marginTop: 8,
    width: '100%',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
});
