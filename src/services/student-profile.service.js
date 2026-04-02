import api from "@/lib/axios";

export const getMyStudentProfileApi = () => api.get("/api/student-profile/me");

export const createStudentProfileApi = (payload) =>
  api.post("/api/student-profile", payload);

export const updateStudentProfileApi = (payload) =>
  api.put("/api/student-profile", payload);