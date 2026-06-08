"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  editSubscriptionPlan,
  getSubscriptionPlan,
  getSubscriptionPlans,
} from "@/services/subscription-plans";
import type { GetSubscriptionPlansParams } from "@/types/subscription-plans";

const subscriptionPlansQueryKey = ["subscription-plans"] as const;

export const useSubscriptionPlans = (
  params: GetSubscriptionPlansParams = {},
) => {
  return useQuery({
    queryKey: [...subscriptionPlansQueryKey, params],
    queryFn: () => getSubscriptionPlans(params),
  });
};

export const useSubscriptionPlan = (id: string) => {
  return useQuery({
    queryKey: [...subscriptionPlansQueryKey, id],
    queryFn: () => getSubscriptionPlan(id),
    enabled: !!id,
  });
};

export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionPlansQueryKey });
      toast.success("Subscription plan created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create subscription plan. Please try again."));
    },
  });
};

export const useEditSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editSubscriptionPlan,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: subscriptionPlansQueryKey });
      queryClient.setQueryData([...subscriptionPlansQueryKey, variables.id], data);
      toast.success("Subscription plan updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update subscription plan. Please try again."));
    },
  });
};

export const useDeleteSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscriptionPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionPlansQueryKey });
      toast.success("Subscription plan deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete subscription plan. Please try again."));
    },
  });
};
