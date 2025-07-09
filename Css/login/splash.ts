import { StyleSheet, Dimensions } from 'react-native';
import color from '../../Custom/Color';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  topCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: color.PRIMARY_BLUE,
    borderBottomLeftRadius: width * 0.6,
  },
  bottomCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: color.PRIMARY_BLUE,
    borderTopRightRadius: width * 0.7,
  },
  centerContent: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginTop: height * 0.3,
  },
  logo: {
    width: height * 0.1,
    height: height * 0.1,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: color.PRIMARY_BLUE,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 2,
    color: '#444',
    marginTop: 4,
  },
 getstarted: {
  marginBottom: height * 0.08,           // hơi cao lên một chút
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},

getstartedButton: {
  backgroundColor: color.BLUE_BUTTON,            // xanh dương chủ đạo
  paddingHorizontal: width * 0.2,        // rộng vừa đủ
  paddingVertical: 14,
  borderRadius: 30,                      // bo tròn đẹp
  elevation: 4,                          // đổ bóng Android
  shadowColor: color.BLACK,                   // đổ bóng iOS
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},
});
export default styles;