import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomToast from '../Custom/CustomToast';
import color from '../Custom/Color';

const { width, height } = Dimensions.get('window');

type ToastType = 'error' | 'warning' | 'success' | 'info' | 'reminder' | 'confirm';

const toastList: { label: string; type: ToastType; message: string }[] = [
  { label: 'Lỗi xảy ra', type: 'error', message: 'Đã có lỗi nghiêm trọng xảy ra.' },
  { label: 'Cảnh báo', type: 'warning', message: 'Vui lòng kiểm tra lại thông tin!' },
  { label: 'Thành công', type: 'success', message: 'Bạn đã thao tác thành công.' },
  { label: 'Thông báo thường', type: 'info', message: 'Đây là thông báo thông tin.' },
  { label: 'Nhắc nhở', type: 'reminder', message: 'Đừng quên hoàn thành công việc.' },
  { label: 'Chọn Yes / No', type: 'confirm', message: 'Bạn có chắc chắn muốn tiếp tục?' },
];

const ToastDemoScreen = () => {
  const [toasts, setToasts] = useState<
    { id: number; type: ToastType; heading: string; title: string }[]
  >([]);

  const showToast = (type: ToastType, heading: string, title: string) => {
    const id = Date.now();
    setToasts([...toasts, { id, type, heading, title }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo các loại thông báo</Text>

      <ScrollView contentContainerStyle={styles.buttonList}>
        {toastList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, getButtonColor(item.type)]}
            onPress={() => showToast(item.type, item.label, item.message)}
          >
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {toasts.map(toast => (
        <CustomToast
          key={toast.id}
          heading={toast.heading}
          title={toast.title}
          type={toast.type}
          // icon={require('./assets/success.png')} // Uncomment if you have icons
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </View>
  );
};

const getButtonColor = (type: ToastType) => {
  switch (type) {
    case 'error':
      return { backgroundColor: color.RED };
    case 'warning':
      return { backgroundColor: '#FFC107' };
    case 'success':
      return { backgroundColor: color.GREEN };
    case 'info':
      return { backgroundColor: color.PRIMARY_BLUE };
    case 'reminder':
      return { backgroundColor: color.BLUE_BUTTON };
    case 'confirm':
      return { backgroundColor: color.DARK_BLUE };
    default:
      return { backgroundColor: color.GRAY };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    backgroundColor: color.LIGHT_GRAY,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: color.DARK_GRAY,
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  buttonList: {
    paddingBottom: height * 0.3,
  },
  button: {
    paddingVertical: height * 0.02,
    borderRadius: width * 0.03,
    marginBottom: height * 0.015,
    alignItems: 'center',
  },
  buttonText: {
    color: color.WHITE,
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});

export default ToastDemoScreen;
