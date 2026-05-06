"use client";

import { Camera, CircleCheck, CircleSlash2, Clock } from "lucide-react";
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

const permissions = [
  { label: "Review high-value transactions", allowed: true },
  { label: "Approve/Reject KYC documents", allowed: true },
  { label: "Generate risk reports", allowed: true },
  { label: "Cannot edit platform fees", allowed: false },
];

export function EditStaffPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Edit Staff" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://i.pravatar.cc/120?img=12"
                    alt="Jordan Henderson"
                    className="size-full object-cover"
                  />
                </span>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white text-primary shadow-md ring-1 ring-slate-200 hover:bg-primary/5"
                >
                  <Camera className="size-3" strokeWidth={2.5} />
                </button>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-950">Profile Details</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Update staff&apos;s personal information and photo.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Full Name
                  </Label>
                  <Input id="full-name" defaultValue="Jordan Henderson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Email Address
                  </Label>
                  <Input id="email" defaultValue="j.henderson@fintech.com" />
                </div>
              </div>

              <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Phone Number
                </Label>
                <Input id="phone" defaultValue="+1 (555) 012-3456" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Account Status
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700">
                  Active / Disabled
                </span>
                <Switch checked className="h-6 w-11" />
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-400">
                <Clock className="size-3" />
                <span>Last login: Oct 24, 2023, 14:30</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Role Assignment
              </p>
              <div className="mt-4 space-y-2">
                <Label className="text-[11px] font-semibold text-slate-700">
                  Staff Role
                </Label>
                <Select defaultValue="risk-analyst">
                  <SelectTrigger className="h-11 w-full px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="risk-analyst">Risk Analyst</SelectItem>
                    <SelectItem value="support-lead">Support Lead</SelectItem>
                    <SelectItem value="ops-manager">Operations Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 rounded-xl bg-emerald-50/40 p-3 ring-1 ring-emerald-100">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Permission Summary
                </p>
                <ul className="mt-2.5 space-y-2">
                  {permissions.map((p) => (
                    <li
                      key={p.label}
                      className={
                        "flex items-center gap-2 text-[11px] " +
                        (p.allowed
                          ? "text-slate-700"
                          : "text-slate-400 line-through")
                      }
                    >
                      {p.allowed ? (
                        <CircleCheck
                          className="size-3.5 text-emerald-500"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <CircleSlash2
                          className="size-3.5 text-slate-400"
                          strokeWidth={2.5}
                        />
                      )}
                      {p.label}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}