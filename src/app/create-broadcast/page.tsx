import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Broadcast from "@/components/pages/broadcast";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Broadcast | ${SITE_NAME}`,
  description: "Create and schedule notification broadcasts.",
};

export default function BroadcastPage() {
  return (
    <DashboardShell>
      <Broadcast />
    </DashboardShell>
  );
}
