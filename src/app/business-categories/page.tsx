import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BusinessCategoriesPage } from "@/components/pages/business-categories";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Business Categories | ${SITE_NAME}`,
  description: "Manage and organize your provider business categories.",
};

export default function BusinessCategories() {
  return (
    <DashboardShell>
      <BusinessCategoriesPage />
    </DashboardShell>
  );
}
