import { dashboardNavGroups } from "@/config/dashboard";
import { PERMISSION_ACTIONS, type PermissionAction } from "@/types/staff-roles";

export type PermissionModule = {
  key: string;
  title: string;
  icon: string;
  actions: PermissionAction[];
};

const toCamelCaseKey = (href: string): string => {
  const cleaned = href.replace(/^\//, "").replace(/\/$/, "");
  if (!cleaned) return "dashboard";
  return cleaned
    .split(/[-/]/)
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join("");
};

// Modules that only expose a subset of the standard actions.
const RESTRICTED_ACTIONS: Record<string, PermissionAction[]> = {
  dashboard: ["read"],
};

export const permissionModules: PermissionModule[] = dashboardNavGroups.flatMap(
  (group) =>
    group.items
      // Super-admin-only pages aren't assignable to staff, so skip them here.
      .filter((item) => !item.superAdminOnly)
      .map((item) => {
        // permissionKey is the backend-facing key; href is only a fallback.
        const key = item.permissionKey ?? toCamelCaseKey(item.href);
        return {
          key,
          title: item.title,
          icon: item.icon,
          actions: RESTRICTED_ACTIONS[key] ?? PERMISSION_ACTIONS,
        };
      }),
);
