import api from "@/lib/axios";

export const getAdminDashboardSummaryApi = () =>
  api.get("/api/admin/monitoring/summary");

export const getAllApplicationsForAdminApi = () =>
  api.get("/api/applications/admin/all");