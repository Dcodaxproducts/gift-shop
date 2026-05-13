import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GiftCategoriesPage } from "@/components/pages/gift-categories";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Gift Categories | ${SITE_NAME}`,
  description: "Manage and organize your catalog of gift types.",
};

export default function GiftCategories() {
  return (
    <DashboardShell>
      <GiftCategoriesPage />
    </DashboardShell>
  );
}
