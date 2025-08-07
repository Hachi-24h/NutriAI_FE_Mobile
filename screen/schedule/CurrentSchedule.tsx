import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import styles from '../../Css/schedule/currentschudule';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import color from '../../Custom/Color';
import LinearGradient from 'react-native-linear-gradient';
import { width } from '../../Utils/dimension';
import Footer from '../other/footer';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import DropShadow from 'react-native-drop-shadow';
import gradientPresets from '../../Custom/gradientPresets';

dayjs.extend(isoWeek);

const MEALS = [
  'Phở bò', 'Bánh mì', 'Cơm tấm', 'Mì Ý', 'Súp rau củ',
  'Sushi', 'Bánh cuốn', 'Cà ri gà', 'Cơm hộp', 'Salad'
];
const TIMES = {
  morning: '07:00',
  afternoon: '12:00',
  evening: '18:30',
};

const getWeekDates = (offset = 0) => {
  const start = dayjs().add(offset, 'week').startOf('week').add(1, 'day');
  return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
};

const generateRandomMeals = (dates: dayjs.Dayjs[]) => {
  const result: any = {};
  dates.forEach(date => {
    const key = date.format('YYYY-MM-DD');
    result[key] = {
      morning: { time: TIMES.morning, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
      afternoon: { time: TIMES.afternoon, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
      evening: { time: TIMES.evening, dish: MEALS[Math.floor(Math.random() * MEALS.length)] },
    };
  });
  return result;
};
const VerticalSchedule = ({navigation}:any) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const mealData = useMemo(() => generateRandomMeals(weekDates), [weekDates]);
  const todayStr = dayjs().format('YYYY-MM-DD');

  // Calculate percentage of completed days
  const completedDays = weekDates.filter(date => dayjs().isAfter(date, 'day')).length;
  const totalDays = weekDates.length;
  const completionPercentage = Math.floor((completedDays / totalDays) * 100);

  const currentTime = dayjs();
  const todayMeals = mealData[todayStr] || {};

  const isAfterEvening = currentTime.isAfter(dayjs(todayStr + ' ' + TIMES.evening));

  const nextMealTime = isAfterEvening
    ? null
    : currentTime.isBefore(dayjs(todayStr + ' ' + TIMES.morning))
      ? 'morning'
      : currentTime.isBefore(dayjs(todayStr + ' ' + TIMES.afternoon))
        ? 'afternoon'
        : 'evening';

  const nextMeal = nextMealTime ? todayMeals[nextMealTime] : null;

  useEffect(() => {
    const index = weekDates.findIndex(d => d.format('YYYY-MM-DD') === todayStr);
    if (index !== -1 && scrollRef.current) {
      const cardWidth = width * 0.47 + width * 0.025;
      const offset = index * cardWidth - (width - cardWidth) / 2;
      scrollRef.current.scrollTo({ x: offset, animated: true });
    }
  }, [weekDates, todayStr]);

  return (
    <LinearGradient
      colors={gradientPresets.cottonCandyFade}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View entering={SlideInRight.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft2 size={22} color={color.BLACK} />
        </TouchableOpacity>
        <DropShadow style={[styles.shadow, { shadowColor: color.DARK_GRAY }]}>
          <View style={styles.VtitleContainer}>
            <Text style={styles.title}>Lịch ăn uống</Text>
          </View>
        </DropShadow>
      </Animated.View>

      {/* Info Schedule */}
      <Animated.View entering={SlideInLeft.duration(300).delay(50)} style={styles.infoSchedule}>

        <Text style={styles.headerText}>Tên lịch trình : Tuần {dayjs().add(weekOffset, 'week').isoWeek()} </Text>
        <Text style={styles.headerText}>Hoàn thành: {completionPercentage}%</Text>

        {nextMeal ? (
          <>
            <Text style={styles.headerText}>Món ăn tiếp theo: {nextMeal?.dish || 'Chưa đến bữa'}</Text>
            <Text style={styles.headerText}>Thời gian tiếp theo: {nextMeal?.time || 'Chưa đến bữa'}</Text>
          </>
        ) : (
          <Text style={styles.headerText}>Đã hoàn thành hôm nay!</Text>
        )}
      </Animated.View>
      <Animated.View entering={SlideInRight.duration(300).delay(50)} >
        <DropShadow style={styles.shadow}>
          <View style={styles.body}>
            <View style={styles.header2}>
              <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
                <ArrowLeft2 size={22} color={color.BLACK} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Tuần bắt đầu {weekDates[0].format('DD/MM')}</Text>
              <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
                <ArrowRight2 size={22} color={color.BLACK} />
              </TouchableOpacity>
            </View>
            <View style={styles.tableWrapper}>
              <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator>
                {weekDates.map((date) => {
                  const key = date.format('YYYY-MM-DD');
                  const isToday = key === todayStr;
                  const isPast = dayjs().isAfter(date, 'day');
                  const isFuture = dayjs().isBefore(date, 'day');
                  const meals = mealData[key];

                  let backgroundColor = color.WHITE;
                  let borderColor = 'transparent';
                  // let textColor = color.BLACK;

                  // Cập nhật màu sắc tùy vào trạng thái của ngày
                  if (isPast) {
                    backgroundColor = color.LIGHT_GRAY;  // Ngày đã qua
                  } else if (isFuture) {
                    backgroundColor = color.LIGHT_BLUE;  // Ngày chưa đến
                  } else if (isToday) {
                    backgroundColor = color.YELLOW_GRADIENT;  // Ngày hiện tại
                    borderColor = color.RED;
                  }

                  return (
                    <View key={key}>
                      <View
                        style={[styles.dayColumn, { backgroundColor, borderColor: borderColor }]}
                      >
                        <Text style={[styles.dayTitle, isToday && styles.todayText]}>
                          {`Thứ ${date.isoWeekday()}`}
                        </Text>
                        <Text style={[styles.dateText, isToday && styles.todayText]}>
                          {date.format('DD/MM')}
                        </Text>

                        <View style={styles.mealBox}>
                          <Text style={styles.mealLabel}>Sáng</Text>
                          <Text style={styles.mealDish}>{meals.morning.dish}</Text>
                          <Text style={styles.mealTime}>{meals.morning.time}</Text>
                        </View>

                        <View style={styles.mealBox}>
                          <Text style={styles.mealLabel}>Trưa</Text>
                          <Text style={styles.mealDish}>{meals.afternoon.dish}</Text>
                          <Text style={styles.mealTime}>{meals.afternoon.time}</Text>
                        </View>

                        <View style={styles.mealBox}>
                          <Text style={styles.mealLabel}>Tối</Text>
                          <Text style={styles.mealDish}>{meals.evening.dish}</Text>
                          <Text style={styles.mealTime}>{meals.evening.time}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </DropShadow>
      </Animated.View>
      <Footer />
    </LinearGradient>
  );
};
export default VerticalSchedule;