import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';

import styles from '../../Css/login/splash';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation}: any) => {

  const [showText, setShowText] = useState(false);

  const scaleBottom = useSharedValue(0);
  const scaleTop = useSharedValue(0);
  const logoScale = useSharedValue(0);

  const shake = useSharedValue(0); // Rung trái phải
  const appear = useSharedValue(0); // Hiệu ứng scale từ nhỏ → lớn

  useEffect(() => {
    // Hiệu ứng ban đầu
    scaleBottom.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });
    scaleTop.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });
    logoScale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });


    // Hiển thị nút sau 5s + scale từ nhỏ lên
    const showTextTimer = setTimeout(() => {
      setShowText(true);
      appear.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
    }, 5000);

    // Lặp rung mỗi 10s
    const shakeInterval = setInterval(() => {
      shake.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withRepeat(withTiming(5, { duration: 100 }), 3, true),
        withTiming(0, { duration: 50 })
      );
    }, 5000);

    return () => {
      clearTimeout(showTextTimer);
      clearInterval(shakeInterval);
    };
  }, );

  const bottomAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBottom.value }],
  }));

  const topAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scaleTop.value }],
  }));

  const centerAnim = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoScale.value,
  }));

  const shakeAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const appearAnim = useAnimatedStyle(() => ({
    opacity: appear.value,
    transform: [{ scale: appear.value }],
  }));

  const handlePress = () => {
    cancelAnimation(shake); // Dừng rung
    navigation.navigate('wellcome');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topCorner, topAnim]} />

      <Animated.View style={[styles.centerContent, centerAnim]}>
        <Image
          source={require('../../Image/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>NutriAI</Text>
        <Text style={styles.subtitle}>HEALTH ASSISTANT</Text>


      </Animated.View>
      <View style={styles.getstarted}>
        {showText && (
          <>
            <Animated.View style={[{ paddingTop: width * 0.25 }, shakeAnim, appearAnim]}>
              <TouchableOpacity
                style={styles.getstartedButton}
                onPress={handlePress}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </View>
      <Animated.View style={[styles.bottomCorner, bottomAnim]} />
    </View>
  );
};

export default SplashScreen;
