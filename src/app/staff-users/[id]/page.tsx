import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EditStaffPage } from "@/components/pages/edit-staff";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Edit Staff | ${SITE_NAME}` };

export default function EditStaff() {
  return <DashboardShell><EditStaffPage /></DashboardShell>;
}
