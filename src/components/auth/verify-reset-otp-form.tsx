"use client";

import Link from "next/link";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useVerifyResetOtp } from "@/hooks/useAuth";
import {
  verifyResetOtpSchema,
  type VerifyResetOtpFormValues,
} from "@/validations/auth";

export function VerifyResetOtpForm() {
  const router = useRouter();
  const verifyResetOtp = useVerifyResetOtp();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyResetOtpFormValues>({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      router.replace("/auth/forgot-password");
      return;
    }

    setValue("email", email, { shouldValidate: true });
  }, [router, setValue]);

  const onSubmit = (values: VerifyResetOtpFormValues) => {
    verifyResetOtp.mutate(values);
  };

  return (
    <Card className="w-full max-w-98.75 rounded-3xl bg-white px-8 py-9 shadow-2xl shadow-slate-200/80">
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-[25px] leading-tight ">
          Verify OTP
        </CardTitle>
        <CardDescription className="text-[13px] leading-5 text-slate-500">
          Enter the 6 digit code sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2.5">
            <Label htmlFor="otp">OTP Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="334018"
              autoComplete="one-time-code"
              leftIcon={<KeyRound className="size-4" />}
              className="h-12 rounded-2xl bg-slate-50 text-slate-400"
              errorMessage={errors.otp?.message}
              {...register("otp", {
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
                },
              })}
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-xl text-[13px]"
            disabled={verifyResetOtp.isPending}
          >
            {verifyResetOtp.isPending ? "Verifying..." : "Verify OTP"}
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:text-primary/80"
          >
            <ArrowLeft className="size-3" />
            Back to Forgot Password
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
