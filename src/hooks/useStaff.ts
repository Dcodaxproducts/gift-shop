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
  CreateStaffPayload,
  GetStaffParams,
  GetStaffResponse,
  StaffMember,
  UpdateStaffActiveStatusPayload,
  UpdateStaffPasswordPayload,
  UpdateStaffPayload,
} from "@/types/staff";

const staffQueryKey = ["staff"] as const;

export const useStaffList = (params: GetStaffParams = {}) => {
  return useQuery<GetStaffResponse>({
    queryKey: [...staffQueryKey, params],
    queryFn: () => getStaff(params),
  });
};

export const useStaffMember = (id: string | undefined) => {
  return useQuery<StaffMember>({
    queryKey: [...staffQueryKey, id],
    queryFn: () => getStaffMember(id as string),
    enabled: !!id,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStaffPayload) => createStaff(payload),
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
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStaffPayload }) =>
      updateStaff({ id, payload }),
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
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStaffActiveStatusPayload;
    }) => updateStaffActiveStatus({ id, payload }),
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
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStaffPasswordPayload;
    }) => updateStaffPassword({ id, payload }),
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
    mutationFn: (id: string) => deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKey });
      toast.success("Staff member deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete staff member. Please try again."));
    },
  });
};
