import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { otpService } from "../services/authService";
// import otpService

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState("+84377638894");
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(0);

  const sendOtp = async () => {
    try {
      const confirmation = await otpService.sendOtp(phoneNumber);
      setConfirm(confirmation);
      setCounter(60);
      console.log("OTP đã được gửi!");
    } catch (err: any) {
      console.log("Gửi OTP thất bại:", err.message);
    }
  };

  const verifyOtp = async () => {
    if (!confirm) return;
    try {
      const user = await otpService.verifyOtp(confirm, code, async (phone) => {
        const newConfirm = await otpService.sendOtp(phone);
        setConfirm(newConfirm);
        setCounter(60);
        console.log("🔄 OTP mới đã được gửi do session hết hạn.");
        return newConfirm;
      });
      console.log("✅ Xác thực thành công!", user?.phoneNumber);
    } catch (err: any) {
      console.log("❌ Lỗi OTP:", err.message);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <View style={styles.container}>
      {!confirm ? (
        <>
          <Text>Nhập số điện thoại (+84...):</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+84xxxxxxxx"
            keyboardType="phone-pad"
          />
          <Button title="Gửi OTP" onPress={sendOtp} />
        </>
      ) : (
        <>
          <Text>Nhập mã OTP:</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="number-pad"
          />
          <Button title="Xác minh" onPress={verifyOtp} />

          {counter > 0 ? (
            <Text style={styles.countdown}>Gửi lại OTP sau {counter}s</Text>
          ) : (
            <Button title="Gửi lại OTP" onPress={sendOtp} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  countdown: { marginTop: 10, color: "red", textAlign: "center" },
});
