"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
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
import { useForgotPassword } from "@/hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/auth";

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword.mutate(values);
  };

  return (
    <Card className="w-full max-w-[395px] rounded-3xl bg-white px-8 py-9 shadow-2xl shadow-slate-200/80">
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-[25px] leading-tight ">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-[13px] leading-5 text-slate-500">
          Enter your email to receive password reset instructions.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@fintechgifts.com"
              autoComplete="email"
              leftIcon={<Mail className="size-4" />}
              className="h-12 rounded-2xl bg-slate-50 text-slate-400"
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-xl text-[13px]"
            disabled={forgotPassword.isPending}
          >
            {forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:text-primary/80"
          >
            <ArrowLeft className="size-3" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
