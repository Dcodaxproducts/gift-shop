import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  CreateGiftPayload,
  GetGiftsParams,
  GetGiftsResponse,
  Gift,
  UpdateGiftPayload,
  UpdateGiftStatusPayload,
} from "@/types/gifts";

const GIFTS_ENDPOINT = "/gifts";

const createPagination = (meta?: ApiListResponse<Gift>["meta"]) => {
  const page = meta?.page ?? 1;
  const limit = meta?.limit ?? 10;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

export const getGifts = async (params: GetGiftsParams = {}): Promise<GetGiftsResponse> => {
  const { data } = await api.get(GIFTS_ENDPOINT, { params });
  const body = data as ApiListResponse<Gift>;

  return {
    gifts: body.data ?? [],
    pagination: createPagination(body.meta),
  };
};

export const getGift = async (id: string): Promise<Gift> => {
  const { data } = await api.get(`${GIFTS_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<Gift>;

  return body.data as Gift;
};

export const createGift = async (payload: CreateGiftPayload): Promise<Gift> => {
  const { data } = await api.post(GIFTS_ENDPOINT, payload);
  const body = data as ApiDataResponse<Gift>;

  return body.data as Gift;
};

export const updateGift = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftPayload;
}): Promise<Gift> => {
  const { data } = await api.patch(`${GIFTS_ENDPOINT}/${id}`, payload);
  const body = data as ApiDataResponse<Gift>;

  return body.data as Gift;
};

export const updateGiftStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftStatusPayload;
}): Promise<Gift> => {
  const { data } = await api.patch(`${GIFTS_ENDPOINT}/${id}/status`, payload);
  const body = data as ApiDataResponse<Gift>;

  return body.data as Gift;
};

export const deleteGift = async (id: string): Promise<Gift> => {
  const { data } = await api.delete(`${GIFTS_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<Gift>;

  return body.data as Gift;
};
