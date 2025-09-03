import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import color from "../../Custom/Color";
import { Eye, EyeSlash } from "iconsax-react-native";
import styles from "../../Css/login/changepassword";
import { authService } from "../../services/authService";

const ChangePassword = ({ route, navigation }: any) => {
  const { phoneoremail } = route.params;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ==========================
  // Validation functions
  // ==========================
  const validateNewPassword = (value: string) => {
    if (!value) return " ";
    if (value.length < 6) return "Password must be at least 6 characters";
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value))
      return "Password must contain letters and numbers";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return " ";
    if (value !== newPassword) return "Passwords do not match";
    return "";
  };

  const validateForm = () => {
    const newPassError = validateNewPassword(newPassword);
    const confirmPassError = validateConfirmPassword(confirmPassword);

    const newErrors: { [key: string]: string } = {};
    if (newPassError) newErrors.newPassword = newPassError;
    if (confirmPassError) newErrors.confirmPassword = confirmPassError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Handle Change Password
  // ==========================
  const handleChangePassword = async () => {
    if (!validateForm()) return;

    try {
      await authService.resetPasswordByPhone(phoneoremail, newPassword);
      Alert.alert("Success", "Password changed successfully", [
        { text: "OK", onPress: () => navigation.navigate("signin") },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to change password"
      );
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
          <Text style={styles.readonlyText}>{phoneoremail}</Text>
        </View>

        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <View
          style={[styles.inputContainer, errors.newPassword && styles.error]}
        >
          <TextInput
            style={[styles.input]}
            placeholder="Enter new password"
            secureTextEntry={!showNewPass}
            value={newPassword}
            onChangeText={(val) => {
              setNewPassword(val);
              setErrors((prev) => ({
                ...prev,
                newPassword: validateNewPassword(val),
              }));
            }}
          />
          <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
            {showNewPass ? (
              <EyeSlash size="20" color={color.DARK_GRAY} />
            ) : (
              <Eye size="20" color={color.DARK_GRAY} />
            )}
          </TouchableOpacity>
        </View>
        {errors.newPassword ? (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        ) : null}

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View
          style={[styles.inputContainer, errors.confirmPassword && styles.error]}
        >
          <TextInput
            style={[styles.input]}
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPass}
            value={confirmPassword}
            onChangeText={(val) => {
              setConfirmPassword(val);
              setErrors((prev) => ({
                ...prev,
                confirmPassword: validateConfirmPassword(val),
              }));
            }}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showConfirmPass ? (
              <EyeSlash size="20" color={color.DARK_GRAY} />
            ) : (
              <Eye size="20" color={color.DARK_GRAY} />
            )}
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
