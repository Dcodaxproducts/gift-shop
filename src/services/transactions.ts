import { api } from "@/lib/axios";
import type {
  GetTransactionsParams,
  Transaction,
  TransactionsResponse,
  TransactionStats,
} from "@/types/transactions";

const TRANSACTIONS_ENDPOINT = "/admin/transactions";

export const getTransactionStats = async () => {
  const { data } = await api.get(`${TRANSACTIONS_ENDPOINT}/stats`);
  return data.data as TransactionStats;
};

export const exportTransactions = async () => {
  const { data } = await api.get(`${TRANSACTIONS_ENDPOINT}/export`, { responseType: "blob" });
  return data;
};

export const getTransactions = async (params: GetTransactionsParams = {}) => {
  const { data } = await api.get(TRANSACTIONS_ENDPOINT, { params });

  return {
    data: (data.data ?? []) as Transaction[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as TransactionsResponse["meta"],
  };
};

export const getTransaction = async (id: string) => {
  const { data } = await api.get(`${TRANSACTIONS_ENDPOINT}/${id}`);
  return data.data as Transaction;
};
