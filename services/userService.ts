import axios from "axios";
import { IP_USER } from "../config/Ipconfig";
import { store } from "../redux/store";

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
  updateProfile: async (
    payload: {
      fullname?: string;
      DOB?: string;
      gender?: "MALE" | "FEMALE" | "OTHER";
    }) => {
    const token = store.getState().auth.accessToken; // 👈 lấy token trong redux
    const res = await userApi.put("/update-info", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  updateHealth: async (payload: { height: string; weight: string }) => {
    const token = store.getState().auth.accessToken;
    const res = await userApi.put("/update-health", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  // Đổi avatar
  updateAvatar: async (file: any) => {
    const token = store.getState().auth.accessToken;
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.type || "image/jpeg",
      name: file.fileName || "avatar.jpg",
    } as any);

    const res = await userApi.patch("/update-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { message, user }
  },
};
