import useUserStore from "@/store/user";
import axios from "axios";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useUserStore();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
