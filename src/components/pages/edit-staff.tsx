"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CircleCheck, Clock, UserRound } from "lucide-react";
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
import { useStaffMember, useUpdateStaff } from "@/hooks/useStaff";
import { formatDate } from "@/utils/formatDate";
import { buildRolePermissionSummary } from "@/utils/role-permissions";
import SectionHeader from "../common/section-header";

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

export function EditStaffPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const staffId = params.id;

  const [draft, setDraft] = useState({
    staffId: "",
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
    isActive: true,
  });

  const { data: staff, isLoading } = useStaffMember(staffId);
  const { data: roles = [] } = useAdminRoles();
  const initialDraft = useMemo(
    () => ({
      staffId: staff?.id ?? "",
      fullName: staff ? staff.fullName || `${staff.firstName} ${staff.lastName}` : "",
      email: staff?.email ?? "",
      phone: staff?.phone ?? "",
      roleId: staff?.role.id ?? "",
      isActive: staff?.isActive ?? true,
    }),
    [staff],
  );
  const currentDraft = draft.staffId === staff?.id ? draft : initialDraft;
  const staffRoleId = staff?.role.id;
  const { fullName, email, phone, roleId, isActive } = currentDraft;
  const { data: selectedRoleDetails, isLoading: roleDetailsLoading } = useAdminRole(roleId || undefined);
  const { mutate: updateStaffMember, isPending: isUpdating } = useUpdateStaff();

  const activeRoles = useMemo(
    () => roles.filter((role) => role.isActive || role.id === staffRoleId),
    [roles, staffRoleId],
  );

  const permissions = useMemo(
    () => buildRolePermissionSummary(selectedRoleDetails?.permissions),
    [selectedRoleDetails],
  );

  const handleActiveToggle = () => {
    setDraft({ ...currentDraft, isActive: !currentDraft.isActive });
  };

  const handleSave = () => {
    if (!staff) return;

    const { firstName, lastName } = splitFullName(fullName);

    updateStaffMember(
      {
        id: staffId,
        payload: {
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim() || undefined,
          roleId,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/staff-users"),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader title="Edit Staff" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Edit Staff" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card>
          <CardContent>
            <SectionHeader
              icon={UserRound}
              title="Profile Details"
              description="Update staff&apos;s personal information."
            />

            <div className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="full-name"
                    className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(event) => setDraft({ ...currentDraft, fullName: event.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(event) => setDraft({ ...currentDraft, email: event.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
                <Label
                  htmlFor="phone"
                  className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setDraft({ ...currentDraft, phone: event.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Account Status
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700">
                  Active / Disabled
                </span>
                <Switch
                  checked={isActive}
                  onClick={handleActiveToggle}
                  disabled={isUpdating}
                  className="h-6 w-11"
                />
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-400">
                <Clock className="size-3" />
                <span>
                  Last login:{" "}
                  {staff?.lastLoginAt
                    ? formatDate(staff.lastLoginAt)
                    : "Not logged in yet"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Role Assignment
              </p>
              <div className="mt-4 space-y-2">
                <Label className="text-[11px] font-semibold text-slate-700">
                  Staff Role
                </Label>
                <Select value={roleId} onValueChange={(value) => setDraft({ ...currentDraft, roleId: value })}>
                  <SelectTrigger className="h-11 w-full px-4">
                    <SelectValue />
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

              <div className="mt-4 rounded-xl bg-emerald-50/40 p-3 ring-1 ring-emerald-100">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Permission Summary
                </p>
                <ul className="mt-2.5 max-h-48 space-y-2 overflow-y-auto">
                  {roleDetailsLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <li
                        key={`perm-skeleton-${index}`}
                        className="h-3 animate-pulse rounded-full bg-slate-100"
                      />
                    ))
                  ) : permissions.length === 0 ? (
                    <li className="text-[11px] text-slate-400">No permissions assigned</li>
                  ) : (
                    permissions.map((permission, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-slate-700"
                      >
                        <CircleCheck
                          className="size-3.5 shrink-0 text-emerald-500"
                          strokeWidth={2.5}
                        />
                        {permission.label}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isUpdating || !fullName.trim() || !email.trim()}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
