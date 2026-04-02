import api from "@/lib/axios";

export const getJobsApi = (params = {}) => api.get("/api/jobs", { params });

export const getJobByIdApi = (id) => api.get(`/api/jobs/${id}`);