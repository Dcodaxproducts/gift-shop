"use client";

import { useState } from "react";
import { ChevronRight, Eye, Flag, Info, ListChecks, Plus, ScrollText, Settings, Shield, SlidersHorizontal } from "lucide-react";

import PageHeader from "@/components/common/page-header";
import { SocialReviewStatsCard } from "@/components/cards/SocialReviewStatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { TableCell, TableHead } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PermissionCheckbox } from "@/components/roles-permissions/permission-checkbox";
import {
  requiredReviewFields,
  reviewActivities,
  reviewQuickActions,
  reviewerEligibilityOptions,
  type ReviewActivity,
} from "@/constants/social-reviews-moderation";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/utils/status";

const iconClassName = "size-4";
const sectionLabelClassName = "text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500";
const formGridClassName = "grid gap-4 lg:grid-cols-2";

const quickActionIcons = {
  settings: Settings,
  flag: Flag,
  eye: Eye,
};

function QuickActions() {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold">Quick Actions</h2>
      {reviewQuickActions.map((action) => {
        const Icon = quickActionIcons[action.icon];

        return (
          <Card key={action.title} className="rounded-xl">
            <button className="flex w-full items-center gap-3 p-4 text-left">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className={iconClassName} />
              </span>
              <span className="min-w-0 flex-1 text-xs font-bold">{action.title}</span>
              <ChevronRight className="size-4 text-slate-500" />
            </button>
          </Card>
        );
      })}
      <div className="rounded-xl border-l-4 border-primary bg-blue-50 p-4 text-[10px] italic leading-4 text-slate-600">
        Changes to settings apply globally to all providers and users. Ensure you audit changes before publishing live.
      </div>
    </div>
  );
}

function ModerationActivityTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  return (
    <div className="min-w-0 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold">Recent Moderation Activity</h2>
        <Button variant="ghost" className="h-auto p-0 text-[10px] text-primary">
          View History
        </Button>
      </div>
      <DataTable
        data={reviewActivities}
        pagination={{
          total: reviewActivities.length,
          page,
          limit,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
          onPageChange: setPage,
        }}
        headers={
          <>
            <TableHead>Time</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Moderator</TableHead>
          </>
        }
        row={(activity: ReviewActivity) => (
          <>
            <TableCell className="text-slate-500">{activity.time}</TableCell>
            <TableCell className="font-semibold">{activity.reviewer}</TableCell>
            <TableCell>
              <StatusBadge status={activity.action} />
            </TableCell>
            <TableCell className="text-slate-500">{activity.moderator}</TableCell>
          </>
        )}
      />
    </div>
  );
}

function RadioOption({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-xl border px-4 text-xs font-medium",
        checked ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-700",
      )}
    >
      <span className={cn("flex size-4 items-center justify-center rounded-full border", checked ? "border-primary" : "border-slate-300")}>
        {checked ? <span className="size-2 rounded-full bg-primary" /> : null}
      </span>
      {label}
    </div>
  );
}

function PolicyCard({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="mb-5 flex items-center gap-2 border-b border-primary/20 pb-3">
        <span className="text-primary">{icon}</span>
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

function ReviewPolicyConfiguration() {
  return (
    <section className="space-y-5">
      <PageHeader
        title="Review Policy Configuration"
        description="Define who can write reviews and what they must include."
      />

      <div className={formGridClassName}>
        <PolicyCard title="Reviewer Eligibility" icon={<ListChecks className={iconClassName} />}>
          <div className="space-y-3">
            <p className={sectionLabelClassName}>Who can leave a review?</p>
            {reviewerEligibilityOptions.map((option) => (
              <RadioOption key={option} label={option} checked={option === "Verified purchase only"} />
            ))}
          </div>
        </PolicyCard>

        <PolicyCard title="Content Requirements" icon={<ScrollText className={iconClassName} />}>
          <div className="space-y-3">
            <p className={sectionLabelClassName}>Required Review Fields</p>
            {requiredReviewFields.map((field) => (
              <PermissionCheckbox
                key={field.label}
                id={`review-field-${field.label}`}
                label={field.label}
                checked={field.checked}
                onChange={() => undefined}
              />
            ))}
          </div>
        </PolicyCard>
      </div>

      <PolicyCard title="Moderation & Safety" icon={<Shield className={iconClassName} />}>
        <div className={formGridClassName}>
          <div className="space-y-2">
            <Label className={sectionLabelClassName}>Prohibited Keywords (comma separated)</Label>
            <Textarea
              value="spam, offensive, competitor, phone number"
              readOnly
              className="min-h-24 resize-none bg-white text-xs"
            />
            <p className="text-[10px] italic text-slate-500">Reviews containing these will be auto-flagged.</p>
          </div>
          <div className="space-y-2">
            <Label className={sectionLabelClassName}>Cooldown Period Per User</Label>
            <Select value="7-days">
              <SelectTrigger className="h-12 bg-white text-xs">
                <SelectValue placeholder="Cooldown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">Once per 7 days</SelectItem>
                <SelectItem value="14-days">Once per 14 days</SelectItem>
                <SelectItem value="30-days">Once per 30 days</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-slate-500">
              Prevents users from spamming multiple reviews for the same entity in a short window.
            </p>
          </div>
        </div>
      </PolicyCard>

      <PolicyCard title="Publication Logic" icon={<SlidersHorizontal className={iconClassName} />}>
        <p className={sectionLabelClassName}>New Review Publication</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_2fr]">
          <RadioOption label="Auto-publish immediately after status" checked />
          <RadioOption label="Always require moderation manual approval only" checked={false} />
          <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-700">
            <Info className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="text-xs font-bold">System Note</p>
              <p className="mt-1 text-[11px] leading-4">
                Auto-published reviews still enter the flagging queue and can be removed later if they violate safety checks.
              </p>
            </div>
          </div>
        </div>
      </PolicyCard>

      <div className="flex flex-col gap-3 border-t border-border pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Last updated: 2 hours ago by admin_jdoe</span>
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="min-w-32">
            Cancel
          </Button>
          <Button className="min-w-32">
            Save Policy
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SocialReviewsModerationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Review System Administration"
        description="Manage platform-wide review behavior, moderation queues, and visibility rules."
        actions={
          <Button>
            <Plus className="size-3.5" />
            New Policy Rule
          </Button>
        }
      />

      <SocialReviewStatsCard />

      <section className="grid gap-5 xl:grid-cols-[180px_minmax(0,1fr)]">
        <QuickActions />
        <ModerationActivityTable />
      </section>

      <ReviewPolicyConfiguration />
    </div>
  );
}
