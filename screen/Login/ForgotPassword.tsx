// ForgotPassword.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal,
    Alert,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import color from '../../Custom/Color';
import { Keyboard } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
const { width, height } = Dimensions.get('window');



const ForgotPassword = ({ navigation }: any) => {
    const [input, setInput] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [timer, setTimer] = useState(60);
    const otpRef = useRef<OTPTextInput>(null);

    const handleContinue = () => {
        if (!input) return;
        console.log('Sending OTP to:', input);
        setOtpModalVisible(true);
        setTimer(60);
        Keyboard.dismiss(); // 👈 Tắt bàn phím
    };
    const handleBackscreend
        = () => {
            navigation.goBack();
        };

    const handleSubmitOtp = () => {
        console.log('OTP submitted:', otpCode);
        if (otpCode.length < 6) {
            Alert.alert('Please enter a valid 6-digit OTP');
            return;
        }
        if (otpCode === '123456') { 
            navigation.navigate('changePassword', { phoneoremail: input });

            setOtpModalVisible(false);
            Keyboard.dismiss(); // 👈 Tắt bàn phím
        }
        else {
            Alert.alert('Invalid OTP', 'Please try again.');
        }
    };

    const handleClearOtp = () => {
        setOtpCode('');
        if (otpRef.current) {
            otpRef.current.clear(); // Xóa tất cả ô nhập
        }
    };
    const handleResend = () => {
        console.log('Resending OTP to:', input);
        setTimer(60);
    };

    useEffect(() => {
        if (otpModalVisible && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer, otpModalVisible]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.description}>
                Enter your email or phone number to receive a password reset code.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor={color.GRAY}
                value={input}
                onChangeText={setInput}
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backicon} onPress={handleBackscreend}>
                <ArrowLeft size={height * 0.04} color={color.BLACK} />
            </TouchableOpacity>
            {/* OTP Modal */}
            <Modal
                visible={otpModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setOtpModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>


                        <Text style={styles.modalTitle}>OTP Verification</Text>
                        <Text style={styles.modalSubtitle}>
                            We've sent a 6-digit code to your input
                        </Text>

                        <OTPTextInput
                            ref={otpRef}
                            inputCount={6}
                            handleTextChange={setOtpCode}
                            tintColor={color.PRIMARY_BLUE}
                            offTintColor={color.LIGHT_GRAY}
                            textInputStyle={styles.otpInput}
                            containerStyle={styles.otpContainer}
                        />
                        <TouchableOpacity onPress={handleClearOtp} style={styles.buttonclear}>
                            <Text style={styles.textclear}>Clear</Text>
                        </TouchableOpacity>

                        <View style={styles.resendRow}>
                            <Text style={styles.resendHint}>Didn't receive the code?</Text>
                            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                                <Text style={styles.resendText}>
                                    {timer > 0 ? ` Resend OTP (${timer}s)` : ' Resend OTP'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={[styles.submitButton_modal, { backgroundColor: color.RED }]} onPress={() => setOtpModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.submitButton_modal, { backgroundColor: color.PRIMARY_BLUE }]} onPress={handleSubmitOtp}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
        justifyContent: 'center',
        paddingHorizontal: width * 0.08,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: color.PRIMARY_BLUE,
        marginBottom: height * 0.02,
    },
    description: {
        fontSize: 14,
        color: color.DARK_GRAY,
        marginBottom: height * 0.03,
    },
    input: {
        backgroundColor: color.LIGHT_GRAY,
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: height * 0.02,
        fontSize: 16,
        color: color.BLACK,
        borderColor: color.LIGHT_GRAY,
        borderWidth: 1,
        marginBottom: height * 0.03,
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color.PRIMARY_BLUE,
        borderRadius: 30,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.05,
    },
    submitButton_modal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 30,
        paddingVertical: height * 0.015,
        margin: height * 0.01,
        paddingHorizontal: width * 0.05,
    },
    buttonText: {
        color: color.WHITE,
        fontSize: 16,
        fontWeight: '600',
    },
    buttonclear: {
        alignSelf: 'flex-end',
    },
    textclear: {
        textAlign: 'right',
        color: color.GRAY,
        fontSize: height * 0.015,
        fontWeight: '500',
        padding: height * 0.01,
        textDecorationLine: 'underline',
    },

    // Modal styles
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: color.WHITE,
        borderRadius: 20,
        padding: 25,
        elevation: 5,
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: color.PRIMARY_BLUE,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: color.BLACK,
        textAlign: 'center',
        marginBottom: 5,
    },
    modalSubtitle: {
        fontSize: 14,
        color: color.DARK_GRAY,
        textAlign: 'center',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },

    otpInput: {
        width: height * 0.05,
        height: height * 0.05,
        borderRadius: height * 0.01,
        borderWidth: 1,
        borderColor: color.PRIMARY_BLUE,
        fontSize: height * 0.02,
        color: color.BLACK,
        backgroundColor: color.WHITE,
        textAlign: 'center',
        shadowColor: color.SHADOW_BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    resendHint: {
        fontSize: 14,
        color: color.GRAY,
    },
    resendText: {
        fontSize: 14,
        color: color.PRIMARY_BLUE,
        fontWeight: '500',
    },
    backicon: {
        position: "absolute",
        top: height * 0.02,
        left: width * 0.03,

    }
});

export default ForgotPassword;
