import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import { updateAccessToken, clearAuth } from "../redux/slice/authSlice";
import { clearUser } from "../redux/slice/userSlice";
import { IP_AUTH, IP_USER } from "../config/Ipconfig";

// 👉 Tạo instance cho từng service
const authApi = axios.create({
  baseURL: IP_AUTH,
  timeout: 10000,
});

const userApi = axios.create({
  baseURL: IP_USER,
  timeout: 10000,
});

// 👉 Middleware gắn token vào header
const attachToken = async (config: any) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authApi.interceptors.request.use(attachToken);
userApi.interceptors.request.use(attachToken);

// 👉 Hàm attach refresh logic cho nhiều instance
const attachResponseInterceptor = (instance: any) => {
  instance.interceptors.response.use(
    (res: any) => res,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log("🔴 Access token expired, attempting refresh...");
        originalRequest._retry = true;

        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          try {
            console.log("📡 Calling /auth/refresh with refresh token...");
            const res = await axios.post(`${IP_AUTH}/refresh`, {
              refresh_token: refreshToken,
            });

            const { access_token } = res.data;

            console.log("🟢 New access token received:", access_token.slice(0, 20), "...");

            store.dispatch(updateAccessToken(access_token));
            await AsyncStorage.setItem("accessToken", access_token);

            // Retry request với token mới
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            console.log("🔄 Retrying original request...");
            return instance(originalRequest);
          } catch (err) {
            console.log("❌ Refresh token failed, logging out...");
            store.dispatch(clearAuth());
            store.dispatch(clearUser());
            await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

// 👉 Gắn refresh interceptor cho cả authApi và userApi
attachResponseInterceptor(authApi);
attachResponseInterceptor(userApi);

// 👉 Export
export { authApi, userApi };
