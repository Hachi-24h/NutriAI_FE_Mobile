import React from 'react';
import { View, Text, Image, TouchableOpacity,  StatusBar } from 'react-native';
import styles from '../../Css/login/wellcome'; // Import styles from the CSS file
const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Image/logo1.png')} // Thay bằng logo NutriAI
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>NutriAI</Text>
        <Text style={styles.subtitle}>Your Personal Health Assistant</Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.description}>
          NutriAI helps you eat better, live healthier, and make smarter wellness choices.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate('signin')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonTextWhite}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
