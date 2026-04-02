import api from "@/lib/axios";

export const applyToJobApi = (jobId, payload) =>
  api.post(`/api/applications/jobs/${jobId}`, payload);

export const getMyApplicationsApi = () => api.get("/api/applications/me");

export const getMyApplicationByIdApi = (id) =>
  api.get(`/api/applications/me/${id}`);