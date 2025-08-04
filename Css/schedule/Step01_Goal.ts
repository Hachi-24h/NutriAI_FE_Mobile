import { StyleSheet } from 'react-native';
import color from '../../Custom/Color';
import { height, width } from '../../Utils/dimension';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.06,
  },
   headerWrapper: {
    position: 'absolute',
    top: height * 0.02,
    width:width,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
  header: {
    marginBottom: height * 0.03,
    marginTop: height * 0.05,
  },
  stepTitle: {
    fontSize: height * 0.03,
    fontWeight: '700',
    color: color.PRIMARY_BLUE,
  },
  stepSubtitle: {
    fontSize: height * 0.02,
    color: color.DARK_GRAY,
    marginTop: height * 0.005,
  },
  scroll: {
    paddingBottom: height * 0.15,
  },
  question: {
    fontSize: height * 0.022,
    fontWeight: '600',
    color: color.DARK_BLUE,
    marginTop: height * 0.025,
    marginBottom: height * 0.015,
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: width * 0.02,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: color.LIGHT_GRAY,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: height * 0.03,
    marginRight: width * 0.02,
    marginBottom: height * 0.015,
    elevation: 3,
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: color.PRIMARY_BLUE,
  },
  optionText: {
    color: color.DARK_GRAY,
    fontWeight: '500',
    fontSize: height * 0.018,
  },
  selectedText: {
    color: color.WHITE,
    fontWeight: '700',
  },
  nextButton: {
    position: 'absolute',
    bottom: height * 0.04,
    alignSelf: 'center',
    backgroundColor: color.PRIMARY_BLUE,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    borderRadius: height * 0.04,
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 999,
  },
  nextButtonText: {
    color: color.WHITE,
    fontSize: height * 0.02,
    fontWeight: '700',
  },
});

export default styles;
