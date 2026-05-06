import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EditSubscriptionPage } from "@/components/pages/edit-subscription";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Edit Subscription Plan | ${SITE_NAME}`,
  description: "Edit subscription plan pricing, features, limits, and visibility.",
};

export default function EditSubscription() {
  return (
    <DashboardShell>
      <EditSubscriptionPage />
    </DashboardShell>
  );
}
