"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createAdminRole,
  deleteAdminRole,
  getAdminRole,
  getAdminRoles,
  getPermissionsCatalog,
  updateAdminRole,
  updateAdminRolePermissions,
} from "@/services/admin-roles";
import type {
  AdminRole,
  AdminRoleDetails,
  CreateAdminRolePayload,
  UpdateAdminRolePayload,
  UpdateAdminRolePermissionsPayload,
} from "@/types/admin-roles";

const adminRolesQueryKey = ["admin-roles"] as const;
const permissionsCatalogQueryKey = ["permissions-catalog"] as const;

export const useAdminRoles = () => {
  return useQuery<AdminRole[]>({
    queryKey: adminRolesQueryKey,
    queryFn: getAdminRoles,
  });
};

export const useAdminRole = (id: string | undefined) => {
  return useQuery<AdminRoleDetails>({
    queryKey: [...adminRolesQueryKey, id],
    queryFn: () => getAdminRole(id as string),
    enabled: !!id,
  });
};

export const usePermissionsCatalog = () => {
  return useQuery<Record<string, string[]>>({
    queryKey: permissionsCatalogQueryKey,
    queryFn: getPermissionsCatalog,
  });
};

export const useCreateAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminRolePayload) => createAdminRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminRolesQueryKey });
      toast.success("Role created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create role. Please try again."));
    },
  });
};

export const useUpdateAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdminRolePayload }) =>
      updateAdminRole({ id, payload }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminRolesQueryKey });
      queryClient.invalidateQueries({
        queryKey: [...adminRolesQueryKey, variables.id],
      });
      toast.success("Role updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update role. Please try again."));
    },
  });
};

export const useUpdateAdminRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAdminRolePermissionsPayload;
    }) => updateAdminRolePermissions({ id, payload }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminRolesQueryKey });
      queryClient.setQueryData([...adminRolesQueryKey, variables.id], data);
      toast.success("Permissions updated successfully");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to update permissions. Please try again."),
      );
    },
  });
};

export const useDeleteAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminRolesQueryKey });
      toast.success("Role deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete role. Please try again."));
    },
  });
};
