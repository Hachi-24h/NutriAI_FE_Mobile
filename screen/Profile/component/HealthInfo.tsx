import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import styles from '../../../Css/profile/HealthInfoScreen';
const iconMap: { [key: string]: any } = {
  'edit.png': require('../../../Icon/edit.png'),
  'done.png': require('../../../Icon/done.png'),
};
const HealthInfoScreen: React.FC = () => {
  const [edithealthinfo, setEditHealthInfo] = React.useState(false);
  const [nameicon, setNameIcon] = React.useState('edit.png');
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
  if(edithealthinfo){
    setNameIcon('done.png');
  }
  else{
    setNameIcon('edit.png');
  }

}, [edithealthinfo]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Thông tin sức khỏe</Text>
          <TouchableOpacity style={styles.editButton} onPress={!edithealthinfo?handleEdit: saveChanges}>
           <Image source={iconMap[nameicon]} style={styles.logo} />
          </TouchableOpacity>
       
        </View>

        <View style={styles.Vcard_con}>
          <LabelInput label="Chiều cao" editable={edithealthinfo} defaultValue={'hahci'} />
          <LabelInput label="Phone" editable={edithealthinfo} defaultValue={'hahci'} />
          <LabelInput label="Phone" editable={edithealthinfo} defaultValue={'hahci'} />
          <LabelInput label="Phone" editable={edithealthinfo} defaultValue={'hahci'} />
        </View>
      </View>

      {/* Khối bệnh án */}
      <View style={styles.card}>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+ Thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonTextOutline}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      style={[styles.input, editable && styles.disabledInput]}
      editable={editable}
      defaultValue={defaultValue}
    />
  </View>
);
export default HealthInfoScreen;
