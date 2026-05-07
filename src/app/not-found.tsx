import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    // Keep the not-found page layout simple and unchanged.
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-950">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span className="text-7xl font-bold tracking-tight text-primary sm:text-8xl">
          404
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="mt-8">
          <Button>
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
        </Link>
      </div>
    </main>
  );
}
