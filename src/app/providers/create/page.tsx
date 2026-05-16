import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProviderFormPage } from "@/components/pages/provider-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Add New Provider | ${SITE_NAME}`,
  description: "Create a new provider profile on the platform.",
};

export default function CreateProvider() {
  return (
    <DashboardShell>
      <ProviderFormPage mode="create" />
    </DashboardShell>
  );
}
