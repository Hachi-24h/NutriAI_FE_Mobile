// screen/Login/BiometricRegister.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const BiometricRegister = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    if (!phone.trim()) {
      Alert.alert('Vui lòng nhập số điện thoại');
      return;
    }

    const { available } = await rnBiometrics.isSensorAvailable();
    if (!available) {
      Alert.alert('Thiết bị không hỗ trợ vân tay hoặc Face ID');
      return;
    }

    const { publicKey } = await rnBiometrics.createKeys();
    if (publicKey) {
      await AsyncStorage.setItem('biometricPhone', phone);
      await AsyncStorage.setItem('biometricEnabled', 'true');
      Alert.alert('Đăng ký vân tay thành công!');
      navigation.navigate('biologin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký Vân tay</Text>
      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BiometricRegister;

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
