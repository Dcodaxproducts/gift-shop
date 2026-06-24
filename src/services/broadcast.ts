import { api } from "@/lib/axios";
import type { Broadcast, CreateBroadcastPayload } from "@/types/broadcast";

const BROADCASTS_ENDPOINT = "/broadcasts";

export const createBroadcast = async (payload: CreateBroadcastPayload) => {
  const { data } = await api.post(BROADCASTS_ENDPOINT, payload);
  return data.data as Broadcast;
};
