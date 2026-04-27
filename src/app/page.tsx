import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Analytics Dashboard | ${SITE_NAME}`,
  description: "Gifting admin analytics dashboard shell.",
};

export default function Home() {
  return (
    <DashboardShell>
      <section className="min-h-[calc(100vh-121px)] rounded-3xl border border-dashed border-border bg-white/60 p-6">
        <p className="text-sm font-medium text-slate-400">
          Dashboard content will be added next.
        </p>
      </section>
    </DashboardShell>
  );
}
