import { StyleSheet } from 'react-native';
import color from '../../Custom/Color';
import { width , height} from '../../Custom/dimension';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.LIGHT_GRAY,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },

  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
    color: color.BLACK,
  },

  list: {
    rowGap: height * 0.015,
  },

  gmailItem: {
    backgroundColor: color.WHITE,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: color.SHADOW_BLACK,
    shadowOpacity: 0.08,
    shadowRadius: width * 0.01,
    elevation: 3,
  },

  gmailText: {
    fontSize: width * 0.04,
    color: color.DARK_GRAY,
    flexShrink: 1,
  },

  deleteButton: {
    backgroundColor: color.RED,
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.035,
    borderRadius: width * 0.025,
  },

  deleteText: {
    color: color.WHITE,
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },

  addButton: {
    marginTop: height * 0.03,
    backgroundColor: color.PRIMARY_BLUE,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.03,
    alignItems: 'center',
  },

  addButtonText: {
    color: color.WHITE,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },

  modalContent: {
    backgroundColor: color.WHITE,
    borderRadius: width * 0.04,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.05,
    width: '100%',
  },

  modalTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.015,
    color: color.BLACK,
  },

  confirmText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: height * 0.015,
    color: color.GRAY,
  },

  input: {
    borderWidth: 1,
    borderColor: color.GRAY,
    borderRadius: width * 0.025,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.035,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    backgroundColor: color.LIGHT_GRAY,
    paddingVertical: height * 0.012,
    flex: 1,
    borderRadius: width * 0.025,
    marginRight: width * 0.03,
    alignItems: 'center',
  },

  okBtn: {
    backgroundColor: color.PRIMARY_BLUE,
    paddingVertical: height * 0.012,
    flex: 1,
    borderRadius: width * 0.025,
    alignItems: 'center',
  },

  cancelText: {
    color: color.DARK_GRAY,
    fontSize: width * 0.038,
  },

  okText: {
    color: color.WHITE,
    fontSize: width * 0.038,
  },
});

export default styles;
