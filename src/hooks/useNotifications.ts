"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getNotifications,
  getNotificationSummary,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notifications";
import type { GetNotificationsParams } from "@/services/notifications";

const notificationsQueryKey = ["notifications"] as const;

export const useNotifications = (params: GetNotificationsParams = {}) => {
  return useQuery({
    queryKey: [...notificationsQueryKey, params],
    queryFn: () => getNotifications(params),
  });
};

export const useNotificationSummary = () => {
  return useQuery({
    queryKey: [...notificationsQueryKey, "summary"],
    queryFn: getNotificationSummary,
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark notifications as read. Please try again."));
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark notification as read. Please try again."));
    },
  });
};
