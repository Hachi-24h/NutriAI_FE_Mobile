import { StyleSheet } from "react-native";
import color from "../../Custom/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  header: {
    backgroundColor: color.PRIMARY_BLUE,
    borderRadius: 12,
    paddingVertical: '3%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  headerText: {
    color: color.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: color.LIGHT_BLUE,
    borderRadius: 12,
    padding: '5%',
    marginBottom: '5%',
    width: '100%',
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: color.DARK_GRAY,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '5%',
  },
  button: {
    backgroundColor: color.DARK_BLUE,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    borderRadius: 8,
    marginRight: '4%',
  },
  buttonText: {
    color: color.WHITE,
    fontWeight: '600',
  },
  buttonOutline: {
    borderColor: color.DARK_BLUE,
    borderWidth: 1.5,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    borderRadius: 8,
  },
  buttonTextOutline: {
    color: color.DARK_BLUE,
    fontWeight: '600',
  },
});
export default styles;