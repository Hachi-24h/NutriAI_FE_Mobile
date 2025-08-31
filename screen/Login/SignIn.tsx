import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, Alert
} from 'react-native';
import styles from '../../Css/login/signin';
import color from '../../Custom/Color';
import { Eye, EyeSlash } from 'iconsax-react-native';
import { GoogleSignin, } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';
import { IP_AUTH } from '../../config/Ipconfig';

const SignInScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const handleBiometricLogin = async () => {
    const enabled = await AsyncStorage.getItem('biometricEnabled');
    const savedPhone = await AsyncStorage.getItem('biometricPhone');

    if (enabled !== 'true' || !savedPhone) {
      Alert.alert('Bạn chưa đăng ký đăng nhập bằng vân tay');
      return;
    }

    if (username !== savedPhone) {
      Alert.alert('Số điện thoại không khớp với vân tay đã đăng ký');
      return;
    }

    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics.simplePrompt({ promptMessage: 'Xác thực sinh trắc học' })
      .then(({ success }) => {
        if (success) {
          Alert.alert('✅ Đăng nhập thành công!');
          navigation.navigate('home'); // đổi thành trang chính của bạn
        } else {
          Alert.alert('❌ Xác thực thất bại!');
        }
      })
      .catch(() => {
        Alert.alert('❌ Lỗi xác thực!');
      });
  };

  useEffect(() => {
    // Dán WEB CLIENT ID vào đây ở bước 3B (sau khi tạo trên Google Cloud)
    GoogleSignin.configure({
      webClientId: '202383989285-a81k146s59id7n0uhjuetbtjlj7oob8l.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);
  console.log('Google Sign-In configured');
  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const result = await GoogleSignin.signIn();

      const idToken = result?.data?.idToken;
      if (!idToken) {
        Alert.alert("❌ Không lấy được idToken từ Google");
        return;
      }
      console.log('Google ID Token:', idToken);
      // Gửi lên backend
      const linkapi = `${IP_AUTH}/google`;
      console.log('Sending ID token to backend:', linkapi);
      const res = await axios.post(linkapi, {
        id_token: idToken,
      });

      const { access_token, refresh_token } = res.data;

      // Lưu token để dùng sau này
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      Alert.alert("✅ Đăng nhập Google thành công!");
      navigation.navigate("home");
    } catch (e: any) {
      console.log("Google Login Error:", e.response?.data || e.message);
      Alert.alert("❌ Đăng nhập Google thất bại");
    }
  };


  return (
    <View style={styles.container}>
      {/* Header vàng */}
      <View style={styles.topSection}>

        <Text style={styles.signInTitle}>Sign In</Text>
        <Text style={styles.description}>
          NutriAI is a smart application that is always ready to support, accompany, and guide users in the most meticulous way.
        </Text>
      </View>

      {/* Form trắng */}
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={color.GRAY}
          onChangeText={setUserName}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={color.GRAY}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={20} color={color.GRAY} />
            ) : (
              <EyeSlash size={20} color={color.GRAY} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')} >
            <Text style={styles.forgotText}>Forgot password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Vsignin}>
          <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('home')}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signFi}
            onPress={handleBiometricLogin}
          >
            <Image
              source={require('../../Icon/fingerprint.png')}
              style={styles.finger}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>


        {/* Hoặc sử dụng Google / Facebook */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={handleLoginGoogle} >
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Continue with Google</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Continue with Facebook</Text>

          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>
          <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View >
  );
};

export default SignInScreen;
