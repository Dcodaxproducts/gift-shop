import { dashboardNavGroups } from "@/config/dashboard";

export type PermissionModule = {
  key: string;
  title: string;
  icon: string;
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

export const permissionModules: PermissionModule[] = dashboardNavGroups.flatMap(
  (group) =>
    group.items
      .filter((item) => item.href !== "/")
      .map((item) => ({
        key: toCamelCaseKey(item.href),
        title: item.title,
        icon: item.icon,
      })),
);
