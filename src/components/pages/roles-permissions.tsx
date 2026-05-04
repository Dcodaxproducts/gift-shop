"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const roleOptions = [
  { id: "super-admin", name: "Super Admin", description: "Full access" },
  { id: "admin", name: "Admin", description: "Limited administrative access" },
  { id: "content-manager", name: "Content Manager", description: "Content and media workflows" },
  { id: "support-manager", name: "Support Manager", description: "Customer support workflows" },
] as const;

const permissionGroups = [
  {
    title: "User Management",
    permissions: [
      { id: "view-users", label: "View Users", description: "Access user profiles and account lists" },
      { id: "create-users", label: "Create Users", description: "Invite and create new admin users" },
      { id: "edit-users", label: "Edit Users", description: "Update user details and account status" },
      { id: "delete-users", label: "Delete Users", description: "Remove users from the platform" },
    ],
  },
  {
    title: "Provider Management",
    permissions: [
      { id: "view-providers", label: "View Providers", description: "Browse provider profiles and activity" },
      { id: "approve-providers", label: "Approve Providers", description: "Verify and approve provider applications" },
      { id: "edit-providers", label: "Edit Providers", description: "Update provider details and service settings" },
      { id: "suspend-providers", label: "Suspend Providers", description: "Pause provider access when required" },
    ],
  },
  {
    title: "Financial & Transactions",
    permissions: [
      { id: "view-transactions", label: "View Transactions", description: "Review transaction history and payouts" },
      { id: "process-refunds", label: "Process Refunds", description: "Issue refunds and payment corrections" },
      { id: "manage-commissions", label: "Manage Commissions", description: "Adjust platform fees and commission rules" },
      { id: "export-reports", label: "Export Reports", description: "Download financial reports and summaries" },
    ],
  },
] as const;

type PermissionId = (typeof permissionGroups)[number]["permissions"][number]["id"];
type RoleId = (typeof roleOptions)[number]["id"];

function buildInitialPermissions() {
  return permissionGroups.reduce<Record<PermissionId, boolean>>((permissions, group) => {
    group.permissions.forEach((permission) => {
      permissions[permission.id] = true;
    });

    return permissions;
  }, {} as Record<PermissionId, boolean>);
}

function getGroupId(title: string) {
  return title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export function RolesPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>("super-admin");
  const [permissions, setPermissions] = useState<Record<PermissionId, boolean>>(buildInitialPermissions);
  const selectedRole = useMemo(
    () => roleOptions.find((role) => role.id === selectedRoleId) ?? roleOptions[0],
    [selectedRoleId],
  );

  function updatePermission(permissionId: PermissionId, checked: boolean) {
    setPermissions((currentPermissions) => ({
      ...currentPermissions,
      [permissionId]: checked,
    }));
  }

  function resetPermissions() {
    setPermissions(buildInitialPermissions());
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role & Permission Management"
        description="Manage roles and permissions for your admin team"
      />

      <section className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="h-fit rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-4">
            <CardTitle className="text-lg font-bold tracking-tight text-text-primary">Roles</CardTitle>
            <p className="text-xs text-slate-400">Select a role to edit</p>
          </CardHeader>
          <CardContent className="space-y-3 px-5 pb-5">
            {roleOptions.map((role) => {
              const isActive = role.id === selectedRoleId;

              return (
                <button
                  key={role.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-3 text-left transition",
                    isActive
                      ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                      : "border-transparent bg-white text-slate-600 hover:border-border hover:bg-slate-50 hover:text-text-primary",
                  )}
                >
                  <span className="block text-xs font-bold">{role.name}</span>
                  <span className={cn("mt-1 block text-[10px]", isActive ? "text-primary" : "text-slate-400")}>
                    {role.description}
                  </span>
                </button>
              );
            })}

            <Button variant="outline" className="mt-3 h-10 w-full rounded-2xl border-dashed text-xs text-primary">
              + Create New Role
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="flex flex-col gap-4 p-5 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold tracking-tight text-text-primary">
                Permissions for {selectedRole.name}
              </CardTitle>
              <p className="mt-2 text-xs text-slate-400">
                Configure access levels and available actions for this role
              </p>
            </div>
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">
              {selectedRole.name}
            </span>
          </CardHeader>

          <CardContent className="space-y-6 px-5 pb-5">
            {permissionGroups.map((group) => {
              const groupId = getGroupId(group.title);

              return (
                <section key={group.title} aria-labelledby={`${groupId}-title`}>
                  <h2 id={`${groupId}-title`} className="text-sm font-bold text-text-primary">
                    {group.title}
                  </h2>
                  <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-white">
                    {group.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between gap-4 px-4 py-4">
                        <div>
                          <p className="text-xs font-bold text-slate-700">{permission.label}</p>
                          <p className="mt-1 text-[10px] leading-4 text-slate-400">{permission.description}</p>
                        </div>
                        <Switch
                          checked={permissions[permission.id]}
                          aria-label={`Toggle ${permission.label}`}
                          onClick={() => updatePermission(permission.id, !permissions[permission.id])}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button variant="outline" className="h-10 rounded-2xl px-5 text-xs" onClick={resetPermissions}>
                Cancel Changes
              </Button>
              <Button className="h-10 rounded-2xl px-6 text-xs">Save Permissions</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
