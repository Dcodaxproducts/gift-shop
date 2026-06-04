"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Eye, Info, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAdminRole, useAdminRoles } from "@/hooks/usePermissions";
import { useCreateStaff } from "@/hooks/useStaff";
import { buildRolePermissionSummary } from "@/utils/role-permissions";

function splitFullName(fullName: string) {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: trimmed };
  }

  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim() || trimmed.slice(0, spaceIndex),
  };
}

export function CreateStaffPage() {
  const router = useRouter();
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  const { data: roles = [], isLoading: rolesLoading } = useAdminRoles();
  const { data: selectedRoleDetails, isLoading: roleDetailsLoading } = useAdminRole(roleId || undefined);
  const { mutate: createStaffMember, isPending } = useCreateStaff();

  const activeRoles = useMemo(
    () => roles.filter((role) => role.isActive),
    [roles],
  );

  const selectedRole = activeRoles.find((role) => role.id === roleId);
  const permissions = useMemo(
    () => buildRolePermissionSummary(selectedRoleDetails?.permissions),
    [selectedRoleDetails],
  );

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !roleId) return;

    const { firstName, lastName } = splitFullName(fullName);
    const formattedPhone = phone.trim() ? `+1${phone.replace(/\D/g, "")}` : undefined;

    createStaffMember(
      {
        email: email.trim(),
        temporaryPassword: temporaryPassword || undefined,
        generateTemporaryPassword: !temporaryPassword,
        mustChangePassword: requirePasswordChange,
        firstName,
        lastName,
        phone: formattedPhone,
        roleId,
        isActive: true,
        sendInviteEmail: true,
      },
      {
        onSuccess: () => router.push("/staff-users"),
      },
    );
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Create Staff" />

      <Card>
        <CardContent>
          <div className="flex items-center gap-2.5">
            <UserRound className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-semibold ">Staff Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="e.g. Sarah Connor"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
                <p className="text-[10px] text-slate-400">
                  Enter the legal name as it appears on documents.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="sarah.c@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <p className="text-[10px] text-slate-400">
                  Used for login and notifications.
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50">
                <span className="flex h-full items-center border-r border-slate-200 px-4 text-sm text-slate-500">
                  +1
                </span>
                <input
                  id="phone"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="h-full flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-semibold ">Role Assignment</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Staff Role</Label>
              <Select
                value={roleId || undefined}
                onValueChange={setRoleId}
                disabled={rolesLoading || activeRoles.length === 0}
              >
                <SelectTrigger className="h-12 w-full px-4">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {activeRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRole ? (
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Info className="size-4 text-primary" strokeWidth={2.5} />
                  <p className="text-xs font-semibold text-primary">
                    {selectedRole.name} Permissions
                  </p>
                </div>
                {selectedRole.description ? (
                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                    {selectedRole.description}
                  </p>
                ) : null}
                <ul className="mt-2.5 max-h-40 space-y-2 overflow-y-auto">
                  {roleDetailsLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <li
                        key={`perm-skeleton-${index}`}
                        className="h-3 animate-pulse rounded-full bg-primary/10"
                      />
                    ))
                  ) : permissions.length === 0 ? (
                    <li className="text-[11px] text-slate-500">No permissions assigned</li>
                  ) : (
                    permissions.map((permission) => (
                      <li
                        key={permission.label}
                        className="flex items-center gap-2 text-[11px] text-slate-600"
                      >
                        <CircleCheck
                          className="size-3.5 shrink-0 text-primary"
                          strokeWidth={2.5}
                        />
                        {permission.label}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-2.5">
            <KeyRound className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-semibold ">Account Security</h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="temp-password">Temporary Password</Label>
              <Input
                id="temp-password"
                type="password"
                placeholder="Leave empty to auto-generate"
                value={temporaryPassword}
                onChange={(event) => setTemporaryPassword(event.target.value)}
                rightIcon={<Eye className="size-4" />}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Require password change on first login
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  The user will be prompted to create a new password immediately.
                </p>
              </div>
              <Switch
                checked={requirePasswordChange}
                onClick={() => setRequirePasswordChange((current) => !current)}
                className="h-6 w-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPending || !fullName.trim() || !email.trim() || !roleId}
        >
          Create Staff
        </Button>
      </div>
    </div>
  );
}
