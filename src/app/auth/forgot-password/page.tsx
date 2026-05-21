import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Forgot Password | ${SITE_NAME}`,
  description: "Request a password reset link for the Gifting admin portal.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface px-6 py-10 ">
      <KeyRound className="absolute right-[4%] top-2 hidden size-24 rotate-3 text-primary/10 sm:block" />
      <div className="absolute bottom-[10%] left-[4%] hidden size-28 rounded-full border-10 border-primary/10 sm:block">
        <LockKeyhole className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-primary/10" />
      </div>

      <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ShieldCheck className="size-6" />
      </div>

      <ForgotPasswordForm />

      <footer className="mt-8 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {SITE_NAME} . All rights reserved.</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <Link href="/privacy-policy" className="transition hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/security-standards" className="transition hover:text-primary">
            Security Standards
          </Link>
        </div>
      </footer>
    </main>
  );
}
