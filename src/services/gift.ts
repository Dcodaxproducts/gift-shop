import { api } from "@/lib/axios";
import type {
  CreateGiftPayload,
  GetGiftsParams,
  Gift,
  UpdateGiftPayload,
  UpdateGiftStatusPayload,
} from "@/types/gifts";

const GIFTS_ENDPOINT = "/gifts";

export const getGifts = async (params: GetGiftsParams = {}) => {
  const { data } = await api.get(GIFTS_ENDPOINT, { params });
  return (data.data ?? []) as Gift[];
};

export const getGift = async (id: string) => {
  const { data } = await api.get(`${GIFTS_ENDPOINT}/${id}`);
  return data.data as Gift;
};

export const createGift = async (payload: CreateGiftPayload) => {
  const { data } = await api.post(GIFTS_ENDPOINT, payload);
  return data.data as Gift;
};

export const updateGift = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftPayload;
}) => {
  const { data } = await api.patch(`${GIFTS_ENDPOINT}/${id}`, payload);
  return data.data as Gift;
};

export const updateGiftStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftStatusPayload;
}) => {
  const { data } = await api.patch(`${GIFTS_ENDPOINT}/${id}/status`, payload);
  return data.data as Gift;
};

export const deleteGift = async (id: string) => {
  const { data } = await api.delete(`${GIFTS_ENDPOINT}/${id}`);
  return data.data as Gift;
};
