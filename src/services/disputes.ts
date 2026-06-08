import { api } from "@/lib/axios";
import type {
  Dispute,
  DisputesResponse,
  DisputeStats,
  GetDisputesParams,
} from "@/types/disputes";

const DISPUTES_ENDPOINT = "/admin/disputes";

export const getDisputeStats = async () => {
  const { data } = await api.get(`${DISPUTES_ENDPOINT}/stats`);
  return data.data as DisputeStats;
};

export const exportDisputes = async () => {
  const { data } = await api.get(`${DISPUTES_ENDPOINT}/export`, { responseType: "blob" });
  return data;
};

export const getDisputes = async (params: GetDisputesParams = {}) => {
  const { data } = await api.get(DISPUTES_ENDPOINT, { params });

  return {
    data: (data.data ?? []) as Dispute[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as DisputesResponse["meta"],
  };
};

export const getDispute = async (id: string) => {
  const { data } = await api.get(`${DISPUTES_ENDPOINT}/${id}`);
  return data.data as Dispute;
};
