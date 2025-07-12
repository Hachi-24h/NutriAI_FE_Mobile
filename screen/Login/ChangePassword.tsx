import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import color from '../../Custom/Color';
import { Eye, EyeSlash } from 'iconsax-react-native'; // ✅ Dùng iconsax-react-native
import styles from '../../Css/login/changepassword'; // ✅ Import styles from the new file

const ChangePassword = ({navigation}:any) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const emailOrPhone = 'phanthanhnam124';
    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            console.log('Password changed successfully');
            navigation.navigate('signin'); 
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Change Password</Text>
            </View>
            <View style={styles.formSection}>
                <Text style={styles.label}>Email / Phone</Text>
                <View style={styles.readonlyBox}>
                    <Text style={styles.readonlyText}>{emailOrPhone}</Text>
                </View>

                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new password"
                        secureTextEntry={!showNewPass}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                        {showNewPass ? (
                            <EyeSlash size="20" color={color.DARK_GRAY} />
                        ) : (
                            <Eye size="20" color={color.DARK_GRAY} />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        secureTextEntry={!showConfirmPass}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                        {showConfirmPass ? (
                            <EyeSlash size="20" color={color.DARK_GRAY} />
                        ) : (
                            <Eye size="20" color={color.DARK_GRAY} />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default ChangePassword;
