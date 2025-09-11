
// eslint-disable-next-line quotes
import color from "../../Custom/Color";
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        padding: width * 0.05,
        // backgroundColor: color.WHITE,s
        borderRadius: width * 0.02,
    },
    inputContainer: {
        marginBottom: height * 0.02,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: height * 0.02,
        paddingHorizontal: width * 0.01,
    },

    label: {
        fontSize: height * 0.015,
        color: color.DARK_GRAY,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
    },
    input: {
        borderWidth: 1,
        borderColor: color.GRAY,
        borderRadius: width * 0.02,
        padding: height * 0.015,
        backgroundColor: color.WHITE,
        color: color.BLACK,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.015,
    },
    input2: {
        borderWidth: 1,
        borderColor: color.GRAY,
        borderRadius: width * 0.02,
        backgroundColor: color.WHITE,
        color: color.BLACK,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.003,
    },
    disabledInput: {
        // backgroundColor: color.LIGHT_GRAY,
        color: color.GRAY,
    },
    genderGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        paddingLeft: width * 0.1,
    },
    genderLabel: {
        marginRight: 10,
        fontSize: 15,
        color: color.BLACK,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioCircle: {
        height: width * 0.04,
        width: width * 0.04,
        borderRadius: width * 0.02,
        borderWidth: 1,
        borderColor: color.LIGHT_BLUE,
        marginRight: width * 0.02,
    },
    radioSelected: {
        backgroundColor: color.BACK_BLUE,
    },
    radioText: {
        fontSize: height * 0.015,
        color: color.BLACK,
    },
    Vsave:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      
        width: width * 0.9,
    },
    button: {
        backgroundColor: color.PRIMARY_BLUE,
        paddingVertical: width * 0.03,
        borderRadius: width * 0.05,
        width: width * 0.6,
        alignItems: 'center',
        shadowColor: color.SHADOW_BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: color.WHITE,
        fontSize: height * 0.02,
        fontWeight: '600',
    },
    formSection:{
        flexDirection: 'column',
        height: height * 0.43,
        backgroundColor: color.WHITE,
        padding: width * 0.05,
        borderRadius: width * 0.02,
        marginBottom: height * 0.01,
    },
    headertext: {
        fontSize: height * 0.025,
        fontWeight: 'bold',
        color: color.BLACK,
        width: width * 0.8,
        textAlign: 'center',
    },
});
export default styles;