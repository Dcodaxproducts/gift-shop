import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { HomePage } from "@/components/pages/home";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Analytics Dashboard | ${SITE_NAME}`,
  description: "Gifting admin analytics dashboard overview.",
};

export default function Home() {
  return (
    <DashboardShell>
      <HomePage />
    </DashboardShell>
  );
}
