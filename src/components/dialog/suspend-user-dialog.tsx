"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

const reasonOptions = ["Select a reason", "Policy violation", "Suspicious activity", "Payment issue"];

type SuspendUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SuspendUserDialog({ open, onOpenChange }: SuspendUserDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend User"
      className="max-w-[360px] rounded-xl"
      footer={
        <>
          <Button variant="outline" className="h-9 rounded-lg px-5 text-[11px]" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="h-9 rounded-lg bg-[#7c3aed] px-5 text-[11px] shadow-lg shadow-violet-500/25 hover:bg-[#6d28d9]" onClick={() => onOpenChange(false)}>
            Confirm Suspension
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-[#f4efff] p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">User Summary</p>
          <div className="mt-2 grid grid-cols-[80px_1fr] gap-y-1 text-[11px]">
            <span className="text-slate-500">Name</span>
            <span className="text-right font-medium text-slate-950">John Doe</span>
            <span className="text-slate-500">Email</span>
            <span className="text-right font-medium text-slate-950">john.doe@example.com</span>
            <span className="text-slate-500">Account ID</span>
            <span className="text-right font-medium text-slate-950">USR-092834</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="suspension-reason" className="text-[10px] font-bold text-slate-700">
            Reason for suspension
          </label>
          <select
            id="suspension-reason"
            defaultValue={reasonOptions[0]}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[11px] text-slate-500 outline-none focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-500/10"
          >
            {reasonOptions.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="suspension-comments" className="text-[10px] font-bold text-slate-700">
            Additional Comments (Optional)
          </label>
          <textarea
            id="suspension-comments"
            placeholder="Provide more context about this suspension..."
            className="min-h-20 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

        <div className="flex gap-2 rounded-lg bg-rose-50 p-3 text-[10px] font-medium leading-4 text-rose-500">
          <X className="mt-0.5 size-3 shrink-0" />
          <p>Suspending this user will immediately revoke their access to the platform and notify them via email.</p>
        </div>
      </div>
    </Dialog>
  );
}
