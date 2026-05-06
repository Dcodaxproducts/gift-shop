"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditUserDialog({ open, onOpenChange }: EditUserDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit User"
      description="Update the profile information for this user."
      className="max-w-[440px] rounded-xl"
      footer={
        <>
          <Button variant="outline" className="h-9 rounded-lg px-5 text-[11px]" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="h-9 rounded-lg px-5 text-[11px]" onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-name" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Full Name
          </Label>
          <Input id="edit-user-name" defaultValue="Alex Johnson" className="h-10! rounded-lg bg-white text-xs" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-email" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Email
          </Label>
          <Input id="edit-user-email" type="email" defaultValue="alex.johnson@example.com" className="h-10! rounded-lg bg-white text-xs" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-phone" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Phone Number
          </Label>
          <Input id="edit-user-phone" defaultValue="+1 (555) 234-5678" className="h-10! rounded-lg bg-white text-xs" />
        </div>
      </div>
    </Dialog>
  );
}
