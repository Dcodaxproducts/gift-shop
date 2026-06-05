import { api } from "@/lib/axios";
import type { DashboardData } from "@/types/dashboard";

export const getDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data.data as DashboardData;
};
