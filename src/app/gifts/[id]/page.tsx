import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EditGiftPage } from "@/components/pages/edit-gift";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Edit Gift | ${SITE_NAME}`,
  description: "Edit gift listing details.",
};

export default function GiftDetailsPage() {
  return (
    <DashboardShell>
      <EditGiftPage />
    </DashboardShell>
  );
}
