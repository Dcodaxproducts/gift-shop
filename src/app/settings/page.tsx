import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsPage } from "@/components/pages/settings";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `System Settings | ${SITE_NAME}`,
  description: "Configure global platform settings and system behavior.",
};

export default function Settings() {
  return (
    <DashboardShell>
      <SettingsPage />
    </DashboardShell>
  );
}
