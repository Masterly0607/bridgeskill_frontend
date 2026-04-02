import api from "@/lib/axios";

export const applyToJobApi = (jobId, payload) =>
  api.post(`/api/applications/jobs/${jobId}`, payload);

export const getMyApplicationsApi = () => api.get("/api/applications/me");

export const getMyApplicationByIdApi = (id) =>
  api.get(`/api/applications/me/${id}`);

export const getApplicationsForMyJobApi = (jobId) =>
  api.get(`/api/applications/client/jobs/${jobId}`);

export const getApplicationForMyJobApi = (id) =>
  api.get(`/api/applications/client/${id}`);

export const updateApplicationStatusApi = (id, payload) =>
  api.put(`/api/applications/client/${id}/status`, payload);