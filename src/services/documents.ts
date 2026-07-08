import { api } from "@/lib/axios";

const DOCUMENTS_ENDPOINT = "/admin/documents";

export type Document = {
  id: string;
  name: string;
  isRequired: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDocumentPayload = {
  name: string;
  isRequired: boolean;
};

export type UpdateDocumentPayload = {
  name?: string;
  isRequired?: boolean;
  isActive?: boolean;
};

export type GetDocumentsParams = {
  page?: number;
  limit?: number;
  isActive?: boolean;
};

type DocumentsResponse = {
  data: Document[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getDocuments = async (params: GetDocumentsParams = {}) => {
  const { data } = await api.get(DOCUMENTS_ENDPOINT, { params });

  return {
    data: (data.data ?? []) as Document[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as DocumentsResponse["meta"],
  };
};

export const createDocument = async (payload: CreateDocumentPayload) => {
  const { data } = await api.post(DOCUMENTS_ENDPOINT, payload);
  return data.data as Document;
};

export const updateDocument = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateDocumentPayload;
}) => {
  const { data } = await api.patch(`${DOCUMENTS_ENDPOINT}/${id}`, payload);
  return data.data as Document;
};

export const deleteDocument = async (id: string) => {
  const { data } = await api.delete(`${DOCUMENTS_ENDPOINT}/${id}`);
  return data.data as Document;
};
