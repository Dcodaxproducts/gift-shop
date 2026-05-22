import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserDetailsPage } from "@/components/pages/user-details/index";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `User Profile | ${SITE_NAME}`,
};

export default function UserDetails() {
  return (
    <DashboardShell>
      <UserDetailsPage />
    </DashboardShell>
  );
}
