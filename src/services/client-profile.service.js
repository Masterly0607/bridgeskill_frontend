import api from "@/lib/axios";

export const getMyClientProfileApi = () => api.get("/api/client-profile/me");

export const createClientProfileApi = (payload) =>
  api.post("/api/client-profile", payload);

export const updateClientProfileApi = (payload) =>
  api.put("/api/client-profile", payload);