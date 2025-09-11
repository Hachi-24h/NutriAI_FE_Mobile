
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, userApi } from "../api/axiosClient";
import { setAuth, clearAuth } from "../redux/slice/authSlice";
import { setUser, clearUser } from "../redux/slice/userSlice";
import { store } from "../redux/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  getAuth,
  signInWithPhoneNumber,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";

export const authService = {
  // Đăng nhập bằng Google
  loginWithGoogle: async (idToken: string, dispatch: any, navigation: any) => {
    try {
      // Gọi backend để login
      const res = await authApi.post("/google", { id_token: idToken });
      const { access_token, refresh_token } = res.data;

      // Lưu token vào Redux
      dispatch(setAuth({ accessToken: access_token, refreshToken: refresh_token }));

      // Gọi song song user-service và auth-service
      const [profileRes, authRes] = await Promise.all([
        userApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
        authApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
      ]);

      // Gộp dữ liệu
      const mergedUser = {
        ...profileRes.data,
        email: authRes.data.email,
        phone: authRes.data.phone,
        role: authRes.data.role,
      };

      dispatch(setUser(mergedUser));
      navigation.navigate("home");
    } catch (err: any) {
      console.log("Google Login Error:", err.response?.data || err.message);
      throw err;
    }
  },

  // Đăng nhập bằng phone/email + password
  loginWithPassword: async (
    username: string,
    password: string,
    dispatch: any,
    navigation: any
  ) => {
    try {
      const res = await authApi.post("/login", {
        phoneOrEmail: username,
        password,
      });
      const { access_token, refresh_token } = res.data;

      dispatch(setAuth({ accessToken: access_token, refreshToken: refresh_token }));

      const [profileRes, authRes] = await Promise.all([
        userApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
        authApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
      ]);

      const mergedUser = {
        ...profileRes.data,
        email: authRes.data.email,
        phone: authRes.data.phone,
        role: authRes.data.role,
      };

      dispatch(setUser(mergedUser));
      navigation.navigate("profile");
    } catch (err: any) {
      console.log("Password Login Error:", err.response?.data || err.message);
      throw err;
    }
  },

  // Đăng xuất
  logout: async (dispatch: any, navigation: any) => {
    try {
      const refreshToken = store.getState().auth.refreshToken;
      if (refreshToken) {
        await authApi.post("/logout", { refresh_token: refreshToken });
      }

      // 👇 Thêm bước này: xóa cache Google account
      try {
        await GoogleSignin.signOut();
        // hoặc: await GoogleSignin.revokeAccess();
      } catch (err) {
        console.log("Google SignOut Error:", err);
      }

      dispatch(clearAuth());
      dispatch(clearUser());
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

      navigation.reset({
        index: 0,
        routes: [{ name: "signin" }],
      });
    } catch (err: any) {
      console.log("Logout error:", err.response?.data || err.message);
      throw err;
    }
  },

  // Đăng ký (Sign Up)
  register: async (
    payload: {
      phone: string;
      email: string;
      password: string;
      fullname: string;
      DOB: string;
      gender: "MALE" | "FEMALE" | "OTHER";
      height: string;
      weight: string;
    },
    dispatch: any,
    navigation: any
  ) => {
    try {
      // 1. Gọi auth-service để đăng ký
      const res = await authApi.post("/register", {
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
      });
      const { access_token, refresh_token } = res.data;

      // 2. Lưu auth vào Redux
      dispatch(setAuth({ accessToken: access_token, refreshToken: refresh_token }));

      // 3. Gọi user-service để tạo profile
      await userApi.post(
        "/create",
        {
          fullname: payload.fullname,
          DOB: payload.DOB,
          gender: payload.gender,
          height: payload.height,
          weight: payload.weight,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      // 4. Lấy lại thông tin user + auth
      const [profileRes, authRes] = await Promise.all([
        userApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
        authApi.get("/me", { headers: { Authorization: `Bearer ${access_token}` } }),
      ]);

      const mergedUser = {
        ...profileRes.data,
        email: authRes.data.email,
        phone: authRes.data.phone,
        role: authRes.data.role,
      };

      dispatch(setUser(mergedUser));

      // 5. Navigate
      navigation.navigate("home");
    } catch (err: any) {
      console.log("Register Error:", err.response?.data || err.message);
      throw err;
    }
  },


  // change password by phone
  resetPasswordByPhone: async (phone: string, newPassword: string) => {
    try {
      const res = await authApi.post("/change-password", {
        phone,
        newPassword,
      });
      return res.data; // { message: "Password has been reset successfully" }
    } catch (err: any) {
      console.log("Reset Password Error:", err.response?.data || err.message);
      throw err;
    }
  },


};

export const otpService = {
  // Gửi OTP
  sendOtp: async (
    phone: string
  ): Promise<FirebaseAuthTypes.ConfirmationResult> => {
    try {
      const auth = getAuth();
      const confirmation = await signInWithPhoneNumber(auth, phone);

      // Lưu tạm vào AsyncStorage (serialize bằng toJSON)
      await AsyncStorage.setItem("otpSession", JSON.stringify(phone));
      return confirmation;
    } catch (err: any) {
      console.log("Send OTP Error:", err.message);
      throw err;
    }
  },

  // Xác minh OTP
  verifyOtp: async (
    confirmation: FirebaseAuthTypes.ConfirmationResult,
    code: string,
    resendCallback?: (phone: string) => Promise<FirebaseAuthTypes.ConfirmationResult>
  ): Promise<FirebaseAuthTypes.User | null> => {
    try {
      const result = await confirmation.confirm(code);
      return result?.user || null;
    } catch (err: any) {
      console.log("Verify OTP Error:", err.message);

      if (err.code === "auth/session-expired") {
        console.log("⚠️ Session OTP hết hạn, gửi lại...");
        const phone = await AsyncStorage.getItem("otpSession");
        if (phone && resendCallback) {
          await resendCallback(phone);
        }
      }

      throw err;
    }
  },
};