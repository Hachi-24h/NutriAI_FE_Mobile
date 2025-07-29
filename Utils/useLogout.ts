import { CommonActions, useNavigation } from '@react-navigation/native';

export const useLogout = () => {
  const navigation = useNavigation();

  const logout = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'signin' }],
        })
      );
    } catch (error) {
      // Nếu dispatch lỗi vì navigation chưa sẵn sàng → fallback về điều hướng đơn giản
      navigation.navigate('signin' as never);
    }
  };

  return logout;
};