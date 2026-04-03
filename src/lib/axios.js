import axios from "axios";
import { STORAGE_KEYS } from "@/lib/constants";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      const requestUrl = error?.config?.url || "";
      const currentPath = window.location.pathname;

      const isAuthMeRequest = requestUrl.includes("/api/auth/me");
      const isAuthPage =
        currentPath === "/login" || currentPath === "/register";

      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      if (!isAuthMeRequest && !isAuthPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;