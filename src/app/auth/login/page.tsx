import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Super Admin Login | ${SITE_NAME}`,
  description: "Access the Gift Shop system management dashboard.",
};

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
        <svg
          aria-hidden="true"
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <rect width="13" height="13" x="5" y="5" rx="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      </div>
      <span className="text-lg font-black text-slate-950">Gifting</span>
    </div>
  );
}

function SupportIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 14v3a2 2 0 0 1-2 2h-1" />
      <path d="M6 14v3a2 2 0 0 0 2 2h1" />
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect width="4" height="6" x="2" y="11" rx="2" />
      <rect width="4" height="6" x="18" y="11" rx="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="grid min-h-screen lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-slate-50 px-12 py-12 lg:flex lg:flex-col">
          <BrandMark />

          <div className="flex flex-1 flex-col items-center justify-center pb-10">
            <div className="relative flex size-[420px] items-center justify-center rounded-full bg-primary-soft">
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
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
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
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Back home
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <LoginForm />
          </div>

          <footer className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-500">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 transition hover:text-primary"
            >
              <SupportIcon />
              Support
            </Link>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 transition hover:text-primary"
            >
              <GlobeIcon />
              English (US)
            </button>
          </footer>
        </section>
      </section>
    </main>
  );
}
