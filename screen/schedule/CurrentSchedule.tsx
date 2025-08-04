import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import styles from '../../Css/schedule/currentschudule';
import { width } from '../../Utils/dimension';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import DropShadow from 'react-native-drop-shadow';
import color from '../../Custom/Color';
import gradientPresets from '../../Custom/gradientPresets';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../other/footer';

dayjs.extend(isoWeek);

const MEALS = [
  'Phở bò', 'Bánh mì Bánh mìBánh mìBánh mì', 'Cơm tấm', 'Mì Ý', 'Súp rau củ',
  'Sushi', 'Bánh cuốn', 'Cà ri gà', 'Cơm hộp', 'Salad'
];
const TIMES = {
  morning: '07:00',
  afternoon: '12:00',
  evening: '18:30',
};

type Meal = {
  time: string;
  dish: string;
  note?: string;
};

type DailyMeals = {
  morning?: Meal;
  afternoon?: Meal;
  evening?: Meal;
};

type WeekMeals = Record<string, DailyMeals>;

const getWeekDates = (offset = 0) => {
  const start = dayjs().add(offset, 'week').startOf('week').add(1, 'day');
  return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
};

const generateRandomMeals = (weekDates: dayjs.Dayjs[]): WeekMeals => {
  const result: WeekMeals = {};
  weekDates.forEach(date => {
    const dateStr = date.format('YYYY-MM-DD');
    result[dateStr] = {
      morning: { time: TIMES.morning, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
      afternoon: { time: TIMES.afternoon, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
      evening: { time: TIMES.evening, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
    };
  });
  return result;
};

const CurrentMealScheduleScreen = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const mealData = useMemo(() => generateRandomMeals(weekDates), [weekDates]);
  const columnWidth = width / 3.5;
  const todayStr = dayjs().format('YYYY-MM-DD');

  const renderMealCell = (dateStr: string, mealKey: keyof DailyMeals, key: string) => {
    const meals = mealData[dateStr];
    const meal = meals?.[mealKey];
    const isToday = dateStr === todayStr;
    if (!meal) {
      return (
        <View key={key} style={[styles.cell, { width: columnWidth }]}> <Text style={styles.emptyText}>—</Text> </View>
      );
    }
    return (
      <View key={key} style={[styles.cellFilled, { width: columnWidth }, isToday && styles.todayCellBorder]}>
        <Text style={styles.mealDish} numberOfLines={1} ellipsizeMode="tail">
          {meal.dish}
        </Text>
        <Text style={styles.mealTime}>{meal.time}</Text>
      </View >
    );
  };

  return (
    <LinearGradient
      colors={gradientPresets.airyOceanBlue}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      {/* header */}
      <Animated.View entering={SlideInRight.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft2 size={22} color={color.BLACK} />
        </TouchableOpacity>
        <DropShadow style={[styles.shadow, { shadowColor: color.DARK_GRAY }]}>
          <View style={styles.VtitleContainer}>
            <Text style={styles.title}>Schedule</Text>
          </View>
        </DropShadow>
      </Animated.View>

      {/* card */}
      <View style={styles.cardBox}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
            <ArrowLeft2 size={22} color={color.BLACK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tuần bắt đầu {weekDates[0].format('DD/MM')}</Text>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
           <ArrowRight2 size={22} color={color.BLACK} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.row}>
              {/* <View style={[styles.headerCell, { width: columnWidth }]}>
                <Text style={styles.bold}>Buổi / Ngày</Text>
              </View> */}

              {weekDates.map((date) => {
                const isToday = date.format('YYYY-MM-DD') === todayStr;
                return (
                  <View
                    key={date.format()}
                    style={[styles.headerCell, { width: columnWidth },]}
                  >
                    <Text style={[styles.bold, isToday && { color: color.RED }]}>{`Thứ ${date.isoWeekday()}`}</Text>
                    <Text style={isToday && { color: color.RED, fontWeight: 'bold' }}>{date.format('DD/MM')}</Text>
                  </View>
                );
              })}
            </View>

            {['morning', 'afternoon', 'evening'].map((mealKey) => (
              <View key={mealKey} style={styles.row}>
                {/* <Text style={[styles.labelCell, { width: columnWidth }]}> {mealKey === 'morning' ? '🌞 Sáng' : mealKey === 'afternoon' ? '🌤 Chiều' : '🌙 Tối'} </Text> */}
                {weekDates.map((d, i) => renderMealCell(d.format('YYYY-MM-DD'), mealKey as keyof DailyMeals, `${mealKey}-${i}`))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Footer />
    </LinearGradient>
  );
};



export default CurrentMealScheduleScreen;
