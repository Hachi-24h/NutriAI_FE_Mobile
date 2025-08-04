import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type CompletedPlan = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

const completedPlans: CompletedPlan[] = [
  { id: '1', title: 'Keto Plan', startDate: '2025-07-01', endDate: '2025-07-07' },
  { id: '2', title: 'Low Carb', startDate: '2025-06-15', endDate: '2025-06-21' },
];

const CompletedSchedulesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Meal Plans</Text>
      <FlatList
        data={completedPlans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>From: {item.startDate} → {item.endDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 10, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  date: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default CompletedSchedulesScreen;
