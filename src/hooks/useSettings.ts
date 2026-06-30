"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getSystemSettings,
  updateSystemSettings,
} from "@/services/settings";

const systemSettingsQueryKey = ["system-settings"] as const;

export const useSettings = () => {
  return useQuery({
    queryKey: systemSettingsQueryKey,
    queryFn: getSystemSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSystemSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(systemSettingsQueryKey, data);
      queryClient.invalidateQueries({ queryKey: systemSettingsQueryKey });
      toast.success("System settings updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update system settings. Please try again."));
    },
  });
};
