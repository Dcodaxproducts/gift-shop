import { permissionModules } from "@/config/permission-modules";
import {
  PERMISSION_ACTIONS,
  type PermissionAction,
  type RolePermissions,
} from "@/types/staff-roles";

function humanizeModuleKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

function formatActions(actions: string[]) {
  return actions
    .map((action) => action.charAt(0).toUpperCase() + action.slice(1))
    .join(", ");
}

export function buildRolePermissionSummary(permissions?: RolePermissions) {
  if (!permissions) return [];

  const knownKeys = new Set(permissionModules.map((module) => module.key));
  const entries: Array<{ label: string; allowed: boolean }> = [];

  for (const permissionModule of permissionModules) {
    const actions = permissions[permissionModule.key] ?? [];
    if (actions.length > 0) {
      entries.push({
        label: `${permissionModule.title}: ${formatActions(actions)}`,
        allowed: true,
      });
    }
  }

  for (const [key, actions] of Object.entries(permissions)) {
    if (knownKeys.has(key) || actions.length === 0) continue;
    entries.push({
      label: `${humanizeModuleKey(key)}: ${formatActions(actions)}`,
      allowed: true,
    });
  }

  return entries;
}

export function arePermissionsEqual(
  a: RolePermissions,
  b: RolePermissions,
): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const left = [...(a[key] ?? [])].sort();
    const right = [...(b[key] ?? [])].sort();
    if (left.length !== right.length) return false;
    if (left.some((value, index) => value !== right[index])) return false;
  }
  return true;
}

export function buildDefaultPermissions(): RolePermissions {
  const state: RolePermissions = {};
  permissionModules.forEach((permissionModule) => {
    state[permissionModule.key] = [...permissionModule.actions];
  });
  return state;
}

export function normalizeRolePermissions(
  permissions?: RolePermissions,
): RolePermissions {
  const filtered: RolePermissions = {};
  Object.entries(permissions ?? {}).forEach(([key, actions]) => {
    filtered[key] = PERMISSION_ACTIONS.filter((action) =>
      actions.includes(action),
    );
  });
  return filtered;
}

export function sanitizePermissionsPayload(
  permissions: RolePermissions,
): RolePermissions {
  const payload: RolePermissions = {};
  Object.entries(permissions).forEach(([key, actions]) => {
    if (actions.length > 0) {
      payload[key] = PERMISSION_ACTIONS.filter((action) =>
        actions.includes(action),
      );
    }
  });
  return payload;
}

export function togglePermissionAction(
  permissions: RolePermissions,
  moduleKey: string,
  action: PermissionAction,
): RolePermissions {
  const existing = permissions[moduleKey] ?? [];
  const next = existing.includes(action)
    ? existing.filter((entry) => entry !== action)
    : [...existing, action];
  return { ...permissions, [moduleKey]: next };
}
