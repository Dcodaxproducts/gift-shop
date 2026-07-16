"use client";

import { useCurrentUser } from "@/hooks/useAuth";
import type { PermissionAction } from "@/types/staff-roles";

/**
 * Reads the logged-in admin's permissions and answers "can this user
 * perform <action> on <moduleKey>?".
 *
 * moduleKey is the permissionKey used in the dashboard config (e.g. "users").
 * When no permission map is present (e.g. super admin), access is allowed —
 * this matches the sidebar's existing behaviour.
 */
export function useCan() {
  const { data } = useCurrentUser();
  const permissions =
    (data?.admin?.permissions as Record<string, string[]> | undefined) ?? null;

  const can = (moduleKey: string, action: PermissionAction) => {
    if (!permissions) return true;
    return permissions[moduleKey]?.includes(action) ?? false;
  };

  return { can, permissions };
}
