import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CreateSubscriptionPage } from "@/components/pages/create-subscription";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Create Subscription Plan | ${SITE_NAME}`,
  description: "Create a new subscription tier.",
};

export default function CreateSubscription() {
  return (
    <DashboardShell>
      <CreateSubscriptionPage />
    </DashboardShell>
  );
}
