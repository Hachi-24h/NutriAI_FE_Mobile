import { StyleSheet, Dimensions } from 'react-native';
import color from '../../Custom/Color';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BACK_BLUE,


    },
    topSection: {
        flexDirection: 'row',
        paddingVertical: width * 0.03,
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        backgroundColor: color.BACK_BLUE,
        position: 'relative',
        width: width,
    },
    title: {
        fontSize: height * 0.04,
        fontWeight: 'bold',
        color: color.BLACK,
        textAlign: 'center',
        paddingLeft: width * 0.25,
    },
    formSection: {
        backgroundColor: color.WHITE,
        flex: 1,
        borderTopLeftRadius: height * 0.04,
        borderTopRightRadius: height * 0.04,
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.05,
        
        
    },
    label: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: color.BLACK,
        marginBottom: height * 0.01,
        paddingLeft: height * 0.01,
        
    },
    input: {
        backgroundColor: color.LIGHT_GRAY,
        borderRadius:height * 0.03,
        paddingHorizontal: height * 0.03,
        paddingVertical: height * 0.02,
        marginBottom: height*0.01,
        width: "99%",
    },
    signUpButton: {
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
    buttonText: {
        color: color.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    footerText: {
        color: color.GRAY,
    },
    loginLink: {
        color: color.PRIMARY_BLUE,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    genderGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        paddingLeft: height * 0.1,
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
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.GRAY,
        marginRight: 6,
    },
    radioSelected: {
        backgroundColor: color.BLACK,
    },
    radioText: {
        fontSize: 14,
        color: color.BLACK,
    },
    error:{
        borderColor: 'red',borderWidth:1
    },
    errorText :{
        color: color.RED,
        marginBottom: height * 0.005,
        paddingLeft:width*0.05,
    },
    showPasswordButton:{
        position: "absolute",
        right: width*0.08,
        top: "20%",
        
        zIndex:999,
        padding:width*0.01,
        
       
    }
});
export default styles;