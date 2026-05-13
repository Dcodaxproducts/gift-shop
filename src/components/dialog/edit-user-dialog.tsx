"use client";

import { useEffect, useState } from "react";
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (open && user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
    }
  }, [open, user]);

  const handleSave = () => {
    if (!user?.id) return;

    const payload: UpdateUserPayload = {};
    if (firstName !== (user.firstName ?? "")) payload.firstName = firstName;
    if (lastName !== (user.lastName ?? "")) payload.lastName = lastName;
    if (email !== (user.email ?? "")) payload.email = email;
    if (phone !== (user.phone ?? "")) payload.phone = phone;

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

  const fullName = `${firstName} ${lastName}`.trim();

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
              setFirstName(parts[0] ?? "");
              setLastName(parts.slice(1).join(" "));
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10! rounded-lg bg-white text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-user-phone" className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Phone Number
          </Label>
          <Input
            id="edit-user-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10! rounded-lg bg-white text-xs"
          />
        </div>
      </div>
    </Dialog>
  );
}
