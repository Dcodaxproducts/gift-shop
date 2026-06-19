"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getRefundPolicySettings,
  updateRefundPolicySettings,
} from "@/services/refund";

const refundPolicySettingsQueryKey = ["refund-policy-settings"] as const;

export const useRefundPolicySettings = () => {
  return useQuery({
    queryKey: refundPolicySettingsQueryKey,
    queryFn: getRefundPolicySettings,
  });
};

export const useUpdateRefundPolicySettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRefundPolicySettings,
    onSuccess: (data) => {
      queryClient.setQueryData(refundPolicySettingsQueryKey, data);
      queryClient.invalidateQueries({ queryKey: refundPolicySettingsQueryKey });
      toast.success("Refund policy settings updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update refund policy settings. Please try again."));
    },
  });
};
