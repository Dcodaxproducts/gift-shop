import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CreateGiftPage } from "@/components/pages/create-gift";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Create Gift | ${SITE_NAME}`,
  description: "Create a new gift listing.",
};

export default function CreateGift() {
  return (
    <DashboardShell>
      <CreateGiftPage />
    </DashboardShell>
  );
}
