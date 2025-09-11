import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Pressable,
} from 'react-native';

import AvatarSelector from './component/AvatarSelector';
import ProfileInfo from './component/ProfileInfo';
import color from '../../Custom/Color';
import gradientPresets from '../../Custom/gradientPresets';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import HealthInfoScreen from './component/HealthInfo';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.profile);
  const avatarUrl = user?.avt || undefined;
  console.log("Avatar URL:", avatarUrl);
  const [selected, setSelected] = useState<'user' | 'health'>('user');
  const animValue = useSharedValue(0); // 0 = user, 1 = health

  const handleSwitch = (tab: 'user' | 'health') => {
    setSelected(tab);
    animValue.value = withTiming(tab === 'user' ? 0 : 1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animValue.value * (width * 0.9 * 0.5), {
            duration: 100,
          }),
        },
      ],
    };
  });
  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // => "01/01/2000"
  };
  return (
    <ScrollView style={styles.container}>
      <AvatarSelector name={user?.fullname} avatarUrl={avatarUrl} />

      {/* Tab Switcher */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.activeTabBackground, animatedStyle]}>
            <LinearGradient
              colors={gradientPresets.cottonCandyFade}
              style={styles.gradientPill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          <Pressable style={styles.tabButton} onPress={() => handleSwitch('user')}>
            <Text style={[styles.tabText, selected === 'user' && styles.activeText]}>
              Infomation Your
            </Text>
          </Pressable>

          <Pressable style={styles.tabButton} onPress={() => handleSwitch('health')}>
            <Text style={[styles.tabText, selected === 'health' && styles.activeText]}>
              Infomation Health
            </Text>
          </Pressable>
        </View>
      </View>

      {selected === 'user' ? (
        <Animated.View entering={SlideInLeft.duration(300)} key="profile">
          <ProfileInfo
            phone={user?.phone}
            name={user?.fullname}
            dateOfBirth={formatDate(user?.DOB)}
            email={user?.email}
            genderuser={user?.gender}
          />
        </Animated.View>
      ) : (
        <Animated.View entering={SlideInRight.duration(300)} key="health">
          <HealthInfoScreen />
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.LIGHT_BLUE,
  },
  tabWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  tabContainer: {
    width: width * 0.9,
    height: 50,
    backgroundColor: color.LIGHT_GRAY,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: color.DARK_GRAY,
  },
  activeText: {
    fontSize: 15,
    fontWeight: '700',
    color: color.PRIMARY_BLUE,
  },
  activeTabBackground: {
    position: 'absolute',
    left: 0,
    width: '50%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    zIndex: 1,
  },
  gradientPill: {
    flex: 1,
    borderRadius: 30,
    opacity: 0.95,
  },
});
