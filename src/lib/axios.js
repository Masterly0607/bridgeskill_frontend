import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
// Why this file is important

// This gives you:

// one backend base URL
// one place to attach token
// clean service files later
// easier maintenance

// So instead of doing this in every page:

// axios.get("http://localhost:8080/api/jobs", ...)

// you will do:

// api.get("/api/jobs")

// That is much cleaner.