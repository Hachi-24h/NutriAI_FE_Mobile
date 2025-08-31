import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    // Dán WEB CLIENT ID vào đây ở bước 3B (sau khi tạo trên Google Cloud)
    GoogleSignin.configure({
      webClientId: '202383989285-a81k146s59id7n0uhjuetbtjlj7oob8l.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);
  console.log('Google Sign-In configured');
  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
    } catch (e:any) {
      console.log('Google Sign-In Error:', e.code, e.message);
      if (e.code === statusCodes.DEVELOPER_ERROR) {
        console.log('→ Kiểm tra webClientId / packageName / SHA-1 / consent screen.');
      }
    }
  };

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={handleLoginGoogle} style={{padding:12,borderWidth:1}}>
        <Text>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
