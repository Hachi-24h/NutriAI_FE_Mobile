import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,

  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import color from '../../Custom/Color';
import styles from '../../Css/login/signup';
import { ArrowLeft } from 'iconsax-react-native';


const SignUpScreen = ({ navigation }: any) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [gender, setGender] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    const formatted = selectedDate.toLocaleDateString('en-GB');
    setFormattedDate(formatted);
    hideDatePicker();
  };

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
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="034xxx"
            placeholderTextColor={color.GRAY}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={color.GRAY}
            secureTextEntry
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Phan Van A"
            placeholderTextColor={color.GRAY}
          />
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="Click to select date"
              placeholderTextColor={color.GRAY}
              editable={false}
              value={formattedDate}
            />
          </TouchableOpacity>
          <Text style={styles.label}>Gender</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={date}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.genderGroup}>
            {['Male', 'Female'].map((g) => (
              <TouchableOpacity
                key={g}
                style={styles.radioOption}
                onPress={() => setGender(g)}
              >
                <View style={[styles.radioCircle, gender === g && styles.radioSelected]} />
                <Text style={styles.radioText}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="abc@gmail.com"
            placeholderTextColor={color.GRAY}
            keyboardType="email-address"
          />


          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpScreen;
