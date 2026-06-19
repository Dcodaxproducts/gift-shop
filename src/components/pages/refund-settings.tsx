"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CalendarDays, Plus, Save, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRefundPolicySettings, useUpdateRefundPolicySettings } from "@/hooks/useRefund";
import {
  refundCancellationTiersSchema,
  type RefundCancellationTiersFormValues,
  type RefundCancellationTiersSubmitValues,
} from "@/validations/refund";
import { formatDate } from "@/utils/formatDate";
import PolicyCard from "../cards/PolicyCard";

const refundInputClassName =
  "h-13! border-0 bg-primary/10 text-sm font-semibold text-slate-800 focus:bg-primary/10 focus:ring-primary/10";

const emptyCancellationTier = {
  daysBeforeDelivery: "",
  deductionPercent: "",
  label: "",
} satisfies RefundCancellationTiersFormValues["cancellationTiers"][number];

const initialRefundTierValues: RefundCancellationTiersFormValues = {
  cancellationTiers: [emptyCancellationTier],
};

export function RefundSettingsPage() {
  const { data: refundPolicySettings } = useRefundPolicySettings();
  const { mutate: updateRefundPolicySettings, isPending: isUpdating } = useUpdateRefundPolicySettings();
  const [allowRefund, setAllowRefund] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<RefundCancellationTiersFormValues, unknown, RefundCancellationTiersSubmitValues>({
    resolver: zodResolver(refundCancellationTiersSchema),
    defaultValues: initialRefundTierValues,
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "cancellationTiers",
  });

  useEffect(() => {
    if (!refundPolicySettings) return;

    setAllowRefund(refundPolicySettings.allowRefund);
    reset({
      cancellationTiers: refundPolicySettings.cancellationTiers.length
        ? refundPolicySettings.cancellationTiers.map(({ daysBeforeDelivery, deductionPercent, label }) => ({
            daysBeforeDelivery,
            deductionPercent,
            label,
          }))
        : [emptyCancellationTier],
    });
  }, [refundPolicySettings]);

  const resetForm = () => {
    setAllowRefund(refundPolicySettings?.allowRefund ?? false);
    reset({
      cancellationTiers: refundPolicySettings?.cancellationTiers.length
        ? refundPolicySettings.cancellationTiers.map(({ daysBeforeDelivery, deductionPercent, label }) => ({
            daysBeforeDelivery,
            deductionPercent,
            label,
          }))
        : [emptyCancellationTier],
    });
  };

  const submitRefundPolicySettings = (values: RefundCancellationTiersSubmitValues) => {
    updateRefundPolicySettings({
      allowRefund,
      cancellationTiers: values.cancellationTiers.map(({ daysBeforeDelivery, deductionPercent, label }) => ({
        daysBeforeDelivery,
        deductionPercent,
        label,
      })),
    });
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit(submitRefundPolicySettings)} noValidate>
      <PageHeader
        title="Refund Settings"
        description="Manage global return windows, automation thresholds, and auto-approval criteria for all marketplace transactions."
      />

      <Card>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Banknote className="size-4 text-primary" strokeWidth={2.4} />
              <Label className="text-sm font-semibold text-slate-800 my-auto">Allow Refund</Label>
            </div>
            <Switch
              checked={allowRefund}
              onClick={() => setAllowRefund((current) => !current)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-800">Cancellation Tiers</h2>
          <Button
            className="h-10 px-4"
            onClick={() => append(emptyCancellationTier)}
          >
            <Plus className="size-3.5" />
            Add Tier
          </Button>
        </div>

        {fields.map((tier, index) => (
          <div key={tier.id} className="space-y-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold text-slate-500">Tier {index + 1}</p>
              {fields.length > 1 ? (
                <Button
                  variant="danger"
                  className="h-9 px-3"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </Button>
              ) : null}
            </div>

            <section className="grid gap-7 md:grid-cols-2">
              <PolicyCard icon={CalendarDays} label="Days Before Delivery">
                <Input
                  id={`refund-days-before-delivery-${tier.id}`}
                  type="number"
                  className={refundInputClassName}
                  errorMessage={errors.cancellationTiers?.[index]?.daysBeforeDelivery?.message}
                  rightIcon={
                    <span className="text-sm font-semibold text-slate-400">Days</span>
                  }
                  {...register(`cancellationTiers.${index}.daysBeforeDelivery`)}
                />
              </PolicyCard>

              <PolicyCard icon={Banknote} label="Deduction%">
                <Input
                  id={`refund-deduction-${tier.id}`}
                  type="number"
                  className={refundInputClassName}
                  errorMessage={errors.cancellationTiers?.[index]?.deductionPercent?.message}
                  leftIcon={
                    <span className="text-sm font-semibold text-slate-400">%</span>
                  }
                  {...register(`cancellationTiers.${index}.deductionPercent`)}
                />
              </PolicyCard>
            </section>

            <PolicyCard icon={Banknote} label="Label">
              <Input
                id={`refund-label-${tier.id}`}
                className={refundInputClassName}
                errorMessage={errors.cancellationTiers?.[index]?.label?.message}
                leftIcon={
                  <span className="text-sm font-semibold text-slate-400">e.g</span>
                }
                {...register(`cancellationTiers.${index}.label`)}
              />
            </PolicyCard>
          </div>
        ))}
      </div>

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
