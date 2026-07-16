import type { Metadata } from "next";
import { StaffFormPage } from "@/components/pages/staff-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Edit Staff | ${SITE_NAME}` };

export default function EditStaff() {
  return <StaffFormPage mode="edit" />;
}
