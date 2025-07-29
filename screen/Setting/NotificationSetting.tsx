// NotificationSettingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import color from '../../Custom/Color';

const { width, height } = Dimensions.get('window');

const groupedSettings = {
  'Meal Reminders': [
    {
      id: 'meal_pre_reminder',
      title: 'Meal Reminder (Before Eating)',
      description: 'Get reminders 30 minutes before breakfast, lunch, or dinner to stay on track.',
    },
    {
      id: 'meal_post_reminder',
      title: 'Meal Follow-up (After Eating)',
      description: 'Prompt to scan your meal photo for nutritional analysis after eating.',
    },
  ],
  'Nutrition Tracking': [
    {
      id: 'missed_log',
      title: 'Missed Meal Logging',
      description: "Reminder to log meals if you forgot. Help AI learn your nutrition habits.",
    },
    {
      id: 'nutrition_alerts',
      title: 'Nutrition Imbalance Alerts',
      description: 'Warn when there is excess fat, sugar, or nutritional deficiency over days.',
    },
  ],
  'Health & Wearable Integration': [
    {
      id: 'health_metrics',
      title: 'Health-based Meal Suggestion',
      description: 'Suggest meals based on your wearable data or health declarations.',
    },
    {
      id: 'weekly_summary',
      title: 'Weekly Nutrition Summary',
      description: 'Summary like "You achieved 80% fiber goal this week. Great job!"',
    },
  ],
  'Personalized Meal Suggestions': [
    {
      id: 'seasonal_meals',
      title: 'Seasonal & Weather-based Tips',
      description: 'E.g. "It’s hot today, try watermelon juice and fresh salad."',
    },
  ],
  'Daily Health Tips': [
    {
      id: 'daily_tip',
      title: 'Daily Nutrition Tips',
      description: 'Short daily tip e.g. "Omega-3 from salmon boosts brain power 🧠"',
    },
  ],
  'Motivation & Rewards': [
    {
      id: 'streak_rewards',
      title: 'Habit Streak Motivation',
      description: 'E.g. "You stuck to your meal plan 5 days in a row 🎉!"',
    },
  ],
};

const NotificationSettingsScreen = () => {
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const all: Record<string, boolean> = {};
    Object.values(groupedSettings).flat().forEach(i => (all[i.id] = true));
    return all;
  });

  const toggleMaster = (value: boolean) => setMasterSwitch(value);

  const toggleSetting = (id: string, value: boolean) => {
    if (!masterSwitch) return;
    setSettings(prev => ({ ...prev, [id]: value }));
  };

  const renderGroup = (groupTitle: string, data: typeof groupedSettings['Daily Health Tips']) => (
    <View key={groupTitle} style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{groupTitle}</Text>
      <View
        style={[styles.groupBox, !masterSwitch && { opacity: 0.4 }]}
        pointerEvents={masterSwitch ? 'auto' : 'none'}>
        {data.map((item) => (
          <View key={item.id} style={styles.optionRow}>
            <View style={styles.labelBox}>
              <Text style={styles.optionTitle}>{item.title}</Text>
              {item.description && <Text style={styles.optionDesc}>{item.description}</Text>}
            </View>
            <Switch
              value={settings[item.id]}
              onValueChange={(value) => toggleSetting(item.id, value)}
              trackColor={{ false: '#ccc', true: color.PRIMARY_BLUE || '#00f' }}
              thumbColor={settings[item.id] ? color.PRIMARY_BLUE : '#f4f3f4'}
            />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Notifications</Text>

      {/* Master switch */}
      <View style={styles.masterRow}>
        <Text style={styles.masterLabel}>Enable Notifications</Text>
        <Switch
          value={masterSwitch}
          onValueChange={toggleMaster}
          trackColor={{ false: '#ccc', true: color.PRIMARY_BLUE || '#00f' }}
          thumbColor={masterSwitch ? color.PRIMARY_BLUE : '#f4f3f4'}
        />
      </View>

      {/* Render groups */}
      {Object.entries(groupedSettings).map(([group, data]) =>
        renderGroup(group, data)
      )}
    </ScrollView>
  );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: width * 0.05,
  },
  screenTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.02,
    marginBottom: height * 0.015,
    color: '#111',
  },
  masterRow: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.03,
    elevation: 3,
    marginBottom: height * 0.03,
  },
  masterLabel: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: '#111',
  },
  groupContainer: {
    marginBottom: height * 0.025,
  },
  groupTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: height * 0.01,
  },
  groupBox: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.015,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  labelBox: {
    flex: 1,
    paddingRight: width * 0.02,
  },
  optionTitle: {
    fontSize: width * 0.043,
    color: '#111',
    fontWeight: '500',
  },
  optionDesc: {
    fontSize: width * 0.035,
    color: '#777',
    marginTop: 2,
  },
});
