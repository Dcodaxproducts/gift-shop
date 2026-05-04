import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StaffUsersPage } from "@/components/pages/staff-users";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Staff Management | ${SITE_NAME}` };

export default function StaffUsers() {
  return <DashboardShell><StaffUsersPage /></DashboardShell>;
}
