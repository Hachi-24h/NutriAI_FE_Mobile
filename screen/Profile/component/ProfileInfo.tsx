import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../../../Css/profile/profileinfo';
import color from '../../../Custom/Color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { UserEdit } from 'iconsax-react-native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../../../services/userService';
import { setUser } from '../../../redux/slice/userSlice';
import { RootState } from '../../../redux/store';

const { height } = Dimensions.get('window');

interface Props {
  name?: string;
  dateOfBirth?: string;
  genderuser?: string;
  email?: string;
  phone?: string;
}

const ProfileInfo: React.FC<Props> = ({ name, dateOfBirth, genderuser, email, phone }) => {
  const dispatch = useDispatch();
  const oldUser = useSelector((state: RootState) => state.user.profile); // 👈 lấy user cũ trong redux
  // State cho input
  const [nameInput, setNameInput] = useState(name ?? '');
  const [emailInput, setEmailInput] = useState(email ?? '');
  const [genderInput, setGenderInput] = useState(genderuser ?? 'OTHER');
  const initDate = dateOfBirth && !isNaN(new Date(dateOfBirth).getTime())
    ? new Date(dateOfBirth)
    : new Date();

  const [date, setDate] = useState(initDate);
  const [dobInput, setDobInput] = useState(dateOfBirth ?? initDate.toISOString());
  const [formattedDate, setFormattedDate] = useState(
    initDate.toLocaleDateString('en-GB')
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (dobInput) {
      const d = new Date(dobInput);
      if (!isNaN(d.getTime())) {
        setFormattedDate(d.toLocaleDateString('en-GB'));
        setDate(d);
      }
    }
  }, [dobInput]);

  const hideDatePicker = () => setDatePickerVisibility(false);
  const showDatePicker = () => setDatePickerVisibility(true);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setDobInput(selectedDate.toISOString());
    setFormattedDate(selectedDate.toLocaleDateString('en-GB'));
    hideDatePicker();
  };

  const changeinfo = () => setIsEditing(true);

  const saveinfo = async () => {
    // Validate DOB ≥ 15 tuổi
    if (dobInput) {
      const birth = new Date(dobInput);
      const age = new Date().getFullYear() - birth.getFullYear();
      if (age < 15) {
        Alert.alert('❌ Ngày sinh không hợp lệ', 'Bạn phải ít nhất 15 tuổi.');
        return;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput)) {
      Alert.alert('❌ Email không hợp lệ');
      return;
    }

    // Validate tên
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (nameInput && !nameRegex.test(nameInput.trim())) {
      Alert.alert('❌ Tên không hợp lệ', 'Tên không được chứa số hoặc ký tự đặc biệt.');
      return;
    }

    // Kiểm tra thay đổi
    if (
      nameInput.trim() === (name ?? '').trim() &&
      emailInput.trim() === (email ?? '').trim() &&
      genderInput === genderuser &&
      dobInput === dateOfBirth
    ) {
      Alert.alert('⚠️ Không có sự thay đổi nào');
      setIsEditing(false);
      return;
    }
    let finalDOB: string | undefined = undefined;
    if (dobInput) {
      const parsed = new Date(dobInput);
      if (!isNaN(parsed.getTime())) {
        finalDOB = parsed.toISOString().split("T")[0]; // chỉ set nếu hợp lệ
      }
    }
    const normalizedNewDOB = dobInput
      ? new Date(dobInput).toISOString().split("T")[0]
      : undefined;

    const normalizedOldDOB = dateOfBirth
      ? new Date(dateOfBirth).toISOString().split("T")[0]
      : undefined;
    if (
      nameInput.trim() === (name ?? '').trim() &&
      (genderInput || "OTHER").toUpperCase() === (genderuser || "OTHER").toUpperCase() &&
      normalizedNewDOB === normalizedOldDOB
    ) {
      Alert.alert('⚠️ Không có sự thay đổi nào');
     
      return;
    }

    try {
      const updated = await userService.updateProfile({
        fullname: nameInput.trim(),
        DOB: finalDOB,
        gender: (genderInput || "OTHER").toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER',
      });
      if (!updated) {
        Alert.alert('❌ Lỗi', 'Không thể cập nhật thông tin');
        return;
      }

      const mergedUser = { ...oldUser, ...updated };

      dispatch(setUser(mergedUser));
      Alert.alert('✅ Cập nhật thành công');
      setIsEditing(false);
    } catch (err) {
      console.log('Update profile error:', err);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Thông tin cá nhân</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={changeinfo}>
            <UserEdit size={24} color={color.BLACK} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleCloseEdit}>
            <Image source={require('../../../Icon/close.png')} style={{ width: 24, height: 24, tintColor: color.RED }} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.formSection}>
        {isEditing && (
          <LabelInput label="Name" editable={isEditing} value={nameInput} onChangeText={setNameInput} />)}
        <LabelInput label="Phone" editable={false} value={phone ?? ''} />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePicker} disabled={!isEditing} style={styles.input2}>
          <TextInput
            placeholder="Select Date of Birth"
            placeholderTextColor={color.GRAY}
            editable={false}
            style={isEditing ? { color: color.BLACK } : { color: color.GRAY }}
            value={
              isEditing
                ? formattedDate
                : dateOfBirth
            }
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

        <Text style={[styles.label, { marginTop: height * 0.02 }]}>Gender</Text>
        <View style={styles.genderGroup}>
          {['MALE', 'FEMALE', 'OTHER'].map((g) => (
            <TouchableOpacity
              disabled={!isEditing}
              key={g}
              style={styles.radioOption}
              onPress={() => setGenderInput(g)}
            >
              <View style={[styles.radioCircle, genderInput === g && styles.radioSelected]} />
              <Text style={styles.radioText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {!isEditing && (
          <LabelInput label="Email" editable={isEditing} value={emailInput} onChangeText={setEmailInput} />)}
      </View>

      {isEditing && (
        <View style={styles.Vsave}>
          <TouchableOpacity style={styles.button} onPress={saveinfo}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const LabelInput = ({
  label,
  editable,
  value,
  onChangeText,
}: {
  label: string;
  editable: boolean;
  value: string;
  onChangeText?: (text: string) => void;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && styles.disabledInput]}
      editable={editable}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default ProfileInfo;
