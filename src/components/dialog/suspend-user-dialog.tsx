"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CircleSlash } from "lucide-react";
import { suspensionFormSchema, type SuspensionFormData } from "@/validations/suspension";

export const userSuspensionReasons = [
  "POLICY_VIOLATION",
  "PAYMENT_ISSUE",
  "FRAUD_SUSPECTED",
  "USER_REQUEST",
  "ABUSE_REPORT",
  "OTHER",
] as const;

export const providerSuspensionReasons = [
  "INCOMPLETE_DOCUMENTS",
  "INVALID_BUSINESS_DETAILS",
  "POLICY_VIOLATION",
  "DUPLICATE_PROVIDER",
  "BUSINESS_NOT_ELIGIBLE",
  "OTHER",
] as const;

export type SuspensionReason =
  | (typeof userSuspensionReasons)[number]
  | (typeof providerSuspensionReasons)[number];

const formatReason = (value: string) => value.replace(/_/g, " ").toLowerCase();

type SuspendDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSuspended: boolean;
  isLoading?: boolean;
  type?: "user" | "provider";
  title?: string;
  summaryDetails?: { label: string; value: string }[];
  onConfirm: (data: { reason: string; comment?: string }) => void;
};

export function SuspendUserDialog({
  open,
  onOpenChange,
  isSuspended,
  isLoading,
  type = "user",
  title,
  summaryDetails,
  onConfirm,
}: SuspendDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<SuspensionFormData>({
    resolver: zodResolver(suspensionFormSchema),
    defaultValues: {
      reason: "",
      comment: "",
    },
  });

  const reasonValue = useWatch({ control, name: "reason" });
  const options = type === "provider" ? providerSuspensionReasons : userSuspensionReasons;

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: SuspensionFormData) => {
    onConfirm({
      reason: data.reason,
      comment: data.comment?.trim() || undefined,
    });
  };

  const handleConfirmClick = () => {
    if (isSuspended) {
      onConfirm({ reason: "", comment: undefined });
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title || (isSuspended ? "Unsuspend Account" : "Suspend Account")}
      className="max-w-[440px] rounded-xl"
      headerClassName="px-4 py-3"
      contentClassName="px-4 py-3"
      footerClassName="px-4 py-3"
      footer={
        <>
          <Button
            variant="outline"
            className="h-8 text-[10px]"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="h-8 text-[10px]"
            onClick={handleConfirmClick}
            disabled={isLoading}
          >
            {isLoading
              ? isSuspended ? "Unsuspending..." : "Suspending..."
              : isSuspended ? "Confirm Unsuspension" : "Confirm Suspension"}
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        {summaryDetails && summaryDetails.length > 0 && (
          <div className="rounded-lg bg-[#f4efff] p-3">
            <Label className="text-primary text-[12px] font-semibold">Account Summary</Label>
            <div className="mt-2 grid grid-cols-[100px_1fr] gap-y-1 text-[11px]">
              {summaryDetails.map((detail, idx) => (
                <div key={idx} className="contents">
                  <Label className="text-muted-foreground">{detail.label}</Label>
                  <span className="text-right font-medium truncate">{detail.value || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSuspended && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="suspension-reason">Reason for suspension</Label>
              <Select
                value={reasonValue}
                onValueChange={(value) => setValue("reason", value, { shouldValidate: true })}
              >
                <SelectTrigger
                  id="suspension-reason"
                  className={cn("w-full text-xs capitalize", errors.reason && "border-red-500")}
                >
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option} className="capitalize">
                      {formatReason(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reason && (
                <p className="text-[10px] text-red-500 mt-1">{errors.reason.message}</p>
              )}
            </div>

            {/* Always show comments for Providers too, or keep your logic as is */}
           {
            type === "user" && (
               <div className="space-y-1.5">
              <Label htmlFor="suspension-comments">Additional Comments (Optional)</Label>
              <Textarea
                id="suspension-comments"
                {...register("comment")}
                placeholder="Provide more context..."
                className={cn("text-xs! min-h-[80px]", errors.comment && "border-red-500")}
              />
              {errors.comment && (
                <p className="text-[10px] text-red-500 mt-1">{errors.comment.message}</p>
              )}
            </div>
            )
           }
          </>
        )}

        <div className="flex gap-2 rounded-lg bg-rose-50 p-3 text-[10px] font-medium leading-4 text-rose-500">
          <CircleSlash className="mt-0.5 size-3 shrink-0" />
          <p>
            {isSuspended
              ? "Unsuspending will immediately restore their access to the platform."
              : "Suspending will immediately revoke access and notify them via email."}
          </p>
        </div>
      </div>
    </Dialog>
  );
}
