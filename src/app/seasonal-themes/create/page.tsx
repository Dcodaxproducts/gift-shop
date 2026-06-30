import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CreateSeasonalThemePage } from "@/components/pages/create-seasonal-theme";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Create Seasonal Theme | ${SITE_NAME}`,
  description: "Create a seasonal mobile theme.",
};

export default function CreateSeasonalTheme() {
  return (
    <DashboardShell>
      <CreateSeasonalThemePage />
    </DashboardShell>
  );
}
