"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetUserPassword } from "@/hooks/useUsers";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/validations/auth";

type ResetPasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
};

export function ResetPasswordDialog({ open, onOpenChange, userId }: ResetPasswordDialogProps) {
  const resetPassword = useResetUserPassword();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }

    onOpenChange(nextOpen);
  };

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!userId) return;

    resetPassword.mutate(
      {
        id: userId,
        payload: {
          newPassword: data.newPassword,
        },
      },
      {
        onSuccess: () => handleOpenChange(false),
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Reset Password"
      description="Set a new password for this user account."
      className="max-w-110 rounded-xl"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            className="h-9 px-5 text-[11px]"
            onClick={() => handleOpenChange(false)}
            disabled={resetPassword.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="reset-user-password-form"
            className="h-9 px-5 text-[11px]"
            disabled={resetPassword.isPending || !userId}
          >
            {resetPassword.isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </>
      }
    >
      <form id="reset-user-password-form" className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            rightIcon={
              <button
                type="button"
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                className="text-slate-400 transition hover:text-slate-700"
                onClick={() => setShowNewPassword((value) => !value)}
              >
                {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
            errorMessage={errors.newPassword?.message}
            {...register("newPassword")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            rightIcon={
              <button
                type="button"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="text-slate-400 transition hover:text-slate-700"
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
      </form>
    </Dialog>
  );
}
