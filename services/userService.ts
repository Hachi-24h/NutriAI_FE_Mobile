import axios from "axios";
import { IP_USER } from "../config/Ipconfig";

const userApi = axios.create({
  baseURL: IP_USER,
  timeout: 10000,
});

export const userService = {
  // Lấy thông tin user hiện tại
  getMe: async () => {
    const res = await userApi.get("/me");
    return res.data;
  },

  // Cập nhật thông tin người dùng
  updateProfile: async (payload: {
    fullname?: string;
    DOB?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    height?: string;
    weight?: string;
    BMI?: string;
    activityLevel?: number;
  }) => {
    const res = await userApi.put("/update", payload);
    return res.data;
  },

  // Đổi avatar
  updateAvatar: async (avatarUrl: string) => {
    const res = await userApi.put("/avatar", { avatar: avatarUrl });
    return res.data;
  },
};
