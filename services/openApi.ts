import axios from "axios";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const openApi = axios.create({
  baseURL: apiBaseUrl,
});
