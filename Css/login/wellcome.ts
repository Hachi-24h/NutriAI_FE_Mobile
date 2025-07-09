import { Dimensions, StyleSheet } from "react-native";
import color from "../../Custom/Color";

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: height * 0.1, 
  },
  logo: {
    width: height * 0.2,
    height:height * 0.2,
  },
  title: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: color.PRIMARY_BLUE,
    marginTop: height * 0.01,
  },
  subtitle: {
    fontSize:height * 0.015,
    color: color.GRAY,
    marginTop: height * 0.005,
  },
  bottomSection: {
    backgroundColor: color.LIGHT_BLUE,
    borderTopLeftRadius: height * 0.05,
    borderTopRightRadius: height * 0.05,
    paddingHorizontal: height * 0.02,
    paddingVertical: height * 0.1,
  },
  welcomeTitle: {
    fontSize: height * 0.025,
    fontWeight: '600',
    color: color.PRIMARY_BLUE,
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: height * 0.02,
    color: color.GRAY,
    marginBottom: height * 0.02,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signInButton: {
    flex: 1,
    backgroundColor: color.WHITE,
    borderRadius: height * 0.03,
    paddingVertical: height * 0.015,
    borderWidth: 1,
    borderColor: color.PRIMARY_BLUE,
    alignItems: 'center',
  },
  signUpButton: {
    flex: 1,
    backgroundColor: color.PRIMARY_BLUE,
    borderRadius:height * 0.03,
    paddingVertical: 12,
    marginLeft: width * 0.1,
    alignItems: 'center',
  },
  buttonText: {
    color: color.PRIMARY_BLUE,
    fontWeight: '600',
  },
  buttonTextWhite: {
    color: color.WHITE,
    fontWeight: '600',
  },
});
export default styles;