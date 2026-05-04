"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditUserDialog({ open, onOpenChange }: UserDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit User Details"
      description="Update the user's contact information and profile data."
      footer={
        <>
          <Button variant="outline" className="h-10 rounded-2xl text-xs" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="h-10 rounded-2xl text-xs" onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="edit-user-name" className="text-[10px] uppercase tracking-wide text-slate-500">
            Full Name
          </Label>
          <Input id="edit-user-name" defaultValue="Alex Johnson" className="h-10! rounded-2xl bg-white text-xs" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-user-username" className="text-[10px] uppercase tracking-wide text-slate-500">
            Username
          </Label>
          <Input id="edit-user-username" defaultValue="@alexjohnson" className="h-10! rounded-2xl bg-white text-xs" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="edit-user-email" className="text-[10px] uppercase tracking-wide text-slate-500">
            Email Address
          </Label>
          <Input id="edit-user-email" type="email" defaultValue="alex.johnson@email.com" className="h-10! rounded-2xl bg-white text-xs" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="edit-user-phone" className="text-[10px] uppercase tracking-wide text-slate-500">
            Phone Number
          </Label>
          <Input id="edit-user-phone" defaultValue="+1 (555) 123-4567" className="h-10! rounded-2xl bg-white text-xs" />
        </div>
      </div>
    </Dialog>
  );
}

export function SuspendUserDialog({ open, onOpenChange }: UserDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend User"
      description="This action restricts the user from accessing the platform until reactivated."
      footer={
        <>
          <Button variant="outline" className="h-10 rounded-2xl text-xs" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="h-10 rounded-2xl bg-rose-500 text-xs shadow-rose-500/25 hover:bg-rose-600" onClick={() => onOpenChange(false)}>
            Suspend User
          </Button>
        </>
      }
    >
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-rose-700">Suspend Alex Johnson?</p>
            <p className="mt-1 text-xs leading-5 text-rose-600">
              The user will lose access to purchases, gift actions, and account settings until an admin restores the account.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="suspend-reason" className="text-[10px] uppercase tracking-wide text-slate-500">
          Suspension Reason
        </Label>
        <Input id="suspend-reason" placeholder="Add internal note..." className="h-10! rounded-2xl bg-white text-xs" />
      </div>
    </Dialog>
  );
}
