import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import color from '../../Custom/Color';
import styles from '../../Css/login/signup';
import { ArrowLeft, Eye, EyeSlash } from 'iconsax-react-native';

import { authService } from '../../services/authService';
import { useDispatch } from 'react-redux';


const SignUpScreen = ({ navigation }: any) => {
  // Form states
  const [phone, setPhone] = useState('0379664711');
  const [password, setPassword] = useState('nam123');
  const [fullname, setFullname] = useState('Thanh Nam');
  const [email, setEmail] = useState('phanthanhnam1369@gmail.com');
  const [height, setHeight] = useState('164');
  const [weight, setWeight] = useState('50');
  const [gender, setGender] = useState('Male');
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    const formatted = selectedDate.toLocaleDateString('en-GB');
    setFormattedDate(formatted);
    hideDatePicker();
  };

  const dispatch = useDispatch();

  // ==========================
  // Rules for validation
  // ==========================
  const rules: {
    [key: string]: {
      required?: string;
      regex?: { pattern: RegExp; message: string };
      minLength?: { value: number; message: string };
      custom?: (val: string) => string | null;
    };
  } = {
    phone: {
      required: ' ',
      regex: {
        pattern: /^0\d{9,10}$/,
        message:
          'Please enter a valid phone number starting with 0 and containing 10 or 11 digits',
      },
    },
    password: {
      required: ' ',
      minLength: { value: 6, message: 'Password must be at least 6 characters' },
    },
    fullname: { required: ' ' },
    DOB: { required: ' ' },
    gender: { required: ' ' },
    email: {
      required: ' ',
      regex: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
      },
    },
    height: {
      required: ' ',
      custom: (val) =>
        !val || Number(val) <= 0 ? 'Invalid height' : null,
    },
    weight: {
      required: ' ',
      custom: (val) =>
        !val || Number(val) <= 0 ? 'Invalid weight' : null,
    },
  };

  // ==========================
  // Validate form
  // ==========================
  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    const values: { [key: string]: any } = {
      phone,
      password,
      fullname,
      DOB: formattedDate,
      gender,
      email,
      height,
      weight,
    };

    Object.entries(rules).forEach(([field, rule]) => {
      const value = values[field];

      if (rule.required && !value) {
        newErrors[field] = rule.required;
        valid = false;
      } else if (rule.regex && value && !rule.regex.pattern.test(value)) {
        newErrors[field] = rule.regex.message;
        valid = false;
      } else if (rule.minLength && value && value.length < rule.minLength.value) {
        newErrors[field] = rule.minLength.message;
        valid = false;
      } else if (rule.custom) {
        const customMsg = rule.custom(value);
        if (customMsg) {
          newErrors[field] = customMsg;
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // ==========================
  // Handle SignUp
  // ==========================
  const handleSignUp = async () => {
    if (!validateForm()) return;

    console.log('Phone:', phone);
    console.log('Password:', password);
    console.log('Fullname:', fullname);
    console.log('DOB:', formattedDate);
    console.log('Gender:', gender);
    console.log('Email:', email);
    console.log('Height:', height);
    console.log('Weight:', weight);
    try {
      await authService.register(
        {
          phone,
          email,
          password,
          fullname,
          DOB: date.toISOString().split('T')[0],
          gender: gender.toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER',
          height,
          weight,
        },
        dispatch,
        navigation
      );

      // Alert.alert("Success", "Account created successfully");
    } catch (err: any) {
      console.log('SignUp error:', err.response?.data || err.message);
      Alert.alert('Error', err.response?.data?.message || 'Sign up failed');
    }
  };

  // ==========================
  // Render
  // ==========================
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.navigate('signin')}>
          <ArrowLeft size={30} color={color.WHITE} />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={styles.formSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.error]}
            placeholder="034xxx"
            placeholderTextColor={color.GRAY}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          {/* Password */}
            <Text style={styles.label}>Password</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width:"100%"}}>
            <TextInput
              style={[styles.input, errors.password && styles.error, ]}
              placeholder="Password"
              placeholderTextColor={color.GRAY}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              {showPassword ? (
                <Eye size={20} color={color.GRAY}  />
              ) : (
                <EyeSlash size={20} color={color.GRAY} />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.fullname && styles.error]}
            placeholder="Phan Van A"
            placeholderTextColor={color.GRAY}
            value={fullname}
            onChangeText={setFullname}
          />
          {errors.fullname && (
            <Text style={styles.errorText}>{errors.fullname}</Text>
          )}

          {/* DOB */}
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={[styles.input, errors.DOB && styles.error]}
              placeholder="Click to select date"
              placeholderTextColor={color.GRAY}
              editable={false}
              value={formattedDate}
            />
          </TouchableOpacity>
          {errors.DOB && <Text style={styles.errorText}>{errors.DOB}</Text>}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={date}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderGroup}>
            {['Male', 'Female'].map((g) => (
              <TouchableOpacity
                key={g}
                style={styles.radioOption}
                onPress={() => setGender(g)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    gender === g && styles.radioSelected,
                    errors.gender && styles.error,
                  ]}
                />
                <Text style={styles.radioText}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.error]}
            placeholder="abc@gmail.com"
            placeholderTextColor={color.GRAY}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Height */}
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={[styles.input, errors.height && styles.error]}
            placeholder="170"
            placeholderTextColor={color.GRAY}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          {errors.height && (
            <Text style={styles.errorText}>{errors.height}</Text>
          )}

          {/* Weight */}
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={[styles.input, errors.weight && styles.error]}
            placeholder="65"
            placeholderTextColor={color.GRAY}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          {errors.weight && (
            <Text style={styles.errorText}>{errors.weight}</Text>
          )}
        </ScrollView>

        {/* Submit */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
