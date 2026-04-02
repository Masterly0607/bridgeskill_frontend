import api from "@/lib/axios";

export const getJobsApi = (params = {}) => api.get("/api/jobs", { params });

export const getJobByIdApi = (id) => api.get(`/api/jobs/${id}`);

export const createJobApi = (payload) => api.post("/api/jobs", payload);

export const updateJobApi = (id, payload) => api.put(`/api/jobs/${id}`, payload);

export const closeJobApi = (job) =>
  api.put(`/api/jobs/${job.id}`, {
    title: job.title,
    description: job.description,
    category: job.category,
    location: job.location,
    salary: Number(job.salary),
    status: "CLOSED",
  });

export const reopenJobApi = (job) =>
  api.put(`/api/jobs/${job.id}`, {
    title: job.title,
    description: job.description,
    category: job.category,
    location: job.location,
    salary: Number(job.salary),
    status: "OPEN",
  });