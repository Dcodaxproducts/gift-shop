"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Check, X, Mail, CircleSlash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateProviderStatus } from "@/hooks/useProviders";
import { SuspendUserDialog } from "@/components/dialog/user-action-dialogs";
import type { ProviderDetails } from "@/types/providers";

const actionIcon = {
  approve: Check,
  reject: X,
  message: Mail,
  suspend: CircleSlash,
};

function QuickActionsCard({ provider }: { provider?: ProviderDetails }) {
  const params = useParams();
  const providerId = params.id as string;
  
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const { mutate: updateStatus, isPending } = useUpdateProviderStatus();

  const isCurrentlySuspended = provider?.status === "SUSPENDED";

  const dynamicActions = useMemo(() => [
    {
      label: "Approve",
      icon: "approve" as const,
      status: "APPROVE",
      className: "bg-green-500! text-white hover:bg-green-600",
      hide: provider?.status === "APPROVED"
    },
    {
      label: "Reject",
      icon: "reject" as const,
      status: "REJECT",
      className: "bg-red-500 text-white hover:bg-red-600",
      hide: provider?.status === "REJECTED"
    },
     {
      label: isCurrentlySuspended ? "Unsuspend Account" : "Suspend Account",
      icon: "suspend" as const,
      status: "SUSPEND",
      className: "bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200",
    },
    // {
    //   label: "Message Provider",
    //   icon: "message" as const,
    //   status: "UPDATE_STATUS",
    //   className: "bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200",
    // }
  ], [provider?.status, isCurrentlySuspended]);

  const handleActionClick = (status: string) => {
    if (status === "SUSPEND") {
      setIsSuspendOpen(true);
    } else {
      updateStatus({ id: providerId, action: status });
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-sm font-semibold ">Quick Actions</h2>
          <div className="mt-5 space-y-3">
            {dynamicActions.map((action) => {
              if (action.hide) return null;
              const Icon = actionIcon[action.icon];

              return (
                <Button
                  key={action.label}
                  disabled={isPending}
                  className={cn("h-11 w-full rounded-2xl text-xs flex gap-2", action.className)}
                  onClick={() => handleActionClick(action.status)}
                >
                  <Icon className="size-4" strokeWidth={2.5} />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <SuspendUserDialog
        open={isSuspendOpen}
        onOpenChange={setIsSuspendOpen}
        isSuspended={isCurrentlySuspended}
        isLoading={isPending}
        type="provider"
        title={isCurrentlySuspended ? "Unsuspend Provider Account" : "Suspend Provider Account"}
        summaryDetails={provider ? [
            { label: "Business Name", value: provider.businessName || "N/A" },
            { label: "Email", value: provider.email },
            { label: "Provider ID", value: providerId },
        ] : []}
        onConfirm={(data) => {
          updateStatus(
            { 
              id: providerId, 
              action: isCurrentlySuspended ? "UNSUSPEND" : "SUSPEND", 
              reason: data.reason || undefined
            },
            { onSuccess: () => setIsSuspendOpen(false) }
          );
        }}
      />
    </>
  );
}

export default QuickActionsCard;
