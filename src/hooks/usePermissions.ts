"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createStaffRole,
  deleteStaffRole,
  getStaffRole,
  getStaffRoles,
  updateStaffRole,
  updateStaffRolePermissions,
} from "@/services/staff-roles";

const StaffRolesQueryKey = ["Staff-roles"] as const;

export const useStaffRoles = () => {
  return useQuery({
    queryKey: StaffRolesQueryKey,
    queryFn: getStaffRoles,
  });
};

export const useStaffRole = (id: string | undefined) => {
  return useQuery({
    queryKey: [...StaffRolesQueryKey, id],
    queryFn: () => getStaffRole(id as string),
    enabled: !!id,
  });
};

export const useCreateStaffRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaffRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: StaffRolesQueryKey });
      toast.success("Role created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create role. Please try again."));
    },
  });
};

export const useUpdateStaffRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaffRole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: StaffRolesQueryKey });
      queryClient.invalidateQueries({
        queryKey: [...StaffRolesQueryKey, variables.id],
      });
      toast.success("Role updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update role. Please try again."));
    },
  });
};

export const useUpdateStaffRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaffRolePermissions,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: StaffRolesQueryKey });
      queryClient.setQueryData([...StaffRolesQueryKey, variables.id], data);
      toast.success("Permissions updated successfully");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to update permissions. Please try again."),
      );
    },
  });
};

export const useDeleteStaffRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStaffRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: StaffRolesQueryKey });
      toast.success("Role deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete role. Please try again."));
    },
  });
};
