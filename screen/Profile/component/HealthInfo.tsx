import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image,  ScrollView, Alert } from 'react-native';
import styles from '../../../Css/profile/HealthInfoScreen';
import MedicalRecordItem from './MedicalRecordItem';
import color from '../../../Custom/Color';
const iconMap: { [key: string]: any } = {
  'edit.png': require('../../../Icon/edit.png'),
  'done.png': require('../../../Icon/done.png'),
};
const records = [
  { title: 'Viêm họng cấp', date: '18/07/2025', severity: 'Nhẹ' },
  { title: 'Đau dạ dày mạn tính', date: '10/06/2025', severity: 'Trung bình' },
  { title: 'Tiểu đường tuýp 2', date: '22/03/2025', severity: 'Nặng' },
];
const healthInfo = {
  heightCm: 172, // cm
  weightKg: 65,  // kg
};
const HealthInfoScreen: React.FC = () => {
  const [edithealthinfo, setEditHealthInfo] = React.useState(false);
  const [nameicon, setNameIcon] = React.useState('edit.png');
  const bmi = (healthInfo.weightKg / ((healthInfo.heightCm / 100) ** 2)).toFixed(1);

  const handleEdit = () => {
    setEditHealthInfo(!edithealthinfo);
    console.log('Edit Health Info');
  };

  const saveChanges = () => {
    // Logic to save changes
    setEditHealthInfo(!edithealthinfo);
    console.log('Changes saved');
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
          <TouchableOpacity style={styles.editButton} onPress={!edithealthinfo ? handleEdit : saveChanges}>
            <Image source={iconMap[nameicon]} style={styles.logo} />
          </TouchableOpacity>

        </View>

        <View style={styles.Vcard_con}>
          <LabelInput
            label="Height (cm)"
            editable={edithealthinfo}
            defaultValue={healthInfo.heightCm.toString()}
          />

          <LabelInput
            label="Weight (kg)"
            editable={edithealthinfo}
            defaultValue={healthInfo.weightKg.toString()}
          />

          <LabelInput
            label="BMI"
            editable={false} // BMI không cho chỉnh sửa
            defaultValue={bmi}
          />
        </View>
      </View>

      {/* Khối bệnh án */}
      <View style={[styles.card,{backgroundColor: color.BACK_BLUE}]}>
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
  defaultValue,
}: {
  label: string;
  editable: boolean;
  defaultValue: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, editable && styles.disabledInput]}
      editable={editable}
      defaultValue={defaultValue}
    />
  </View>
);
export default HealthInfoScreen;
