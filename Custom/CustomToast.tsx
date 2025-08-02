import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  PanResponder,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import color from './Color';
import { width, height } from '../Utils/dimension';
import {
  TickCircle,
  Danger,
  Warning2,
  InfoCircle,
  Notification,
  MessageQuestion,
} from 'iconsax-react-native';

type ToastType = 'error' | 'warning' | 'success' | 'info' | 'reminder' | 'confirm';

interface ToastProps {
  heading?: string;
  title: string;
  type: ToastType;
  onDismiss?: () => void;
}

const backgroundColorMap: Record<ToastType, string> = {
  error: color.RED,
  warning: '#FFC107',
  success: color.GREEN,
  info: color.PRIMARY_BLUE,
  reminder: color.BLUE_BUTTON,
  confirm: color.DARK_BLUE,
};

const iconMap: Record<ToastType, JSX.Element> = {
  success: <TickCircle size={width * 0.08} color={color.WHITE} variant="Bold" />,
  error: <Danger size={width * 0.08} color={color.WHITE} variant="Bold" />,
  warning: <Warning2 size={width * 0.08} color={color.WHITE} variant="Bold" />,
  info: <InfoCircle size={width * 0.08} color={color.WHITE} variant="Bold" />,
  reminder: <Notification size={width * 0.08} color={color.WHITE} variant="Bold" />,
  confirm: <MessageQuestion size={width * 0.08} color={color.WHITE} variant="Bold" />,
};

const CustomToast: React.FC<ToastProps> = ({ heading, title, type, onDismiss }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-height * 0.2)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => handleDismiss(), 3000);
    return () => clearTimeout(timer);
  }, );

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -height * 0.2,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > 80 || Math.abs(gesture.dy) > 80) {
          handleDismiss();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, ...pan.getTranslateTransform()],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <DropShadow style={styles.shadowStyle}>
        <View style={[styles.toastBox, { backgroundColor: backgroundColorMap[type] }]}>
          <View style={styles.iconWrapper}>
            {iconMap[type]}
          </View>
          <View style={{ flex: 1 }}>
            {heading && <Text style={styles.headingText}>{heading}</Text>}
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </DropShadow>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: height * 0.02,
    alignSelf: 'center',
    zIndex: 9999,
    width: width * 0.9,
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.03,
    width: '100%',
  },
  iconWrapper: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    backgroundColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.04,
  },
  headingText: {
    color: color.WHITE,
    fontSize: width * 0.048,
    fontWeight: '700',
    marginBottom: height * 0.005,
  },
  titleText: {
    color: color.WHITE,
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  shadowStyle: {
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: height * 0.005 },
    shadowOpacity: 0.4,
    shadowRadius: width * 0.02,
  },
});

export default CustomToast;
