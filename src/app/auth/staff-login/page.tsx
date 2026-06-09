import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Staff Login | ${SITE_NAME}`,
  description: "Access the Gifting system management dashboard.",
};

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
        <LayoutGrid className="size-4" />
      </div>
      <span className="text-lg font-semibold ">Gifting</span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white ">
      <section className="grid min-h-screen lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-surface px-12 py-12 lg:flex lg:flex-col">
          <BrandMark />

          <div className="flex flex-1 flex-col items-center justify-center pb-10">
            <div className="relative flex size-[420px] items-center justify-center rounded-full bg-primary/10">
              <Image
                src="/dashboard-illustration.png"
                alt="Dashboard analytics illustration"
                width={390}
                height={390}
                priority
                className="drop-shadow-2xl"
              />
            </div>

            <div className="mt-8 max-w-sm text-center">
              <h2 className="text-2xl font-semibold tracking-tight ">
                Centralized Command
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Monitor transactions, manage user permissions, and oversee
                platform performance from a single interface.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-7 text-xs font-medium text-slate-500">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </aside>

        <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-20">
          <div className="flex items-center justify-between lg:hidden">
            <BrandMark />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <LoginForm variant="staff" />
          </div>
        </section>
      </section>
    </main>
  );
}
