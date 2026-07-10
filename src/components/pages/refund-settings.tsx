"use client";

import { useEffect, useState } from "react";
import { Banknote, Save } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRefundPolicySettings, useUpdateRefundPolicySettings } from "@/hooks/useRefund";
import { formatDate } from "@/utils/formatDate";
import PolicyCard from "../cards/PolicyCard";

const refundInputClassName =
  "h-13! border-0 bg-primary/10 text-sm font-semibold text-slate-800 focus:bg-primary/10 focus:ring-primary/10";

export function RefundSettingsPage() {
  const { data: refundPolicySettings } = useRefundPolicySettings();
  const { mutate: updateRefundPolicySettings, isPending: isUpdating } = useUpdateRefundPolicySettings();
  const [allowCancellation, setAllowCancellation] = useState(false);
  const [cancellationDeductionPercent, setCancellationDeductionPercent] = useState("");

  useEffect(() => {
    if (!refundPolicySettings) return;

    setAllowCancellation(refundPolicySettings.allowCancellation ?? false);
    setCancellationDeductionPercent(
      refundPolicySettings.cancellationDeductionPercent != null
        ? String(refundPolicySettings.cancellationDeductionPercent)
        : "",
    );
  }, [refundPolicySettings]);

  const resetForm = () => {
    setAllowCancellation(refundPolicySettings?.allowCancellation ?? false);
    setCancellationDeductionPercent(
      refundPolicySettings?.cancellationDeductionPercent != null
        ? String(refundPolicySettings.cancellationDeductionPercent)
        : "",
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRefundPolicySettings({
      allowCancellation,
      cancellationDeductionPercent: cancellationDeductionPercent !== ""
        ? Number(cancellationDeductionPercent)
        : undefined,
    });
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit} noValidate>
      <PageHeader
        title="Refund Settings"
        description="Configure order cancellation rules. Customers can cancel orders in Accepted or Processing status. The deduction percentage will be applied to the order total."
      />

      <Card>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Banknote className="size-4 text-primary" strokeWidth={2.4} />
              <Label className="text-sm font-semibold text-slate-800 my-auto">Allow Cancellation</Label>
            </div>
            <Switch
              checked={allowCancellation}
              onClick={() => setAllowCancellation((current) => !current)}
            />
          </div>
        </CardContent>
      </Card>

      <PolicyCard icon={Banknote} label="Cancellation Deduction %">
        <Input
          type="number"
          className={refundInputClassName}
          value={cancellationDeductionPercent}
          onChange={(e) => setCancellationDeductionPercent(e.target.value)}
          leftIcon={
            <span className="text-sm font-semibold text-slate-400">%</span>
          }
        />
      </PolicyCard>

      <Card className="border-t-4 border-t-primary">
        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Last updated: {formatDate(refundPolicySettings?.lastUpdatedAt)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Changes will take effect immediately for all new transactions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="h-11 px-5 text-sm text-slate-600 bg-gray-100"
                disabled={isUpdating}
                onClick={resetForm}
              >
                Discard
              </Button>
              <Button type="submit" disabled={isUpdating}>
                <Save className="size-3.5" />
                Update Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
