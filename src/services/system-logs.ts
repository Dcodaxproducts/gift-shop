import { api } from "@/lib/axios";
import type {
  SystemHealthRange,
  SystemHealthStats,
  SystemLatencyGraph,
} from "@/types/system-logs";

const SYSTEM_HEALTH_ENDPOINT = "/admin/system-health";

export const getSystemHealthStats = async () => {
  const { data } = await api.get(`${SYSTEM_HEALTH_ENDPOINT}/stats`);
  return data.data as SystemHealthStats;
};

export const getSystemLatencyGraph = async (range: SystemHealthRange = "DAILY") => {
  const { data } = await api.get(`${SYSTEM_HEALTH_ENDPOINT}/latency-graph`, {
    params: { range },
  });

  return data.data as SystemLatencyGraph;
};
