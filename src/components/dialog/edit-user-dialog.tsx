"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUser } from "@/hooks/useUsers";
import type { UpdateUserPayload, User } from "@/types/users";

type EditUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
};

export function EditUserDialog({ open, onOpenChange, user }: EditUserDialogProps) {
  const updateUser = useUpdateUser();
  const initialDraft = useMemo(
    () => ({
      userId: user?.id,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    }),
    [user],
  );

  const [draft, setDraft] = useState(initialDraft);
  const currentDraft = draft.userId === user?.id ? draft : initialDraft;

  const handleSave = () => {
    if (!user?.id) return;

    const payload: UpdateUserPayload = {};
    if (currentDraft.firstName !== (user.firstName ?? "")) payload.firstName = currentDraft.firstName;
    if (currentDraft.lastName !== (user.lastName ?? "")) payload.lastName = currentDraft.lastName;
    if (currentDraft.email !== (user.email ?? "")) payload.email = currentDraft.email;
    if (currentDraft.phone !== (user.phone ?? "")) payload.phone = currentDraft.phone;

    if (Object.keys(payload).length === 0) {
      onOpenChange(false);
      return;
    }

    updateUser.mutate(
      { id: user.id, payload },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  const fullName = `${currentDraft.firstName} ${currentDraft.lastName}`.trim();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit User"
      description="Update the profile information for this user."
      className="max-w-[440px] rounded-xl"
      footer={
        <>
          <Button
            variant="outline"
            className="h-9 rounded-lg px-5 text-[11px]"
            onClick={() => onOpenChange(false)}
            disabled={updateUser.isPending}
          >
            Cancel
          </Button>
          <Button
            className="h-9 rounded-lg px-5 text-[11px]"
            onClick={handleSave}
            disabled={updateUser.isPending || !user}
          >
            {updateUser.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-name" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Full Name
          </Label>
          <Input
            id="edit-user-name"
            value={fullName}
            onChange={(e) => {
              const parts = e.target.value.split(" ");
              setDraft({
                ...currentDraft,
                firstName: parts[0] ?? "",
                lastName: parts.slice(1).join(" "),
              });
            }}
            className="h-10! rounded-lg bg-white text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-email" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Email
          </Label>
          <Input
            id="edit-user-email"
            type="email"
            value={currentDraft.email}
            onChange={(e) => setDraft({ ...currentDraft, email: e.target.value })}
            className="h-10! rounded-lg bg-white text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-phone" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Phone Number
          </Label>
          <Input
            id="edit-user-phone"
            value={currentDraft.phone}
            onChange={(e) => setDraft({ ...currentDraft, phone: e.target.value })}
            className="h-10! rounded-lg bg-white text-xs"
          />
        </div>
      </div>
    </Dialog>
  );
}
