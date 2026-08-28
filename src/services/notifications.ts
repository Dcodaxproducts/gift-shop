import { api } from "@/lib/axios";

const NOTIFICATIONS_ENDPOINT = "/notifications";

export type Notification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationSummary = {
  total: number;
  unread: number;
};

export type GetNotificationsParams = {
  page?: number;
  limit?: number;
};

type NotificationsResponse = {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getNotifications = async (params: GetNotificationsParams = {}) => {
  const { data } = await api.get(NOTIFICATIONS_ENDPOINT, { params });

  return {
    data: (data.data ?? []) as Notification[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as NotificationsResponse["meta"],
  };
};

export const getNotificationSummary = async () => {
  const { data } = await api.get(`${NOTIFICATIONS_ENDPOINT}/summary`);
  return data.data as NotificationSummary;
};

export const markAllNotificationsRead = async () => {
  const { data } = await api.patch(`${NOTIFICATIONS_ENDPOINT}/read-all`);
  return data.data;
};

export const markNotificationRead = async (id: string) => {
  const { data } = await api.patch(`${NOTIFICATIONS_ENDPOINT}/${id}/read`);
  return data.data;
};
