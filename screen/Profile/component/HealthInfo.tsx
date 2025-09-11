import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import styles from '../../../Css/profile/HealthInfoScreen';
import MedicalRecordItem from './MedicalRecordItem';
import color from '../../../Custom/Color';
import { width } from '../../../Utils/dimension';
import { userService } from '../../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setUser } from '../../../redux/slice/userSlice';
const iconMap: { [key: string]: any } = {
  'edit.png': require('../../../Icon/edit.png'),
  'done.png': require('../../../Icon/done.png'),
};
const records = [
  { title: 'Viêm họng cấp', date: '18/07/2025', severity: 'Nhẹ' },
  { title: 'Đau dạ dày mạn tính', date: '10/06/2025', severity: 'Trung bình' },
  { title: 'Tiểu đường tuýp 2', date: '22/03/2025', severity: 'Nặng' },
];

interface Props {
  heigth?: string;
  weigth?: string;
}
const HealthInfoScreen: React.FC<Props> = ({ heigth, weigth }) => {
  const [edithealthinfo, setEditHealthInfo] = React.useState(false);
  const [nameicon, setNameIcon] = React.useState('edit.png');

  const [heightInput, setHeightInput] = React.useState(heigth??"");
  const [weightInput, setWeightInput] = React.useState(weigth ??"");

  const [bmi, setBmi] = React.useState("");
  const dispatch = useDispatch();
  const oldUser = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    const h = parseFloat(heightInput);
    const w = parseFloat(weightInput);
    if (!isNaN(h) && !isNaN(w) && h > 0) {
      const value = (w / ((h / 100) ** 2)).toFixed(1);
      setBmi(value);
    } else {
      setBmi("");
    }
  }, [heightInput, weightInput]);
  const handleEdit = () => {
    setEditHealthInfo(!edithealthinfo);
    console.log('Edit Health Info');
  };

  const saveChanges = async () => {
    if(!heightInput || !weightInput){
      Alert.alert("❌ Lỗi", "Chiều cao và cân nặng không được để trống");
      return;
    }
    if (heightInput === heigth && weightInput === weigth) {
      Alert.alert("⚠️ Không có sự thay đổi nào");
      return;
    }
    
    try {
      const updated = await userService.updateHealth({
        height: heightInput || "",
        weight: weightInput || "",
      });

      // Merge để giữ lại email, phone...
      const mergedUser = { ...oldUser, ...updated };
      dispatch(setUser(mergedUser));

      Alert.alert("✅ Cập nhật sức khỏe thành công");
      setEditHealthInfo(false);
    } catch (err) {
      console.log("Update health error:", err);
      Alert.alert("❌ Lỗi", "Không thể cập nhật thông tin sức khỏe");
    }
  };
  const handleClose = () => {
    setEditHealthInfo(false);
    setHeightInput(heigth ?? "");
    setWeightInput(weigth ?? "");
  };

  useEffect(() => {
    if (edithealthinfo) {
      setNameIcon('done.png');
    }
    else {
      setNameIcon('edit.png');
    }

  }, [edithealthinfo]);
  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Health Overview</Text>
          {edithealthinfo && (
            <TouchableOpacity style={styles.editButton} onPress={handleClose}>
              <Image source={require('../../../Icon/close.png')} style={{ width: width * 0.07, height: width * 0.07, tintColor: color.RED }} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.editButton} onPress={!edithealthinfo ? handleEdit : saveChanges}>
            <Image source={iconMap[nameicon]} style={[styles.logo, nameicon === 'done.png' && { tintColor: color.GREEN }]} />
          </TouchableOpacity>


        </View>

        <View style={styles.Vcard_con}>
          <LabelInput
            label="Height (cm)"
            editable={edithealthinfo}
            value={heightInput ? heightInput : ''}
            onChangeText={setHeightInput}
          />

          <LabelInput
            label="Weight (kg)"
            editable={edithealthinfo}
            value={weightInput ? weightInput : ''}
            onChangeText={setWeightInput}
          />

          <LabelInput
            label="BMI"
            editable={false} // BMI không cho chỉnh sửa
            value={bmi}
          />
        </View>
      </View>

      {/* Khối bệnh án */}
      <View style={[styles.card, { backgroundColor: color.BACK_BLUE }]}>
        <Text style={styles.title}>Medical History</Text>
        <View style={{ padding: 16 }}>
          {records.map((item, index) => (
            <MedicalRecordItem
              key={index}
              title={item.title}
              date={item.date}
              severity={item.severity as 'Nhẹ' | 'Trung bình' | 'Nặng'}
              onPressDetail={() => Alert.alert(`Chi tiết bệnh án: ${item.title}`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const LabelInput = ({
  label,
  editable,
  value, onChangeText,
}: {
  label: string;
  editable: boolean;
  value: string;
  onChangeText?: (text: string) => void;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, editable && styles.disabledInput]}
      editable={editable}
      value={value}
      keyboardType="numeric" 
      onChangeText={onChangeText}
    />
  </View>
);
export default HealthInfoScreen;
