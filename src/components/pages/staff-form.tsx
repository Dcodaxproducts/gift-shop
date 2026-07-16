"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheck, Clock, Eye, EyeOff, Info, KeyRound, Lock, ShieldCheck, UserRound } from "lucide-react";
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
import { useStaffRole, useStaffRoles } from "@/hooks/usePermissions";
import { useCreateStaff, useStaffMember, useUpdateStaff } from "@/hooks/useStaff";
import { formatDate } from "@/utils/formatDate";
import { buildRolePermissionSummary } from "@/utils/role-permissions";
import type { UpdateStaffPayload } from "@/types/staff";

export type StaffFormMode = "create" | "edit";

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

export function StaffFormPage({ mode }: { mode: StaffFormMode }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const staffId = params?.id ?? "";
  const isEdit = mode === "edit";

  const [showPassword, setShowPassword] = useState(false);
  const [draft, setDraft] = useState({
    staffId: "",
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
    password: "",
    isActive: true,
  });

  const { data: staff, isLoading } = useStaffMember(isEdit ? staffId : undefined);
  const { data: roles = [], isLoading: rolesLoading } = useStaffRoles();
console.log(roles)
  const initialDraft = useMemo(
    () => ({
      staffId: staff?.id ?? "",
      fullName: staff ? staff.fullName || `${staff.firstName} ${staff.lastName}` : "",
      email: staff?.email ?? "",
      phone: staff?.phone ?? "",
      roleId: staff?.role.id ?? "",
      password: "",
      isActive: staff?.status === "APPROVED",
    }),
    [staff],
  );

  // In edit mode hydrate from the fetched staff until the user starts editing.
  const currentDraft = isEdit ? (draft.staffId === staff?.id ? draft : initialDraft) : draft;
  const { fullName, email, phone, roleId, password, isActive } = currentDraft;
  const update = (patch: Partial<typeof draft>) => setDraft({ ...currentDraft, ...patch });

  const staffRoleId = staff?.role.id;
  const { data: selectedRoleDetails, isLoading: roleDetailsLoading } = useStaffRole(roleId || undefined);
  const { mutate: createStaffMember, isPending: isCreating } = useCreateStaff();
  const { mutate: updateStaffMember, isPending: isUpdating } = useUpdateStaff();
  const isSaving = isCreating || isUpdating;
  
  const selectedRole = roles.find((role) => role.id === roleId);
  const permissions = useMemo(
    () => buildRolePermissionSummary(selectedRoleDetails?.permissions),
    [selectedRoleDetails],
  );

  const handleSubmit = () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !roleId) return;

    if (!isEdit && password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const { firstName, lastName } = splitFullName(trimmedName);
    const trimmedPhone = phone.trim();

    if (isEdit) {
      const payload: UpdateStaffPayload = {
        firstName,
        lastName,
        email: trimmedEmail,
        phone: trimmedPhone || undefined,
        roleId,
        isActive,
      };
      if (password.trim()) payload.password = password.trim();

      updateStaffMember(
        { id: staffId, payload },
        { onSuccess: () => router.push("/staff-users") },
      );
      return;
    }

    createStaffMember(
      {
        email: trimmedEmail,
        password: password.trim(),
        firstName,
        lastName,
        phone: trimmedPhone || undefined,
        roleId,
        isActive: true,
      },
      { onSuccess: () => router.push("/staff-users") },
    );
  };

  if (isEdit && isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader title="Edit Staff" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader title={isEdit ? "Edit Staff" : "Create Staff"} />

      <Card>
        <CardContent className="space-y-4">
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
                  onChange={(event) => update({ fullName: event.target.value })}
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
                  onChange={(event) => update({ email: event.target.value })}
                />
                <p className="text-[10px] text-slate-400">
                  Used for login and notifications.
                </p>
              </div>
            </div>

            <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(event) => update({ phone: event.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-semibold ">Role Assignment</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Staff Role</Label>
              <Select
                value={roleId || undefined}
                onValueChange={(value) => update({ roleId: value })}
                disabled={rolesLoading || roles.length === 0}
              >
                <SelectTrigger className="h-12 w-full px-4">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
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
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2.5">
            <KeyRound className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-semibold ">Account Security</h2>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password">{isEdit ? "New Password" : "Password"}</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="size-4" />}
              value={password}
              onChange={(event) => update({ password: event.target.value })}
              rightIcon={
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((prev) => !prev);
                  }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="pointer-events-auto relative cursor-pointer z-20 -m-2 flex size-8 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
            {isEdit ? (
              <p className="text-[10px] text-slate-400">
                Leave blank to keep the current password. Setting a new one signs the staff out of all sessions.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {isEdit ? (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-primary" strokeWidth={2.5} />
              <h2 className="text-sm font-semibold ">Account Status</h2>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-700">Active / Disabled</span>
              <Switch
                checked={isActive}
                onClick={() => update({ isActive: !isActive })}
                disabled={isUpdating}
                className="h-6 w-11"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <Clock className="size-3" />
              <span>
                Last login:{" "}
                {staff?.lastLoginAt ? formatDate(staff.lastLoginAt) : "Not logged in yet"}
              </span>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSaving || !fullName.trim() || !email.trim() || !roleId}
        >
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Staff"}
        </Button>
      </div>
    </div>
  );
}
