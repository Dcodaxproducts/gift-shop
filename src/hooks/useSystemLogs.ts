"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getSystemHealthStats,
  getSystemLatencyGraph,
} from "@/services/system-logs";
import type { SystemHealthRange } from "@/types/system-logs";

export const useSystemLogs = () => {
  return useQuery({
    queryKey: ["system-logs", "stats"],
    queryFn: getSystemHealthStats,
  });
};

export const useSystemLatencyGraph = (range: SystemHealthRange = "DAILY") => {
  return useQuery({
    queryKey: ["system-logs", "latency-graph", range],
    queryFn: () => getSystemLatencyGraph(range),
  });
};
