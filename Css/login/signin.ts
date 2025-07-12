import { StyleSheet, Dimensions } from 'react-native';
import color from '../../Custom/Color';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BACK_BLUE,
  },
  topSection: {
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.04,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  registerText: {
    fontSize: 14,
    color: color.DARK_BLUE,
    fontWeight: '600',
  },
  signInTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    color: color.BLACK,
  },
  description: {
    fontSize: 14,
    color: color.DARK_GRAY,
    marginTop: 6,
  },
  formSection: {
    backgroundColor: color.WHITE,
    flex: 1,
    marginTop: height * 0.05,
    borderTopLeftRadius: height * 0.04,
    borderTopRightRadius: height * 0.04,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.04,
  },
  input: {
    backgroundColor: color.LIGHT_GRAY,
    borderRadius: 30,
    paddingHorizontal: height * 0.03,
    paddingVertical: height * 0.02,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.LIGHT_GRAY,
    borderRadius: 30,
    paddingHorizontal: height * 0.02,
    paddingVertical: height * 0.015,
    marginBottom: 16,
  },

  iconWrapper: {
    paddingHorizontal: 6,
  },
  forgotText: {
    textAlign: 'right',
    color: color.GRAY,
    marginBottom: height * 0.03,
    fontSize: height * 0.015,
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: color.BLACK,
    paddingVertical: height * 0.02,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  signInButtonText: {
    color: color.WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  socialButtons: {
    marginTop: 30,
    gap: 14,
  },
  socialButton: {
    backgroundColor: color.WHITE,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderColor: color.LIGHT_GRAY,
    borderWidth: 1,
    elevation: 2,
  },
  socialText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
  },
  arrow: {
    fontSize: 18,
    color: color.DARK_GRAY,
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  footerText: {
    fontSize: 14,
    color: color.GRAY,
  },

  buttonSignUp: {
    marginLeft: 6,
  },

  footerLink: {
    color: color.DARK_BLUE,
    fontWeight: '700',
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },

  iconEye: {
    position: 'absolute',
    right: width * 0.04,
    top: '20%',
    transform: [{ translateY: -10 }],
    padding: 5,
  },
});

export default styles;
