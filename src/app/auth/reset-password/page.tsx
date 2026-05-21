import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Reset Password | ${SITE_NAME}`,
  description: "Create a new password for your Gifting super admin account.",
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 py-10 ">
      <div className="mb-8 flex size-11 items-center justify-center rounded-xl bg-primary text-white shadow-xl shadow-primary/30">
        <KeyRound className="size-5" />
      </div>

      <ResetPasswordForm />

      <p className="mt-8 text-center text-xs text-slate-400">
        © 2026 Gifting Platform. Secure super admin access.
      </p>
    </main>
  );
}
