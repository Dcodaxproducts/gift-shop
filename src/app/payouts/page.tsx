import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProviderPayoutsPage } from "@/components/pages/provider-payouts";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Provider Payouts | ${SITE_NAME}`,
  description: "Manage and monitor provider earnings and payout distributions.",
};

export default function Payouts() {
  return (
    <DashboardShell>
      <ProviderPayoutsPage />
    </DashboardShell>
  );
}
