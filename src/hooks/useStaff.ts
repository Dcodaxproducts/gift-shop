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
  updateStaffActiveStatus,
  updateStaffPassword,
} from "@/services/staff";
import type {
  ApiPaginationMeta,
  GetStaffParams,
} from "@/types/staff";

const staffQueryKey = ["staff"] as const;
const toPagination = (meta?: ApiPaginationMeta) => {
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

export const useStaffList = (params: GetStaffParams = {}) => {
  return useQuery({
    queryKey: [...staffQueryKey, params],
    queryFn: () => getStaff(params),
    select: (body) => ({
      staff: body.data ?? [],
      pagination: toPagination(body.meta),
    }),
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

export const useUpdateStaffActiveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaffActiveStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: staffQueryKey });
      queryClient.setQueryData([...staffQueryKey, variables.id], data);
      toast.success("Staff status updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update staff status. Please try again."));
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
