"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserStatus,
  resetUserPassword,
  exportUsers,
  getUserActivity,
} from "@/services/users";
import type { GetUserActivityParams, GetUsersParams } from "@/types/users";

export const useUsers = (params: GetUsersParams = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export const useUserActivity = (id: string, params?: GetUserActivityParams) => {
  return useQuery({
    queryKey: ["user-activity", id, params],
    queryFn: () => getUserActivity({ id, params }),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
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
    mutationFn: deleteUser,
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
    mutationFn: updateUserStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.setQueryData(["user", variables.id], data);
      toast.success("User status updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update user status. Please try again."));
    },
  });
};

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: resetUserPassword,
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
