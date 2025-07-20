import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import styles from '../../../Css/profile/profileinfo';
import color from '../../../Custom/Color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { UserEdit } from 'iconsax-react-native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
interface Props {
  name?: string;
  dateOfBirth?: string;
  genderuser?: string;
  email?: string;
  phone?: string;
}

const ProfileInfo: React.FC<Props> = ({ name, dateOfBirth, genderuser, email, phone }) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState(genderuser || '');
  const [isEditing, setIsEditing] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    const formatted = selectedDate.toLocaleDateString('en-GB');
    setFormattedDate(formatted);
    hideDatePicker();
  };
  useEffect(() => {
    if (genderuser === 'Male' || genderuser === 'Female') {
      setGender(genderuser);
    }
  }, [genderuser]);

  const changeinfo = () => {
    setIsEditing(!isEditing);
  }
  const saveinfo = () => {
    setIsEditing(false);
    console.log('Saved Information:');
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Thông tin cá nhân</Text>
            <TouchableOpacity onPress={changeinfo} disabled={isEditing} >
              <UserEdit size={24} color={isEditing?  color.LIGHT_BLUE:color.BLACK } />
            </TouchableOpacity>
      </View>
      <View style={styles.formSection}>
          {isEditing && (<LabelInput label="Name" editable={isEditing} defaultValue={name ?? ''} />)}
        <LabelInput label="Phone" editable={false} defaultValue={phone ?? ''} />
      

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePicker} disabled={!isEditing} style={styles.input2}>
          <TextInput

            placeholder={dateOfBirth || 'Select Date of Birth'}
            placeholderTextColor={color.GRAY}
            editable={false}
            value={formattedDate}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={date}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
        <Text style={[styles.label, { marginTop: height * 0.02 }]}>Gender </Text>
        <View style={styles.genderGroup}>

          {['Male', 'Female'].map((g) => (
            <TouchableOpacity
              disabled={isEditing ? false : true}
              key={g}
              style={styles.radioOption}
              onPress={() => setGender(g)}
            >
              <View style={[styles.radioCircle, gender === g && styles.radioSelected]} />
              <Text style={styles.radioText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <LabelInput label="Email" editable={isEditing} defaultValue={email ?? " "} />
      </View>
      {
        isEditing && (
          <View style={styles.Vsave}>
            <TouchableOpacity style={styles.button} onPress={saveinfo}>
              <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Change'}</Text>
            </TouchableOpacity>
          </View>)
      }

    </View>
  );
};

const LabelInput = ({
  label,
  editable,
  defaultValue,
}: {
  label: string;
  editable: boolean;
  defaultValue: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && styles.disabledInput]}
      editable={editable}
      defaultValue={defaultValue}
    />
  </View>
);

export default ProfileInfo;

