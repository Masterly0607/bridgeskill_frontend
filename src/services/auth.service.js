import api from "@/lib/axios";

export const loginApi = (payload) => api.post("/api/auth/login", payload);

export const registerApi = (payload) => api.post("/api/auth/register", payload);

export const meApi = () => api.get("/api/auth/me");

// Why:

// keep auth API calls in one file
// pages don’t directly manage endpoint strings
// standard separation of concerns