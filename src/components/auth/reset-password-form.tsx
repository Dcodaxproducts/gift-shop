"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/useAuth";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/validations/auth";

export function ResetPasswordForm() {
  const router = useRouter();
  const resetPassword = useResetPassword();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetContext, setResetContext] = useState<{ email: string; otp: string } | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = useWatch({ control, name: "newPassword" }) ?? "";
  
  const passwordRules = [
    { label: "Minimum 8 characters", complete: newPassword.length >= 8 },
    { label: "One number", complete: /[0-9]/.test(newPassword) },
    { label: "One special character", complete: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");
    const otp = sessionStorage.getItem("resetOtp");

    if (!email || !otp) {
      router.replace("/auth/forgot-password");
      return;
    }

    setResetContext({ email, otp });
  }, [router]);

  const onSubmit = (values: ResetPasswordFormValues) => {
    if (!resetContext) {
      toast.error("Please verify your OTP before resetting password.");
      router.replace("/auth/forgot-password");
      return;
    }

    resetPassword.mutate(
      {
        email: resetContext.email,
        otp: resetContext.otp,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          sessionStorage.removeItem("resetEmail");
          sessionStorage.removeItem("resetOtp");
          toast.success("Password reset successfully");
          router.replace("/auth/login");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-100">
      <CardHeader className="mb-7">
        <CardTitle className="text-[26px] leading-tight ">
          Reset Password
        </CardTitle>
        <CardDescription className="text-[13px] leading-5 text-slate-500">
          Create a new password for your super admin account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2.5">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
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
              className="h-11 rounded-xl bg-white"
              errorMessage={errors.newPassword?.message}
              {...register("newPassword")}
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
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
              className="h-11 rounded-xl bg-white"
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="rounded-xl bg-slate-50 py-4">
            <ul className="space-y-3 text-xs text-slate-500">
              {passwordRules.map((rule) => (
                <li key={rule.label} className="flex items-center gap-2">
                  {rule.complete ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <Circle className="size-4 text-slate-300" />
                  )}
                  <span>{rule.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="h-12 w-full rounded-xl text-[13px]" disabled={resetPassword.isPending}>
            {resetPassword.isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
