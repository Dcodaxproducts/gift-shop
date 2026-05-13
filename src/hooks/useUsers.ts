"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserStatus,
  suspendUser,
  unsuspendUser,
  resetUserPassword,
  exportUsers,
} from "@/services/users";
import type { GetUsersParams, GetUsersResponse, UpdateUserPayload, UpdateUserStatusPayload, SuspendUserPayload, ResetUserPasswordPayload, UserDetail } from "@/types/users";

const getErrorMessage = (error: any, fallback: string) => {
  return error?.response?.data?.message || error?.response?.data?.error?.message || error?.message || fallback;
};

export const useUsers = (params: GetUsersParams = {}) => {
  return useQuery<GetUsersResponse>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useUser = (id: string) => {
  return useQuery<UserDetail>({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) => updateUser({ id, payload }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", variables.id], data);
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update user. Please try again."));
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete user. Please try again."));
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserStatusPayload }) => updateUserStatus({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User status updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update user status. Please try again."));
    },
  });
};

export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload?: SuspendUserPayload }) => suspendUser({ id, payload }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast.success("User suspended successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to suspend user. Please try again."));
    },
  });
};

export const useUnsuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsuspendUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast.success("User unsuspended successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to unsuspend user. Please try again."));
    },
  });
};

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload?: ResetUserPasswordPayload }) => resetUserPassword({ id, payload }),
    onSuccess: () => {
      toast.success("Password reset instructions sent successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reset password. Please try again."));
    },
  });
};

export const useExportUsers = () => {
  return useMutation({
    mutationFn: exportUsers,
    onSuccess: (data) => {
      // Create a download link for the CSV file
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Users exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export users. Please try again."));
    },
  });
};
