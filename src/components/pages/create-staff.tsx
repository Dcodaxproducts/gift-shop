"use client";

import { useState } from "react";
import { Eye, Info, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
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

export function CreateStaffPage() {
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);

  return (
    <div className="space-y-5">
      <PageHeader title="Create Staff" />

      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2.5">
            <UserRound className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-bold text-slate-950">Staff Information</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="e.g. Sarah Connor" />
                <p className="text-[10px] text-slate-400">
                  Enter the legal name as it appears on documents.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="sarah.c@company.com" />
                <p className="text-[10px] text-slate-400">
                  Used for login and notifications.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex h-12 items-center rounded-[16px] border border-slate-200 bg-slate-50">
                <span className="flex h-full items-center border-r border-slate-200 px-4 text-sm text-slate-500">
                  +1
                </span>
                <input
                  id="phone"
                  placeholder="(555) 000-0000"
                  className="h-full flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-bold text-slate-950">Role Assignment</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label>Select Staff Role</Label>
              <Select defaultValue="manager">
                <SelectTrigger className="h-12 w-full px-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="support-lead">Support Lead</SelectItem>
                  <SelectItem value="ops-manager">Operations Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-primary" strokeWidth={2.5} />
                <p className="text-xs font-bold text-primary">Manager Permissions</p>
              </div>
              <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                Managers can oversee daily operations, approve transactions up to
                $10,000, and manage support tickets. They cannot modify
                system-wide settings or delete other staff accounts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2.5">
            <KeyRound className="size-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-sm font-bold text-slate-950">Account Security</h2>
          </div>

          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="temp-password">Temporary Password</Label>
              <Input
                id="temp-password"
                type="password"
                defaultValue="••••••••"
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
                onClick={() => setRequirePasswordChange((c) => !c)}
                className="h-6 w-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Create Staff</Button>
      </div>
    </div>
  );
}