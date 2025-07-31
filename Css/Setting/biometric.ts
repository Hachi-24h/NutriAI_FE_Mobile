import { StyleSheet } from "react-native";
import color from "../../Custom/Color";
import { height, width } from "../../Custom/dimension";
// import { width, height } from "../../Custom/dimension";
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: color.WHITE,
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.BLACK,
    marginBottom: 10,
  },
  passwordRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.GRAY,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    color: color.BLACK,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: color.LIGHT_GRAY,
    borderRadius: 8,
    padding: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: color.PRIMARY_BLUE,
    borderRadius: 8,
    padding: 10,
  },
  cancelText: {
    textAlign: 'center',
    color: color.BLACK,
    fontSize: 16,
  },
  confirmText: {
    textAlign: 'center',
    color: color.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height:"100%",
    paddingRight: width * 0.05,
  }

});

export default styles;