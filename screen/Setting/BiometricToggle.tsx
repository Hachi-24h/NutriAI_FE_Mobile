import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eye, EyeSlash } from 'iconsax-react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import color from '../../Custom/Color';
import styles from '../../Css/Setting/biometric';
import { width } from '../../Custom/dimension';

const rnBiometrics = new ReactNativeBiometrics();

const BiometricToggle = ({ phone }: { phone: string }) => {
  const [enabled, setEnabled] = useState(false);
  const [modalType, setModalType] = useState<'enable' | 'confirm-disable' | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkStatus = async () => {
      const value = await AsyncStorage.getItem('biometricEnabled');
      setEnabled(value === 'true');
    };
    checkStatus();
  }, []);

  const handlePress = () => {
    if (enabled) {
      setModalType('confirm-disable');
    } else {
      setModalType('enable');
    }
  };

  const handleConfirmEnable = async () => {
    if (password !== '123456') {
      setError('Incorrect password!');
      return;
    }

    const { available } = await rnBiometrics.isSensorAvailable();
    if (!available) {
      Alert.alert('Device does not support fingerprint or Face ID');
      return;
    }

    const { publicKey } = await rnBiometrics.createKeys();
    if (publicKey) {
      await AsyncStorage.setItem('biometricEnabled', 'true');
      await AsyncStorage.setItem('biometricPhone', phone); // ✅ Lưu SDT
      setEnabled(true);
      closeModal();
   
    }
  };

  const handleConfirmDisable = async () => {
    await rnBiometrics.deleteKeys();
    await AsyncStorage.setItem('biometricEnabled', 'false');
    await AsyncStorage.removeItem('biometricPhone'); // ✅ Xóa SDT khi tắt
    setEnabled(false);
    closeModal();
 
  };

  const closeModal = () => {
    setModalType(null);
    setPassword('');
    setError('');
    setShowPassword(false);
  };

  return (
    <>
      {/* Toggle UI */}
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <Text style={{ fontSize: width * 0.04 }}>Allow biometric login</Text>
        <Text style={{ color: enabled ? color.GREEN : color.GRAY, fontWeight: 'bold' }}>
          {enabled ? 'Enabled' : 'Disabled'}
        </Text>
      </TouchableOpacity>

      {/* Modal bật: nhập mật khẩu */}
      <Modal visible={modalType === 'enable'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Enter password to enable</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={color.GRAY}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye size={20} color={color.DARK_GRAY} />
                  ) : (
                    <EyeSlash size={20} color={color.DARK_GRAY} />
                  )}
                </TouchableOpacity>
              </View>
              {error !== '' && <Text style={{ color: color.RED, marginTop: 6 }}>{error}</Text>}

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmEnable}>
                  <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Modal tắt: xác nhận */}
      <Modal visible={modalType === 'confirm-disable'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { padding: 24 }]}>
            <Text style={[styles.modalTitle, { textAlign: 'center' }]}>
              Are you sure you want to disable biometric login?
            </Text>
            <View style={[styles.modalButtons, { marginTop: 20 }]}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDisable}>
                <Text style={styles.confirmText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BiometricToggle;
