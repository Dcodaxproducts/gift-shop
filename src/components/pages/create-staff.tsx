"use client";

import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";
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

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.25} />
          </span>
          <h2 className="text-sm font-bold text-slate-950">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export function CreateStaffPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create Staff" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <SectionCard icon={UserRound} title="Staff Details">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="staff-name">Full Name</Label><Input id="staff-name" className="h-11! rounded-xl bg-slate-50 text-xs" /></div>
              <div className="space-y-2"><Label htmlFor="staff-email">Email</Label><Input id="staff-email" className="h-11! rounded-xl bg-slate-50 text-xs" /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="staff-phone">Phone</Label><Input id="staff-phone" className="h-11! rounded-xl bg-slate-50 text-xs" /></div>
              <div className="space-y-2"><Label htmlFor="staff-password">Temporary Password</Label><Input id="staff-password" className="h-11! rounded-xl bg-slate-50 text-xs" /></div>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-5">
          <SectionCard icon={BriefcaseBusiness} title="Role Assignment">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue="risk-analyst">
                <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="risk-analyst">Risk Analyst</SelectItem>
                  <SelectItem value="support-lead">Support Lead</SelectItem>
                  <SelectItem value="ops-manager">Operations Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Status">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div>
                <p className="text-xs font-semibold text-slate-700">Active Account</p>
                <p className="mt-1 text-[11px] text-slate-400">Allow this staff member to sign in</p>
              </div>
              <Switch checked className="h-6 w-11" />
            </div>
          </SectionCard>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">Cancel</Button>
        <Button className="h-10 rounded-xl px-5 text-xs">Create Staff</Button>
      </div>
    </div>
  );
}
