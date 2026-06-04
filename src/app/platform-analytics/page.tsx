import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PlatformAnalyticsPage } from "@/components/pages/platform-analytics";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Platform Analytics | ${SITE_NAME}`,
  description: "Track platform revenue, subscriptions, and recent transactions.",
};

export default function PlatformAnalytics() {
  return (
    <DashboardShell>
      <PlatformAnalyticsPage />
    </DashboardShell>
  );
}
