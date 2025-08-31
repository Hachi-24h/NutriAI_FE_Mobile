import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { userApi, authApi } from "../api/axiosClient";
import { setUser, clearUser } from "../redux/slice/userSlice";
import { clearAuth } from "../redux/slice/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const user = useSelector((state: RootState) => state.user.profile);

  const [loading, setLoading] = useState(false);

  // 👉 Hàm gọi API lấy thông tin mới nhất
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userApi.get("/me"); // tự refresh nếu token hết hạn
      dispatch(setUser(res.data));
      Alert.alert("✅ Thành công", "Đã cập nhật thông tin user");
    } catch (err: any) {
      console.log("❌ Fetch profile error:", err.message);
      Alert.alert("Lỗi", "Không lấy được thông tin user");
    } finally {
      setLoading(false);
    }
  };

  // 👉 Hàm logout
  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await authApi.post("/logout", { refresh_token: refreshToken });
      }
      dispatch(clearAuth());
      dispatch(clearUser());
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      navigation.replace("signin");
    } catch (err) {
      console.log("❌ Logout error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Thông tin User</Text>

      {user ? (
        <View style={styles.infoBox}>
          <Text>Fullname: {user.fullname}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Gender: {user.gender}</Text>
          <Text>DOB: {user.DOB ? new Date(user.DOB).toLocaleDateString() : "N/A"}</Text>
          <Text>Height: {user.height || "-"}</Text>
          <Text>Weight: {user.weight || "-"}</Text>
          <Text>BMI: {user.BMI || "-"}</Text>
          <Text>Activity Level: {user.activityLevel || "-"}</Text>
        </View>
      ) : (
        <Text>Chưa có dữ liệu user</Text>
      )}

      <Text style={styles.token}>Access Token: {accessToken?.slice(0, 25)}...</Text>

      <View style={{ marginTop: 20 }}>
        <Button title={loading ? "Đang tải..." : "🔄 Làm mới từ API"} onPress={fetchProfile} disabled={loading} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="🚪 Đăng xuất" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  infoBox: { marginBottom: 20 },
  token: { marginTop: 10, fontSize: 12, color: "gray" },
});
