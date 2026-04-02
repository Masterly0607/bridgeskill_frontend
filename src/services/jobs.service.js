import api from "@/lib/axios";

export const getJobsApi = (params = {}) => api.get("/api/jobs", { params });

export const getJobByIdApi = (id) => api.get(`/api/jobs/${id}`);

export const createJobApi = (payload) => api.post("/api/jobs", payload);

export const updateJobApi = (id, payload) => api.put(`/api/jobs/${id}`, payload);

export const deleteJobApi = (id) => api.delete(`/api/jobs/${id}`);