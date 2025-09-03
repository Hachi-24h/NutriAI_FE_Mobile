import color from '../../Custom/Color';

import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flexDirection: 'column',
        backgroundColor: color.BACK_BLUE,

        // paddingTop: height * 0.1,
    },
    header: {
        flexDirection: 'column',
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color.BACK_BLUE,
    },
    title: {
        fontSize: height * 0.03,
        fontWeight: '700',
        color: color.PRIMARY_BLUE,
        textAlign: 'center',
    },
    formSection: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.02,
        backgroundColor: color.WHITE,
        borderTopLeftRadius: height * 0.04,
        borderTopRightRadius: height * 0.04,
    },
    label: {
        fontSize: height * 0.02,
        color: color.DARK_GRAY,
        marginBottom: height * 0.01,
        fontWeight: 'bold',
    },
    readonlyBox: {
        backgroundColor: color.LIGHT_GRAY,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    readonlyText: {
        color: color.BLACK,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: height * 0.02,
        paddingHorizontal: height * 0.03,
        paddingVertical: height * 0.01,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: color.BLACK,
    },
    submitButton: {
        backgroundColor: color.PRIMARY_BLUE,
        borderRadius: 30,
        alignItems: 'center',
        paddingVertical: height * 0.02,
        elevation: 5,
        shadowColor: color.BLACK,
    },
    buttonText: {
        color: color.WHITE,
        fontSize: 16,
        fontWeight: '600',
    },
     errorText :{
        color: color.RED,
        marginBottom: height * 0.005,
        paddingLeft:width*0.05,
    },
    error:{
        borderColor: 'red',borderWidth:1
    }
});
export default styles;