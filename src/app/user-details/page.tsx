import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserDetailsPage } from "@/components/pages/user-details";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `User Profile | ${SITE_NAME}`,
  description: "View user account details, activity, transactions, and subscription data.",
};

export default function UserDetails() {
  return (
    <DashboardShell>
      <UserDetailsPage />
    </DashboardShell>
  );
}
