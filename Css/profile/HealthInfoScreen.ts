
import color from "../../Custom/Color";
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: color.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        marginTop: height * 0.02,
    },
    title:{

        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: color.BLACK,
        marginBottom: height * 0.02,
    },
    editButton:{
       marginTop: height * 0.005,
    },
    logo:{
        width: width * 0.07,
        height: width * 0.07,
    },
    card: {
        backgroundColor: color.WHITE,
        borderRadius: width * 0.02,
        padding: width * 0.05,
        marginVertical: height * 0.02,
        width: "90%",
        shadowColor: color.SHADOW_BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: width * 0.02,
        borderWidth: 2,
        borderColor: color.LIGHT_GRAY,

    },
    Vcard_con: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: height * 0.02,

    },
    label: {
        fontSize: height * 0.015,
        color: color.DARK_GRAY,
        fontWeight: 'bold',
        marginTop: height * 0.012,
    },
    input: {

        borderRadius: width * 0.02,
        padding: height * 0.015,

        color: color.BLACK,
        width: '50%',
        textAlign: 'center',
    },
    disabledInput: {
        borderWidth: 1,
        borderColor: color.GRAY,
        backgroundColor: color.WHITE,
    }

});
export default styles;