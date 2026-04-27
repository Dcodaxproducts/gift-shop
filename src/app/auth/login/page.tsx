import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Login | ${SITE_NAME}`,
  description: "Login to your Gift Shop account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fff8f2] px-6 py-8 text-[#2d2118]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight">
            Gift Shop
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#d9bda4] bg-white px-4 py-2 text-sm font-bold text-[#2d2118] transition hover:border-[#2d2118]"
          >
            Back home
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="hidden space-y-6 lg:block">
            <div className="inline-flex rounded-full bg-[#ffe3cc] px-4 py-2 text-sm font-bold text-[#9a4f1b]">
              Secure customer access
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-black tracking-tight">
                Manage orders, saved gifts, and custom requests.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-[#6d5543]">
                Sign in to continue shopping faster, track deliveries, and save
                favorite gift packages for later.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
