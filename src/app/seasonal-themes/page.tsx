import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SeasonalThemesPage } from "@/components/pages/seasonal-themes";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Seasonal Themes | ${SITE_NAME}`,
  description: "Manage mobile seasonal theme artwork.",
};

export default function SeasonalThemes() {
  return (
    <DashboardShell>
      <SeasonalThemesPage />
    </DashboardShell>
  );
}
