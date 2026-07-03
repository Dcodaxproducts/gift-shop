"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createStaff,
  deleteStaff,
  getStaff,
  getStaffMember,
  updateStaff,
  updateStaffPassword,
} from "@/services/staff";
import type { GetStaffParams } from "@/types/staff";

const staffQueryKey = ["staff"] as const;

export const useStaffList = (params: GetStaffParams = {}) => {
  return useQuery({
    queryKey: [...staffQueryKey, params],
    queryFn: () => getStaff(params),
  });
};

export const useStaffMember = (id: string | undefined) => {
  return useQuery({
    queryKey: [...staffQueryKey, id],
    queryFn: () => getStaffMember(id as string),
    enabled: !!id,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKey });
      toast.success("Staff member created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create staff member. Please try again."));
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaff,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: staffQueryKey });
      queryClient.setQueryData([...staffQueryKey, variables.id], data);
      toast.success("Staff member updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update staff member. Please try again."));
    },
  });
};

export const useUpdateStaffPassword = () => {
  return useMutation({
    mutationFn: updateStaffPassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update password. Please try again."));
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKey });
      toast.success("Staff member deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete staff member. Please try again."));
    },
  });
};
