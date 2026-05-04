import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UsersPage } from "@/components/pages/users";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Registered Users | ${SITE_NAME}`,
  description: "Manage registered users and account activity.",
};

export default function Users() {
  return (
    <DashboardShell>
      <UsersPage />
    </DashboardShell>
  );
}
