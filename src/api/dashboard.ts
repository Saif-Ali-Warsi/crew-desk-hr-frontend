import api from "./axios";
import type {
  DashboardResponse,
  SuperAdminDashboardResponse,
} from "../types/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>("/dashboard");

  return response.data;
};

export const getSuperAdminDashboard =
  async (): Promise<SuperAdminDashboardResponse> => {
    const response = await api.get<SuperAdminDashboardResponse>(
      "/dashboard/super-admin"
    );

    return response.data;
  };