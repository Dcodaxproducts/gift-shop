import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { NotificationsPage } from "@/components/pages/notifications";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Notifications | ${SITE_NAME}`,
  description: "Create and schedule notification broadcasts.",
};

export default function Notifications() {
  return (
    <DashboardShell>
      <NotificationsPage />
    </DashboardShell>
  );
}
