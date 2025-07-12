import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../../Css/login/signin';
import color from '../../Custom/Color';
import { Eye, EyeSlash } from 'iconsax-react-native';



const SignInScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
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





        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Hoặc sử dụng Google / Facebook */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
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
