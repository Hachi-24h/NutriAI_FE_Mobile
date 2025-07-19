import React from 'react';
import {  ScrollView, StyleSheet } from 'react-native';
import ProfileInfo from './component/ProfileInfo';
import AvatarSelector from './component/AvatarSelector';
import color from '../../Custom/Color';


const ProfileScreen = () => {
  
  const user = {
    name: 'Nguyen Van A',
    phone: '0375552313',
    dateOfBirth: '01/01/2000',
    email : 'nguyenvana.com',
    gender : true,
  };
 return (
  <ScrollView style={styles.container}>
    <AvatarSelector  name={user.name} />
    <ProfileInfo
      phone={user.phone}
      name={user.name}
      dateOfBirth={user.dateOfBirth}
      email={user.email}
      genderuser={user.gender ? 'Male' : 'Female'}
    />
    
  </ScrollView>
);
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: color.WHITE,
  },
  
});
