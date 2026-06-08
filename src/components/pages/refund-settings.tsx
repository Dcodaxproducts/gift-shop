"use client";

import { Banknote, CalendarDays, Save } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const refundInputClassName =
  "h-13! border-0 bg-primary/10 text-sm font-semibold text-slate-800 focus:bg-primary/10 focus:ring-primary/10";

function PolicyField({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <Icon className="size-4 text-primary" strokeWidth={2.4} />
          <Label className="text-sm font-semibold text-slate-800">{label}</Label>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export function RefundSettingsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Refund Settings"
        description="Manage global return windows, automation thresholds, and auto-approval criteria for all marketplace transactions."
      />

      <section className="grid gap-7 md:grid-cols-2">
        <PolicyField icon={CalendarDays} label="Days Before Delivery">
          <Input
            id="refund-days-before-delivery"
            defaultValue="30"
            className={refundInputClassName}
            rightIcon={
              <span className="text-sm font-semibold text-slate-400">Days</span>
            }
          />
        </PolicyField>

        <PolicyField icon={Banknote} label="Deduction%">
          <Input
            id="refund-deduction"
            defaultValue="50.00"
            className={refundInputClassName}
            leftIcon={
              <span className="text-sm font-semibold text-slate-400">%</span>
            }
          />
        </PolicyField>
      </section>

      <PolicyField icon={Banknote} label="Label">
        <Input
          id="refund-label"
          defaultValue="Early Cancellation"
          className={refundInputClassName}
          leftIcon={
            <span className="text-sm font-semibold text-slate-400">e.g</span>
          }
        />
      </PolicyField>

      <Card className="border-t-4 border-t-primary">
        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-700">Last updated: 14 Oct 2023</p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Changes will take effect immediately for all new transactions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="h-11 px-5 text-sm text-slate-600 bg-gray-100">
                Discard
              </Button>
              <Button>
                <Save className="size-3.5" />
                Update Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
