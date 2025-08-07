import { StyleSheet } from 'react-native';
import { height, width } from '../../Utils/dimension';
import color from '../../Custom/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: height * 0.02,
    paddingTop: height * 0.02,
    paddingLeft: width * 0.04,
    borderRadius: 12,
  },
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    width: width * 1,
    shadowColor: color.YELLOW_GRADIENT,
  },
  VtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.GREEN,
    borderTopLeftRadius: width * 0.1,
    borderBottomLeftRadius: width * 0.1,
    paddingVertical: height * 0.015,
    marginLeft: width * 0.1,
    paddingHorizontal: width * 0.1,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: color.BLACK,
    textAlign: 'left',
    flex: 1,
  },
  backButton: {
    padding: width * 0.02,
    borderRadius: width * 0.05,
    backgroundColor: color.WHITE,
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: width * 0.1,
    height: width * 0.1,
  },
  body: {
    justifyContent: 'center',
    height: height * 0.55,
    width: width * 0.9,
    backgroundColor: color.LIGHT_BLUE,
    borderRadius: width * 0.03,


  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "15%",
    paddingHorizontal: width * 0.04,

  },
  tableWrapper: {
    height: "85%",
    paddingLeft: "2%",
    paddingVertical: height * 0.02,
    backgroundColor: color.WHITE,
    borderRadius: width * 0.03,
  },
  headerText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: color.BLACK,
  },


  dayColumn: {
  borderRadius: width * 0.03,
  paddingVertical: height * 0.015,
  paddingHorizontal: width * 0.04,
  marginRight: width * 0.025,
  width: width * 0.45,
  justifyContent: 'flex-start',
  borderWidth: 2,  // Thêm viền cho các ngày
},

// Ngày đã qua
pastDay: {
  backgroundColor: color.LIGHT_GRAY,
},

// Ngày chưa đến
futureDay: {
  backgroundColor: color.LIGHT_BLUE,
},

// Ngày hiện tại với viền đỏ
todayBorder: {
  borderWidth: width * 0.01,
  borderColor: color.RED,
},

todayText: {
  color: color.RED,
  fontWeight: 'bold',
},
  dayTitle: {
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: height * 0.005,
  },
  dateText: {
    fontSize: width * 0.035,
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  mealBox: {
    backgroundColor: color.WHITE,
    borderRadius: width * 0.02,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.015,
    elevation: 3,
  },
  mealLabel: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: color.DARK_BLUE,
    marginBottom: height * 0.005,
  },
  mealDish: {
    fontSize: width * 0.035,
    color: color.BLACK,
  },
  mealTime: {
    fontSize: width * 0.03,
    color: color.GRAY,
    marginTop: height * 0.003,
  },
  infoSchedule: {
    padding: width * 0.05,
    backgroundColor: color.WHITE,
    borderRadius: 12,
    marginBottom: height * 0.02,
    shadowColor: color.DARK_GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText2: {
    fontSize: width * 0.04,
    color: color.GRAY,
    marginBottom: height * 0.01,
  },

});


export default styles;
