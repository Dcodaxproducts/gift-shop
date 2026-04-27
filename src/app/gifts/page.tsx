import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GiftsPage } from "@/components/pages/gifts";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Gift Inventory | ${SITE_NAME}`,
  description: "Manage and monitor all gift listings across the platform.",
};

export default function Gifts() {
  return (
    <DashboardShell>
      <GiftsPage />
    </DashboardShell>
  );
}
