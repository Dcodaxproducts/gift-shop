import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CreateStaffPage } from "@/components/pages/create-staff";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Create Staff | ${SITE_NAME}` };

export default function CreateStaff() {
  return <DashboardShell><CreateStaffPage /></DashboardShell>;
}
