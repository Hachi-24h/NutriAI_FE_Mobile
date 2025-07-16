// screen/Login/BiometricLogin.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const BiometricLogin = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    const enabled = await AsyncStorage.getItem('biometricEnabled');
    const savedPhone = await AsyncStorage.getItem('biometricPhone');

    if (enabled !== 'true' || !savedPhone) {
      Alert.alert('Bạn chưa đăng ký vân tay');
      return;
    }

    if (phone !== savedPhone) {
      Alert.alert('Số điện thoại không khớp');
      return;
    }

    rnBiometrics.simplePrompt({ promptMessage: 'Xác thực sinh trắc học' })
      .then(({ success }) => {
        if (success) {
          Alert.alert('Đăng nhập thành công!');
          navigation.navigate('home'); // Đổi 'Home' thành tên màn hình chính
        } else {
          Alert.alert('Xác thực thất bại!');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập bằng Vân tay</Text>
      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BiometricLogin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontSize: 16, textAlign: 'center' },
});
