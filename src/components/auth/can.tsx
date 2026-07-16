"use client";

import type { ReactNode } from "react";
import { useCan } from "@/hooks/useCan";
import type { PermissionAction } from "@/types/staff-roles";

type CanProps = {
  /** Permission module key, e.g. "users" (matches dashboard permissionKey). */
  module: string;
  action: PermissionAction;
  children: ReactNode;
  /** Rendered when the user lacks the permission. Defaults to nothing. */
  fallback?: ReactNode;
};

/**
 * Renders `children` only if the current admin has `action` on `module`.
 *
 * <Can module="users" action="delete">
 *   <DeleteButton />
 * </Can>
 */
export function Can({ module, action, children, fallback = null }: CanProps) {
  const { can } = useCan();
  return <>{can(module, action) ? children : fallback}</>;
}
